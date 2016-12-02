/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @since       4.0
 */

(function() {
	"use strict";

	document.addEventListener('DOMContentLoaded', function() {
		var wrapper = document.getElementById('wrapper');

		/**
		 * Bootstrap tooltips
		 */
		jQuery('*[rel=tooltip]').tooltip({
			html: true
		});

		if (document.getElementById('sidebar-wrapper') && !document.getElementById('sidebar-wrapper').getAttribute('data-hidden')) {
			/**
			 * Sidebar
			 */
			var sidebar       = document.getElementById('sidebar-wrapper'),
				menu          = sidebar.querySelector('#menu'),
				logo          = document.getElementById('main-brand'),
				logoSm        = document.getElementById('main-brand-sm'),
				menuToggle    = document.getElementById('header').querySelector('.menu-toggle'),
				collapsMenus  = sidebar.querySelectorAll('a[data-toggle="collapse"]'),
			    wrapperClosed = document.querySelector('#wrapper.closed'),
			// Apply 2nd level collapse
				first   = Array.prototype.slice.call(menu.querySelector('.collapse-level-1'));

			first.forEach(function(){
				this.classList.remove('collapse-level-1').add('collapse-level-2');
			});

			var navs = menu.querySelectorAll('.nav');

			for (var i = 0; i < navs.length; i++) {
				var parents = navs[i];
				for (var j = 0; j < parents.length; j++) {
					var aTags = parents[j];
					for (var k = 0; k < aTags.length; k++) {
						aTags[k].classList.remove('data-parent');
					}
				}
			}

			var closeAll = function() {
				for (var i = 0; i < collapsMenus.length; i++) {
					collapsMenus[i].parentNode.querySelector('.panel-collapse').classList.remove('in');
				}
			};

			var menuClose = function() {
				sidebar.querySelector('.collapse').classList.remove('in');
				sidebar.querySelector('.collapse-arrow').classList.add('collapsed');
				menuToggle.classList.add('active');
				wrapper.classList.add('closed');
				logoSm.classList.remove('hidden-xs-up');
				logo.classList.add('hidden-xs-up');
			};

			var menuOpen = function() {
				wrapper.classList.remove('closed');
				menuToggle.classList.remove('active');
				logoSm.classList.add('hidden-xs-up');
				logo.classList.remove('hidden-xs-up');
			};

			/**
			 * Localstorage to remember the menu state (open/close)
			 */
			var saveState = function () {
				if (typeof(Storage) !== 'undefined') {
					// Set the state of the menu in localStorage
					localStorage.setItem('adminMenuState', wrapper.classList.contains('closed'));
				}
			};

			var animateWrapper = function(keepOpen) {
				if (window.outerWidth > 767) {

					if (wrapper.classList.contains('closed') || keepOpen) {
						menuOpen();
					} else {
						menuClose();
					}
				}
			};

			// Toggle menu
			document.getElementById('menu-collapse').addEventListener('click', function(e) {
				e.preventDefault();
				animateWrapper();
				saveState();
			});

			if (wrapperClosed) {
				wrapperClosed[i].addEventListener('click', animateWrapper(true));
			}

			for (var i = 0; i < sidebar.length; i++) {
				sidebar[i].addEventListener('click', animateWrapper(true));
			}

			for (var i = 0; i < collapsMenus.length; i++) {
				collapsMenus[i].addEventListener('click', function(e){closeAll(); e.preventDefault(); animateWrapper(true); });
			}

			// Set the height of the menu to prevent overlapping
			var setMenuHeight = function() {
				var height = document.getElementById('header').offsetHeight + document.getElementById('main-brand').offsetHeight;
				document.getElementById('menu').height = window.height - height ;
			};

			setMenuHeight();

			// Remove 'closed' class on resize
			window.addEventListener('resize', function() {
				setMenuHeight();
			});

			/** Set active class */
			var allLinks = wrapper.querySelectorAll("a.no-dropdown, a.collapse-arrow");
			var currentUrl = window.location.href.toLowerCase();

			for (var i = 0; i < allLinks.length; i++) {
				if (currentUrl === allLinks[i].href) {
					allLinks[i].classList.add('active');
					if (!allLinks[i].parentNode.classList.contains('parent')) {
						var parentLink = closest(allLinks[i], '.panel-collapse');
						parentLink.parentNode.querySelector('a.collapse-arrow').classList.add('active');
						parentLink.classList.add('in');

					}
				}
			}

			if (typeof(Storage) !== 'undefined') {
				if (localStorage.getItem('adminMenuState') == "true") {
					menuClose();
				}
			}

		} else {
			document.getElementById('sidebar-wrapper').style.display = 'none';
			document.getElementById('sidebar-wrapper').style.width = '0';
			document.getElementsByClassName('wrapper')[0].style.paddingLeft = '0';
		}

		/** http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery */
		function closest(el, selector) {
			var matchesFn;

			// find vendor prefix
			['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
				if (typeof document.body[fn] == 'function') {
					matchesFn = fn;
					return true;
				}
				return false;
			});

			var parent;

			// traverse parents
			while (el) {
				parent = el.parentElement;
				if (parent && parent[matchesFn](selector)) {
					return parent;
				}
				el = parent;
			}

			return null;
		}

		/**
		 * Turn radios into btn-group
		 */
		var container = document.querySelectorAll('.btn-group');
		for (var i = 0; i < container.length; i++) {
			var labels = container[i].querySelectorAll('label');
			for (var j = 0; j < labels.length; j++) {
				labels[j].classList.add('btn');
				if ((j % 2) == 1) {
					labels[j].classList.add('btn-outline-danger');
				} else {
					labels[j].classList.add('btn-outline-success');

				}
			}
		}

		var somemem = document.querySelector('.btn-group label:not(.active)');
		if (somemem) {
			somemem.addEventListener('click', function(event) {
				var label = event.target;
				var input = document.getElementById(label.getAttribute('for'));

				if (input.getAttribute('checked') !== "checked") {
					var aa = closest(label, '.btn-group').querySelector('label');
					aa.classList.remove('active');
					aa.classList.remove('btn-success');
					aa.classList.remove('btn-danger');
					aa.classList.remove('btn-primary');

					if (closest(label, '.btn-group').classList.contains('btn-group-reversed')) {
						if (!label.classList.contains('btn')) label.classList.add('btn');
						if (input.value == '') {
							label.classList.add('active');
							label.classList.add('btn');
							label.classList.add('btn-outline-primary');
						} else if (input.value == 0) {
							label.classList.add('active');
							label.classList.add('btn');
							label.classList.add('btn-outline-success');
						} else {
							label.classList.add('active');
							label.classList.add('btn');
							label.classList.add('btn-outline-danger');
						}
					} else {
						if (input.value == '') {
							label.classList.add('active');
							label.classList.add('btn');
							label.classList.add('btn-outline-primary');
						} else if (input.value == 0) {
							label.classList.add('active');
							label.classList.add('btn');
							label.classList.add('btn-outline-danger');
						} else {
							label.classList.add('active');
							label.classList.add('btn');
							label.classList.add('btn-outline-success');
						}
					}
					input.setAttribute('checked', true);
					//input.dispatchEvent('change');
				}
			});
		}

		var btsGrouped = document.querySelectorAll('.btn-group input[checked=checked]');

		for(var i = 0, l = btsGrouped.length; l>i; i++) {
			var self   = btsGrouped[i],
			    attrId = self.id;
			if (self.parentNode.parentNode.classList.contains('btn-group-reversed')) {
				if (self.value == '') {
					var aa = document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-primary');
				} else if (self.value == 0) {
					var aa = document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-success');
				} else {
					var aa = document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-danger');
				}
			} else {
				if (self.value == '') {
					var aa = document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn-outline-primary');
				} else if (self.value == 0) {
					var aa = document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-danger');
				} else {
					var aa = document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-success');
				}
			}
		}

		/**
		 * Sticky Toolbar
		 */
		var navTop;
		var isFixed = false;

		processScrollInit();
		processScroll();

		document.addEventListener('resize', processScrollInit, false);
		document.addEventListener('scroll', processScroll);

		function processScrollInit() {
			var subhead = document.getElementById('subhead');

			if (subhead) {
				navTop = document.querySelector('.subhead').offsetHeight;

				if (document.getElementById('sidebar-wrapper').style.display === 'none') {
					subhead.style.left = 0;
				}

				// Only apply the scrollspy when the toolbar is not collapsed
				if (document.body.clientWidth > 480) {
					document.querySelector('.subhead-collapse').style.height = document.querySelector('.subhead').style.height;
					subhead.style.width = 'auto';
				}
			}
		}

		function processScroll() {
			var subhead = document.getElementById('subhead');

			if (subhead) {
				var scrollTop = (window.pageYOffset || subhead.scrollTop)  - (subhead.clientTop || 0);

				if (scrollTop >= navTop && !isFixed) {
					isFixed = true;
					subhead.classList.add('subhead-fixed');

					if (document.getElementById('sidebar-wrapper').style.display === 'none') {
						subhead.style.left = 0;
					}
				} else if (scrollTop <= navTop && isFixed) {
					isFixed = false;
					subhead.classList.remove('subhead-fixed');
				}
			}
		}

		// Custom select colour states
		var colourSelects = document.querySelectorAll('.custom-select-color-state');
		for (var i = 0; i < colourSelects.length; i++)
		{
			// Add class on page load
			var selectBox = colourSelects[i];
			if (selectBox.value == 1)
			{
				selectBox.classList.add('custom-select-success');
			}
			else if (selectBox.value == 0)
			{
				selectBox.classList.add('custom-select-danger');
			}

			// Add class when value is changed
			selectBox.addEventListener('change', function(){
				this.classList.remove('custom-select-success', 'custom-select-danger');
				if (this.value == 1)
				{
					this.classList.add('custom-select-success');
				}
				else if (this.value == 0 || this.value == parseInt(-2))
				{
					this.classList.add('custom-select-danger');
				}
			});
		}

	});
})();
