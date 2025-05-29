class LavaHeader extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const styles = new CSSStyleSheet()
    styles.replace(`
			header {
				background-color: #333;
				color: white;
				padding: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			header h1 {
				margin: 0;
				font-size: 20px;
			}

			nav ul {
				list-style: none;
				display: flex;
				margin: 0;
				padding: 0;
			}

			nav ul li {
				margin-left: 10px;
			}

			nav ul li a {
				color: white;
				text-decoration: none;
			}
		`)

    const headerTemplate = `
      <header>
        <h1><slot>Header</slot></h1>
        <nav>
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">Something</a></li>
						<li><a href="#">About Me</a></li>
					</ul>
				</nav>
        </nav>
      </header>
    `

    shadowRoot.innerHTML = headerTemplate
    shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, styles]
  }

  static get observedAttributes() {
    return ['name']
  }

  connectedCallback() {
    if (!this.hasAttribute('name')) {
      this.setAttribute('name', 'Header')
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
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
          this.gead.textContent = newValue
        }
      } else {
        this.buttonElement.textContent = newValue
      }
    }
  }
}

customElements.define('lava-header', LavaHeader)
