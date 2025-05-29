class Highlight extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		const styles = new CSSStyleSheet()
		styles.replace(`
			.highlight {
				color: white;
				padding: 10px;
				background-color: #4CAF50;
				border-radius: 5px;
				margin: var(--base-margin)
			}
		`)

		const templateContent = `
      <div class="highlight">
        Hello, <span id="name"></span>!
      </div>
    `;

		shadowRoot.innerHTML = templateContent;
		shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, styles]

		this.nameSpan = shadowRoot.getElementById('name');
	}

	static get observedAttributes() {
		return ['name'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'name') {
			this.nameSpan.textContent = newValue;
		}
	}

	connectedCallback() {
		if (!this.hasAttribute('name')) {
			this.setAttribute('name', 'Highlight');
		}
	}
}

// Register the element with the browser
customElements.define('lava-highlight', Highlight);