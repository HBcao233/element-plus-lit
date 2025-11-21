import { ElElement, html, css } from '../element/index.js';

export default class Overlay extends ElElement {
  static styles = css`
:host {
  display: block;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  overflow: auto;
  visibility: hidden;
  opacity: 0;
  transition: 
    visibility var(--el-transition-duration-fast),
    opacity .25s;
  border: none;
  padding: 0;
  margin: unset;
  max-width: unset;
  max-height: unset;
  background-color: var(--el-overlay-color-lighter);
}

:host([open]) {
  visibility: visible;
  opacity: 1;
}
  `;
  
  static properties = {
    open: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    popover: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: true,
    },
  }
  
  render() {
    return html`<slot></slot>`;
  }
  
  updated(changedProps) {
    if (changedProps.has('open')) {
      if (this.open) {
        this.showPopover();
        this.dispatchEvent(new Event('show', {
          bubbles: true,
          composed: false,
          cancelable: false,
        }));
      } else {
        this.hidePopover();
        this.dispatchEvent(new Event('hide', {
          bubbles: true,
          composed: false,
          cancelable: false,
        }));
      }
    }
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
}

customElements.define('el-overlay', Overlay);
