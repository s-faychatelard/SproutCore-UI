// ==========================================================================
// Project:   SplitView - MasterView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals SplitView */

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
SplitView.MasterView = SC.WorkspaceView.extend(
/** @scope SplitView.MasterView.prototype */ {

	title: 'Master',

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

		contentView: SC.ListView.design({

			content: ContentArray.create({ length: 100 })
		})
	})
});
