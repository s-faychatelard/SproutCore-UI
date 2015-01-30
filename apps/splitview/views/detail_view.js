// ==========================================================================
// Project:   SplitView - DetailView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals SplitView */

// This page describes the main user interface for your application.
SplitView.DetailView = SC.WorkspaceView.extend(
/** @scope SplitView.DetailView.prototype */ {

	title: 'Detail',

	topToolbar: SC.ToolbarView.extend({

		childViews: ['title'],
		layout: { height: 44 },

		title: SC.LabelView.extend(SC.AutoResize, {

			classNames: ['my-title-label'],
			controlSize: SC.LARGE_CONTROL_SIZE,
			layout: { width: 220, height: 24, centerX: 0, centerY: 0 },
			valueBinding: SC.Binding.oneWay('.parentView.parentView.title')
		})
	}),

	/*bottomToolbar: SC.ToolbarView.extend({

		anchorLocation: SC.ANCHOR_BOTTOM,
		childViews: ['title'],
		layout: { height: 44 },

		title: SC.LabelView.extend(SC.AutoResize, {

			classNames: ['my-title-label'],
			controlSize: SC.LARGE_CONTROL_SIZE,
			layout: { width: 220, height: 24, centerX: 0, centerY: 0 },
			value: 'Footing'
		})
	}),*/

	contentView: SC.ScrollView.design({

		contentView: SC.View.design({

			childViews: ['label'],

			label: SC.LabelView.design(SC.AutoResize, {

				layout: { width: 180, height: 50, centerX: 0, centerY: 0 },
				value: 'Texte'
			})
		})
	})
});
