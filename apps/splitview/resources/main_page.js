// ==========================================================================
// Project:   SplitView - mainPage
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals SplitView */

sc_require('views/split_view');
sc_require('views/master_view');
sc_require('views/detail_view');

// This page describes the main user interface for your application.
SplitView.mainPage = SC.Page.design({

	// The main pane is made visible on screen as soon as your app is loaded.
	// Add childViews to this pane for views to display immediately on page
	// load.
	mainPane: SC.MainPane.design({
		
		childViews: ['splitView'],

		splitView: SplitView.SplitView.design({

			layout: { top: 0, left: 0, bottom: 0, right: 0 },

			master: SplitView.MasterView.design(SC.SplitChild, {

				size: 400
			}),

			detail: SplitView.DetailView.design(SC.SplitChild, {

				autoResizeStyle: SC.RESIZE_AUTOMATIC
			}),
		})
	})

});
