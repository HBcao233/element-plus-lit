import { ElElement, html, css } from '../element/index.js';

export default class Aside extends ElElement {
  static styles = css`
:host {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--el-aside-width, 300px);
}
  `;
  
  static properties = {
    width: {
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
    if (changedProps.has('width')) {
      this.style.setProperty('--el-aside-width', this.width);
    }
  }
}

customElements.define('el-aside', Aside);
