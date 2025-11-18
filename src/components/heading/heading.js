import { ElElement, css, staticHtml as html, literal } from '../element/index.js';

const hash = location.hash?.slice(1);
let listened = false;
let found = false;
const Heading = (tag) => {
  return class _Heading extends ElElement {
    static styles = css`
h1, h2, h3, h4, h5, h6 {
  position: relative;
  font-weight: 600;
  color: var(--el-text-color-regular);
  margin: 0;
  line-height: 1.25;
}
h1 {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  font-size: 1.9rem;
}
h2 {
  margin-top: 2.25rem;
  margin-bottom: 1.25rem;
  padding-bottom: .3rem;
  line-height: 1.25;
  font-size: 1.65rem;
}
h3 {
  margin-top: 2rem;
  font-size: 1.35rem;
}
h4 {
  font-size: 1.15rem;
}
h5, h6 {
  font-size: inherit;
}

.header-anchor {
  position: absolute;
  left: 0;
  margin-top: 0;
  margin-left: -.75em;
  padding-right: .23em;
  font-size: .85em;
  opacity: 0;
  color: var(--el-color-primary);
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
h1:hover .header-anchor,
h2:hover .header-anchor,
h3:hover .header-anchor,
h4:hover .header-anchor,
h5:hover .header-anchor,
h6:hover .header-anchor {
  opacity: 1;
}

.header-anchor::before {
  content: "#";
}
    `;
    
    static properties = {
      id: {
        type: String,
        attribute: true,
        reflect: true,
      },
    }
    
    render() {
      return html`
<${tag} id="${this.id}">
  <slot></slot>
  <a class="header-anchor" href="#${this.id}" aria-label="Permalink to &quot;${this.id}&quot;"></a>
</${tag}>`;
    }
  
    firstUpdated() {
      this.renderRoot.addEventListener('slotchange', (e) => {
        const text = e.target.assignedNodes()[0].textContent;
        this.id = text.replaceAll(' ', '-').toLowerCase();
      });
    }
    
    setup() {
      if (!hash) return;
      if (listened) return;
      listened = true;
      const findTag = (e) => {
        if (found) return;
        const target = e.composedPath()[0];
        if (target.id === hash) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          found = true;
          document.removeEventListener('loaded', findTag);
        }
        if (target.renderRoot) {
          const find = (e) => {
            if (found) return;
            if (e.target.id === hash) {
              e.target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
              found = true;
              document.removeEventListener('loaded', findTag);
              target.renderRoot.removeEventListener('updated', find);
            }
          }
          target.renderRoot.addEventListener('updated', find);
        }
      }
      document.addEventListener('loaded', findTag);
    }
  }
}

export const H1 = Heading(literal`h1`);
export const H2 = Heading(literal`h2`);
export const H3 = Heading(literal`h3`);
export const H4 = Heading(literal`h4`);
export const H5 = Heading(literal`h5`);
export const H6 = Heading(literal`h6`);
customElements.define('el-h1', H1);
customElements.define('el-h2', H2);
customElements.define('el-h3', H3);
customElements.define('el-h4', H4);
customElements.define('el-h5', H5);
customElements.define('el-h6', H6);
