import { ElElement, html, css } from '../element/index.js';

export default class Dialog extends ElElement {
  static styles = css`
:host {
  --el-dialog-width: 50%;
  --el-dialog-margin-top: 15vh;
  --el-dialog-bg-color: var(--el-bg-color);
  --el-dialog-box-shadow: var(--el-box-shadow);
  --el-dialog-title-font-size: var(--el-font-size-large);
  --el-dialog-content-font-size: 14px;
  --el-dialog-font-line-height: var(--el-font-line-height-primary);
  --el-dialog-padding-primary: 16px;
  --el-dialog-border-radius: var(--el-border-radius-base);
}

el-overlay {
  display: flex;
}

[part=el-dialog] {
  position: relative;
  margin: auto;
  background: var(--el-dialog-bg-color);
  border-radius: var(--el-dialog-border-radius);
  box-shadow: var(--el-dialog-box-shadow);
  box-sizing: border-box;
  padding: var(--el-dialog-padding-primary);
  width: var(--el-dialog-width, 50%);
  overflow-wrap: break-word;
}
@media (min-width: 768px) {
  margin: var(--el-dialog-margin-top, 15vh) auto 50px;
}

[part=el-dialog__header] {
  padding-bottom: var(--el-dialog-padding-primary);
}
:host([show-close]) [part=el-dialog__header] {
  padding-right: calc(var(--el-dialog-padding-primary) + var(--el-message-close-size, 16px));
}

[part=el-dialog__title] {
  color: var(--el-text-color-primary);
  font-size: var(--el-dialog-title-font-size);
  line-height: var(--el-dialog-font-line-height);
}
[part=el-dialog__headerbtn]::part(el-button) {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--el-message-close-size,16px);
  height: 48px;
  outline: none;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 48px;
}

[part=el-dialog__body] {
  color: var(--el-text-color-regular);
  font-size: var(--el-dialog-content-font-size);
}
  `;
  
  static properties = {
    open: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    title: {
      type: String,
    },
    showClose: {
      type: Boolean,
      attribute: 'show-close',
      reflect: true,
      default: false,
    }
  }
  
  render() {
    return html`
<el-overlay part="el-overlay" ?open="${this.open}" @click="${this.onClick}" @hide="${this.onHide}">
  <div part="el-dialog">
    <header part="el-dialog__header">
      <span part="el-dialog__title" role="heading" aria-level="2">${this.title}</span>
      <el-button part="el-dialog__headerbtn" icon="Close"></el-button>
    </header>
    <div part="el-dialog__body"><slot></slot></div>
  </div>
</el-overlay>`;
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
  
  onHide() {
    this.open = false;
  }
}

customElements.define('el-dialog', Dialog);
