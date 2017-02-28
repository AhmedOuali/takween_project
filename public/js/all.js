/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.3
 *
 */
(function ($) {

  $.fn.extend({
    slimScroll: function (options) {

      var defaults = {
        // width in pixels of the visible scroll area
        width: 'auto',
        // height in pixels of the visible scroll area
        height: '250px',
        // width in pixels of the scrollbar and rail
        size: '7px',
        // scrollbar color, accepts any hex/color value
        color: '#000',
        // scrollbar position - left/right
        position: 'right',
        // distance in pixels between the side edge and the scrollbar
        distance: '1px',
        // default scroll position on load - top / bottom / $('selector')
        start: 'top',
        // sets scrollbar opacity
        opacity: .4,
        // enables always-on mode for the scrollbar
        alwaysVisible: false,
        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut: false,
        // sets visibility of the rail
        railVisible: false,
        // sets rail color
        railColor: '#333',
        // sets rail opacity
        railOpacity: .2,
        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable: true,
        // defautlt CSS class of the slimscroll rail
        railClass: 'slimScrollRail',
        // defautlt CSS class of the slimscroll bar
        barClass: 'slimScrollBar',
        // defautlt CSS class of the slimscroll wrapper
        wrapperClass: 'slimScrollDiv',
        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll: false,
        // scroll amount applied to each mouse wheel step
        wheelStep: 20,
        // scroll amount applied when user is using gestures
        touchScrollStep: 200,
        // sets border radius
        borderRadius: '7px',
        // sets border radius of the rail
        railBorderRadius: '7px'
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function () {

        var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
                barHeight, percentScroll, lastScroll,
                divS = '<div></div>',
                minBarHeight = 30,
                releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        // ensure we are not binding it again
        if (me.parent().hasClass(o.wrapperClass))
        {
          // start from last bar position
          var offset = me.scrollTop();

          // find bar and rail
          bar = me.parent().find('.' + o.barClass);
          rail = me.parent().find('.' + o.railClass);

          getBarHeight();

          // check if we should scroll existing instance
          if ($.isPlainObject(options))
          {
            // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
            if ('height' in options && options.height == 'auto') {
              me.parent().css('height', 'auto');
              me.css('height', 'auto');
              var height = me.parent().parent().height();
              me.parent().css('height', height);
              me.css('height', height);
            }

            if ('scrollTo' in options)
            {
              // jump to a static point
              offset = parseInt(o.scrollTo);
            }
            else if ('scrollBy' in options)
            {
              // jump by value pixels
              offset += parseInt(o.scrollBy);
            }
            else if ('destroy' in options)
            {
              // remove slimscroll elements
              bar.remove();
              rail.remove();
              me.unwrap();
              return;
            }

            // scroll content by the given offset
            scrollContent(offset, false, true);
          }

          return;
        }
        else if ($.isPlainObject(options))
        {
          if ('destroy' in options)
          {
            return;
          }
        }

        // optionally set height to the parent's height
        o.height = (o.height == 'auto') ? me.parent().height() : o.height;

        // wrap content
        var wrapper = $(divS)
                .addClass(o.wrapperClass)
                .css({
                  position: 'relative',
                  overflow: 'hidden',
                  width: o.width,
                  height: o.height
                });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height,
          //Fix for IE10
          "-ms-touch-action": "none"
        });

        // create scrollbar rail
        var rail = $(divS)
                .addClass(o.railClass)
                .css({
                  width: o.size,
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
                  'border-radius': o.railBorderRadius,
                  background: o.railColor,
                  opacity: o.railOpacity,
                  zIndex: 90
                });

        // create scrollbar
        var bar = $(divS)
                .addClass(o.barClass)
                .css({
                  background: o.color,
                  width: o.size,
                  position: 'absolute',
                  top: 0,
                  opacity: o.opacity,
                  display: o.alwaysVisible ? 'block' : 'none',
                  'border-radius': o.borderRadius,
                  BorderRadius: o.borderRadius,
                  MozBorderRadius: o.borderRadius,
                  WebkitBorderRadius: o.borderRadius,
                  zIndex: 99
                });

        // set position
        var posCss = (o.position == 'right') ? {right: o.distance} : {left: o.distance};
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);

        // make it draggable and no longer dependent on the jqueryUI
        if (o.railDraggable) {
          bar.bind("mousedown", function (e) {
            var $doc = $(document);
            isDragg = true;
            t = parseFloat(bar.css('top'));
            pageY = e.pageY;

            $doc.bind("mousemove.slimscroll", function (e) {
              currTop = t + e.pageY - pageY;
              bar.css('top', currTop);
              scrollContent(0, bar.position().top, false);// scroll content
            });

            $doc.bind("mouseup.slimscroll", function (e) {
              isDragg = false;
              hideBar();
              $doc.unbind('.slimscroll');
            });
            return false;
          }).bind("selectstart.slimscroll", function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
          });
        }

        // on rail over
        rail.hover(function () {
          showBar();
        }, function () {
          hideBar();
        });

        // on bar over
        bar.hover(function () {
          isOverBar = true;
        }, function () {
          isOverBar = false;
        });

        // show on parent mouseover
        me.hover(function () {
          isOverPanel = true;
          showBar();
          hideBar();
        }, function () {
          isOverPanel = false;
          hideBar();
        });

        if (window.navigator.msPointerEnabled) {          
          // support for mobile
          me.bind('MSPointerDown', function (e, b) {
            if (e.originalEvent.targetTouches.length)
            {
              // record where touch started
              touchDif = e.originalEvent.targetTouches[0].pageY;
            }
          });

          me.bind('MSPointerMove', function (e) {
            // prevent scrolling the page if necessary
            e.originalEvent.preventDefault();
            if (e.originalEvent.targetTouches.length)
            {
              // see how far user swiped
              var diff = (touchDif - e.originalEvent.targetTouches[0].pageY) / o.touchScrollStep;
              // scroll content
              scrollContent(diff, true);
              touchDif = e.originalEvent.targetTouches[0].pageY;
              
            }
          });
        } else {
          // support for mobile
          me.bind('touchstart', function (e, b) {
            if (e.originalEvent.touches.length)
            {
              // record where touch started
              touchDif = e.originalEvent.touches[0].pageY;
            }
          });

          me.bind('touchmove', function (e) {
            // prevent scrolling the page if necessary
            if (!releaseScroll)
            {
              e.originalEvent.preventDefault();
            }
            if (e.originalEvent.touches.length)
            {
              // see how far user swiped
              var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
              // scroll content
              scrollContent(diff, true);
              touchDif = e.originalEvent.touches[0].pageY;
            }
          });
        }

        // set up initial height
        getBarHeight();

        // check start position
        if (o.start === 'bottom')
        {
          // scroll content to bottom
          bar.css({top: me.outerHeight() - bar.outerHeight()});
          scrollContent(0, true);
        }
        else if (o.start !== 'top')
        {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) {
            bar.hide();
          }
        }

        // attach scroll events
        attachWheel();

        function _onWheel(e)
        {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) {
            return;
          }

          var e = e || window.event;

          var delta = 0;
          if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
          }
          if (e.detail) {
            delta = e.detail / 3;
          }

          var target = e.target || e.srcTarget || e.srcElement;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) {
            e.preventDefault();
          }
          if (!releaseScroll) {
            e.returnValue = false;
          }
        }

        function scrollContent(y, isWheel, isJump)
        {
          releaseScroll = false;
          var delta = y;
          var maxTop = me.outerHeight() - bar.outerHeight();

          if (isWheel)
          {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
            bar.css({top: delta + 'px'});
          }

          // calculate actual scroll amount
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump)
          {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({top: offsetTop + 'px'});
          }

          // scroll content
          me.scrollTop(delta);

          // fire scrolling event
          me.trigger('slimscrolling', ~~delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        function attachWheel()
        {
          if (window.addEventListener)
          {
            this.addEventListener('DOMMouseScroll', _onWheel, false);
            this.addEventListener('mousewheel', _onWheel, false);
          }
          else
          {
            document.attachEvent("onmousewheel", _onWheel)
          }
        }

        function getBarHeight()
        {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
          bar.css({height: barHeight + 'px'});

          // hide scrollbar if content is not long enough
          var display = barHeight == me.outerHeight() ? 'none' : 'block';
          bar.css({display: display});
        }

        function showBar()
        {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
          if (percentScroll == ~~percentScroll)
          {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScroll != percentScroll)
            {
              var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
              me.trigger('slimscroll', msg);
            }
          }
          else
          {
            releaseScroll = false;
          }
          lastScroll = percentScroll;

          // show only when required
          if (barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true, true).fadeIn('fast');
          if (o.railVisible) {
            rail.stop(true, true).fadeIn('fast');
          }
        }

        function hideBar()
        {
          // only hide when options allow it
          if (!o.alwaysVisible)
          {
            queueHide = setTimeout(function () {
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)
              {
                bar.fadeOut('slow');
                rail.fadeOut('slow');
              }
            }, 1000);
          }
        }

      });

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });

})(jQuery);

;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

