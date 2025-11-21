import { ElElement, html, css } from '../element/index.js';

export default class FormItem extends ElElement {
  static styles = css`
:host {
  display: flex;
  --font-size: 14px;
  margin-bottom: 18px;
}

[part=label-wrap] {
  display: flex;
}

[part=label] {
  display: inline-flex;
  align-items: flex-start;
  flex: 0 0 auto;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  height: 32px;
  line-height: 32px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
[part=content] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
}
  `;
  
  static properties = {
    label: {
      type: String,
    },
    exportparts: {
      type: String,
      default: 'label-wrap,label,content',
    },
  }
  
  render() {
    return html`<div part="label-wrap"><label part="label">${this.label}</label></div><div part="content"><slot></slot></div>`;
  }
}

customElements.define('el-form-item', FormItem);
