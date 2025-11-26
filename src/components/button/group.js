import { ElElement, html, css } from '/src/element.js';

export default class ButtonGroup extends ElElement {
  static styles = css`
:host {
  display: inline-block;
  vertical-align: middle;
}

::slotted(el-button) {
  float: left;
  position: relative;
}

:host > ::slotted(el-button + el-button) {
  margin-left: 0;
}
  `;
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('el-button-group', ButtonGroup);
