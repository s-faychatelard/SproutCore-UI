// ==========================================================================
// Project:   NavigationView - mainPage
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals NavigationView */

sc_require('views/navigation_view');
sc_require('views/master_view');

// This page describes the main user interface for your application.
NavigationView.mainPage = SC.Page.design({

	// The main pane is made visible on screen as soon as your app is loaded.
	// Add childViews to this pane for views to display immediately on page
	// load.
	mainPane: SC.MainPane.design({
		
		childViews: ['navigationView'],

		navigationView: NavigationView.NavigationView.design({

			layout: { top: 0, left: 0, bottom: 0, right: 0 },

			contentView: NavigationView.MasterView
		})
	})
});