/* global $ jQuery FastClick AdminLTEOptions */
/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,
  //BoxRefresh Plugin
  enableBoxRefresh: true,
  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
            $.AdminLTE.options,
            AdminLTEOptions);
  }

  //Easy access to options
  var o = $.AdminLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  $.AdminLTE.tree('.sidebar');

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector
    });
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  //Activate fast click
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  //Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      //Get window height and the wrapper height
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height();
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimscroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
  $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.AdminLTE.options.screenSizes;

      //Enable sidebar toggle
      $(toggleBtn).on('click', function (e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      //Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
              || ($('body').hasClass('fixed')
                      && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function () {
      var _this = this;
      var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
                && $("body").hasClass('sidebar-collapse')
                && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
                && $('body').hasClass('sidebar-expanded-on-hover')
                && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
  $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(document).on('click', menu + ' li a', function (e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent("li").removeClass("active");
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        var parent = $this.parents('ul').first();
        //Close all open menus within the parent
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        var parent_li = $this.parent("li");

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
          _this.layout.fix();
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
  $.AdminLTE.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.AdminLTE.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
                && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        $(window).resize(function () {
          _this._fix(sidebar);
        });
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
                .removeClass(_this.icons.collapse)
                .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
                .removeClass(_this.icons.open)
                .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // Render options
    var settings = $.extend({
      //Refresh button selector
      trigger: ".refresh-btn",
      //File source to be loaded (e.g: ajax/src.php)
      source: "",
      //Callbacks
      onLoadStart: function (box) {
        return box;
      }, //Right after the button has been clicked
      onLoadDone: function (box) {
        return box;
      } //When the source has been loaded

    }, options);

    //The overlay
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      //if a source is specified
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      //the box
      var box = $(this);
      //the button
      var rBtn = box.find(settings.trigger).first();

      //On trigger click
      rBtn.on('click', function (e) {
        e.preventDefault();
        //Add loading overlay
        start(box);

        //Perform ajax call
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      //Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      //Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

/*
 * EXPLICIT BOX ACTIVATION
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 */
(function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function ($) {

  'use strict';

  $.fn.todolist = function (options) {
    // Render options
    var settings = $.extend({
      //When the user checks the input
      onCheck: function (ele) {
        return ele;
      },
      //When the user unchecks the input
      onUncheck: function (ele) {
        return ele;
      }
    }, options);

    return this.each(function () {

      if (typeof $.fn.iCheck != 'undefined') {
        $('input', this).on('ifChecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          if ($('input', ele).is(":checked")) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));
/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
(function ($, AdminLTE) {

  "use strict";

  /**
   * List of all the available skins
   *
   * @type Array
   */
  var my_skins = [
    "skin-blue",
    "skin-black",
    "skin-red",
    "skin-yellow",
    "skin-purple",
    "skin-green",
    "skin-blue-light",
    "skin-black-light",
    "skin-red-light",
    "skin-yellow-light",
    "skin-purple-light",
    "skin-green-light"
  ];

  //Create the new tab
  var tab_pane = $("<div />", {
    "id": "control-sidebar-theme-demo-options-tab",
    "class": "tab-pane active"
  });

  //Create the tab button
  var tab_button = $("<li />", {"class": "active"})
          .html("<a href='#control-sidebar-theme-demo-options-tab' data-toggle='tab'>"
                  + "<i class='fa fa-wrench'></i>"
                  + "</a>");

  //Add the tab button to the right sidebar tabs
  $("[href='#control-sidebar-home-tab']")
          .parent()
          .before(tab_button);

  //Create the menu
  var demo_settings = $("<div />");

  //Layout options
  demo_settings.append(
          "<h4 class='control-sidebar-heading'>"
          + "Layout Options"
          + "</h4>"
          //Fixed layout
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-layout='fixed' class='pull-right'/> "
          + "Fixed layout"
          + "</label>"
          + "<p>Activate the fixed layout. You can't use fixed and boxed layouts together</p>"
          + "</div>"
          //Boxed layout
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
          + "Boxed Layout"
          + "</label>"
          + "<p>Activate the boxed layout</p>"
          + "</div>"
          //Sidebar Toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
          + "Toggle Sidebar"
          + "</label>"
          + "<p>Toggle the left sidebar's state (open or collapse)</p>"
          + "</div>"
          //Sidebar mini expand on hover toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
          + "Sidebar Expand on Hover"
          + "</label>"
          + "<p>Let the sidebar mini expand on hover</p>"
          + "</div>"
          //Control Sidebar Toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
          + "Toggle Right Sidebar Slide"
          + "</label>"
          + "<p>Toggle between slide over content and push content effects</p>"
          + "</div>"
          //Control Sidebar Skin Toggle
          + "<div class='form-group'>"
          + "<label class='control-sidebar-subheading'>"
          + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
          + "Toggle Right Sidebar Skin"
          + "</label>"
          + "<p>Toggle between dark and light skins for the right sidebar</p>"
          + "</div>"
          );
  var skins_list = $("<ul />", {"class": 'list-unstyled clearfix'});

  //Dark sidebar skins
  var skin_blue =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Blue</p>");
  skins_list.append(skin_blue);
  var skin_black =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Black</p>");
  skins_list.append(skin_black);
  var skin_purple =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Purple</p>");
  skins_list.append(skin_purple);
  var skin_green =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Green</p>");
  skins_list.append(skin_green);
  var skin_red =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Red</p>");
  skins_list.append(skin_red);
  var skin_yellow =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin'>Yellow</p>");
  skins_list.append(skin_yellow);

  //Light sidebar skins
  var skin_blue_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Blue Light</p>");
  skins_list.append(skin_blue_light);
  var skin_black_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Black Light</p>");
  skins_list.append(skin_black_light);
  var skin_purple_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Purple Light</p>");
  skins_list.append(skin_purple_light);
  var skin_green_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Green Light</p>");
  skins_list.append(skin_green_light);
  var skin_red_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px'>Red Light</p>");
  skins_list.append(skin_red_light);
  var skin_yellow_light =
          $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                  + "</a>"
                  + "<p class='text-center no-margin' style='font-size: 12px;'>Yellow Light</p>");
  skins_list.append(skin_yellow_light);

  demo_settings.append("<h4 class='control-sidebar-heading'>Skins</h4>");
  demo_settings.append(skins_list);

  tab_pane.append(demo_settings);
  $("#control-sidebar-home-tab").after(tab_pane);

  setup();

  /**
   * Toggles layout classes
   *
   * @param String cls the layout class to toggle
   * @returns void
   */
  function change_layout(cls) {
    $("body").toggleClass(cls);
    AdminLTE.layout.fixSidebar();
    //Fix the problem with right sidebar and layout boxed
    if (cls == "layout-boxed")
      AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    if ($('body').hasClass('fixed') && cls == 'fixed') {
      AdminLTE.pushMenu.expandOnHover();
      AdminLTE.layout.activate();
    }
    AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    AdminLTE.controlSidebar._fix($(".control-sidebar"));
  }

  /**
   * Replaces the old skin with the new skin
   * @param String cls the new skin class
   * @returns Boolean false to prevent link's default action
   */
  function change_skin(cls) {
    $.each(my_skins, function (i) {
      $("body").removeClass(my_skins[i]);
    });

    $("body").addClass(cls);
    store('skin', cls);
    return false;
  }

  /**
   * Store a new settings in the browser
   *
   * @param String name Name of the setting
   * @param String val Value of the setting
   * @returns void
   */
  function store(name, val) {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(name, val);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * Get a prestored setting
   *
   * @param String name Name of of the setting
   * @returns String The value of the setting | null
   */
  function get(name) {
    if (typeof (Storage) !== "undefined") {
      return localStorage.getItem(name);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * Retrieve default settings and apply them to the template
   *
   * @returns void
   */
  function setup() {
    var tmp = get('skin');
    if (tmp && $.inArray(tmp, my_skins))
      change_skin(tmp);

    //Add the change skin listener
    $("[data-skin]").on('click', function (e) {
      e.preventDefault();
      change_skin($(this).data('skin'));
    });

    //Add the layout manager
    $("[data-layout]").on('click', function () {
      change_layout($(this).data('layout'));
    });

    $("[data-controlsidebar]").on('click', function () {
      change_layout($(this).data('controlsidebar'));
      var slide = !AdminLTE.options.controlSidebarOptions.slide;
      AdminLTE.options.controlSidebarOptions.slide = slide;
      if (!slide)
        $('.control-sidebar').removeClass('control-sidebar-open');
    });

    $("[data-sidebarskin='toggle']").on('click', function () {
      var sidebar = $(".control-sidebar");
      if (sidebar.hasClass("control-sidebar-dark")) {
        sidebar.removeClass("control-sidebar-dark")
        sidebar.addClass("control-sidebar-light")
      } else {
        sidebar.removeClass("control-sidebar-light")
        sidebar.addClass("control-sidebar-dark")
      }
    });

    $("[data-enable='expandOnHover']").on('click', function () {
      $(this).attr('disabled', true);
      AdminLTE.pushMenu.expandOnHover();
      if (!$('body').hasClass('sidebar-collapse'))
        $("[data-layout='sidebar-collapse']").click();
    });

    // Reset options
    if ($('body').hasClass('fixed')) {
      $("[data-layout='fixed']").attr('checked', 'checked');
    }
    if ($('body').hasClass('layout-boxed')) {
      $("[data-layout='layout-boxed']").attr('checked', 'checked');
    }
    if ($('body').hasClass('sidebar-collapse')) {
      $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
    }

  }
})(jQuery, $.AdminLTE);

/*! 
 * jQuery Bootgrid v1.3.1 - 09/11/2015
 * Copyright (c) 2014-2015 Rafael Staib (http://www.jquery-bootgrid.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */
;(function ($, window, undefined)
{
    /*jshint validthis: true */
    "use strict";

    // GRID INTERNAL FIELDS
    // ====================

    var namespace = ".rs.jquery.bootgrid";

    // GRID INTERNAL FUNCTIONS
    // =====================

    function appendRow(row)
    {
        var that = this;

        function exists(item)
        {
            return that.identifier && item[that.identifier] === row[that.identifier];
        }

        if (!this.rows.contains(exists))
        {
            this.rows.push(row);
            return true;
        }

        return false;
    }

    function findFooterAndHeaderItems(selector)
    {
        var footer = (this.footer) ? this.footer.find(selector) : $(),
            header = (this.header) ? this.header.find(selector) : $();
        return $.merge(footer, header);
    }

    function getParams(context)
    {
        return (context) ? $.extend({}, this.cachedParams, { ctx: context }) :
            this.cachedParams;
    }

    function getRequest()
    {
        var request = {
                current: this.current,
                rowCount: this.rowCount,
                sort: this.sortDictionary,
                searchPhrase: this.searchPhrase
            },
            post = this.options.post;

        post = ($.isFunction(post)) ? post() : post;
        return this.options.requestHandler($.extend(true, request, post));
    }

    function getCssSelector(css)
    {
        return "." + $.trim(css).replace(/\s+/gm, ".");
    }

    function getUrl()
    {
        var url = this.options.url;
        return ($.isFunction(url)) ? url() : url;
    }

    function init()
    {
        this.element.trigger("initialize" + namespace);

        loadColumns.call(this); // Loads columns from HTML thead tag
        this.selection = this.options.selection && this.identifier != null;
        loadRows.call(this); // Loads rows from HTML tbody tag if ajax is false
        prepareTable.call(this);
        renderTableHeader.call(this);
        renderSearchField.call(this);
        renderActions.call(this);
        loadData.call(this);

        this.element.trigger("initialized" + namespace);
    }

    function highlightAppendedRows(rows)
    {
        if (this.options.highlightRows)
        {
            // todo: implement
        }
    }

    function isVisible(column)
    {
        return column.visible;
    }

    function loadColumns()
    {
        var that = this,
            firstHeadRow = this.element.find("thead > tr").first(),
            sorted = false;

        /*jshint -W018*/
        firstHeadRow.children().each(function ()
        {
            var $this = $(this),
                data = $this.data(),
                column = {
                    id: data.columnId,
                    identifier: that.identifier == null && data.identifier || false,
                    converter: that.options.converters[data.converter || data.type] || that.options.converters["string"],
                    text: $this.text(),
                    align: data.align || "left",
                    headerAlign: data.headerAlign || "left",
                    cssClass: data.cssClass || "",
                    headerCssClass: data.headerCssClass || "",
                    formatter: that.options.formatters[data.formatter] || null,
                    order: (!sorted && (data.order === "asc" || data.order === "desc")) ? data.order : null,
                    searchable: !(data.searchable === false), // default: true
                    sortable: !(data.sortable === false), // default: true
                    visible: !(data.visible === false), // default: true
                    visibleInSelection: !(data.visibleInSelection === false), // default: true
                    width: ($.isNumeric(data.width)) ? data.width + "px" : 
                        (typeof(data.width) === "string") ? data.width : null
                };
            that.columns.push(column);
            if (column.order != null)
            {
                that.sortDictionary[column.id] = column.order;
            }

            // Prevents multiple identifiers
            if (column.identifier)
            {
                that.identifier = column.id;
                that.converter = column.converter;
            }

            // ensures that only the first order will be applied in case of multi sorting is disabled
            if (!that.options.multiSort && column.order !== null)
            {
                sorted = true;
            }
        });
        /*jshint +W018*/
    }

    /*
    response = {
        current: 1,
        rowCount: 10,
        rows: [{}, {}],
        sort: [{ "columnId": "asc" }],
        total: 101
    }
    */

    function loadData()
    {
        var that = this;

        this.element._bgBusyAria(true).trigger("load" + namespace);
        showLoading.call(this);

        function containsPhrase(row)
        {
            var column,
                searchPattern = new RegExp(that.searchPhrase, (that.options.caseSensitive) ? "g" : "gi");

            for (var i = 0; i < that.columns.length; i++)
            {
                column = that.columns[i];
                if (column.searchable && column.visible &&
                    column.converter.to(row[column.id]).search(searchPattern) > -1)
                {
                    return true;
                }
            }

            return false;
        }

        function update(rows, total)
        {
            that.currentRows = rows;
            setTotals.call(that, total);

            if (!that.options.keepSelection)
            {
                that.selectedRows = [];
            }

            renderRows.call(that, rows);
            renderInfos.call(that);
            renderPagination.call(that);

            that.element._bgBusyAria(false).trigger("loaded" + namespace);
        }

        if (this.options.ajax)
        {
            var request = getRequest.call(this),
                url = getUrl.call(this);

            if (url == null || typeof url !== "string" || url.length === 0)
            {
                throw new Error("Url setting must be a none empty string or a function that returns one.");
            }

            // aborts the previous ajax request if not already finished or failed
            if (this.xqr)
            {
                this.xqr.abort();
            }

            var settings = {
                url: url,
                data: request,
                success: function(response)
                {
                    that.xqr = null;

                    if (typeof (response) === "string")
                    {
                        response = $.parseJSON(response);
                    }

                    response = that.options.responseHandler(response);

                    that.current = response.current;
                    update(response.rows, response.total);
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    that.xqr = null;

                    if (textStatus !== "abort")
                    {
                        renderNoResultsRow.call(that); // overrides loading mask
                        that.element._bgBusyAria(false).trigger("loaded" + namespace);
                    }
                }
            };
            settings = $.extend(this.options.ajaxSettings, settings);

            this.xqr = $.ajax(settings);
        }
        else
        {
            var rows = (this.searchPhrase.length > 0) ? this.rows.where(containsPhrase) : this.rows,
                total = rows.length;
            if (this.rowCount !== -1)
            {
                rows = rows.page(this.current, this.rowCount);
            }

            // todo: improve the following comment
            // setTimeout decouples the initialization so that adding event handlers happens before
            window.setTimeout(function () { update(rows, total); }, 10);
        }
    }

    function loadRows()
    {
        if (!this.options.ajax)
        {
            var that = this,
                rows = this.element.find("tbody > tr");

            rows.each(function ()
            {
                var $this = $(this),
                    cells = $this.children("td"),
                    row = {};

                $.each(that.columns, function (i, column)
                {
                    row[column.id] = column.converter.from(cells.eq(i).text());
                });

                appendRow.call(that, row);
            });

            setTotals.call(this, this.rows.length);
            sortRows.call(this);
        }
    }

    function setTotals(total)
    {
        this.total = total;
        this.totalPages = (this.rowCount === -1) ? 1 :
            Math.ceil(this.total / this.rowCount);
    }

    function prepareTable()
    {
        var tpl = this.options.templates,
            wrapper = (this.element.parent().hasClass(this.options.css.responsiveTable)) ?
                this.element.parent() : this.element;

        this.element.addClass(this.options.css.table);

        // checks whether there is an tbody element; otherwise creates one
        if (this.element.children("tbody").length === 0)
        {
            this.element.append(tpl.body);
        }

        if (this.options.navigation & 1)
        {
            this.header = $(tpl.header.resolve(getParams.call(this, { id: this.element._bgId() + "-header" })));
            wrapper.before(this.header);
        }

        if (this.options.navigation & 2)
        {
            this.footer = $(tpl.footer.resolve(getParams.call(this, { id: this.element._bgId() + "-footer" })));
            wrapper.after(this.footer);
        }
    }

    function renderActions()
    {
        if (this.options.navigation !== 0)
        {
            var css = this.options.css,
                selector = getCssSelector(css.actions),
                actionItems = findFooterAndHeaderItems.call(this, selector);

            if (actionItems.length > 0)
            {
                var that = this,
                    tpl = this.options.templates,
                    actions = $(tpl.actions.resolve(getParams.call(this)));

                // Refresh Button
                if (this.options.ajax)
                {
                    var refreshIcon = tpl.icon.resolve(getParams.call(this, { iconCss: css.iconRefresh })),
                        refresh = $(tpl.actionButton.resolve(getParams.call(this,
                        { content: refreshIcon, text: this.options.labels.refresh })))
                            .on("click" + namespace, function (e)
                            {
                                // todo: prevent multiple fast clicks (fast click detection)
                                e.stopPropagation();
                                that.current = 1;
                                loadData.call(that);
                            });
                    actions.append(refresh);
                }

                // Row count selection
                renderRowCountSelection.call(this, actions);

                // Column selection
                renderColumnSelection.call(this, actions);

                replacePlaceHolder.call(this, actionItems, actions);
            }
        }
    }

    function renderColumnSelection(actions)
    {
        if (this.options.columnSelection && this.columns.length > 1)
        {
            var that = this,
                css = this.options.css,
                tpl = this.options.templates,
                icon = tpl.icon.resolve(getParams.call(this, { iconCss: css.iconColumns })),
                dropDown = $(tpl.actionDropDown.resolve(getParams.call(this, { content: icon }))),
                selector = getCssSelector(css.dropDownItem),
                checkboxSelector = getCssSelector(css.dropDownItemCheckbox),
                itemsSelector = getCssSelector(css.dropDownMenuItems);

            $.each(this.columns, function (i, column)
            {
                if (column.visibleInSelection)
                {
                    var item = $(tpl.actionDropDownCheckboxItem.resolve(getParams.call(that,
                        { name: column.id, label: column.text, checked: column.visible })))
                            .on("click" + namespace, selector, function (e)
                            {
                                e.stopPropagation();
        
                                var $this = $(this),
                                    checkbox = $this.find(checkboxSelector);
                                if (!checkbox.prop("disabled"))
                                {
                                    column.visible = checkbox.prop("checked");
                                    var enable = that.columns.where(isVisible).length > 1;
                                    $this.parents(itemsSelector).find(selector + ":has(" + checkboxSelector + ":checked)")
                                        ._bgEnableAria(enable).find(checkboxSelector)._bgEnableField(enable);
        
                                    that.element.find("tbody").empty(); // Fixes an column visualization bug
                                    renderTableHeader.call(that);
                                    loadData.call(that);
                                }
                            });
                    dropDown.find(getCssSelector(css.dropDownMenuItems)).append(item);
                }
            });
            actions.append(dropDown);
        }
    }

    function renderInfos()
    {
        if (this.options.navigation !== 0)
        {
            var selector = getCssSelector(this.options.css.infos),
                infoItems = findFooterAndHeaderItems.call(this, selector);

            if (infoItems.length > 0)
            {
                var end = (this.current * this.rowCount),
                    infos = $(this.options.templates.infos.resolve(getParams.call(this, {
                        end: (this.total === 0 || end === -1 || end > this.total) ? this.total : end,
                        start: (this.total === 0) ? 0 : (end - this.rowCount + 1),
                        total: this.total
                    })));

                replacePlaceHolder.call(this, infoItems, infos);
            }
        }
    }

    function renderNoResultsRow()
    {
        var tbody = this.element.children("tbody").first(),
            tpl = this.options.templates,
            count = this.columns.where(isVisible).length;

        if (this.selection)
        {
            count = count + 1;
        }
        tbody.html(tpl.noResults.resolve(getParams.call(this, { columns: count })));
    }

    function renderPagination()
    {
        if (this.options.navigation !== 0)
        {
            var selector = getCssSelector(this.options.css.pagination),
                paginationItems = findFooterAndHeaderItems.call(this, selector)._bgShowAria(this.rowCount !== -1);

            if (this.rowCount !== -1 && paginationItems.length > 0)
            {
                var tpl = this.options.templates,
                    current = this.current,
                    totalPages = this.totalPages,
                    pagination = $(tpl.pagination.resolve(getParams.call(this))),
                    offsetRight = totalPages - current,
                    offsetLeft = (this.options.padding - current) * -1,
                    startWith = ((offsetRight >= this.options.padding) ?
                        Math.max(offsetLeft, 1) :
                        Math.max((offsetLeft - this.options.padding + offsetRight), 1)),
                    maxCount = this.options.padding * 2 + 1,
                    count = (totalPages >= maxCount) ? maxCount : totalPages;

                renderPaginationItem.call(this, pagination, "first", "&laquo;", "first")
                    ._bgEnableAria(current > 1);
                renderPaginationItem.call(this, pagination, "prev", "&lt;", "prev")
                    ._bgEnableAria(current > 1);

                for (var i = 0; i < count; i++)
                {
                    var pos = i + startWith;
                    renderPaginationItem.call(this, pagination, pos, pos, "page-" + pos)
                        ._bgEnableAria()._bgSelectAria(pos === current);
                }

                if (count === 0)
                {
                    renderPaginationItem.call(this, pagination, 1, 1, "page-" + 1)
                        ._bgEnableAria(false)._bgSelectAria();
                }

                renderPaginationItem.call(this, pagination, "next", "&gt;", "next")
                    ._bgEnableAria(totalPages > current);
                renderPaginationItem.call(this, pagination, "last", "&raquo;", "last")
                    ._bgEnableAria(totalPages > current);

                replacePlaceHolder.call(this, paginationItems, pagination);
            }
        }
    }

    function renderPaginationItem(list, page, text, markerCss)
    {
        var that = this,
            tpl = this.options.templates,
            css = this.options.css,
            values = getParams.call(this, { css: markerCss, text: text, page: page }),
            item = $(tpl.paginationItem.resolve(values))
                .on("click" + namespace, getCssSelector(css.paginationButton), function (e)
                {
                    e.stopPropagation();
                    e.preventDefault();

                    var $this = $(this),
                        parent = $this.parent();
                    if (!parent.hasClass("active") && !parent.hasClass("disabled"))
                    {
                        var commandList = {
                            first: 1,
                            prev: that.current - 1,
                            next: that.current + 1,
                            last: that.totalPages
                        };
                        var command = $this.data("page");
                        that.current = commandList[command] || command;
                        loadData.call(that);
                    }
                    $this.trigger("blur");
                });

        list.append(item);
        return item;
    }

    function renderRowCountSelection(actions)
    {
        var that = this,
            rowCountList = this.options.rowCount;

        function getText(value)
        {
            return (value === -1) ? that.options.labels.all : value;
        }

        if ($.isArray(rowCountList))
        {
            var css = this.options.css,
                tpl = this.options.templates,
                dropDown = $(tpl.actionDropDown.resolve(getParams.call(this, { content: getText(this.rowCount) }))),
                menuSelector = getCssSelector(css.dropDownMenu),
                menuTextSelector = getCssSelector(css.dropDownMenuText),
                menuItemsSelector = getCssSelector(css.dropDownMenuItems),
                menuItemSelector = getCssSelector(css.dropDownItemButton);

            $.each(rowCountList, function (index, value)
            {
                var item = $(tpl.actionDropDownItem.resolve(getParams.call(that,
                    { text: getText(value), action: value })))
                        ._bgSelectAria(value === that.rowCount)
                        .on("click" + namespace, menuItemSelector, function (e)
                        {
                            e.preventDefault();

                            var $this = $(this),
                                newRowCount = $this.data("action");
                            if (newRowCount !== that.rowCount)
                            {
                                // todo: sophisticated solution needed for calculating which page is selected
                                that.current = 1; // that.rowCount === -1 ---> All
                                that.rowCount = newRowCount;
                                $this.parents(menuItemsSelector).children().each(function ()
                                {
                                    var $item = $(this),
                                        currentRowCount = $item.find(menuItemSelector).data("action");
                                    $item._bgSelectAria(currentRowCount === newRowCount);
                                });
                                $this.parents(menuSelector).find(menuTextSelector).text(getText(newRowCount));
                                loadData.call(that);
                            }
                        });
                dropDown.find(menuItemsSelector).append(item);
            });
            actions.append(dropDown);
        }
    }

    function renderRows(rows)
    {
        if (rows.length > 0)
        {
            var that = this,
                css = this.options.css,
                tpl = this.options.templates,
                tbody = this.element.children("tbody").first(),
                allRowsSelected = true,
                html = "";

            $.each(rows, function (index, row)
            {
                var cells = "",
                    rowAttr = " data-row-id=\"" + ((that.identifier == null) ? index : row[that.identifier]) + "\"",
                    rowCss = "";

                if (that.selection)
                {
                    var selected = ($.inArray(row[that.identifier], that.selectedRows) !== -1),
                        selectBox = tpl.select.resolve(getParams.call(that,
                            { type: "checkbox", value: row[that.identifier], checked: selected }));
                    cells += tpl.cell.resolve(getParams.call(that, { content: selectBox, css: css.selectCell }));
                    allRowsSelected = (allRowsSelected && selected);
                    if (selected)
                    {
                        rowCss += css.selected;
                        rowAttr += " aria-selected=\"true\"";
                    }
                }

                var status = row.status != null && that.options.statusMapping[row.status];
                if (status)
                {
                    rowCss += status;
                }

                $.each(that.columns, function (j, column)
                {
                    if (column.visible)
                    {
                        var value = ($.isFunction(column.formatter)) ?
                                column.formatter.call(that, column, row) :
                                    column.converter.to(row[column.id]),
                            cssClass = (column.cssClass.length > 0) ? " " + column.cssClass : "";
                        cells += tpl.cell.resolve(getParams.call(that, {
                            content: (value == null || value === "") ? "&nbsp;" : value,
                            css: ((column.align === "right") ? css.right : (column.align === "center") ?
                                css.center : css.left) + cssClass,
                            style: (column.width == null) ? "" : "width:" + column.width + ";" }));
                    }
                });

                if (rowCss.length > 0)
                {
                    rowAttr += " class=\"" + rowCss + "\"";
                }
                html += tpl.row.resolve(getParams.call(that, { attr: rowAttr, cells: cells }));
            });

            // sets or clears multi selectbox state
            that.element.find("thead " + getCssSelector(that.options.css.selectBox))
                .prop("checked", allRowsSelected);

            tbody.html(html);

            registerRowEvents.call(this, tbody);
        }
        else
        {
            renderNoResultsRow.call(this);
        }
    }

    function registerRowEvents(tbody)
    {
        var that = this,
            selectBoxSelector = getCssSelector(this.options.css.selectBox);

        if (this.selection)
        {
            tbody.off("click" + namespace, selectBoxSelector)
                .on("click" + namespace, selectBoxSelector, function(e)
                {
                    e.stopPropagation();

                    var $this = $(this),
                        id = that.converter.from($this.val());

                    if ($this.prop("checked"))
                    {
                        that.select([id]);
                    }
                    else
                    {
                        that.deselect([id]);
                    }
                });
        }

        tbody.off("click" + namespace, "> tr")
            .on("click" + namespace, "> tr", function(e)
            {
                e.stopPropagation();

                var $this = $(this),
                    id = (that.identifier == null) ? $this.data("row-id") :
                        that.converter.from($this.data("row-id") + ""),
                    row = (that.identifier == null) ? that.currentRows[id] :
                        that.currentRows.first(function (item) { return item[that.identifier] === id; });

                if (that.selection && that.options.rowSelect)
                {
                    if ($this.hasClass(that.options.css.selected))
                    {
                        that.deselect([id]);
                    }
                    else
                    {
                        that.select([id]);
                    }
                }

                that.element.trigger("click" + namespace, [that.columns, row]);
            });
    }

    function renderSearchField()
    {
        if (this.options.navigation !== 0)
        {
            var css = this.options.css,
                selector = getCssSelector(css.search),
                searchItems = findFooterAndHeaderItems.call(this, selector);

            if (searchItems.length > 0)
            {
                var that = this,
                    tpl = this.options.templates,
                    timer = null, // fast keyup detection
                    currentValue = "",
                    searchFieldSelector = getCssSelector(css.searchField),
                    search = $(tpl.search.resolve(getParams.call(this))),
                    searchField = (search.is(searchFieldSelector)) ? search :
                        search.find(searchFieldSelector);

                searchField.on("keyup" + namespace, function (e)
                {
                    e.stopPropagation();
                    var newValue = $(this).val();
                    if (currentValue !== newValue || (e.which === 13 && newValue !== ""))
                    {
                        currentValue = newValue;
                        if (e.which === 13 || newValue.length === 0 || newValue.length >= that.options.searchSettings.characters)
                        {
                            window.clearTimeout(timer);
                            timer = window.setTimeout(function ()
                            {
                                executeSearch.call(that, newValue);
                            }, that.options.searchSettings.delay);
                        }
                    }
                });

                replacePlaceHolder.call(this, searchItems, search);
            }
        }
    }

    function executeSearch(phrase)
    {
        if (this.searchPhrase !== phrase)
        {
            this.current = 1;
            this.searchPhrase = phrase;
            loadData.call(this);
        }
    }

    function renderTableHeader()
    {
        var that = this,
            headerRow = this.element.find("thead > tr"),
            css = this.options.css,
            tpl = this.options.templates,
            html = "",
            sorting = this.options.sorting;

        if (this.selection)
        {
            var selectBox = (this.options.multiSelect) ?
                tpl.select.resolve(getParams.call(that, { type: "checkbox", value: "all" })) : "";
            html += tpl.rawHeaderCell.resolve(getParams.call(that, { content: selectBox,
                css: css.selectCell }));
        }

        $.each(this.columns, function (index, column)
        {
            if (column.visible)
            {
                var sortOrder = that.sortDictionary[column.id],
                    iconCss = ((sorting && sortOrder && sortOrder === "asc") ? css.iconUp :
                        (sorting && sortOrder && sortOrder === "desc") ? css.iconDown : ""),
                    icon = tpl.icon.resolve(getParams.call(that, { iconCss: iconCss })),
                    align = column.headerAlign,
                    cssClass = (column.headerCssClass.length > 0) ? " " + column.headerCssClass : "";
                html += tpl.headerCell.resolve(getParams.call(that, {
                    column: column, icon: icon, sortable: sorting && column.sortable && css.sortable || "",
                    css: ((align === "right") ? css.right : (align === "center") ?
                        css.center : css.left) + cssClass,
                    style: (column.width == null) ? "" : "width:" + column.width + ";" }));
            }
        });

        headerRow.html(html);

        if (sorting)
        {
            var sortingSelector = getCssSelector(css.sortable);
            headerRow.off("click" + namespace, sortingSelector)
                .on("click" + namespace, sortingSelector, function (e)
                {
                    e.preventDefault();

                    setTableHeaderSortDirection.call(that, $(this));
                    sortRows.call(that);
                    loadData.call(that);
                });
        }

        // todo: create a own function for that piece of code
        if (this.selection && this.options.multiSelect)
        {
            var selectBoxSelector = getCssSelector(css.selectBox);
            headerRow.off("click" + namespace, selectBoxSelector)
                .on("click" + namespace, selectBoxSelector, function(e)
                {
                    e.stopPropagation();

                    if ($(this).prop("checked"))
                    {
                        that.select();
                    }
                    else
                    {
                        that.deselect();
                    }
                });
        }
    }

    function setTableHeaderSortDirection(element)
    {
        var css = this.options.css,
            iconSelector = getCssSelector(css.icon),
            columnId = element.data("column-id") || element.parents("th").first().data("column-id"),
            sortOrder = this.sortDictionary[columnId],
            icon = element.find(iconSelector);

        if (!this.options.multiSort)
        {
            element.parents("tr").first().find(iconSelector).removeClass(css.iconDown + " " + css.iconUp);
            this.sortDictionary = {};
        }

        if (sortOrder && sortOrder === "asc")
        {
            this.sortDictionary[columnId] = "desc";
            icon.removeClass(css.iconUp).addClass(css.iconDown);
        }
        else if (sortOrder && sortOrder === "desc")
        {
            if (this.options.multiSort)
            {
                var newSort = {};
                for (var key in this.sortDictionary)
                {
                    if (key !== columnId)
                    {
                        newSort[key] = this.sortDictionary[key];
                    }
                }
                this.sortDictionary = newSort;
                icon.removeClass(css.iconDown);
            }
            else
            {
                this.sortDictionary[columnId] = "asc";
                icon.removeClass(css.iconDown).addClass(css.iconUp);
            }
        }
        else
        {
            this.sortDictionary[columnId] = "asc";
            icon.addClass(css.iconUp);
        }
    }

    function replacePlaceHolder(placeholder, element)
    {
        placeholder.each(function (index, item)
        {
            // todo: check how append is implemented. Perhaps cloning here is superfluous.
            $(item).before(element.clone(true)).remove();
        });
    }

    function showLoading()
    {
        var that = this;

        window.setTimeout(function()
        {
            if (that.element._bgAria("busy") === "true")
            {
                var tpl = that.options.templates,
                    thead = that.element.children("thead").first(),
                    tbody = that.element.children("tbody").first(),
                    firstCell = tbody.find("tr > td").first(),
                    padding = (that.element.height() - thead.height()) - (firstCell.height() + 20),
                    count = that.columns.where(isVisible).length;

                if (that.selection)
                {
                    count = count + 1;
                }
                tbody.html(tpl.loading.resolve(getParams.call(that, { columns: count })));
                if (that.rowCount !== -1 && padding > 0)
                {
                    tbody.find("tr > td").css("padding", "20px 0 " + padding + "px");
                }
            }
        }, 250);
    }

    function sortRows()
    {
        var sortArray = [];

        function sort(x, y, current)
        {
            current = current || 0;
            var next = current + 1,
                item = sortArray[current];

            function sortOrder(value)
            {
                return (item.order === "asc") ? value : value * -1;
            }

            return (x[item.id] > y[item.id]) ? sortOrder(1) :
                (x[item.id] < y[item.id]) ? sortOrder(-1) :
                    (sortArray.length > next) ? sort(x, y, next) : 0;
        }

        if (!this.options.ajax)
        {
            var that = this;

            for (var key in this.sortDictionary)
            {
                if (this.options.multiSort || sortArray.length === 0)
                {
                    sortArray.push({
                        id: key,
                        order: this.sortDictionary[key]
                    });
                }
            }

            if (sortArray.length > 0)
            {
                this.rows.sort(sort);
            }
        }
    }

    // GRID PUBLIC CLASS DEFINITION
    // ====================

    /**
     * Represents the jQuery Bootgrid plugin.
     *
     * @class Grid
     * @constructor
     * @param element {Object} The corresponding DOM element.
     * @param options {Object} The options to override default settings.
     * @chainable
     **/
    var Grid = function(element, options)
    {
        this.element = $(element);
        this.origin = this.element.clone();
        this.options = $.extend(true, {}, Grid.defaults, this.element.data(), options);
        // overrides rowCount explicitly because deep copy ($.extend) leads to strange behaviour
        var rowCount = this.options.rowCount = this.element.data().rowCount || options.rowCount || this.options.rowCount;
        this.columns = [];
        this.current = 1;
        this.currentRows = [];
        this.identifier = null; // The first column ID that is marked as identifier
        this.selection = false;
        this.converter = null; // The converter for the column that is marked as identifier
        this.rowCount = ($.isArray(rowCount)) ? rowCount[0] : rowCount;
        this.rows = [];
        this.searchPhrase = "";
        this.selectedRows = [];
        this.sortDictionary = {};
        this.total = 0;
        this.totalPages = 0;
        this.cachedParams = {
            lbl: this.options.labels,
            css: this.options.css,
            ctx: {}
        };
        this.header = null;
        this.footer = null;
        this.xqr = null;

        // todo: implement cache
    };

    /**
     * An object that represents the default settings.
     *
     * @static
     * @class defaults
     * @for Grid
     * @example
     *   // Global approach
     *   $.bootgrid.defaults.selection = true;
     * @example
     *   // Initialization approach
     *   $("#bootgrid").bootgrid({ selection = true });
     **/
    Grid.defaults = {
        navigation: 3, // it's a flag: 0 = none, 1 = top, 2 = bottom, 3 = both (top and bottom)
        padding: 2, // page padding (pagination)
        columnSelection: true,
        rowCount: [10, 25, 50, -1], // rows per page int or array of int (-1 represents "All")

        /**
         * Enables row selection (to enable multi selection see also `multiSelect`). Default value is `false`.
         *
         * @property selection
         * @type Boolean
         * @default false
         * @for defaults
         * @since 1.0.0
         **/
        selection: false,

        /**
         * Enables multi selection (`selection` must be set to `true` as well). Default value is `false`.
         *
         * @property multiSelect
         * @type Boolean
         * @default false
         * @for defaults
         * @since 1.0.0
         **/
        multiSelect: false,

        /**
         * Enables entire row click selection (`selection` must be set to `true` as well). Default value is `false`.
         *
         * @property rowSelect
         * @type Boolean
         * @default false
         * @for defaults
         * @since 1.1.0
         **/
        rowSelect: false,

        /**
         * Defines whether the row selection is saved internally on filtering, paging and sorting
         * (even if the selected rows are not visible).
         *
         * @property keepSelection
         * @type Boolean
         * @default false
         * @for defaults
         * @since 1.1.0
         **/
        keepSelection: false,

        highlightRows: false, // highlights new rows (find the page of the first new row)
        sorting: true,
        multiSort: false,

        /**
         * General search settings to configure the search field behaviour.
         *
         * @property searchSettings
         * @type Object
         * @for defaults
         * @since 1.2.0
         **/
        searchSettings: {
            /**
             * The time in milliseconds to wait before search gets executed.
             *
             * @property delay
             * @type Number
             * @default 250
             * @for searchSettings
             **/
            delay: 250,
            
            /**
             * The characters to type before the search gets executed.
             *
             * @property characters
             * @type Number
             * @default 1
             * @for searchSettings
             **/
            characters: 1
        },

        /**
         * Defines whether the data shall be loaded via an asynchronous HTTP (Ajax) request.
         *
         * @property ajax
         * @type Boolean
         * @default false
         * @for defaults
         **/
        ajax: false,

        /**
         * Ajax request settings that shall be used for server-side communication.
         * All setting except data, error, success and url can be overridden.
         * For the full list of settings go to http://api.jquery.com/jQuery.ajax/.
         *
         * @property ajaxSettings
         * @type Object
         * @for defaults
         * @since 1.2.0
         **/
        ajaxSettings: {
            /**
             * Specifies the HTTP method which shall be used when sending data to the server.
             * Go to http://api.jquery.com/jQuery.ajax/ for more details.
             * This setting is overriden for backward compatibility.
             *
             * @property method
             * @type String
             * @default "POST"
             * @for ajaxSettings
             **/
            method: "POST"
        },

        /**
         * Enriches the request object with additional properties. Either a `PlainObject` or a `Function`
         * that returns a `PlainObject` can be passed. Default value is `{}`.
         *
         * @property post
         * @type Object|Function
         * @default function (request) { return request; }
         * @for defaults
         * @deprecated Use instead `requestHandler`
         **/
        post: {}, // or use function () { return {}; } (reserved properties are "current", "rowCount", "sort" and "searchPhrase")

        /**
         * Sets the data URL to a data service (e.g. a REST service). Either a `String` or a `Function`
         * that returns a `String` can be passed. Default value is `""`.
         *
         * @property url
         * @type String|Function
         * @default ""
         * @for defaults
         **/
        url: "", // or use function () { return ""; }

        /**
         * Defines whether the search is case sensitive or insensitive.
         *
         * @property caseSensitive
         * @type Boolean
         * @default true
         * @for defaults
         * @since 1.1.0
         **/
        caseSensitive: true,

        // note: The following properties should not be used via data-api attributes

        /**
         * Transforms the JSON request object in what ever is needed on the server-side implementation.
         *
         * @property requestHandler
         * @type Function
         * @default function (request) { return request; }
         * @for defaults
         * @since 1.1.0
         **/
        requestHandler: function (request) { return request; },

        /**
         * Transforms the response object into the expected JSON response object.
         *
         * @property responseHandler
         * @type Function
         * @default function (response) { return response; }
         * @for defaults
         * @since 1.1.0
         **/
        responseHandler: function (response) { return response; },

        /**
         * A list of converters.
         *
         * @property converters
         * @type Object
         * @for defaults
         * @since 1.0.0
         **/
        converters: {
            numeric: {
                from: function (value) { return +value; }, // converts from string to numeric
                to: function (value) { return value + ""; } // converts from numeric to string
            },
            string: {
                // default converter
                from: function (value) { return value; },
                to: function (value) { return value; }
            }
        },

        /**
         * Contains all css classes.
         *
         * @property css
         * @type Object
         * @for defaults
         **/
        css: {
            actions: "actions btn-group", // must be a unique class name or constellation of class names within the header and footer
            center: "text-center",
            columnHeaderAnchor: "column-header-anchor", // must be a unique class name or constellation of class names within the column header cell
            columnHeaderText: "text",
            dropDownItem: "dropdown-item", // must be a unique class name or constellation of class names within the actionDropDown,
            dropDownItemButton: "dropdown-item-button", // must be a unique class name or constellation of class names within the actionDropDown
            dropDownItemCheckbox: "dropdown-item-checkbox", // must be a unique class name or constellation of class names within the actionDropDown
            dropDownMenu: "dropdown btn-group", // must be a unique class name or constellation of class names within the actionDropDown
            dropDownMenuItems: "dropdown-menu pull-right", // must be a unique class name or constellation of class names within the actionDropDown
            dropDownMenuText: "dropdown-text", // must be a unique class name or constellation of class names within the actionDropDown
            footer: "bootgrid-footer container-fluid",
            header: "bootgrid-header container-fluid",
            icon: "icon glyphicon",
            iconColumns: "glyphicon-th-list",
            iconDown: "glyphicon-chevron-down",
            iconRefresh: "glyphicon-refresh",
            iconSearch: "glyphicon-search",
            iconUp: "glyphicon-chevron-up",
            infos: "infos", // must be a unique class name or constellation of class names within the header and footer,
            left: "text-left",
            pagination: "pagination", // must be a unique class name or constellation of class names within the header and footer
            paginationButton: "button", // must be a unique class name or constellation of class names within the pagination

            /**
             * CSS class to select the parent div which activates responsive mode.
             *
             * @property responsiveTable
             * @type String
             * @default "table-responsive"
             * @for css
             * @since 1.1.0
             **/
            responsiveTable: "table-responsive",

            right: "text-right",
            search: "search form-group", // must be a unique class name or constellation of class names within the header and footer
            searchField: "search-field form-control",
            selectBox: "select-box", // must be a unique class name or constellation of class names within the entire table
            selectCell: "select-cell", // must be a unique class name or constellation of class names within the entire table

            /**
             * CSS class to highlight selected rows.
             *
             * @property selected
             * @type String
             * @default "active"
             * @for css
             * @since 1.1.0
             **/
            selected: "active",

            sortable: "sortable",
            table: "bootgrid-table table"
        },

        /**
         * A dictionary of formatters.
         *
         * @property formatters
         * @type Object
         * @for defaults
         * @since 1.0.0
         **/
        formatters: {},

        /**
         * Contains all labels.
         *
         * @property labels
         * @type Object
         * @for defaults
         **/
        labels: {
            all: "All",
            infos: "Showing {{ctx.start}} to {{ctx.end}} of {{ctx.total}} entries",
            loading: "Loading...",
            noResults: "No results found!",
            refresh: "Refresh",
            search: "Search"
        },

        /**
         * Specifies the mapping between status and contextual classes to color rows.
         *
         * @property statusMapping
         * @type Object
         * @for defaults
         * @since 1.2.0
         **/
        statusMapping: {
            /**
             * Specifies a successful or positive action.
             *
             * @property 0
             * @type String
             * @for statusMapping
             **/
            0: "success",

            /**
             * Specifies a neutral informative change or action.
             *
             * @property 1
             * @type String
             * @for statusMapping
             **/
            1: "info",

            /**
             * Specifies a warning that might need attention.
             *
             * @property 2
             * @type String
             * @for statusMapping
             **/
            2: "warning",
            
            /**
             * Specifies a dangerous or potentially negative action.
             *
             * @property 3
             * @type String
             * @for statusMapping
             **/
            3: "danger"
        },

        /**
         * Contains all templates.
         *
         * @property templates
         * @type Object
         * @for defaults
         **/
        templates: {
            actionButton: "<button class=\"btn btn-default\" type=\"button\" title=\"{{ctx.text}}\">{{ctx.content}}</button>",
            actionDropDown: "<div class=\"{{css.dropDownMenu}}\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"><span class=\"{{css.dropDownMenuText}}\">{{ctx.content}}</span> <span class=\"caret\"></span></button><ul class=\"{{css.dropDownMenuItems}}\" role=\"menu\"></ul></div>",
            actionDropDownItem: "<li><a data-action=\"{{ctx.action}}\" class=\"{{css.dropDownItem}} {{css.dropDownItemButton}}\">{{ctx.text}}</a></li>",
            actionDropDownCheckboxItem: "<li><label class=\"{{css.dropDownItem}}\"><input name=\"{{ctx.name}}\" type=\"checkbox\" value=\"1\" class=\"{{css.dropDownItemCheckbox}}\" {{ctx.checked}} /> {{ctx.label}}</label></li>",
            actions: "<div class=\"{{css.actions}}\"></div>",
            body: "<tbody></tbody>",
            cell: "<td class=\"{{ctx.css}}\" style=\"{{ctx.style}}\">{{ctx.content}}</td>",
            footer: "<div id=\"{{ctx.id}}\" class=\"{{css.footer}}\"><div class=\"row\"><div class=\"col-sm-6\"><p class=\"{{css.pagination}}\"></p></div><div class=\"col-sm-6 infoBar\"><p class=\"{{css.infos}}\"></p></div></div></div>",
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><p class=\"{{css.search}}\"></p><p class=\"{{css.actions}}\"></p></div></div></div>",
            headerCell: "<th data-column-id=\"{{ctx.column.id}}\" class=\"{{ctx.css}}\" style=\"{{ctx.style}}\"><a href=\"javascript:void(0);\" class=\"{{css.columnHeaderAnchor}} {{ctx.sortable}}\"><span class=\"{{css.columnHeaderText}}\">{{ctx.column.text}}</span>{{ctx.icon}}</a></th>",
            icon: "<span class=\"{{css.icon}} {{ctx.iconCss}}\"></span>",
            infos: "<div class=\"{{css.infos}}\">{{lbl.infos}}</div>",
            loading: "<tr><td colspan=\"{{ctx.columns}}\" class=\"loading\">{{lbl.loading}}</td></tr>",
            noResults: "<tr><td colspan=\"{{ctx.columns}}\" class=\"no-results\">{{lbl.noResults}}</td></tr>",
            pagination: "<ul class=\"{{css.pagination}}\"></ul>",
            paginationItem: "<li class=\"{{ctx.css}}\"><a data-page=\"{{ctx.page}}\" class=\"{{css.paginationButton}}\">{{ctx.text}}</a></li>",
            rawHeaderCell: "<th class=\"{{ctx.css}}\">{{ctx.content}}</th>", // Used for the multi select box
            row: "<tr{{ctx.attr}}>{{ctx.cells}}</tr>",
            search: "<div class=\"{{css.search}}\"><div class=\"input-group\"><span class=\"{{css.icon}} input-group-addon {{css.iconSearch}}\"></span> <input type=\"text\" class=\"{{css.searchField}}\" placeholder=\"{{lbl.search}}\" /></div></div>",
            select: "<input name=\"select\" type=\"{{ctx.type}}\" class=\"{{css.selectBox}}\" value=\"{{ctx.value}}\" {{ctx.checked}} />"
        }
    };

    /**
     * Appends rows.
     *
     * @method append
     * @param rows {Array} An array of rows to append
     * @chainable
     **/
    Grid.prototype.append = function(rows)
    {
        if (this.options.ajax)
        {
            // todo: implement ajax PUT
        }
        else
        {
            var appendedRows = [];
            for (var i = 0; i < rows.length; i++)
            {
                if (appendRow.call(this, rows[i]))
                {
                    appendedRows.push(rows[i]);
                }
            }
            sortRows.call(this);
            highlightAppendedRows.call(this, appendedRows);
            loadData.call(this);
            this.element.trigger("appended" + namespace, [appendedRows]);
        }

        return this;
    };

    /**
     * Removes all rows.
     *
     * @method clear
     * @chainable
     **/
    Grid.prototype.clear = function()
    {
        if (this.options.ajax)
        {
            // todo: implement ajax POST
        }
        else
        {
            var removedRows = $.extend([], this.rows);
            this.rows = [];
            this.current = 1;
            this.total = 0;
            loadData.call(this);
            this.element.trigger("cleared" + namespace, [removedRows]);
        }

        return this;
    };

    /**
     * Removes the control functionality completely and transforms the current state to the initial HTML structure.
     *
     * @method destroy
     * @chainable
     **/
    Grid.prototype.destroy = function()
    {
        // todo: this method has to be optimized (the complete initial state must be restored)
        $(window).off(namespace);
        if (this.options.navigation & 1)
        {
            this.header.remove();
        }
        if (this.options.navigation & 2)
        {
            this.footer.remove();
        }
        this.element.before(this.origin).remove();

        return this;
    };

    /**
     * Resets the state and reloads rows.
     *
     * @method reload
     * @chainable
     **/
    Grid.prototype.reload = function()
    {
        this.current = 1; // reset
        loadData.call(this);

        return this;
    };

    /**
     * Removes rows by ids. Removes selected rows if no ids are provided.
     *
     * @method remove
     * @param [rowsIds] {Array} An array of rows ids to remove
     * @chainable
     **/
    Grid.prototype.remove = function(rowIds)
    {
        if (this.identifier != null)
        {
            var that = this;

            if (this.options.ajax)
            {
                // todo: implement ajax DELETE
            }
            else
            {
                rowIds = rowIds || this.selectedRows;
                var id,
                    removedRows = [];

                for (var i = 0; i < rowIds.length; i++)
                {
                    id = rowIds[i];

                    for (var j = 0; j < this.rows.length; j++)
                    {
                        if (this.rows[j][this.identifier] === id)
                        {
                            removedRows.push(this.rows[j]);
                            this.rows.splice(j, 1);
                            break;
                        }
                    }
                }

                this.current = 1; // reset
                loadData.call(this);
                this.element.trigger("removed" + namespace, [removedRows]);
            }
        }

        return this;
    };

    /**
     * Searches in all rows for a specific phrase (but only in visible cells). 
     * The search filter will be reseted, if no argument is provided.
     *
     * @method search
     * @param [phrase] {String} The phrase to search for
     * @chainable
     **/
    Grid.prototype.search = function(phrase)
    {
        phrase = phrase || "";

        if (this.searchPhrase !== phrase)
        {
            var selector = getCssSelector(this.options.css.searchField),
                searchFields = findFooterAndHeaderItems.call(this, selector);
            searchFields.val(phrase);
        }

        executeSearch.call(this, phrase);


        return this;
    };

    /**
     * Selects rows by ids. Selects all visible rows if no ids are provided.
     * In server-side scenarios only visible rows are selectable.
     *
     * @method select
     * @param [rowsIds] {Array} An array of rows ids to select
     * @chainable
     **/
    Grid.prototype.select = function(rowIds)
    {
        if (this.selection)
        {
            rowIds = rowIds || this.currentRows.propValues(this.identifier);

            var id, i,
                selectedRows = [];

            while (rowIds.length > 0 && !(!this.options.multiSelect && selectedRows.length === 1))
            {
                id = rowIds.pop();
                if ($.inArray(id, this.selectedRows) === -1)
                {
                    for (i = 0; i < this.currentRows.length; i++)
                    {
                        if (this.currentRows[i][this.identifier] === id)
                        {
                            selectedRows.push(this.currentRows[i]);
                            this.selectedRows.push(id);
                            break;
                        }
                    }
                }
            }

            if (selectedRows.length > 0)
            {
                var selectBoxSelector = getCssSelector(this.options.css.selectBox),
                    selectMultiSelectBox = this.selectedRows.length >= this.currentRows.length;

                i = 0;
                while (!this.options.keepSelection && selectMultiSelectBox && i < this.currentRows.length)
                {
                    selectMultiSelectBox = ($.inArray(this.currentRows[i++][this.identifier], this.selectedRows) !== -1);
                }
                this.element.find("thead " + selectBoxSelector).prop("checked", selectMultiSelectBox);

                if (!this.options.multiSelect)
                {
                    this.element.find("tbody > tr " + selectBoxSelector + ":checked")
                        .trigger("click" + namespace);
                }

                for (i = 0; i < this.selectedRows.length; i++)
                {
                    this.element.find("tbody > tr[data-row-id=\"" + this.selectedRows[i] + "\"]")
                        .addClass(this.options.css.selected)._bgAria("selected", "true")
                        .find(selectBoxSelector).prop("checked", true);
                }

                this.element.trigger("selected" + namespace, [selectedRows]);
            }
        }

        return this;
    };

    /**
     * Deselects rows by ids. Deselects all visible rows if no ids are provided.
     * In server-side scenarios only visible rows are deselectable.
     *
     * @method deselect
     * @param [rowsIds] {Array} An array of rows ids to deselect
     * @chainable
     **/
    Grid.prototype.deselect = function(rowIds)
    {
        if (this.selection)
        {
            rowIds = rowIds || this.currentRows.propValues(this.identifier);

            var id, i, pos,
                deselectedRows = [];

            while (rowIds.length > 0)
            {
                id = rowIds.pop();
                pos = $.inArray(id, this.selectedRows);
                if (pos !== -1)
                {
                    for (i = 0; i < this.currentRows.length; i++)
                    {
                        if (this.currentRows[i][this.identifier] === id)
                        {
                            deselectedRows.push(this.currentRows[i]);
                            this.selectedRows.splice(pos, 1);
                            break;
                        }
                    }
                }
            }

            if (deselectedRows.length > 0)
            {
                var selectBoxSelector = getCssSelector(this.options.css.selectBox);

                this.element.find("thead " + selectBoxSelector).prop("checked", false);
                for (i = 0; i < deselectedRows.length; i++)
                {
                    this.element.find("tbody > tr[data-row-id=\"" + deselectedRows[i][this.identifier] + "\"]")
                        .removeClass(this.options.css.selected)._bgAria("selected", "false")
                        .find(selectBoxSelector).prop("checked", false);
                }

                this.element.trigger("deselected" + namespace, [deselectedRows]);
            }
        }

        return this;
    };

    /**
     * Sorts the rows by a given sort descriptor dictionary. 
     * The sort filter will be reseted, if no argument is provided.
     *
     * @method sort
     * @param [dictionary] {Object} A sort descriptor dictionary that contains the sort information
     * @chainable
     **/
    Grid.prototype.sort = function(dictionary)
    {
        var values = (dictionary) ? $.extend({}, dictionary) : {};

        if (values === this.sortDictionary)
        {
            return this;
        }

        this.sortDictionary = values;
        renderTableHeader.call(this);
        sortRows.call(this);
        loadData.call(this);

        return this;
    };

    /**
     * Gets a list of the column settings.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getColumnSettings
     * @return {Array} Returns a list of the column settings.
     * @since 1.2.0
     **/
    Grid.prototype.getColumnSettings = function()
    {
        return $.merge([], this.columns);
    };

    /**
     * Gets the current page index.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getCurrentPage
     * @return {Number} Returns the current page index.
     * @since 1.2.0
     **/
    Grid.prototype.getCurrentPage = function()
    {
        return this.current;
    };

    /**
     * Gets the current rows.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getCurrentPage
     * @return {Array} Returns the current rows.
     * @since 1.2.0
     **/
    Grid.prototype.getCurrentRows = function()
    {
        return $.merge([], this.currentRows);
    };

    /**
     * Gets a number represents the row count per page.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getRowCount
     * @return {Number} Returns the row count per page.
     * @since 1.2.0
     **/
    Grid.prototype.getRowCount = function()
    {
        return this.rowCount;
    };

    /**
     * Gets the actual search phrase.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getSearchPhrase
     * @return {String} Returns the actual search phrase.
     * @since 1.2.0
     **/
    Grid.prototype.getSearchPhrase = function()
    {
        return this.searchPhrase;
    };

    /**
     * Gets the complete list of currently selected rows.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getSelectedRows
     * @return {Array} Returns all selected rows.
     * @since 1.2.0
     **/
    Grid.prototype.getSelectedRows = function()
    {
        return $.merge([], this.selectedRows);
    };

    /**
     * Gets the sort dictionary which represents the state of column sorting.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getSortDictionary
     * @return {Object} Returns the sort dictionary.
     * @since 1.2.0
     **/
    Grid.prototype.getSortDictionary = function()
    {
        return $.extend({}, this.sortDictionary);
    };

    /**
     * Gets a number represents the total page count.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getTotalPageCount
     * @return {Number} Returns the total page count.
     * @since 1.2.0
     **/
    Grid.prototype.getTotalPageCount = function()
    {
        return this.totalPages;
    };

    /**
     * Gets a number represents the total row count.
     * This method returns only for the first grid instance a value.
     * Therefore be sure that only one grid instance is catched by your selector.
     *
     * @method getTotalRowCount
     * @return {Number} Returns the total row count.
     * @since 1.2.0
     **/
    Grid.prototype.getTotalRowCount = function()
    {
        return this.total;
    };

    // GRID COMMON TYPE EXTENSIONS
    // ============

    $.fn.extend({
        _bgAria: function (name, value)
        {
            return (value) ? this.attr("aria-" + name, value) : this.attr("aria-" + name);
        },

        _bgBusyAria: function(busy)
        {
            return (busy == null || busy) ? 
                this._bgAria("busy", "true") : 
                this._bgAria("busy", "false");
        },

        _bgRemoveAria: function (name)
        {
            return this.removeAttr("aria-" + name);
        },

        _bgEnableAria: function (enable)
        {
            return (enable == null || enable) ? 
                this.removeClass("disabled")._bgAria("disabled", "false") : 
                this.addClass("disabled")._bgAria("disabled", "true");
        },

        _bgEnableField: function (enable)
        {
            return (enable == null || enable) ? 
                this.removeAttr("disabled") : 
                this.attr("disabled", "disable");
        },

        _bgShowAria: function (show)
        {
            return (show == null || show) ? 
                this.show()._bgAria("hidden", "false") :
                this.hide()._bgAria("hidden", "true");
        },

        _bgSelectAria: function (select)
        {
            return (select == null || select) ? 
                this.addClass("active")._bgAria("selected", "true") : 
                this.removeClass("active")._bgAria("selected", "false");
        },

        _bgId: function (id)
        {
            return (id) ? this.attr("id", id) : this.attr("id");
        }
    });

    if (!String.prototype.resolve)
    {
        var formatter = {
            "checked": function(value)
            {
                if (typeof value === "boolean")
                {
                    return (value) ? "checked=\"checked\"" : "";
                }
                return value;
            }
        };

        String.prototype.resolve = function (substitutes, prefixes)
        {
            var result = this;
            $.each(substitutes, function (key, value)
            {
                if (value != null && typeof value !== "function")
                {
                    if (typeof value === "object")
                    {
                        var keys = (prefixes) ? $.extend([], prefixes) : [];
                        keys.push(key);
                        result = result.resolve(value, keys) + "";
                    }
                    else
                    {
                        if (formatter && formatter[key] && typeof formatter[key] === "function")
                        {
                            value = formatter[key](value);
                        }
                        key = (prefixes) ? prefixes.join(".") + "." + key : key;
                        var pattern = new RegExp("\\{\\{" + key + "\\}\\}", "gm");
                        result = result.replace(pattern, (value.replace) ? value.replace(/\$/gi, "&#36;") : value);
                    }
                }
            });
            return result;
        };
    }

    if (!Array.prototype.first)
    {
        Array.prototype.first = function (condition)
        {
            for (var i = 0; i < this.length; i++)
            {
                var item = this[i];
                if (condition(item))
                {
                    return item;
                }
            }
            return null;
        };
    }

    if (!Array.prototype.contains)
    {
        Array.prototype.contains = function (condition)
        {
            for (var i = 0; i < this.length; i++)
            {
                var item = this[i];
                if (condition(item))
                {
                    return true;
                }
            }
            return false;
        };
    }

    if (!Array.prototype.page)
    {
        Array.prototype.page = function (page, size)
        {
            var skip = (page - 1) * size,
                end = skip + size;
            return (this.length > skip) ? 
                (this.length > end) ? this.slice(skip, end) : 
                    this.slice(skip) : [];
        };
    }

    if (!Array.prototype.where)
    {
        Array.prototype.where = function (condition)
        {
            var result = [];
            for (var i = 0; i < this.length; i++)
            {
                var item = this[i];
                if (condition(item))
                {
                    result.push(item);
                }
            }
            return result;
        };
    }

    if (!Array.prototype.propValues)
    {
        Array.prototype.propValues = function (propName)
        {
            var result = [];
            for (var i = 0; i < this.length; i++)
            {
                result.push(this[i][propName]);
            }
            return result;
        };
    }

    // GRID PLUGIN DEFINITION
    // =====================

    var old = $.fn.bootgrid;

    $.fn.bootgrid = function (option)
    {
        var args = Array.prototype.slice.call(arguments, 1),
            returnValue = null,
            elements = this.each(function (index)
            {
                var $this = $(this),
                    instance = $this.data(namespace),
                    options = typeof option === "object" && option;

                if (!instance && option === "destroy")
                {
                    return;
                }
                if (!instance)
                {
                    $this.data(namespace, (instance = new Grid(this, options)));
                    init.call(instance);
                }
                if (typeof option === "string")
                {
                    if (option.indexOf("get") === 0 && index === 0)
                    {
                        returnValue = instance[option].apply(instance, args);
                    }
                    else if (option.indexOf("get") !== 0)
                    {
                        return instance[option].apply(instance, args);
                    }
                }
            });
        return (typeof option === "string" && option.indexOf("get") === 0) ? returnValue : elements;
    };

    $.fn.bootgrid.Constructor = Grid;

    // GRID NO CONFLICT
    // ===============

    $.fn.bootgrid.noConflict = function ()
    {
        $.fn.bootgrid = old;
        return this;
    };

    // GRID DATA-API
    // ============

$("[data-toggle=\"bootgrid\"]").bootgrid();
})(jQuery, window);
/*! 
 * jQuery Bootgrid v1.3.1 - 09/11/2015
 * Copyright (c) 2014-2015 Rafael Staib (http://www.jquery-bootgrid.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */
;(function ($, window, undefined)
{
    /*jshint validthis: true */
    "use strict";

    $.extend($.fn.bootgrid.Constructor.defaults.css, {
        icon: "icon fa",
        iconColumns: "fa-th-list",
        iconDown: "fa-sort-desc",
        iconRefresh: "fa-refresh",
        iconSearch: "fa-search",
        iconUp: "fa-sort-asc"
});
})(jQuery, window);
/* global $*/
$(document).ready(function () {

    var grid = $("#grid-command-buttons").bootgrid({
        ajax: true,
        post: function () {
            return {
                id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
            };
        },
        url: "/api/data/basic",
        formatters: {
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " +
                    "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
            }
        }
    }).on("loaded.rs.jquery.bootgrid", function () {
        /* Executes after data is loaded and rendered */
        grid.find(".command-edit").on("click", function (e) {
            alert("You pressed edit on row: " + $(this).data("row-id"));
        }).end().find(".command-delete").on("click", function (e) {
            alert("You pressed delete on row: " + $(this).data("row-id"));
        });
    });

});
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
/* global $ swal */

const bootgridFrenchLabels = {
    all: "Tous",
    infos: "Afficher de {{ctx.start}} à {{ctx.end}} des {{ctx.total}} entrées",
    loading: "Chargement...",
    noResults: "Aucune resultat",
    refresh: "Actualiser",
    search: "Rechercher"
};

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    
    $('button[data-action="delete-quizz"]').on('click', function (event) {

        var $quizzId = $(this).attr("data-id");
        
        swal({
            title: "Etes vous sûr ?",
            text: "vous ne pouvez pas recupérer le Quizz!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (confirmed) {
            if (confirmed) {

            $.ajax({
                url: "/admin/quizz/" + $quizzId +"/supprimer",
                type: "POST",
                data: {
                    _method: "DELETE"
                }
            }).done(function (data) {

                swal("Supprimée", "Le Quizz est supprimé avec succées", "success");
               
                
            }).error(function (data) {

                swal("Oops", "Votre demande n'est pas traitée", "error");
                
                
                });
            };
        });
    });


    $('a[data-action="delete-response"]').on('click', function (event) {

        var $responseId = $(this).attr("data-row-id");
        var $row = ($(this).parent()).parent();
        swal({
            title: "Etes vous sûr ?",
            text: "vous ne pouvez pas recupérer la reponse!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (confirmed) {
            if (confirmed) {

            $.ajax({
                url: "/admin/reponses/" + $responseId +"/supprimer",
                type: "POST",
                data: {
                    _method: "DELETE"
                }
            }).done(function (data) {

                swal("Supprimée", "La réponse est supprimée avec succées", "success");
                
                $row.remove();
                
            }).error(function (data) {

                swal("Oops", "Votre demande n'est pas traitée", "error");
                
                
                });
            };
        });
    });
    
    $('a[data-action="delete-response"]').on('click', function (event) {

        var $responseId = $(this).attr("data-id");
        
        swal({
            title: "Etes vous sûr ?",
            text: "vous ne pouvez pas recupérer la réponse !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true
        },  function (confirmed) {
                if (confirmed) {

                $.ajax({
                    url: "/admin/reponses/" + $responseId +"/supprimer",
                    type: "POST",
                    data: {
                        _method: "GET"
                    }
        }).done(function (data) {

            swal("Supprimée", "La réponse est supprimée avec succées", "success");
           

        }).error(function (data) {

            swal("Oops", "Votre demande n'est pas traitée", "error");


                });
            };
        });
    });
    
    const urlAsArray = window.location.href.split('/');
    
    $("#grid-data").bootgrid({
         
        labels: bootgridFrenchLabels,
        formatters: {
            commands: function (column, row) {
                return '<a href="/admin/' + urlAsArray[urlAsArray.length - 1] + '/' + row.id + '" class="btn btn-xs btn-default"><span class="fa fa-eye"></span></a>';
            }
        }
        
    });
    
    
    $('[data-toggle="tooltip"]').tooltip(); 
    
   
});
/**
* @preserve CanvasJS jQuery Charting Plugin - http://canvasjs.com/ 
* Copyright 2013 fenopix
*/

/*
* CanvasJS Charts follows Dual Licensing Model as mentioned below. 
* 
* ---------------------Free for Non-Commercial Use--------------------
* 
* For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
*     http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
* 
* ---------------------Commercial License--------------------
* Commercial use of CanvasJS requires you to purchase a license. Without a commercial license you can use it for evaluation purposes only. Please refer to the following link for further details.
*     http://canvasjs.com/
* 
*/

(function ($, window, document, undefined) {

	$.fn.CanvasJSChart = function (options) {

		if (options) {

			var $el = this.first();
			var container = this[0];
			var chart = new CanvasJS.Chart(container, options);

			$el.children(".canvasjs-chart-container").data("canvasjsChartRef", chart);

			chart.render();

			return this;

		} else {

			return this.first().children(".canvasjs-chart-container").data("canvasjsChartRef");

		}
	}

}(jQuery, window, document));
//# sourceMappingURL=all.js.map
