class Button extends HTMLElement {
	constructor() {
		super()
		const shadowRoot = this.attachShadow({ mode: 'open' })

		const sheet = new CSSStyleSheet()
		sheet.replace(`
			button {
				padding: 10px 20px;
				background-color: var(--primary-color);
				color: white;
				border: none;
				border-radius: var(--base-border-radius);
				cursor: pointer;
				font-size: var(--base-body-text);
				margin: var(--base-margin)
			}
			button:hover {
				background-color: var(--primary-color-selected);
			}
		`)

		const buttonTemplate = `
      <button>
        <slot>Click</slot>
      </button>
    `

		shadowRoot.innerHTML = buttonTemplate
		shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
		this.buttonElement = shadowRoot.querySelector('button')
		this.buttonElement.addEventListener('click', () => {
			this.handleClick()
		})
	}

	static get observedAttributes() {
		return ['label']
	}

	connectedCallback() {
		if (!this.hasAttribute('label')) {
			this.setAttribute('label', 'Click Me')
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'label') {
			const slot = this.shadowRoot.querySelector('slot')
			if (slot) {
				const nodes = slot.assignedNodes()
				if (nodes.length > 0) {
					nodes.forEach((node) => {
						if (node.nodeType === Node.TEXT_NODE) {
							node.textContent = newValue
						}
					})
				} else {
					this.buttonElement.textContent = newValue
				}
			} else {
				this.buttonElement.textContent = newValue
			}
		}
	}

	handleClick() {
		console.log('weeee')
	}
}

customElements.define('lava-button', Button)
