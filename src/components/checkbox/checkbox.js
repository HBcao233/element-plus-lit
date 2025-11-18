import { ElElement, html, css } from '../element/index.js';

export default class Checkbox extends ElElement {
  static styles = css`
:host {
  --el-checkbox-font-size: 14px;
  --el-checkbox-font-weight: var(--el-font-weight-primary);
  --el-checkbox-text-color: var(--el-text-color-regular);
  --el-checkbox-input-height: 14px;
  --el-checkbox-input-width: 14px;
  --el-checkbox-border-radius: var(--el-border-radius-small);
  --el-checkbox-bg-color: var(--el-fill-color-blank);
  --el-checkbox-input-border: var(--el-border);
  --el-checkbox-disabled-border-color: var(--el-border-color);
  --el-checkbox-disabled-input-fill: var(--el-fill-color-light);
  --el-checkbox-disabled-icon-color: var(--el-text-color-placeholder);
  --el-checkbox-disabled-checked-input-fill: var(--el-border-color-extra-light);
  --el-checkbox-disabled-checked-input-border-color: var(--el-border-color);
  --el-checkbox-disabled-checked-icon-color: var(--el-text-color-placeholder);
  --el-checkbox-checked-text-color: var(--el-color-primary);
  --el-checkbox-checked-input-border-color: var(--el-color-primary);
  --el-checkbox-checked-bg-color: var(--el-color-primary);
  --el-checkbox-checked-icon-color: var(--el-color-white);
  --el-checkbox-input-border-color-hover: var(--el-color-primary);
}

[part=el-checkbox] {
  color: var(--el-checkbox-text-color);
  font-weight: var(--el-checkbox-font-weight);
  font-size: var(--el-font-size-base);
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
  margin-right: 30px;
  height: var(--el-checkbox-height, 32px);
  -webkit-tap-highlight-color: transparent;
}

[part=el-checkbox]:last-of-type {
  margin-right: 0;
}

:host([size=large]) {
  height: 40px;
}

[part=input] {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  position: relative;
}

[part=original] {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  padding: 0;
  touch-action: manipulation;
  box-sizing: border-box;
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  z-index: -1;
}

[part=inner] {
  display: inline-block;
  position: relative;
  border: var(--el-checkbox-input-border);
  border-radius: var(--el-checkbox-border-radius);
  box-sizing: border-box;
  width: var(--el-checkbox-input-width);
  height: var(--el-checkbox-input-height);
  background-color: var(--el-checkbox-bg-color);
  z-index: var(--el-index-normal);
  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}

:host([checked]) [part=inner] {
  background-color: var(--el-checkbox-checked-bg-color);
  border-color: var(--el-checkbox-checked-input-border-color);
}

:host([indeterminate]) [part=inner] {
  background-color: var(--el-checkbox-checked-bg-color);
  border-color: var(--el-checkbox-checked-input-border-color);
}

:host([size=large]) [part=inner] {
  width: 14px;
  height: 14px;
}

[part=inner]::after {
  box-sizing: content-box;
  content: "";
  border: 1px solid transparent;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-45%,-60%) rotate(45deg) scaleY(0);
  width: 3px;
  transition: transform .15s ease-in .05s;
  transform-origin: center;
}

:host([checked]) [part=inner]::after {
  transform: translate(-45%,-60%) rotate(45deg) scaleY(1);
  border-color: var(--el-checkbox-checked-icon-color);
}

:host([indeterminate]) [part=inner]::after {
  content: unset;
}
:host([indeterminate]) [part=inner]::before {
  content: "";
  position: absolute;
  display: block;
  background-color: var(--el-checkbox-checked-icon-color);
  height: 2px;
  transform: scale(.5);
  left: 0;
  right: 0;
  top: 5px;
}


[part=label] {
  display: inline-block;
  padding-left: 8px;
  line-height: 1;
  font-size: var(--el-checkbox-font-size);
}

:host([checked]) [part=label] {
  color: var(--el-checkbox-checked-text-color);
}

:host([size=large]) [part=label] {
  font-size: 14px;
}
  `;
  
  static properties = {
    // if the Checkbox is checked
    checked: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    // label of the Checkbox when used inside a checkbox-group.
    label: {
      type: String,
      attribute: true,
      default: '',
    },
    // size of the Checkbox
    size: {
      type: String,
      attribute: true,
    },
    // value of the Checkbox when used inside a checkbox-group
    value: {
      type: String,
      attribute: true,
    },
    // value of the Checkbox if it's checked
    trueValue: {
      type: String,
      attribute: 'true-value',
    },
    // value of the Checkbox if it's not checked
    falseValue: {
      type: String,
      attribute: 'false-value',
    },
    disabled: {
      type: Boolean,
    },
    // native 'name' attribute
    name: {
      type: String,
      attribute: true,
    },
    indeterminate: {
      type: Boolean,
      default: false,
      attribute: true,
      reflect: true,
    },
  }
  
  render() {
    return html`
<label part="el-checkbox">
  <span part="input">
    <input part="original" type="checkbox" value="${this.value}" @change="${this.onChange}">
    <span part="inner"></span>
  </span>
  <span part="label">${this.label}</span>
</label>
    `;
  }
  
  onChange(e) {
    this.checked = e.target.checked;
    this.dispatchEvent(new Event('change', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
  }
}

customElements.define('el-checkbox', Checkbox);
