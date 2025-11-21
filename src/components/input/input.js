import { ElElement, html, css } from '../element/index.js';

export default class Input extends ElElement {
  static formAssociated = true;
  
  static styles = css`
:host {
  --el-input-text-color: var(--el-text-color-regular);
  --el-input-border: var(--el-border);
  --el-input-hover-border: var(--el-border-color-hover);
  --el-input-focus-border: var(--el-color-primary);
  --el-input-transparent-border: 0 0 0 1px transparent inset;
  --el-input-border-color: var(--el-border-color);
  --el-input-border-radius: var(--el-border-radius-base);
  --el-input-bg-color: var(--el-fill-color-blank);
  --el-input-icon-color: var(--el-text-color-placeholder);
  --el-input-placeholder-color: var(--el-text-color-placeholder);
  --el-input-hover-border-color: var(--el-border-color-hover);
  --el-input-clear-hover-color: var(--el-text-color-secondary);
  --el-input-focus-border-color: var(--el-color-primary);
  --el-input-width: 100%;
}

:host {
  --el-input-height: var(--el-component-size);
  position: relative;
  font-size: var(--el-font-size-base);
  display: inline-flex;
  width: var(--el-input-width);
  line-height: var(--el-input-height);
  box-sizing: border-box;
  vertical-align: middle;
}

:host {
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
}

[part=wrapper] {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 1px 11px;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  cursor: text;
  transition: var(--el-transition-box-shadow);
  transform: translateZ(0);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}

[part=wrapper]:hover {
  box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
}

[part=inner] {
  margin: 0;
  font-family: inherit;
  touch-action: manipulation;
}
[part=inner] {
  width: 100%;
  flex-grow: 1;
  -webkit-appearance: none;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  font-size: inherit;
  height: var(--el-input-inner-height);
  line-height: var(--el-input-inner-height);
  padding: 0;
  outline: none;
  border: none;
  background: none;
  box-sizing: border-box;
}
  `;
  
  static properties = {
    name: {
      type: String,
      attribute: true,
    },
    value: {
      type: String,
      attribute: true,
    },
    placeholder: {
      type: String,
    },
    submitOnBlur: {
      type: Boolean,
      attribute: 'submit-on-blur',
    },
    
    isComposing: {
      type: Boolean,
      state: true,
    },
  }
  
  render() {
    return html`<div part="wrapper" tabindex="-1">
  <input 
    part="inner" 
    type="text" 
    name="${this.name}"
    autocomplete="off" 
    tabindex="0" 
    placeholder="${this.placeholder}" 
    value="${this.value}" 
    @change="${this.onChange}" 
    @input="${this.onInput}"
    @compositionstart="${this.onCompositionstart}"
    @compositionend="${this.onCompositionend}"
    @keyup="${this.onKeyup}"
    @focus="${this.onFocus}"
    @blur="${this.onBlur}"
  />
</div>`;
  }
  
  firstUpdated() {
    this.input = this.renderRoot.firstElementChild.firstElementChild;
  }
  
  focus() {
    this.input.focus();
  }
  
  select() {
    this.input.select();
  }
  
  blur() {
    this.input.blur();
  }
  
  onChange(e) {
    // this.value = e.target.value;
    this.dispatchEvent(new Event('change', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
  }
  
  onInput(e) {
    this.value = e.target.value;
    if (this.name) this.form?.setFormValue(this.name, this.value);
    this.dispatchEvent(new Event('input', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
  }
  
  onCompositionstart(e) {
    this.isComposing = true;
  }
  
  onCompositionend(e) {
    this.isComposing = false;
  }
  
  onKeyup(e) {
    if (e.key === 'Enter' && !this.isComposing) {
      this.form?.requestUpdated();
    }
  }
  
  onFocus() {
    this.dispatchEvent(new Event('focus', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
  }
  
  onBlur() {
    this.dispatchEvent(new Event('blur', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
    if (this.submitOnBlur) {
      this.form?.requestSubmit();
    }
  }
}

customElements.define('el-input', Input);
