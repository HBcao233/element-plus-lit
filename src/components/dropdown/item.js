import { ElElement, html, css } from '/src/element.js';

export default class Item extends ElElement {
  static styles = css`
:host {
  display: flex;
  align-items: center;
  white-space: nowrap;
  list-style: none;
  line-height: 22px;
  padding: 5px 16px;
  margin: 0;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-regular);
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
  `;
  static properties = {
  };
  
  render() {
    return html`<slot></slot>`;
  }
  
}

customElements.define('el-dropdown-item', Item);
