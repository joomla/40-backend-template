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

		/** http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery */
		function closest(el, selector) {
			var parent;

			// traverse parents
			while (el) {
				parent = el.parentElement;
				if (parent && parent['matches'](selector)) {
					return parent;
				}
				el = parent;
			}

			return null;
		}

		/**
		 * Bootstrap tooltips
		 */
		jQuery('*[rel="tooltip"]').tooltip({
			html: true
		});

		if (document.getElementById('sidebar-wrapper') && !document.getElementById('sidebar-wrapper').getAttribute('data-hidden')) {
			/** Sidebar */
			var sidebar       = document.getElementById('sidebar-wrapper'),
			    menu          = sidebar.querySelector('#menu'),
			    logo          = document.getElementById('main-brand'),
			    logoSm        = document.getElementById('main-brand-sm'),
			    menuToggle    = document.getElementById('header').querySelector('.menu-toggle'),
			    wrapperClosed = document.querySelector('#wrapper.closed'),
			    // Apply 2nd level collapse
			    first         = menu.querySelectorAll('.collapse-level-1');

			for (var i = 0; i < first.length; i++) {
				var second = first[i].querySelectorAll('.collapse-level-1');
				for (var j = 0; j < second.length; j++) {
					if (second[j]) {
						second[j].classList.remove('collapse-level-1');
						second[j].classList.add('collapse-level-2');
					}
				}
			}

			var menuClose = function() {
				// sidebar.querySelector('.collapse').classList.remove('in');
				// sidebar.querySelector('.collapse-arrow').classList.add('collapsed');
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

			/** Localstorage to remember the menu state (open/close) */
			var saveState = function () {
				if (typeof(Storage) !== 'undefined') {
					// Set the state of the menu in localStorage
					localStorage.setItem('adminMenuState', wrapper.classList.contains('closed'));
				}
			};

			var animateWrapper = function(keepOpen) {
				if (window.outerWidth > 767) {
					if (wrapper.classList.contains('closed') || keepOpen && keepOpen === true) {
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

			/**
			 * Sidebar Accordion
			 */
			var clickableElems = document.querySelectorAll('.main-nav li.parent > a');

			for (var i = 0; i < clickableElems.length; i++) {

				clickableElems[i].addEventListener('click', function(e) {
					var current = e.target;
					if ((current.tagName && current.tagName.toLowerCase() !== 'a') || !current.tagName) current = e.target.parentNode;
					current.removeAttribute('href');
					if (current.classList.contains('open')) {
						current.classList.remove('open');
						if (current.parentNode.querySelector('li')) current.parentNode.querySelector('li').classList.remove('open');
						var ulEl = current.parentNode.querySelectorAll('ul');
						for (var k = 0; k < ulEl.length; k++) {
							ulEl[k].style.display = 'none';
							ulEl[k].classList.remove('fadein');
							ulEl[k].classList.add('fadeout');
						}
					}
					else {
						var siblings = current.parentNode.parentNode.childNodes;

						for (var j = 0; j < siblings.length; j++) {
							if (siblings[j].tagName && siblings[j].tagName.toLowerCase() === 'li' && siblings[j].classList.contains('parent')) {
								var ulEl = siblings[j].querySelectorAll('ul');
								for (var k = 0; k < ulEl.length; k++) {
									ulEl[k].style.display = 'none';
									ulEl[k].classList.remove('open');
								}
								siblings[j].classList.remove('open');
							}
						}
						current.classList.add('open');
						if (current.parentNode.querySelector('ul')) {
							current.parentNode.querySelector('ul').classList.add('fadein');
							current.parentNode.querySelector('ul').classList.remove('fadeout');
							current.parentNode.querySelector('ul').style.display = 'block';
						}
					}
				});

			}

			/** Accessibility */
			var allLiEl = sidebar.querySelectorAll('ul[role="menubar"] li');
			for (var i = 0; i < allLiEl.length; i++) {
				// We care for enter and space
				allLiEl[i].addEventListener('keyup', function(e) {
					if (e.keyCode == 32 || e.keyCode == 13 ) e.target.querySelector('a').click();
				});
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
						var parentLink = closest(allLinks[i], '.expandable');
						/** Auto Expand First Level */
						if (parentLink){
							parentLink.parentNode.querySelector('a.collapse-arrow').classList.add('active');
							if (!wrapper.classList.contains('closed')) {
									parentLink.classList.add('in');
							}
						}
						/** Auto Expand Second Level */
						if (allLinks[i].parentNode.parentNode.parentNode.classList.contains('parent')) {
							var parentLink2 = closest(parentLink, '.expandable');
							if (parentLink2){
								parentLink2.parentNode.parentNode.parentNode.querySelector('a.collapse-arrow').classList.add('active');
								if (!wrapper.classList.contains('closed')) {
									parentLink2.classList.add('in');
								}
							}
						}
					}
				}
			}

			if (typeof(Storage) !== 'undefined') {
				if (localStorage.getItem('adminMenuState') == "true") {
					menuClose();
				}
			}

		} else {
			if (document.getElementById('sidebar-wrapper')) {
				document.getElementById('sidebar-wrapper').style.display = 'none';
				document.getElementById('sidebar-wrapper').style.width = '0';
			}

			if (document.getElementsByClassName('wrapper').length)
				document.getElementsByClassName('wrapper')[0].style.paddingLeft = '0';
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

		var btnGroupActive = document.querySelector('.btn-group label:not(.active)');
		if (btnGroupActive) {
			btnGroupActive.addEventListener('click', function(event) {
				var label = event.target;
				var input = document.getElementById(label.getAttribute('for'));

				if (input.getAttribute('checked') !== "checked") {
					closest(label, '.btn-group').querySelector('label').classList.remove('active', 'btn-success', 'btn-danger', 'btn-primary');

					if (closest(label, '.btn-group').classList.contains('btn-group-reversed')) {
						if (!label.classList.contains('btn')) label.classList.add('btn');
						if (input.value == '') {
							label.classList.add('btn', 'btn-outline-primary', 'active');
						} else if (input.value == 0) {
							label.classList.add('btn', 'btn-outline-success', 'active');
						} else {
							label.classList.add('btn', 'btn-outline-danger', 'active');
						}
					} else {
						if (input.value == '') {
							label.classList.add('btn', 'btn-outline-primary', 'active');
						} else if (input.value == 0) {
							label.classList.add('btn', 'btn-outline-danger', 'active');
						} else {
							label.classList.add('btn', 'btn-outline-success', 'active');
						}
					}
					input.setAttribute('checked', true);
				}
			});
		}

		var btsGrouped = document.querySelectorAll('.btn-group input[checked=checked]');

		for(var i = 0, l = btsGrouped.length; l>i; i++) {
			if (btsGrouped[i].parentNode.parentNode.classList.contains('btn-group-reversed')) {
				if (btsGrouped[i].value == '') {
					document.querySelector('label[for=' + btsGrouped[i].id + ']').classList.add('btn', 'btn-outline-primary', 'active');
				} else if (btsGrouped[i].value == 0) {
					document.querySelector('label[for=' + btsGrouped[i].id + ']').classList.add('btn', 'btn-outline-success', 'active');
				} else {
					document.querySelector('label[for=' + btsGrouped[i].id + ']').classList.add('btn', 'btn-outline-danger', 'active');
				}
			} else {
				if (btsGrouped[i].value == '') {
					document.querySelector('label[for=' + btsGrouped[i].id + ']').classList.add('active', 'btn-outline-primary');
				} else if (btsGrouped[i].value == 0) {
					document.querySelector('label[for=' + btsGrouped[i].id + ']').classList.add('btn', 'btn-outline-danger', 'active');
				} else {
					document.querySelector('label[for=' + btsGrouped[i].id + ']').classList.add('btn', 'btn-outline-success', 'active');
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
	});
})();
