import { ElElement, html, css } from '/src/element.js';

export default class Header extends ElElement {
  static styles = css`
:host {
  padding: var(--el-header-padding, 0 20px);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-header-height, 60px);
}
  `;
  
  static properties = {
    padding: {
      type: Number,
      converter: (value, type) => {
        if (!value) return '';
        if (isNaN(parseFloat(value))) return value;
        return value + 'px';
      },
    },
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
    if (changedProps.has('padding')) {
      this.style.setProperty('--el-header-padding', this.padding);
    }
    if (changedProps.has('height')) {
      this.style.setProperty('--el-header-height', this.height);
    }
  }
}

customElements.define('el-header', Header);
