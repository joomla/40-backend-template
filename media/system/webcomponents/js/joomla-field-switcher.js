;((customElements) => {
	// Keycodes
	const KEYCODE = {
		ENTER: 13,
		SPACE: 32,
	};

	const template = document.createElement('template');
	template.innerHTML = `<style>:host{box-sizing:border-box;display:block;height:28px}.switcher{position:relative;box-sizing:border-box;display:inline-block;width:62px;height:28px;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#f2f2f2;background-clip:content-box;border:1px solid rgba(0,0,0,0.18);border-radius:0;box-shadow:0 0 0 0 #dfdfdf inset;transition:border .4s ease 0s,box-shadow .4s ease 0s}.switcher.active{transition:border .4s ease 0s,box-shadow .4s ease 0s,background-color 1.2s ease 0s}.switcher.active .switch{left:calc((62px / 2) - (1px * 2))}input{position:absolute;top:0;left:0;z-index:2;width:62px;height:28px;padding:0;margin:0;cursor:pointer;opacity:0}.switch{position:absolute;top:0;left:0;width:calc(62px / 2);height:calc(28px - (1px * 2));background:#fff;border-radius:0;box-shadow:0 1px 3px rgba(0,0,0,0.15);transition:left .2s ease 0s}.switcher:focus .switch{-webkit-animation:switcherPulsate 1.5s infinite;animation:switcherPulsate 1.5s infinite}input:checked{z-index:0}.switcher-labels{position:relative}.switcher-labels span{position:absolute;top:0;left:10px;color:#868e96;visibility:hidden;opacity:0;transition:all .2s ease-in-out}.switcher-labels span.active{visibility:visible;opacity:1;transition:all .2s ease-in-out}.primary.switcher.active{background-color:#1e87f0;border-color:#1e87f0;box-shadow:0 0 0 calc(28px / 2) #1e87f0 inset}.secondary.switcher.active{background-color:#868e96;border-color:#868e96;box-shadow:0 0 0 calc(28px / 2) #868e96 inset}.success.switcher.active{background-color:#2f7d32;border-color:#2f7d32;box-shadow:0 0 0 calc(28px / 2) #2f7d32 inset}.warning.switcher.active{background-color:#faa05a;border-color:#faa05a;box-shadow:0 0 0 calc(28px / 2) #faa05a inset}.danger.switcher.active{background-color:#f0506e;border-color:#f0506e;box-shadow:0 0 0 calc(28px / 2) #f0506e inset}@-webkit-keyframes switcherPulsate{0%{box-shadow:0 0 0 0 rgba(66,133,244,0.55)}70%{box-shadow:0 0 0 10px rgba(66,133,244,0)}100%{box-shadow:0 0 0 0 rgba(66,133,244,0)}}@keyframes switcherPulsate{0%{box-shadow:0 0 0 0 rgba(66,133,244,0.55)}70%{box-shadow:0 0 0 10px rgba(66,133,244,0)}100%{box-shadow:0 0 0 0 rgba(66,133,244,0)}}</style>
<slot></slot>`;

	// Patch shadow DOM
	if (window.ShadyCSS) {
		ShadyCSS.prepareTemplate(template, 'joomla-field-switcher');
	}

	class JoomlaSwitcherElement extends HTMLElement {
		/* Attributes to monitor */
		static get observedAttributes() { return ['type', 'off-text', 'on-text']; }

		get type() { return this.getAttribute('type'); }
		set type(value) { return this.setAttribute('type', value); }
		get offText() { return this.getAttribute('off-text') || 'Off'; }
		get onText() { return this.getAttribute('on-text') || 'On'; }

		// attributeChangedCallback(attr, oldValue, newValue) {}

		constructor() {
			super();

			this.attachShadow({mode: 'open'});
			this.shadowRoot.appendChild(template.content.cloneNode(true));

			// Patch shadow DOM
			if (window.ShadyCSS) {
				ShadyCSS.styleElement(this)
			}

			this.inputs = [];
			this.spans = [];
			this.initialized = false;
			this.inputsContainer = '';
			this.newActive = '';
			this.form = '';
			this.inputLabel = '';
			this.inputLabelText = '';

			// Let's bind some functions so we always have the same context
			this.createMarkup = this.createMarkup.bind(this);
			this.addListeners = this.addListeners.bind(this);
			this.removeListeners = this.removeListeners.bind(this);
			this.switch = this.switch.bind(this);
			this.toggle = this.toggle.bind(this);
			this.keyEvents = this.keyEvents.bind(this);
		}

		/* Lifecycle, element appended to the DOM */
		connectedCallback() {
			// Element was moved so we need to re add the event listeners
			if (this.initialized && this.inputs.length > 0) {
				this.addListeners();
				return;
			}

			this.inputs = [].slice.call(this.querySelectorAll('input'));

			if (this.inputs.length !== 2 || this.inputs[0].type !== 'radio') {
				throw new Error('`Joomla-switcher` requires two inputs type="radio"');
			}

			this.form = this.inputs[0].form;

			if (this.form) {
				this.onSubmit = this.onSubmit.bind(this);
				this.form.addEventListener('submit', this.onSubmit);
			}

			this.inputLabel = document.querySelector(`[for="${this.id}"]`);
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

			this.addListeners();
		}

		/* Lifecycle, element removed from the DOM */
		disconnectedCallback() {
			this.removeListeners();
		}

		/* Method to dispatch events */
		dispatchCustomEvent(eventName) {
			const OriginalCustomEvent = new CustomEvent(eventName, { bubbles: true, cancelable: true });
			OriginalCustomEvent.relatedTarget = this;
			this.dispatchEvent(OriginalCustomEvent);
			this.removeEventListener(eventName, this);
		}

		/** Method to build the switch */
		createMarkup() {
			let checked = 0;

			// If no type has been defined, the default as "success"
			if (!this.type) {
				this.setAttribute('type', 'success');
			}

			// Create the first 'span' wrapper
			const spanFirst = document.createElement('span');
			spanFirst.classList.add('switcher');
			spanFirst.classList.add(this.type);
			spanFirst.setAttribute('tabindex', '0');

			const switchEl = document.createElement('span');
			switchEl.classList.add('switch');
			switchEl.classList.add(this.type);

			this.inputs.forEach((input, index) => {
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
			const spanSecond = document.createElement('span');
			spanSecond.classList.add('switcher-labels');

			const labelFirst = document.createElement('span');
			labelFirst.classList.add('switcher-label-0');
			labelFirst.innerHTML = `${this.offText}`;

			const labelSecond = document.createElement('span');
			labelSecond.classList.add('switcher-label-1');
			labelSecond.innerHTML = `${this.onText}`;

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
		switch() {
			this.spans.forEach((span) => {
				span.classList.remove('active');
			});

			if (this.inputsContainer.classList.contains('active')) {
				this.inputsContainer.classList.remove('active');
			} else {
				this.inputsContainer.classList.add('active');
			}

			// Remove active class from all inputs
			this.inputs.forEach((input) => {
				input.classList.remove('active');
			});

			// Check if active
			if (this.newActive === 1) {
				this.inputs[this.newActive].classList.add('active');
				this.inputs[1].setAttribute('checked', '');
				this.inputs[0].removeAttribute('checked');
				this.inputsContainer.setAttribute('aria-checked', true);

				// Aria-label ONLY in the container span!
				this.inputsContainer.setAttribute('aria-label', `${this.inputLabelText} ${this.spans[1].innerHTML}`);

				// Dispatch the "joomla.switcher.on" event
				this.dispatchCustomEvent('joomla.switcher.on');
			} else {
				this.inputs[1].removeAttribute('checked');
				this.inputs[0].setAttribute('checked', '');
				this.inputs[0].classList.add('active');
				this.inputsContainer.setAttribute('aria-checked', false);

				// Aria-label ONLY in the container span!
				this.inputsContainer.setAttribute('aria-label', `${this.inputLabelText} ${this.spans[0].innerHTML}`);

				// Dispatch the "joomla.switcher.off" event
				this.dispatchCustomEvent('joomla.switcher.off');
			}

			this.spans[this.newActive].classList.add('active');
		}

		/** Method to toggle the switch */
		toggle() {
			this.newActive = this.inputs[1].classList.contains('active') ? 0 : 1;
			this.switch();
		}

		keyEvents(event) {
			if (event.keyCode === KEYCODE.ENTER || event.keyCode === KEYCODE.SPACE) {
				event.preventDefault();
				this.newActive = this.inputs[1].classList.contains('active') ? 0 : 1;
				this.switch();
			}
		}

		addListeners() {
			this.inputs.forEach((switchEl) => {
				// Add the active class on click
				switchEl.addEventListener('click', this.toggle);
			});

			this.inputsContainer.addEventListener('keydown', this.keyEvents);
		}

		removeListeners() {
			this.inputs.forEach((switchEl) => {
				// Add the active class on click
				switchEl.removeEventListener('click', this.toggle);
			});

			this.inputsContainer.removeEventListener('keydown', this.keyEvents);
		}

		onSubmit(e) {
			// Check if there is another hidden input (eg form didn't submit)
			const old = document.getElementById(this.inputs[0].id + '_hidden');
			console.log(old)
			if (old) {
				old.parentNode.removeChild(old);
			}

			// Get the current value
			let value = 0;
			const inputs = this.shadowRoot.querySelectorAll('input');

			if (parseInt(inputs[0].value, 10) === 1 || inputs[0].checked) {
				value = 0;
			} else if (parseInt(inputs[1].value, 10) === 1 || inputs[1].checked) {
				value = 1;
			}

			// Create the hidden input for the web component
			const hiddenInput = document.createElement('input');
			hiddenInput.setAttribute('type', 'hidden');
			hiddenInput.setAttribute('value', value.toString(10));
			hiddenInput.setAttribute('name', this.inputs[0].getAttribute('name'));
			hiddenInput.id = this.inputs[0].id + '_hidden';

			this.parentNode.appendChild(hiddenInput);
		}
	}

	customElements.define('joomla-field-switcher', JoomlaSwitcherElement);
})(customElements);
