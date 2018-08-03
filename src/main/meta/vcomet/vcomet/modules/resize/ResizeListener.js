/*!
 * ResizeListener
 * Detect when HTML elements change in size
 * https://github.com/ShimShamSam/ResizeListener
 *
 * Copyright 2016 Samuel Hodge
 * Released under the GPL license
 * http://www.gnu.org/copyleft/gpl.html
 */
(function scope(root) {
	'use strict';

	var name        = 'ResizeListener';
	var _private    = typeof Symbol === 'function' ? Symbol(name) : '__' + name +'__';
	var tag_name    = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '-element';
	var massive     = 999999;
	var dirty_frame = null;
	var dirty       = [];

	var requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		function requestAnimationFrame(callback) {
			return window.setTimeout(callback, 16);
		};

	// Sensor template setup
	var sensor_template = document.createElement(tag_name);
	var sizer_template  = sensor_template.cloneNode(true);
	var shared_css      = 'position:absolute;top:0;left:0;z-index:-' + massive + ';visibility:hidden;overflow:hidden;';

	sensor_template.style.cssText = shared_css + 'width:100%;height:100%';
	sizer_template.style.cssText  = shared_css + 'width:' + massive + 'px;height:' + massive + 'px';

	var expand_sensor = sensor_template.cloneNode(true);
	var shrink_sensor = sensor_template.cloneNode(true);
	var expand_sizer  = sizer_template.cloneNode(true);
	var shrink_sizer  = sizer_template.cloneNode(true);

	shrink_sizer.style.width = shrink_sizer.style.height = '200%';

	sensor_template.appendChild(expand_sensor);
	sensor_template.appendChild(shrink_sensor);
	expand_sensor.appendChild(expand_sizer);
	shrink_sensor.appendChild(shrink_sizer);

	// API export
	var api = {
		add : function add(elements, callbacks) {
			elements  = wrapInArray(elements);
			callbacks = wrapInArray(callbacks);

			for(var i = 0; i < elements.length; ++i) {
				for(var j = 0; j < callbacks.length; ++j) {
					addResizeListener(elements[i], callbacks[j]);
				}
			}
		},

		remove : function remove(elements, callbacks) {
			elements  = wrapInArray(elements);
			callbacks = wrapInArray(callbacks);

			for(var i = 0; i < elements.length; ++i) {
				for(var j = 0; j < callbacks.length; ++j) {
					removeResizeListener(elements[i], callbacks[j]);
				}
			}
		}
	};

	if(typeof define === 'function' && define.amd) {
		define(api);
	}
	else if(typeof exports === 'object') {
		module.exports = api;
	}
	else {
		root[name] = api;
	}

	/**
	 * Attaches a resize callback to an element
	 * @param {HTMLElement} element
	 * @param {Function}    callback
	 */
	function addResizeListener(element, callback) {
		var listener = getListener(element);

		if(listener) {
			listener.callbacks.push(callback);

			return;
		}

		var sensor        = sensor_template.cloneNode(true);
		var expand_sensor = sensor.childNodes[0];
		var shrink_sensor = sensor.childNodes[1];

		// Convert the element to relative positioning if it's currently static
		var position =
			element.currentStyle    ? element.currentStyle.position :
			window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue('position') :
			element.style.position;

		if(position === 'static') {
			element.style.position = 'relative';
		}

		element.appendChild(sensor);

		sensor[_private]        =
		expand_sensor[_private] =
		shrink_sensor[_private] = {
			sensor        : sensor,
			expand_sensor : expand_sensor,
			shrink_sensor : shrink_sensor,
			last_width    : element.offsetWidth,
			last_height   : element.offsetHeight,
			callbacks     : [callback],
			dirty         : false
		};

		expand_sensor.scrollLeft =
		expand_sensor.scrollTop  =
		shrink_sensor.scrollLeft =
		shrink_sensor.scrollTop  = massive;

		expand_sensor.onscroll =
		shrink_sensor.onscroll = scrollHandler;
	}

	/**
	 * Removes a resize callback from an element
	 * If no callback is defined, all callbacks are removed
	 * @param {HTMLElement} element
	 * @param {Function}    callback
	 */
	function removeResizeListener(element, callback) {
		var listener = getListener(element);

		if(!listener) {
			return;
		}

		// If a specific callback was passed in, remove it
		if(callback) {
			var callbacks = listener.callbacks;

			for(var i = 0; i < callbacks.length; ++i) {
				if(callbacks[i] === callback) {
					callbacks.splice(i, 1);
					--i;
				}
			}

			// If there are still callbacks, we're done
			if(callbacks.length) {
				return;
			}
		}

		// If we've made it this far, remove the entire listener
		element.removeChild(listener.sensor);
	}

	/**
	 * Scroll event handler
	 * @param {Event} e
	 */
	function scrollHandler(e) {
		if(!e) {
			e = window.event;
		}

		var target = e.target || e.srcElement;

		if(!target) {
			return;
		}

		var listener = target[_private];

		if(listener.dirty) {
			return;
		}

		listener.dirty = true;
		dirty.push(listener);

		// Queue up a frame to check dirty listeners
		if(!dirty_frame) {
			dirty_frame = requestAnimationFrame(checkDirtyListeners);
		}
	};

	/**
	 * Checks all possibly resized listeners for changes in dimensions
	 */
	function checkDirtyListeners() {
		for(var i = 0; i < dirty.length; ++i) {
			var listener = dirty[i];
			var element  = listener.sensor.parentNode;

			listener.dirty = false;

			listener.expand_sensor.scrollLeft =
			listener.expand_sensor.scrollTop  =
			listener.shrink_sensor.scrollLeft =
			listener.shrink_sensor.scrollTop  = massive;

			if(!element) {
				continue;
			}

			var width    = element.offsetWidth;
			var height   = element.offsetHeight;

			if(listener.last_width === width && listener.last_height === height) {
				continue;
			}

			var data = {
				width       : width,
				height      : height,
				last_width  : listener.last_width,
				last_height : listener.last_height
			};

			listener.last_width  = width;
			listener.last_height = height;

			for(var j = 0; j < listener.callbacks.length; ++j) {
				listener.callbacks[j].call(listener.sensor.parentNode, data);
			}
		}

		dirty.length = 0;
		dirty_frame  = null;
	}

	/**
	 * Gets the listener object for a given element
	 * @param  {HTMLElement} element The element to get the listener for
	 * @return {Object|null}         The listener or null if one was not found
	 */
	function getListener(element) {
		if(element[_private]) {
			return element[_private];
		}

		for(var i = 0; i < element.childNodes.length; ++i) {
			var child = element.childNodes[i];

			if(child[_private]) {
				return child[_private];
			}
		}

		return null;
	}

	/**
	 * Wraps a value in an array if it isn't one
	 * @param  {*} value The value to wrap
	 * @return {*}       The wrapped value
	 */
	function wrapInArray(value) {
		if(!value || typeof value !== 'object' || typeof value.length === 'undefined') {
			return [value];
		}

		return value;
	}
}(this));
