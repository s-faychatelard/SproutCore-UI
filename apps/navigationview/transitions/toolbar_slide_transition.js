// ==========================================================================
// Project:   SproutCore
// Copyright: @2013 7x7 Software, Inc.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


SC.mixin(SC.View,
	/** @scope SC.View */ {

	/** @class

		@extends SC.ViewTransitionProtocol
		@see SC.View#animate for other timing functions.
		@since Version 1.10
	*/
	TOOLBAR_SLIDE_IN: {

		layoutProperties: ['left', 'right', 'centerX', 'width', 'opacity'],

		/** @private Starts from outside of parent unless inPlace is true. */
		setup: function (view, options, inPlace) {
			var viewFrame = view.get('borderFrame'),
				left;

			if (inPlace) {
				// Move from the current position.
			} else {

				switch (options.direction) {
				case 'left':
					left = viewFrame.width/2;
					break;
				default:
					left = -viewFrame.width/2;
				}
			}

			// Convert to a HW accelerate-able layout.
			view.adjust({ opacity: inPlace ? view.get('layout').opacity || 0 : 0, centerX: null, left: left || viewFrame.x, right: null, width: viewFrame.width });
		},

		/** @private */
		run: function (view, options, finalLayout, finalFrame) {

			view.animate({ left: finalFrame.x, opacity: 1}, {
				delay: options.delay || 0,
				duration: options.duration || 0.4,
				timing: options.timing || 'ease'
			}, function (data) {
				if (!data.isCancelled) {
					this.didTransitionIn();
				}
			});
		}
	},

	/** @class

		@extends SC.ViewTransitionProtocol
		@see SC.View#animate for other timing functions.
		@since Version 1.10
	*/
	TOOLBAR_SLIDE_OUT: {

		layoutProperties: ['left', 'right', 'centerX', 'opacity'],

		/** @private Starts from current position. */
		setup: function (view, options) {
			var viewFrame = view.get('borderFrame'),
				left = viewFrame.x,
				width = viewFrame.width;

			view.adjust({ opacity: view.get('layout').opacity || 1, centerX: null, left: left, right: null, width: width });
		},

		/** @private */
		run: function (view, options, finalLayout, finalFrame) {
			var viewFrame = view.get('borderFrame');

			switch (options.direction) {
			case 'left':

				view.animate({ left: -viewFrame.width/2, opacity: 0}, {
					delay: options.delay || 0,
					duration: options.duration || 0.4,
					timing: options.timing || 'ease'
				}, function (data) {
					if (!data.isCancelled) {
						this.didTransitionOut();
					}
				});
				break;
			default:

				view.animate({ left: viewFrame.width/2, opacity: 0}, {
					delay: options.delay || 0,
					duration: options.duration || 0.4,
					timing: options.timing || 'ease'
				}, function (data) {
					if (!data.isCancelled) {
						this.didTransitionOut();
					}
				});
			}
		}
	}

});
