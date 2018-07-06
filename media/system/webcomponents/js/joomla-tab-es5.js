(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	/** Include the relative styles */
	// if (!document.head.querySelector('#joomla-tab-style')) {
	// 	const style = document.createElement('style');
	// 	style.id = 'joomla-tab-style';
	// 	style.innerHTML = `joomla-tab{display:flex;flex-direction:column}joomla-tab>ul{display:flex;background-color:#f5f5f5;border-color:#ccc #ccc currentcolor;border-image:none;border-radius:.25rem .25rem 0 0;border-style:solid solid none;border-width:1px 1px 0;box-shadow:0 1px #fff inset,0 2px 3px -3px rgba(0,0,0,.15),0 -4px 0 rgba(0,0,0,.05) inset,0 0 3px rgba(0,0,0,.04);margin:0;padding:0;list-style:outside none none;overflow-x:auto;overflow-y:hidden;white-space:nowrap}joomla-tab a[role=tab]{display:block;color:#0d1321;padding:.75em 1em;position:relative;box-shadow:1px 0 0 rgba(0,0,0,.05);text-decoration:none}joomla-tab a[role=tab][active]{background-color:rgba(0,0,0,.03);background-image:linear-gradient(to bottom,transparent,rgba(0,0,0,.05) 100%);border-left:0 none;border-right:0 none;border-top-left-radius:0;border-top-right-radius:0;box-shadow:2px 0 1px -1px rgba(0,0,0,.08) inset,-2px 0 1px -1px rgba(0,0,0,.08) inset,0 1px 0 rgba(0,0,0,.02) inset}joomla-tab a[role=tab][active]:after{background-color:#006898;bottom:-1px;content:"";height:5px;left:0;opacity:.8;position:absolute;right:0}joomla-tab>section{display:none;background-color:#fefefe;border:1px solid #ccc;border-radius:0 0 .25rem .25rem;box-shadow:0 0 3px rgba(0,0,0,.04);padding:15px}joomla-tab>section[active]{display:block}joomla-tab[orientation=vertical]{flex-direction:row;align-items:flex-start}joomla-tab[orientation=vertical]>ul{flex-direction:column;min-width:30%;height:auto;border:1px solid #ccc;border-radius:.25rem;box-shadow:none;overflow:hidden}joomla-tab[orientation=vertical] li:last-of-type a{border-bottom:0}joomla-tab[orientation=vertical] a{display:block;color:#0d1321;padding:.75em 1em;position:relative;border-bottom:1px solid #ddd;box-shadow:none;text-decoration:none}joomla-tab[orientation=vertical] a[active]{border-left:0 none;border-right:0 none;background-color:#fff;background-image:none;box-shadow:none}joomla-tab[orientation=vertical] a[active]:after{left:-1px;width:5px;height:auto;top:0;bottom:0}joomla-tab[orientation=vertical]>section{border:0 none;box-shadow:none;padding:15px}joomla-tab[view=accordion]>ul{flex-direction:column;border-radius:.25rem;white-space:normal;box-shadow:0 1px #fff inset,0 0 3px rgba(0,0,0,.04)}joomla-tab[view=accordion] section{display:none;padding:15px}joomla-tab[view=accordion] section[active]{display:block;border-bottom:1px solid #ddd}joomla-tab[view=accordion] [active]{background-color:#fff}joomla-tab[view=accordion] a[role=tab]{border-bottom:1px solid #ddd}joomla-tab[view=accordion] a[role=tab][active]:after{width:5px;height:100%;top:0;left:0}`;
	// 	document.head.appendChild(style);
	// }

	customElements.define('joomla-tab', function (_HTMLElement) {
		_inherits(_class, _HTMLElement);

		_createClass(_class, [{
			key: 'recall',
			get: function get() {
				return this.getAttribute('recall');
			}
		}, {
			key: 'view',
			get: function get() {
				return this.getAttribute('view');
			},
			set: function set(value) {
				this.setAttribute('view', value);
			}
		}, {
			key: 'orientation',
			get: function get() {
				return this.getAttribute('orientation');
			},
			set: function set(value) {
				this.setAttribute('oriendation', value);
			}

			/* Lifecycle, element created */

		}], [{
			key: 'observedAttributes',

			/* Attributes to monitor */
			get: function get() {
				return ['recall', 'orientation', 'view'];
			}
		}]);

		function _class() {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

			_this.hasActive = false;
			_this.currentActive = '';
			_this.hasNested = false;
			_this.isNested = false;
			_this.tabs = [];
			return _this;
		}
		/*eslint-enable */


		/* Lifecycle, element appended to the DOM */


		_createClass(_class, [{
			key: 'connectedCallback',
			value: function connectedCallback() {
				var _this2 = this;

				if (!this.orientation || this.orientation && ['horizontal', 'vertical'].indexOf(this.orientation) === -1) {
					this.orientation = 'horizontal';
				}

				// get tab elements
				var self = this;
				var tabs = [].slice.call(this.querySelectorAll('section'));
				var tabsEl = [];
				var tabLinkHash = [];

				// Sanity check
				if (!tabs) {
					return;
				}

				if (this.findAncestor(this, 'joomla-tab')) {
					this.isNested = true;
				}

				if (this.querySelector('joomla-tab')) {
					this.hasNested = true;
				}

				// Use the sessionStorage state!
				if (this.hasAttribute('recall')) {
					var href = sessionStorage.getItem(this.getStorageKey());
					if (href) {
						tabLinkHash.push(href);
					}
				}

				if (this.hasNested) {
					// @todo use the recall attribute
					var _href = sessionStorage.getItem(this.getStorageKey());
					if (_href) {
						tabLinkHash.push(_href);
					}
					// @todo end

					// Add possible parent tab to the array for activation
					if (tabLinkHash.length && tabLinkHash[0] !== '') {
						var hash = tabLinkHash[0].substring(5);
						var element = this.querySelector('#' + hash);

						// Add the parent tab to the array for activation
						if (element) {
							var currentTabSet = this.findAncestor(element, 'joomla-tab');
							var parentTabSet = this.findAncestor(currentTabSet, 'joomla-tab');

							if (parentTabSet) {
								var parentTab = this.findAncestor(currentTabSet, 'section');
								if (parentTab) {
									tabLinkHash.push('#tab-' + parentTab.id);
								}
							}
						}
					}

					// remove the cascaded tabs and activate the right tab
					tabs.forEach(function (tab) {
						if (tabLinkHash.length) {
							var theId = '#tab-' + tab.id;

							if (tabLinkHash.indexOf(theId) === -1) {
								tab.removeAttribute('active');
							} else {
								tab.setAttribute('active', '');
							}
						}

						if (tab.parentNode === self) {
							tabsEl.push(tab);
						}
					});
				} else {
					// Activate the correct tab
					tabs.forEach(function (tab) {
						if (tabLinkHash.length) {
							var theId = '#tab-' + tab.hash;
							if (tabLinkHash.indexOf(theId) > -1) {
								tab.removeAttribute('active');
							} else {
								tab.setAttribute('active', '');
							}
						}
					});

					tabsEl = tabs;
				}

				// Create the navigation
				if (this.view !== 'accordion') {
					this.createNavigation(tabsEl);
				}

				// Add missing role
				tabsEl.forEach(function (tab) {
					tab.setAttribute('role', 'tabpanel');
					_this2.tabs.push('#tab-' + tab.id);
					if (tab.hasAttribute('active')) {
						_this2.hasActive = true;
						_this2.currentActive = tab.id;
						_this2.querySelector('#tab-' + tab.id).setAttribute('aria-selected', 'true');
						_this2.querySelector('#tab-' + tab.id).setAttribute('active', '');
						_this2.querySelector('#tab-' + tab.id).setAttribute('tabindex', '0');
					}
				});

				// Fallback if no active tab
				if (!this.hasActive) {
					tabsEl[0].setAttribute('active', '');
					this.hasActive = true;
					this.currentActive = tabsEl[0].id;
					this.querySelector('#tab-' + tabsEl[0].id).setAttribute('aria-selected', 'true');
					this.querySelector('#tab-' + tabsEl[0].id).setAttribute('tabindex', '0');
					this.querySelector('#tab-' + tabsEl[0].id).setAttribute('active', '');
				}

				// Check if there is a hash in the URI
				if (window.location.href.match(/#\S[^&]*/)) {
					var _hash = window.location.href.match(/#\S[^&]*/);
					var _element = this.querySelector(_hash[0]);

					if (_element) {
						// Activate any parent tabs (nested tables)
						var _currentTabSet = this.findAncestor(_element, 'joomla-tab');
						var _parentTabSet = this.findAncestor(_currentTabSet, 'joomla-tab');

						if (_parentTabSet) {
							var _parentTab = this.findAncestor(_currentTabSet, 'section');
							_parentTabSet.showTab(_parentTab);
							// Now activate the given tab
							this.show(_element);
						} else {
							// Now activate the given tab
							this.showTab(_element);
						}
					}
				}

				// Convert tabs to accordian
				window.addEventListener('resize', function () {
					self.checkView(self);
				});
			}

			/* Lifecycle, element removed from the DOM */

		}, {
			key: 'disconnectedCallback',
			value: function disconnectedCallback() {
				var _this3 = this;

				var ulEl = this.querySelector('ul');
				var navigation = [].slice.call(ulEl.querySelectorAll('a'));

				navigation.forEach(function (link) {
					link.removeEventListener('click', _this3);
				});
				ulEl.removeEventListener('keydown', this);
			}

			/* Method to create the tabs navigation */

		}, {
			key: 'createNavigation',
			value: function createNavigation(tabs) {
				var _this4 = this;

				if (this.firstElementChild.nodeName.toLowerCase() === 'ul') {
					return;
				}

				var nav = document.createElement('ul');
				nav.setAttribute('role', 'tablist');

				/** Activate Tab */
				var activateTabFromLink = function activateTabFromLink(e) {
					e.preventDefault();

					if (_this4.hasActive) {
						_this4.hideCurrent();
					}

					var currentTabLink = _this4.currentActive;

					// Set the selected tab as active
					// Emit show event
					_this4.dispatchCustomEvent('joomla.tab.show', e.target, _this4.querySelector('#tab-' + currentTabLink));
					e.target.setAttribute('active', '');
					e.target.setAttribute('aria-selected', 'true');
					e.target.setAttribute('tabindex', '0');
					_this4.querySelector(e.target.hash).setAttribute('active', '');
					_this4.querySelector(e.target.hash).removeAttribute('aria-hidden');
					_this4.currentActive = e.target.hash.substring(1);
					// Emit shown event
					_this4.dispatchCustomEvent('joomla.tab.shown', e.target, _this4.querySelector('#tab-' + currentTabLink));
					_this4.saveState('#tab-' + e.target.hash.substring(1));
				};

				tabs.forEach(function (tab) {
					if (!tab.id) {
						return;
					}

					var active = tab.hasAttribute('active');
					var liElement = document.createElement('li');
					var aElement = document.createElement('a');

					liElement.setAttribute('role', 'presentation');
					aElement.setAttribute('role', 'tab');
					aElement.setAttribute('aria-controls', tab.id);
					aElement.setAttribute('aria-selected', active ? 'true' : 'false');
					aElement.setAttribute('tabindex', active ? '0' : '-1');
					aElement.setAttribute('href', '#' + tab.id);
					aElement.setAttribute('id', 'tab-' + tab.id);
					aElement.innerHTML = tab.getAttribute('name');

					if (active) {
						aElement.setAttribute('active', '');
					}

					aElement.addEventListener('click', activateTabFromLink);

					liElement.append(aElement);
					nav.append(liElement);

					tab.setAttribute('aria-labelledby', 'tab-' + tab.id);
					if (!active) {
						tab.setAttribute('aria-hidden', 'true');
					}
				});

				this.insertAdjacentElement('afterbegin', nav);

				// Keyboard access
				this.addKeyListeners();
			}
		}, {
			key: 'hideCurrent',
			value: function hideCurrent() {
				// Unset the current active tab
				if (this.currentActive) {
					// Emit hide event
					var el = this.querySelector('a[aria-controls="' + this.currentActive + '"]');
					this.dispatchCustomEvent('joomla.tab.hide', el, this.querySelector('#tab-' + this.currentActive));
					el.removeAttribute('active');
					el.setAttribute('tabindex', '-1');
					this.querySelector('#' + this.currentActive).removeAttribute('active');
					this.querySelector('#' + this.currentActive).setAttribute('aria-hidden', 'true');
					el.removeAttribute('aria-selected');
					// Emit hidden event
					this.dispatchCustomEvent('joomla.tab.hidden', el, this.querySelector('#tab-' + this.currentActive));
				}
			}
		}, {
			key: 'showTab',
			value: function showTab(tab) {
				var tabLink = document.querySelector('#tab-' + tab.id);
				tabLink.click();
			}
		}, {
			key: 'show',
			value: function show(ulLink) {
				ulLink.click();
			}
		}, {
			key: 'addKeyListeners',
			value: function addKeyListeners() {
				var _this5 = this;

				var keyBehaviour = function keyBehaviour(e) {
					// collect tab targets, and their parents' prev/next (or first/last)
					var currentTab = _this5.querySelector('#tab-' + _this5.currentActive);
					// const tablist = [].slice.call(this.querySelector('ul').querySelectorAll('a'));

					var previousTabItem = currentTab.parentNode.previousElementSibling || currentTab.parentNode.parentNode.lastElementChild;
					var nextTabItem = currentTab.parentNode.nextElementSibling || currentTab.parentNode.parentNode.firstElementChild;

					// don't catch key events when ⌘ or Alt modifier is present
					if (e.metaKey || e.altKey) {
						return;
					}

					if (_this5.tabs.indexOf('#' + document.activeElement.id) === -1) {
						return;
					}

					// catch left/right and up/down arrow key events
					switch (e.keyCode) {
						case 37:
						case 38:
							previousTabItem.querySelector('a').click();
							previousTabItem.querySelector('a').focus();
							e.preventDefault();
							break;
						case 39:
						case 40:
							nextTabItem.querySelector('a').click();
							nextTabItem.querySelector('a').focus();
							e.preventDefault();
							break;
						default:
							break;
					}
				};
				this.querySelector('ul').addEventListener('keyup', keyBehaviour);
			}

			/*eslint-disable */

		}, {
			key: 'getStorageKey',
			value: function getStorageKey() {
				return window.location.href.toString().split(window.location.host)[1].replace(/&return=[a-zA-Z0-9%]+/, '').split('#')[0];
			}
			/*eslint-disable */

		}, {
			key: 'saveState',
			value: function saveState(value) {
				var storageKey = this.getStorageKey();
				sessionStorage.setItem(storageKey, value);
			}

			/** Method to convert tabs to accordion and vice versa depending on screen size */

		}, {
			key: 'checkView',
			value: function checkView(self) {
				var nav = self.querySelector('ul');
				var tabsEl = [];
				if (document.body.getBoundingClientRect().width > 920) {
					if (this.view === 'tabs') {
						return;
					}
					self.view = 'tabs';
					// convert to tabs
					var panels = [].slice.call(nav.querySelectorAll('section'));

					// remove the cascaded tabs
					for (var i = 0, l = panels.length; i < l; ++i) {
						if (panels[i].parentNode.parentNode.parentNode === self) {
							tabsEl.push(panels[i]);
						}
					}

					if (tabsEl.length) {
						tabsEl.forEach(function (panel) {
							self.appendChild(panel);
						});
					}
				} else {
					if (this.view === 'accordion') {
						return;
					}
					self.view = 'accordion';

					// convert to accordion
					var _panels = [].slice.call(self.querySelectorAll('section'));

					// remove the cascaded tabs
					for (var _i = 0, _l = _panels.length; _i < _l; ++_i) {
						if (_panels[_i].parentNode === self) {
							tabsEl.push(_panels[_i]);
						}
					}

					if (tabsEl.length) {
						tabsEl.forEach(function (panel) {
							var link = self.querySelector('a[aria-controls="' + panel.id + '"]');
							if (link.parentNode.parentNode === self.firstElementChild) link.parentNode.appendChild(panel);
						});
					}
				}
			}

			/*eslint-disable */

		}, {
			key: 'findAncestor',
			value: function findAncestor(el, tagName) {
				while ((el = el.parentElement) && el.nodeName.toLowerCase() !== tagName) {}
				return el;
			}
			/*eslint-enable */

			/* Method to dispatch events */
			/*eslint-disable */

		}, {
			key: 'dispatchCustomEvent',
			value: function dispatchCustomEvent(eventName, element, related) {
				var OriginalCustomEvent = new CustomEvent(eventName, { bubbles: true, cancelable: true });
				OriginalCustomEvent.relatedTarget = related;
				element.dispatchEvent(OriginalCustomEvent);
				element.removeEventListener(eventName, element);
			}
		}]);

		return _class;
	}(HTMLElement));
})();

},{}]},{},[1]);
