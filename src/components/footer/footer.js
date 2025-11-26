import { ElElement, html, css } from '/src/element.js';

export default class Footer extends ElElement {
  static styles = css`
:host {
  height: var(--el-footer-height, 60px);
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 20px;
}
  `;
  
  static properties = {
    height: {
      type: String,
      converter: (value, type) => {
        if (!value) return '';
        if (isNaN(parseFloat(value))) return value;
        return value + 'px';
      },
    },
  }
  
  render() {
    return html`<slot></slot>`;
  }
  
  updated(changedProps) {
    if (changedProps.has('height')) {
      this.style.setProperty('--el-footer-height', this.height);
    }
  }
}

customElements.define('el-footer', Footer);
