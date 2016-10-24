/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @since       4.0
 */

(function($)
{
	$(document).ready(function()
	{
		var wrapper = document.getElementById('wrapper');

		/**
		 * Bootstrap tooltips
		 */
		$('*[rel=tooltip]').tooltip({
			html: true
		});

		if (!document.getElementById('sidebar-wrapper').getAttribute('data-hidden')) {
			/**
			 * Sidebar
			 */
			var sidebar = document.getElementById('sidebar-wrapper');
			var menu    = sidebar.querySelector('#menu');
			// Apply 2nd level collapse
			var first = Array.prototype.slice.call(menu.querySelector('.collapse-level-1'));
			first.forEach(function(){
				this.classList.remove('collapse-level-1').add('collapse-level-2');
			});

			// menu.querySelector('.nav > .parent > a')
			// 	.classList.remove('data-parent');

			function animateWrapper()
			{
				var logo       = document.getElementById('main-brand');
				var menuToggle = document.getElementById('header').querySelector('.menu-toggle');
				var isClosed   = wrapper.classList.contains('closed');

				if (isClosed)
				{
					/// Let's just change the class
					// And do the animation with css
					// logo.stop(true, false).fadeIn();
					wrapper.classList.remove('closed');
					menuToggle.classList.remove('active');
					isClosed = false;
				}
				else
				{
					sidebar.querySelector('.collapse').classList.remove('in');
					sidebar.querySelector('.collapse-arrow').classList.add('collapsed');
					menuToggle.classList.add('active');
					/// Let's just change the class
					// And do the animation with css
					// logo.stop(true, false).fadeOut();
					wrapper.classList.add('closed');
					isClosed = true;
				}
			}

			// Toggle menu
			document.getElementById('menu-collapse').addEventListener('click', function(e) {
				e.preventDefault();
				animateWrapper();
			});

			var classses = ["#wrapper.closed .sidebar-wrapper [data-toggle='collapse']"];
			classses.forEach(function(item) {
				var tmp = document.querySelector(item);
				tmp.addEventListener('click', function () {
					if (wrapper.classList.contains('closed') && window.outerWidth > 767) {
						animateWrapper();
					}
				});
			});

			// Set the height of the menu to prevent overlapping
			function setMenuHeight()
			{
				var height = $('#header').height() + $('#main-brand').outerHeight();
				$('#menu').height( $(window).height() - height );
			}
			setMenuHeight();

			// Remove 'closed' class on resize
			$(window).on('resize', function() {
				if (wrapper.classList.contains('closed'))
				{
					animateWrapper();
				}
				setMenuHeight();
			});

			/**
			 * Localstorage to remember which menu item was clicked on
			 */
			// menu.queryselector('a').on('click', function(){
			//
			// 	var href = $(this).attr('href');
			//
			// 	if (typeof(Storage) !== 'undefined')
			// 	{
			// 		// Set the last selection in localStorage
			// 		localStorage.setItem('href', href);
			// 	}
			//
			// });

			// Auto expand
			// if (typeof(Storage) !== 'undefined')
			// {
			// 	var wLocationpath   = window.location.pathname;
			// 	var wLocationSearch = window.location.search;
			//
			// 	if ((wLocationpath !== '/administrator/' || wLocationpath !== '/administrator/index.php') && wLocationSearch == '')
			// 	{
			// 		localStorage.setItem('href', false);
			// 	}
			//
			// 	var localItem       = menu.find('a[href="' + localStorage.getItem('href') + '"]');
			// 	var localitemParent = localItem.parents('.parent').find('a')[0];
			//
			// 	if (typeof(localitemParent) !== 'undefined')
			// 	{
			// 		localitemParent.click();
			// 	}
			// }
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
		var container = document.querySelectorAll('.btn-group.btn-group-yesno');
		for (var i = 0; i < container.length; i++) {
			var labels = container[i].querySelectorAll('label');
			for (var i = 0; i < labels.length; i++) {
				labels[i].classList.add('btn');
				if ((i % 2) == 1) {
					labels[i].classList.add('btn-outline-danger');
				} else {
					labels[i].classList.add('btn-outline-success');

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
			var self  = btsGrouped[i];
			var attrId = self.id;
			if (self.parentNode.parentNode.classList.contains('btn-group-reversed')) {
				if (self.value == '') {
					var aa =document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-primary');
				} else if (self.value == 0) {
					var aa =document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-success');
				} else {
					var aa =document.querySelector('label[for=' + attrId + ']');
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
					var aa =document.querySelector('label[for=' + attrId + ']');
					aa.classList.add('active');
					aa.classList.add('btn');
					aa.classList.add('btn-outline-danger');
				} else {
					var aa =document.querySelector('label[for=' + attrId + ']');
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

			if (subhead)
			{
				navTop = document.querySelector('.subhead').offsetHeight;

				// Only apply the scrollspy when the toolbar is not collapsed
				if (document.body.clientWidth > 480)
				{
					document.querySelector('.subhead-collapse').style.height = document.querySelector('.subhead').style.height;
					subhead.style.width = 'auto';
				}
			}
		}

		function processScroll() {
			var subhead = document.getElementById('subhead');

			if (subhead)
			{
				var scrollTop = (window.pageYOffset || subhead.scrollTop)  - (subhead.clientTop || 0);

				if (scrollTop >= navTop && !isFixed)
				{
					isFixed = true;
					subhead.classList.add('subhead-fixed');
					subhead.style.top = '70px';
					subhead.style.width = document.querySelector('.container-main').offsetWidth +'px';
				}
				else if (scrollTop <= navTop && isFixed)
				{
					isFixed = false;
					subhead.classList.remove('subhead-fixed');
				}
			}
		}
	});
})(jQuery);
