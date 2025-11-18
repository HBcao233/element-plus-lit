import { ElElement, html, css } from '../element/index.js';

export default class Menu extends ElElement {
  static styles = css`
:host {
  display: block;
  position: relative;
  top: 0;
  left: 0;
  z-index: var(--el-dropdown-menu-index);
  padding: 5px 0;
  margin: 0;
  background-color: var(--el-bg-color-overlay);
  border: none;
  border-radius: var(--el-border-radius-base);
  box-shadow: none;
  list-style: none;
}
  `;
  static properties = {
  };
  
  render() {
    return html`<slot></slot>`;
  }
  
}

customElements.define('el-dropdown-menu', Menu);
