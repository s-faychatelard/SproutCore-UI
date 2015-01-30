// ==========================================================================
// Project:   NavigationView - MasterView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals NavigationView */

sc_require('views/detail_view');

var ContentArray = SC.Object.extend(SC.Array, {

	length: 0,

	objectAt: function(idx) {
		if (idx >= this.get('length')) return undefined;

		var content = this._content, ret ;
		if (!content) content = this._content = [];

		ret = content[idx];
		if (!ret) {
			ret = content[idx] = SC.Object.create({
				title: "ContentItem %@".fmt(idx)
			});
		}

		return ret ;
	}
});

// This page describes the main user interface for your application.
NavigationView.MasterView = SC.View.extend(
/** @scope NavigationView.MasterView.prototype */ {

	title: 'Master',
	childViews: ['contentView'],

	topToolbar: SC.ToolbarView.design({

		childViews: ['title'],
		containerViewBinding: SC.Binding.oneWay('.parentView.contentView'),

		title: SC.LabelView.design(SC.AutoResize, {

			classNames: ['my-title-label'],
			controlSize: SC.LARGE_CONTROL_SIZE,
			layout: { width: 220, height: 24, centerX: 0, centerY: 0 },
			valueBinding: SC.Binding.oneWay('.parentView*containerView.title')
		})
	}),

	contentView: SC.ScrollView.design({

		contentView: SC.ListView.design({

			content: ContentArray.create({ length: 100 }),
			actOnSelect: YES,

			action: function() {

				if (navigationView = this.layoutView().layoutView().layoutView().get('navigationView')) {

					navigationView.push(NavigationView.DetailView);
				}
			}
		})
	})
});
