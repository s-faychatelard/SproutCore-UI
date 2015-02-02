// ==========================================================================
// Project:   NavigationView - NavigationView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals NavigationView */

sc_require('transitions/toolbar_slide_transition');

// This page describes the main user interface for your application.
NavigationView.NavigationView = SC.View.extend(
/** @scope NavigationView.NavigationView.prototype */ {

	toolbarHeight: 32,
	animationDuration: 0.35,
	topToolbar: SC.ToolbarView,
	contentView: SC.View,

	_views: [],
	_activeContentView: undefined,
	_activeToolbarView: undefined,

	backgroundToolbarView: SC.ToolbarView.extend({
		layout: {
			left: 0, right: 0, top: 0, height: 64
		}
	}),

	createChildViews: function() {
		sc_super();

		var contentView = this.contentView = this._activeContentView = this.createChildView(this.get('contentView')),
			topToolbar = this.get('contentView').get('topToolbar'),
			backgroundToolbarView = this.get('backgroundToolbarView');

		backgroundToolbarView = this.createChildView(backgroundToolbarView);
		this.appendChild(backgroundToolbarView);

		if (topToolbar) {
			topToolbar = this.topToolbar = this._activeToolbarView = this.createChildView(topToolbar);
			this.appendChild(topToolbar);
		}

		this.contentViewDidChange();
	},

	_adjust: function(topToolbar, contentView) {

		var contentTop = 0,
			toolbarHeight = this.get('toolbarHeight');

		if (topToolbar) {
			topToolbar.adjust('height', toolbarHeight);
			contentTop += toolbarHeight;
		}

		contentView.adjust('top', contentTop);
	}.observes('toolbarHeight'),

	contentViewDidChange: function() {

		var activeContentView = this.get('_activeContentView'),
			contentView = this.get('contentView'),
			activeToolbarView = this.get('_activeToolbarView'),
			toolbarView = this.get('contentView').get('topToolbar');

		if (!toolbarView || toolbarView.isClass) {

			toolbarView = this.createChildView(toolbarView);
		}

		activeContentView.set('navigationView', null);
		activeToolbarView.set('navigationView', null);
		activeToolbarView.set('containerView', activeContentView);
		contentView.set('navigationView', this);
		toolbarView.set('navigationView', this);
		toolbarView.set('containerView', contentView);

		toolbarView.set('renderDelegateName', null);
		toolbarView.set('backgroundColor', 'transparent');

		activeToolbarView.set('transitionIn', activeContentView.get('transitionIn') ? SC.View.TOOLBAR_SLIDE_IN : undefined);
		activeToolbarView.set('transitionInOptions', activeContentView.get('transitionInOptions'));
		activeToolbarView.set('transitionOut', activeContentView.get('transitionOut') ? SC.View.TOOLBAR_SLIDE_OUT : undefined);
		activeToolbarView.set('transitionOutOptions', activeContentView.get('transitionOutOptions'));

		toolbarView.set('transitionIn', contentView.get('transitionIn') ? SC.View.TOOLBAR_SLIDE_IN : undefined);
		toolbarView.set('transitionInOptions', contentView.get('transitionInOptions'));
		toolbarView.set('transitionOut', contentView.get('transitionOut') ? SC.View.TOOLBAR_SLIDE_OUT : undefined);
		toolbarView.set('transitionOutOptions', contentView.get('transitionOutOptions'));

		this._adjust(toolbarView, contentView);

		this.removeChild(activeContentView);
		this.removeChild(activeToolbarView);
		this.appendChild(contentView);
		this.appendChild(toolbarView);

		this.set('_activeContentView', contentView);
		this.set('_activeToolbarView', toolbarView);
	}.observes('contentView'),

	push: function(view, animated) {

		var activeContentView = this.get('_activeContentView');

		if (!view || view.isClass) {

			view = this.createChildView(view);
		}

		this.setupAnimation(activeContentView, view, animated, YES);
		this.get('_views').push(activeContentView);
		this.set('contentView', view);
	},

	pop: function(animated) {

		var activeContentView = this.get('_activeContentView'),
			views = this.get('_views');

		if (views && views.length > 0) {
		
			var view = views.pop();
			this.setupAnimation(activeContentView, view, animated, NO);
			this.set('contentView', view);
		}
	},

	setupAnimation: function(activeView, nextView, animated, isPush) {

		var activeToolbar = activeView.get('topToolbar'),
			nextToolbar = nextView.get('topToolbar');

		if (animated === YES) {

			activeView.set('transitionIn', undefined);
			activeView.set('transitionInOptions', undefined);
			activeView.set('transitionOut', SC.View.SLIDE_OUT);
			activeView.set('transitionOutOptions', {
				delay: this.get('animationDuration')/4,
				direction: isPush === YES ? 'left' : 'right',
				duration: this.get('animationDuration'),
				timing: 'ease-in-out'
			});

			nextView.set('transitionIn', SC.View.SLIDE_IN);
			nextView.set('transitionInOptions', {
				direction: isPush === YES ? 'left' : 'right',
				duration: this.get('animationDuration'),
				timing: 'ease-in-out'
			});
			nextView.set('transitionOut', undefined);
			nextView.set('transitionOutOptions', undefined);
		}
		else {

			activeView.set('transitionIn', undefined);
			activeView.set('transitionInOptions', undefined);
			activeView.set('transitionOut', undefined);
			activeView.set('transitionOutOptions', undefined);

			nextView.set('transitionIn', undefined);
			nextView.set('transitionInOptions', undefined);
			nextView.set('transitionOut', undefined);
			nextView.set('transitionOutOptions', undefined);
		}
	}
});
