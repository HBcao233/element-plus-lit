import { ElElement, html, css } from '/src/element.js';

export default class Main extends ElElement {
  static styles = css`
:host {
  display: block;
  flex: 1;
  overflow: auto;
  flex-basis: auto;
  box-sizing: border-box;
  padding: 20px;
}
::slotted(*) {
  overflow: auto;
}
  `;
  
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('el-main', Main);
