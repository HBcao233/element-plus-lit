import { ElElement, html, css } from '/src/element.js';

export default class Container extends ElElement {
  static styles = css`
:host {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
  flex: 1;
  flex-basis: auto;
}
  `;
  
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('el-container', Container);
