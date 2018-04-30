(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

;(function (customElements) {
	// Keycodes
	var KEYCODE = {
		ENTER: 13,
		SPACE: 32
	};

	var template = document.createElement('template');
	template.innerHTML = '<style>{{CSS_CONTENTS_AUTOMATICALLY_INSERTED_HERE}}</style>\n<slot></slot>';

	// Patch shadow DOM
	if (window.ShadyCSS) {
		ShadyCSS.prepareTemplate(template, 'joomla-field-switcher');
	}

	var JoomlaSwitcherElement = function (_HTMLElement) {
		_inherits(JoomlaSwitcherElement, _HTMLElement);

		_createClass(JoomlaSwitcherElement, [{
			key: 'type',
			get: function get() {
				return this.getAttribute('type');
			},
			set: function set(value) {
				return this.setAttribute('type', value);
			}
		}, {
			key: 'offText',
			get: function get() {
				return this.getAttribute('off-text') || 'Off';
			}
		}, {
			key: 'onText',
			get: function get() {
				return this.getAttribute('on-text') || 'On';
			}

			// attributeChangedCallback(attr, oldValue, newValue) {}

		}], [{
			key: 'observedAttributes',

			/* Attributes to monitor */
			get: function get() {
				return ['type', 'off-text', 'on-text'];
			}
		}]);

		function JoomlaSwitcherElement() {
			_classCallCheck(this, JoomlaSwitcherElement);

			var _this = _possibleConstructorReturn(this, (JoomlaSwitcherElement.__proto__ || Object.getPrototypeOf(JoomlaSwitcherElement)).call(this));

			_this.attachShadow({ mode: 'open' });
			_this.shadowRoot.appendChild(template.content.cloneNode(true));

			// Patch shadow DOM
			if (window.ShadyCSS) {
				ShadyCSS.styleElement(_this);
			}

			_this.inputs = [];
			_this.spans = [];
			_this.initialized = false;
			_this.inputsContainer = '';
			_this.newActive = '';
			_this.form = '';
			_this.inputLabel = '';
			_this.inputLabelText = '';

			_this.createMarkup = _this.createMarkup.bind(_this);
			return _this;
		}

		/* Lifecycle, element appended to the DOM */


		_createClass(JoomlaSwitcherElement, [{
			key: 'connectedCallback',
			value: function connectedCallback() {
				var _this2 = this;

				if (!this.initialized && this.inputs.length === 0) {
					this.inputs = [].slice.call(this.querySelectorAll('input'));

					if (this.inputs.length !== 2 || this.inputs[0].type !== 'radio') {
						throw new Error('`Joomla-switcher` requires two inputs type="radio"');
					}

					this.form = this.inputs[0].form;

					if (this.form) {
						this.onSubmit = this.onSubmit.bind(this);
						this.form.addEventListener('submit', this.onSubmit);
					}

					this.inputLabel = document.querySelector('[for="' + this.id + '"]');
					if (this.inputLabel) {
						this.inputLabelText = this.inputLabel.innerText;
					}
					// Create the markup
					this.createMarkup();

					this.inputsContainer = this.inputs[0].parentNode;

					this.inputsContainer.setAttribute('role', 'switch');

					if (this.inputs[1].checked) {
						this.inputs[1].parentNode.classList.add('active');
						this.spans[1].classList.add('active');

						// Aria-label ONLY in the container span!
						this.inputsContainer.setAttribute('aria-label', this.spans[1].innerHTML);
					} else {
						this.spans[0].classList.add('active');

						// Aria-label ONLY in the container span!
						this.inputsContainer.setAttribute('aria-label', this.spans[0].innerHTML);
					}

					this.inputs.forEach(function (switchEl) {
						// Add the active class on click
						switchEl.addEventListener('click', _this2.toggle.bind(_this2));
					});

					this.inputsContainer.addEventListener('keydown', this.keyEvents.bind(this));
				}
			}

			/* Lifecycle, element removed from the DOM */

		}, {
			key: 'disconnectedCallback',
			value: function disconnectedCallback() {
				this.removeEventListener('joomla.switcher.toggle', this.toggle, true);
				this.removeEventListener('click', this.switch, true);
				this.removeEventListener('keydown', this.keydown, true);
			}

			/* Method to dispatch events */

		}, {
			key: 'dispatchCustomEvent',
			value: function dispatchCustomEvent(eventName) {
				var OriginalCustomEvent = new CustomEvent(eventName, { bubbles: true, cancelable: true });
				OriginalCustomEvent.relatedTarget = this;
				this.dispatchEvent(OriginalCustomEvent);
				this.removeEventListener(eventName, this);
			}

			/** Method to build the switch */

		}, {
			key: 'createMarkup',
			value: function createMarkup() {
				var checked = 0;

				// If no type has been defined, the default as "success"
				if (!this.type) {
					this.setAttribute('type', 'success');
				}

				// Create the first 'span' wrapper
				var spanFirst = document.createElement('span');
				spanFirst.classList.add('switcher');
				spanFirst.classList.add(this.type);
				spanFirst.setAttribute('tabindex', '0');

				var switchEl = document.createElement('span');
				switchEl.classList.add('switch');
				switchEl.classList.add(this.type);

				this.inputs.forEach(function (input, index) {
					// Remove the tab focus from the inputs
					input.setAttribute('tabindex', '-1');

					if (input.checked) {
						spanFirst.setAttribute('aria-checked', true);
					}

					spanFirst.appendChild(input);

					if (index === 1 && input.checked) {
						checked = 1;
					}
				});

				spanFirst.appendChild(switchEl);

				// Create the second 'span' wrapper
				var spanSecond = document.createElement('span');
				spanSecond.classList.add('switcher-labels');

				var labelFirst = document.createElement('span');
				labelFirst.classList.add('switcher-label-0');
				labelFirst.innerHTML = '' + this.offText;

				var labelSecond = document.createElement('span');
				labelSecond.classList.add('switcher-label-1');
				labelSecond.innerHTML = '' + this.onText;

				if (checked === 0) {
					labelFirst.classList.add('active');
				} else {
					labelSecond.classList.add('active');
				}

				this.spans.push(labelFirst);
				this.spans.push(labelSecond);
				spanSecond.appendChild(labelFirst);
				spanSecond.appendChild(labelSecond);

				// Append everything back to the main element
				this.shadowRoot.appendChild(spanFirst);
				this.shadowRoot.appendChild(spanSecond);

				this.initialized = true;
			}

			/** Method to toggle the switch */

		}, {
			key: 'switch',
			value: function _switch() {
				this.spans.forEach(function (span) {
					span.classList.remove('active');
				});

				if (this.inputsContainer.classList.contains('active')) {
					this.inputsContainer.classList.remove('active');
				} else {
					this.inputsContainer.classList.add('active');
				}

				// Remove active class from all inputs
				this.inputs.forEach(function (input) {
					input.classList.remove('active');
				});

				// Check if active
				if (this.newActive === 1) {
					this.inputs[this.newActive].classList.add('active');
					this.inputs[1].setAttribute('checked', '');
					this.inputs[0].removeAttribute('checked');
					this.inputsContainer.setAttribute('aria-checked', true);

					// Aria-label ONLY in the container span!
					this.inputsContainer.setAttribute('aria-label', this.inputLabelText + ' ' + this.spans[1].innerHTML);

					// Dispatch the "joomla.switcher.on" event
					this.dispatchCustomEvent('joomla.switcher.on');
				} else {
					this.inputs[1].removeAttribute('checked');
					this.inputs[0].setAttribute('checked', '');
					this.inputs[0].classList.add('active');
					this.inputsContainer.setAttribute('aria-checked', false);

					// Aria-label ONLY in the container span!
					this.inputsContainer.setAttribute('aria-label', this.inputLabelText + ' ' + this.spans[0].innerHTML);

					// Dispatch the "joomla.switcher.off" event
					this.dispatchCustomEvent('joomla.switcher.off');
				}

				this.spans[this.newActive].classList.add('active');
			}

			/** Method to toggle the switch */

		}, {
			key: 'toggle',
			value: function toggle() {
				this.newActive = this.inputs[1].classList.contains('active') ? 0 : 1;

				this.switch.bind(this)();
			}
		}, {
			key: 'keyEvents',
			value: function keyEvents(event) {
				if (event.keyCode === KEYCODE.ENTER || event.keyCode === KEYCODE.SPACE) {
					event.preventDefault();
					this.newActive = this.inputs[1].classList.contains('active') ? 0 : 1;

					this.switch.bind(this)();
				}
			}
		}, {
			key: 'onSubmit',
			value: function onSubmit(e) {
				// Check if there is another hidden input (eg form didn't submit)
				var old = document.getElementById(this.inputs[0].id + '_hidden');
				console.log(old);
				if (old) {
					old.parentNode.removeChild(old);
				}

				// Get the current value
				var value = 0;
				var inputs = this.shadowRoot.querySelectorAll('input');

				if (parseInt(inputs[0].value, 10) === 1 || inputs[0].checked) {
					value = 0;
				} else if (parseInt(inputs[1].value, 10) === 1 || inputs[1].checked) {
					value = 1;
				}

				// Create the hidden input for the web component
				var hiddenInput = document.createElement('input');
				hiddenInput.setAttribute('type', 'hidden');
				hiddenInput.setAttribute('value', value.toString(10));
				hiddenInput.setAttribute('name', this.inputs[0].getAttribute('name'));
				hiddenInput.id = this.inputs[0].id + '_hidden';

				this.parentNode.appendChild(hiddenInput);
			}
		}]);

		return JoomlaSwitcherElement;
	}(HTMLElement);

	customElements.define('joomla-field-switcher', JoomlaSwitcherElement);
})(customElements);

},{}]},{},[1]);
