import { ElElement, html, css } from '/src/element.js';
import { isIterable } from '/src/utils.js';

class Dialog extends ElElement {
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
  --el-dialog-text-color: var(--el-text-color-regular);
}

[part=el-dialog] {
  display: flex;
}

[part=content] {
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
  [part=content] {
    margin: var(--el-dialog-margin-top, 15vh) auto 50px;
  }
}

[part=header] {
  padding-bottom: var(--el-dialog-padding-primary);
}
:host([show-close]) [part=header] {
  padding-right: calc(var(--el-dialog-padding-primary) + var(--el-message-close-size, 16px));
}

[part=title] {
  color: var(--el-text-color-primary);
  font-size: var(--el-dialog-title-font-size);
  line-height: var(--el-dialog-font-line-height);
}

[part=headerbtn]::part(el-button) {
  display: none;
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
:host([show-close]) [part=headerbtn]::part(el-button) {
  display: block;
}

[part=body] {
  color: var(--el-dialog-text-color);
  font-size: var(--el-dialog-content-font-size);
}

[part=footer] {
  padding-top: var(--el-dialog-padding-primary);
  text-align: right;
  box-sizing: border-box;
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
    },
  }
  
  render() {
    return html`
<el-overlay part="el-dialog" @click="${this.onClick}">
  <div part="content">
    <header part="header">
      <slot name="header">
        <span part="title" role="heading" aria-level="2">${this.title}</span>
        <el-button part="headerbtn" icon="Close"></el-button>
      </slot>
    </header>
    <div part="body"><slot></slot></div>
    <footer part="footer"><slot name="footer"></slot></footer>
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
  
  
  firstUpdated() {
    this.overlay = this.renderRoot.firstElementChild;
    this.content = this.overlay.firstElementChild;
  }
  
  get open() {
    return this.overlay?.open;
  }
  
  set open(v) {
    if (this.overlay) this.overlay.open = !!v;
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
  
  get clientWidth() {
    return this.content.clientWidth;
  }
  get clientHeight() {
    return this.content.clientHeight;
  }
  get offsetWidth() {
    return this.content.offsetWidth;
  }
  get offsetHeight() {
    return this.content.offsetHeight;
  }
  get scrollWidth() {
    return this.content.scrollWidth;
  }
  get scrollHeight() {
    return this.content.scrollHeight;
  }
  get scrollLeft() {
    return this.content.scrollLeft;
  }
  get scrollTop() {
    return this.content.scrollTop;
  }
}

customElements.define('el-dialog', Dialog);

export default function ElDialog(options = {}, children) {
  return new Promise((resolve, reject) => {
    const dialog = document.createElement('el-dialog');
    dialog.title = options.title;
    
    if (children) {
      if (!isIterable(children)) children = [children];
      for (const i of children) {
        dialog.appendChild(i); 
      }
    }
    document.body.appendChild(dialog);
    requestAnimationFrame(() => {
      dialog.open = true;
    });
    
    const cleanup = () => {
      dialog.removeEventListener('confirm', handleConfirm);
      dialog.removeEventListener('cancel', handleCancel);
      dialog.close();
    };
    
    dialog.addEventListener('confirm', handleConfirm);
    dialog.addEventListener('cancel', handleCancel);
  });
}