import { ElElement, html, css } from '../element/index.js';

export default class Sidebar extends ElElement {
  static styles = css`
:host {
  --el-sidebar-bg-color: #ffffff;
}

[part=el-sidebar] {
  overflow: auto;
  box-sizing: border-box;
  width: var(--el-sidebar-width, 80%);
  height: 100%;
  background-color: var(--el-sidebar-bg-color);
  padding: 48px 32px;
  opacity: 0;
  transform: translateX(-100%);
  transition: 
    background-color var(--el-transition-duration-fast),
    opacity .25s,
    transform .5s cubic-bezier(.19, 1, .22, 1);
}

[part=el-sidebar][open] {
  opacity: 1;
  transform: translateX(0);
}
  `;
  
  static properties = {
    open: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
  }
  
  render() {
    return html`
<el-overlay 
  part="el-overlay" 
  @click="${this.onClick}" 
>
  <el-scrollbar part="el-sidebar"><slot></slot></el-scrollbar>
</el-overlay>`;
  }
  
  get open() {
    return this.overlay.open;
  }
  
  set open(v) {
    this.overlay.open = !!v;
  }
  
  firstUpdated() {
    this.overlay = this.renderRoot.firstElementChild;
  }
  
  show() {
    this.open = true;
  }
  
  hide() {
    this.open = false;
  }
  
  toggle() {
    this.open = !this.open;
  }
  
  onClick(e) {
    if (e.target != this.renderRoot.firstElementChild) return;
    this.open = false;
  }
  
  updated(changedProps) {
    if (changedProps.has('open')) {
      if (this.open) {
        this.dispatchEvent(new Event('show', {
          bubbles: true,
          composed: true,
          cancelable: false,
        }));
      } else {
        this.dispatchEvent(new Event('hide', {
          bubbles: true,
          composed: true,
          cancelable: false,
        }));
      }
    }
  }
  
}

customElements.define('el-sidebar', Sidebar);
