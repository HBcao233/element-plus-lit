import { ElElement, html, css } from '/src/element.js';

export class Switch extends ElElement {
  static styles = css`
:host {
  --el-switch-on-color: var(--el-color-primary);
  --el-switch-off-color: var(--el-border-color);
}

[part="el-switch"] {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 32px;
  vertical-align: middle;
}

[part="input"] {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  overflow: visible;
  touch-action: manipulation;
  box-sizing: border-box;
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
}

[part="core"] {
  display: inline-flex;
  position: relative;
  align-items: center;
  min-width: 40px;
  height: 20px;
  border: 1px solid var(--el-switch-border-color, var(--el-switch-off-color));
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--el-switch-off-color);
  cursor: pointer;
  transition: border-color var(--el-transition-duration),background-color var(--el-transition-duration);
}
:host([checked]) [part="core"] {
  border-color: var(--el-switch-border-color, var(--el-switch-on-color));
  background-color: var(--el-switch-on-color);
}

[part="action"] {
  position: absolute;
  left: 1px;
  border-radius: var(--el-border-radius-circle);
  transition: all var(--el-transition-duration);
  width: 16px;
  height: 16px;
  background-color: var(--el-color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--el-switch-off-color);
}
:host([checked]) [part="action"] {
  left: calc(100% - 17px);
  color: var(--el-switch-on-color);
}
  `;
  
  static properties = {
    checked: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    disabled: {
      type: Boolean,
      reflect: true,
      default: false,
    },
    value: {
      state: true,
    },
    activeValue: {
      attribute: 'active-value',
    },
    inactiveValue: {
      attribute: 'inactive-value',
    },
  }
  
  render() {
    return html`<label part="el-switch"><div part="core"><input part="input" type="checkbox" ?checked="${this.checked}" @change="${this.onChange}"><div part="action"></div></div></label>`;
  }
  
  onChange(e) {
    this.checked = e.target.checked;
    this.value = (this.checked ? this.activeValue : this.inactiveValue) ?? this.checked;
    if (this.name) this.form?.setFormValue(this.name, this.value);
    this.dispatchEvent(new Event('change', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
  }
}

customElements.define('el-switch', Switch);
