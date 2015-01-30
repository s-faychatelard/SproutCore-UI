// ==========================================================================
// Project:   NavigationView - DetailView
// Copyright: @2015 Dviance.
// ==========================================================================
/*globals NavigationView */

// This page describes the main user interface for your application.
NavigationView.DetailView = SC.View.extend(
/** @scope NavigationView.DetailView.prototype */ {

	title: 'Detail',
	childViews: ['contentView'],

	topToolbar: SC.ToolbarView.design({

		childViews: ['back', 'title'],
		containerViewBinding: SC.Binding.oneWay('.parentView.contentView'),

		title: SC.LabelView.design(SC.AutoResize, {

			classNames: ['my-title-label'],
			controlSize: SC.LARGE_CONTROL_SIZE,
			layout: { width: 220, height: 24, centerX: 0, centerY: 0 },
			valueBinding: SC.Binding.oneWay('.parentView*containerView.title')
		}),

		back: SC.ButtonView.design(SC.AutoResize, {

			layout: { width: 100, left: 20, height: 24, centerY: 0 },
			title: "Retour",

			action: function() {

				if (navigationView = this.layoutView().get('containerView').get('navigationView')) {

					navigationView.pop();
				}
			}
		})
	}),

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
