// ==========================================================================
// Project:   NavigationView - NavigationView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals NavigationView */

// This page describes the main user interface for your application.
NavigationView.NavigationView = SC.View.extend(
/** @scope NavigationView.NavigationView.prototype */ {

	topToolbar: SC.ToolbarView,
	contentView: SC.View,

	transitionSwap: SC.ContainerView.PUSH,

	_views: [],
	_activeContentView: undefined,
	_activeToolbarView: undefined,

	backgroundToolbarView: SC.ToolbarView,

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

	_adjust: function() {
		var contentTop = 0,
			activeContentView = this.get('_activeContentView'),
			topToolbar = this.get('topToolbar'),
			toolbarHeight = topToolbar.get('layout').height;

		if (topToolbar) {
			contentTop += toolbarHeight;
		}

		activeContentView.set('layout', {
			left: 0,
			top: contentTop,
			right: 0,
			bottom: 0
		});

		this.updateLayerIfNeeded();
	},

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
		contentView.set('navigationView', this);
		toolbarView.set('navigationView', this);

		toolbarView.set('renderDelegateName', null);
		toolbarView.set('backgroundColor', 'transparent');

		this.removeChild(activeContentView);
		this.removeChild(activeToolbarView);
		this.appendChild(contentView);
		this.appendChild(toolbarView);

		this.set('_activeContentView', contentView);
		this.set('_activeToolbarView', toolbarView);

		this._adjust();
	}.observes('contentView'),

	push: function(view) {

		SC.debug('push');
		var activeContentView = this.get('_activeContentView');

		if (!view || view.isClass) {

			view = this.createChildView(view);
		}

		this.get('_views').push(activeContentView);
		this.set('contentView', view);
	},

	pop: function() {

		SC.debug('pop');
		var views = this.get('_views');

		if (views && views.length > 0) {
		
			var view = views.pop();
			this.set('contentView', view);
		}
	}
});
