// ==========================================================================
// Project:   SplitView - SplitView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals SplitView */

// This page describes the main user interface for your application.
SplitView.SplitView = SC.SplitView.extend(
/** @scope SplitView.SplitView.prototype */ {

	childViews: ['master', 'detail'],
	showInPopover: NO,

	popoverLayout: { width: 320, height: 600 },
	menuButtonLayout: { left: 20, width: 100, centerX: 0, height: 24, centerY: 0 },
	fullScreenButtonLayout: { left: 20, width: 100, centerX: 0, height: 24, centerY: 0 },

	master: SC.View,
	detail: SC.View,
	
	createChildViews: function() {
		sc_super();

		this.set('menuButton', this.createChildView(this.get('menuButton')));
		this.get('menuButton').set('splitView', this);
	},

	designModeDidChanged: function() {

		SC.debug('reload ' + this.get('designMode'));

		var hasPanel = NO;
		if (panel = this.get('menuButton').get('panel')) {

			hasPanel = YES;
			panel.remove(NO);
		}

		if (this.get('designMode')[0] === 's' || (this.get('designMode')[0] === 'm' && this.get('designMode')[2] === 'p')) {

			if (this.childViews.length > 1) {
			
				this.removeChild(this.get('master'));
				this.get('detail').get('topToolbar').appendChild(this.get('menuButton'));
			}
		}
		else if ((this.get('designMode')[0] === 'm' && this.get('designMode')[2] === 'l') || this.get('designMode')[0] === 'l') {
			
			if (this.childViews.length < 2) {

				this.get('master')._doDetach();
				this.insertBefore(this.get('master'), this.get('detail'));
				this.get('detail').get('topToolbar').removeChild(this.get('menuButton'));
			}
		}

		if (hasPanel === YES) {

			this.get('menuButton').set('designMode', this.get('designMode')); // Need to update designMode
			this.get('menuButton').action(undefined, NO);
		}
	}.observes('.designMode'),

	menuButton: SC.ButtonView.design(SC.AutoResize, {

		animationDuration: 0.35,
		splitView: null,
		panel: null,

		layoutBinding: SC.Binding.oneWay('.splitView.menuButtonLayout'),
		titleBinding: SC.Binding.oneWay('.splitView.master.title'),

		action: function(evt, animated) {

			SC.debug(animated);
			if (animated === undefined) {

				SC.debug('animated = undefined');
				animated = YES;
			}

			SC.debug(this.get('designMode'));
			if (this.get('designMode')[0] === 's') {
				
				this.showViewFullScreen(animated);
			}
			else if (this.get('designMode')[0] === 'm' && this.get('designMode')[2] === 'p') {

				if (this.get('splitView').get('showInPopover') === YES) {
					
					this.showPopoverInView(this, animated);
				}
				else {

					this.showViewFromLeft(animated);
				}
			}
		},

		showViewFullScreen: function(animated) {

			var master = this.get('splitView').get('master'),
				menuButton = this,
				splitView = this.get('splitView'),
				panel = SC.PanelPane.create({

					isModal: NO,

					_closeButton: undefined,
					closeButton: function() {

						if (this.get('_closeButton') === undefined) {
							this.set('_closeButton', SC.ButtonView.create(SC.AutoResize, {

														panel: panel,
														splitView: splitView,
														layoutBinding: SC.Binding.oneWay('.splitView.fullScreenButtonLayout'),
														title: 'Close',

														action: function() {

															this.get('panel').remove();
															menuButton.set('panel', null);
														}
													}));
						}
						return this.get('_closeButton');
					}.property(),

					remove: function(animated) {

						if (this.get('isAttached') === NO) {
							return;
						}

						if (animated !== undefined && animated === NO) {

							this.set('transitionOut', undefined);
							this.set('transitionOutOptions', undefined);
						}

						this.get('closeButton')._doDetach();
						master.get('topToolbar').removeChild(this.get('closeButton'));
						sc_super();
					}
				});

			master._doDetach();
			master.set('layout', { left: 0, top: 0, right: 0, bottom: 0 });
			master.get('topToolbar').appendChild(panel.get('closeButton'));

			if (animated !== undefined && animated === YES) {

				panel.set('transitionIn', SC.View.SLIDE_IN);
				panel.set('transitionInOptions', {
					direction: 'up',
					duration: this.get('animationDuration'),
					timing: 'ease-in-out'
				});
			}

			panel.set('transitionOut', SC.View.SLIDE_OUT);
			panel.set('transitionOutOptions', {
				direction: 'down',
				duration: this.get('animationDuration'),
				timing: 'ease-in-out'
			});

			panel.replaceContent(master);
			panel.append();

			this.set('panel', panel);
		},

		showViewFromLeft: function(animated) {

			var master = this.get('splitView').get('master'),
				menuButton = this,
				panel = SC.PanelPane.create({

					remove: function(animated) {

						if (this.get('isAttached') === NO) {
							return;
						}

						if (animated !== undefined && animated === NO) {

							this.set('transitionOut', undefined);
							this.set('transitionOutOptions', undefined);
						}
						sc_super();
					},

					modalPaneDidClick: function() {

						this.remove();
						menuButton.set('panel', null);
					}
				});

			master._doDetach();
			master.set('layout', { left: 0, top: 0, right: 0, bottom: 0 });
			panel.adjust({ width: master.get('size')});

			if (animated !== undefined && animated === YES) {

				panel.set('transitionIn', SC.View.SLIDE_IN);
				panel.set('transitionInOptions', {
					direction: 'right',
					duration: this.get('animationDuration'),
					timing: 'ease-in-out'
				});
			}
			
			panel.set('transitionOut', SC.View.SLIDE_OUT);
			panel.set('transitionOutOptions', {
				direction: 'left',
				duration: this.get('animationDuration'),
				timing: 'ease-in-out'
			});

			panel.replaceContent(master);
			panel.append();

			this.set('panel', panel);
		},

		showPopoverInView: function(view, animated) {

			var master = this.get('splitView').get('master'),
				menuButton = this,
				splitView = this.get('splitView'),
				panel = SC.PickerPane.create({

					splitView: splitView,
					preferType: SC.PICKER_POINTER,
					preferMatrix: [3, 3, 3, 3, 3],
					pointerOffset: [15, 15, 15, 15],
					windowPadding: SC.PickerPane.WINDOW_PADDING,
					layoutBinding: SC.Binding.oneWay('.splitView.popoverLayout'),
					contentView: null,

					remove: function(animated) {

						if (this.get('isAttached') === NO) {
							return;
						}

						if (animated !== undefined && animated === NO) {

							this.set('transitionOut', undefined);
							this.set('transitionOutOptions', undefined);
						}
						sc_super();
					},

					modalPaneDidClick: function() {

						sc_super();
						menuButton.set('panel', null);
					}
				});

			master._doDetach();
			master.set('layout', { left: 0, top: 0, right: 0, bottom: 0 });
			panel.replaceContent(master);
			panel.popup(view);

			this.set('panel', panel);
		}
	})
});
