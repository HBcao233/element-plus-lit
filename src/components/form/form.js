import { ElElement, html, css } from '../element/index.js';

export default class Form extends ElElement {
  static styles = css`
:host {
  margin: 0;
  --el-form-label-font-size: var(--el-font-size-base);
  --el-form-inline-content-width: 220px;
}
  `;
  
  value = {};
  
  setFormValue(name, value) {
    this.value[name] = value;
  }
  
  formdata() {
    let data = new FormData();
    for (const [k, v] of Object.entries(this.value)) {
      data.set(k, v);
    }
    return data;
  }
  
  render() {
    return html`<form part="el-form" @submit="${this.onSubmit}"><slot></slot></form>`;
  }
  
  onSubmit(e) {
    const success = this.dispatchEvent(new Event('submit', {
      bubbles: true,
      composed: true,
      cancelable: true,
    }));
    if (!success) e.preventDefault();
  }
  
  firstUpdated() {
    this.form = this.renderRoot.firstElementChild;
    this.renderRoot.addEventListener('slotchange', (e) => {
      const elements = e.target.assignedElements();
      for (const ele of elements) {
        ele.form = this;
      }
    })
  }
  
  submit() {
    this.form.submit();
  }
  requestSubmit() {
    this.form.requestSubmit();
  }
}

customElements.define('el-form', Form);
