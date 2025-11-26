import { ElElement, html, css, nothing } from '/src/element.js';
import { TinyColor } from '../../../static/tinycolor_v4.2.0.min.js';

export default class Button extends ElElement {
  static styles = css`
:host {
  --el-button-font-weight: var(--el-font-weight-primary);
  --el-button-border-color: var(--el-border-color);
  --el-button-bg-color: var(--el-fill-color-blank);
  --el-button-text-color: var(--el-text-color-regular);
  --el-button-disabled-text-color: var(--el-disabled-text-color);
  --el-button-disabled-bg-color: var(--el-fill-color-blank);
  --el-button-disabled-border-color: var(--el-border-color-light);
  --el-button-divide-border-color: rgba(255, 255, 255, .5);
  --el-button-hover-text-color: var(--el-color-primary);
  --el-button-hover-bg-color: var(--el-color-primary-light-9);
  --el-button-hover-border-color: var(--el-color-primary-light-7);
  --el-button-active-text-color: var(--el-button-hover-text-color);
  --el-button-active-border-color: var(--el-color-primary);
  --el-button-active-bg-color: var(--el-button-hover-bg-color);
  --el-button-outline-color: var(--el-color-primary-light-5);
  --el-button-hover-link-text-color: var(--el-text-color-secondary);
  --el-button-active-color: var(--el-text-color-primary);
}

[part=el-button] {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: var(--el-button-text-color);
  text-align: center;
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: .1s;
  font-weight: var(--el-button-font-weight);
  -webkit-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--el-button-bg-color);
  border: var(--el-border);
  border-color: var(--el-button-border-color);
  font-family: inherit;
}

[part=el-button] {
  padding: 8px 15px;
  font-size: var(--el-font-size-base);
  border-radius: var(--el-border-radius-base);
}

[part=el-button] > span {
  display: inline-flex;
  align-items: center;
}

[part=el-button] slot[name=icon] + span {
  margin-left: var(--slot-margin-left);
}

[part=el-button] slot[name="loading"] + span {
  margin-left: var(--slot-margin-left);
}

[part=el-button]:hover {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: none;
}

[part=el-button]:active {
  color: var(--el-button-active-text-color);
  border-color: var(--el-button-active-border-color);
  background-color: var(--el-button-active-bg-color);
  outline: none;
}

[part=el-button]:focus-visible {
  outline: 2px solid var(--el-button-outline-color);
  outline-offset: 1px;
  transition:
    outline-offset 0s,
    outline 0s;
}

[part=el-button]::-moz-focus-inner {
  border: 0;
}

:host([size=large]) [part=el-button] {
  --el-button-size: 40px;
  height: var(--el-button-size);
  padding: 12px 19px;
  font-size: var(--el-font-size-base);
  border-radius: var(--el-border-radius-base);
}
:host([size=small]) [part=el-button] {
  --el-button-size: 24px;
  height: var(--el-button-size);
  padding: 5px 11px;
  font-size: 12px;
  border-radius: calc(var(--el-border-radius-base) - 1px);
}

:host([round]) [part=el-button] {
  padding: 8px 15px;
  border-radius: var(--el-border-radius-round);
}

:host([circle]) [part=el-button] {
  width: 32px;
  border-radius: 50%;
  padding: 8px;
}

:host([size=large][circle]) [part=el-button] {
  width: var(--el-button-size);
  padding: 12px;
}

:host([size=small][circle]) [part=el-button] {
  width: var(--el-button-size);
  padding: 5px;
}

:host([type=primary]) [part=el-button] {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: var(--el-color-primary);
  --el-button-border-color: var(--el-color-primary);
  --el-button-outline-color: var(--el-color-primary-light-5);
  --el-button-active-color: var(--el-color-primary-dark-2);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-link-text-color: var(--el-color-primary-light-5);
  --el-button-hover-bg-color: var(--el-color-primary-light-3);
  --el-button-hover-border-color: var(--el-color-primary-light-3);
  --el-button-active-bg-color: var(--el-color-primary-dark-2);
  --el-button-active-border-color: var(--el-color-primary-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-primary-light-5);
  --el-button-disabled-border-color: var(--el-color-primary-light-5);
}

:host([type=success]) [part=el-button] {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: var(--el-color-success);
  --el-button-border-color: var(--el-color-success);
  --el-button-outline-color: var(--el-color-success-light-5);
  --el-button-active-color: var(--el-color-success-dark-2);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-link-text-color: var(--el-color-success-light-5);
  --el-button-hover-bg-color: var(--el-color-success-light-3);
  --el-button-hover-border-color: var(--el-color-success-light-3);
  --el-button-active-bg-color: var(--el-color-success-dark-2);
  --el-button-active-border-color: var(--el-color-success-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-success-light-5);
  --el-button-disabled-border-color: var(--el-color-success-light-5);
}

:host([type=info]) [part=el-button] {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: var(--el-color-info);
  --el-button-border-color: var(--el-color-info);
  --el-button-outline-color: var(--el-color-info-light-5);
  --el-button-active-color: var(--el-color-info-dark-2);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-link-text-color: var(--el-color-info-light-5);
  --el-button-hover-bg-color: var(--el-color-info-light-3);
  --el-button-hover-border-color: var(--el-color-info-light-3);
  --el-button-active-bg-color: var(--el-color-info-dark-2);
  --el-button-active-border-color: var(--el-color-info-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-info-light-5);
  --el-button-disabled-border-color: var(--el-color-info-light-5);
}

:host([type=warning]) [part=el-button] {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: var(--el-color-warning);
  --el-button-border-color: var(--el-color-warning);
  --el-button-outline-color: var(--el-color-warning-light-5);
  --el-button-active-color: var(--el-color-warning-dark-2);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-link-text-color: var(--el-color-warning-light-5);
  --el-button-hover-bg-color: var(--el-color-warning-light-3);
  --el-button-hover-border-color: var(--el-color-warning-light-3);
  --el-button-active-bg-color: var(--el-color-warning-dark-2);
  --el-button-active-border-color: var(--el-color-warning-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-warning-light-5);
  --el-button-disabled-border-color: var(--el-color-warning-light-5);
}

:host([type=danger]) [part=el-button] {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: var(--el-color-danger);
  --el-button-border-color: var(--el-color-danger);
  --el-button-outline-color: var(--el-color-danger-light-5);
  --el-button-active-color: var(--el-color-danger-dark-2);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-link-text-color: var(--el-color-danger-light-5);
  --el-button-hover-bg-color: var(--el-color-danger-light-3);
  --el-button-hover-border-color: var(--el-color-danger-light-3);
  --el-button-active-bg-color: var(--el-color-danger-dark-2);
  --el-button-active-border-color: var(--el-color-danger-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-danger-light-5);
  --el-button-disabled-border-color: var(--el-color-danger-light-5);
}

:host([plain]) [part=el-button] {
  --el-button-hover-text-color: var(--el-color-primary);
  --el-button-hover-bg-color: var(--el-fill-color-blank);
  --el-button-hover-border-color: var(--el-color-primary);
}

:host([type=primary][plain]) [part=el-button],
:host([type=primary][text]) [part=el-button],
:host([type=primary][link]) [part=el-button] {
  --el-button-text-color: var(--el-color-primary);
  --el-button-bg-color: var(--el-color-primary-light-9);
  --el-button-border-color: var(--el-color-primary-light-5);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-primary);
  --el-button-hover-border-color: var(--el-color-primary);
  --el-button-active-text-color: var(--el-color-white);
}

:host([type=success][plain]) [part=el-button], 
:host([type=success][text]) [part=el-button], 
:host([type=success][link]) [part=el-button] {
  --el-button-text-color: var(--el-color-success);
  --el-button-bg-color: var(--el-color-success-light-9);
  --el-button-border-color: var(--el-color-success-light-5);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-success);
  --el-button-hover-border-color: var(--el-color-success);
  --el-button-active-text-color: var(--el-color-white);
}

:host([type=info][plain]) [part=el-button], 
:host([type=info][text]) [part=el-button], 
:host([type=info][link]) [part=el-button] {
  --el-button-text-color: var(--el-color-info);
  --el-button-bg-color: var(--el-color-info-light-9);
  --el-button-border-color: var(--el-color-info-light-5);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-info);
  --el-button-hover-border-color: var(--el-color-info);
  --el-button-active-text-color: var(--el-color-white);
}

:host([type=warning][plain]) [part=el-button], 
:host([type=warning][text]) [part=el-button], 
:host([type=warning][link]) [part=el-button] {
  --el-button-text-color: var(--el-color-warning);
  --el-button-bg-color: var(--el-color-warning-light-9);
  --el-button-border-color: var(--el-color-warning-light-5);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-warning);
  --el-button-hover-border-color: var(--el-color-warning);
  --el-button-active-text-color: var(--el-color-white);
}

:host([type=danger][plain]) [part=el-button], 
:host([type=danger][text]) [part=el-button], 
:host([type=danger][link]) [part=el-button] {
  --el-button-text-color: var(--el-color-danger);
  --el-button-bg-color: var(--el-color-danger-light-9);
  --el-button-border-color: var(--el-color-danger-light-5);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-danger);
  --el-button-hover-border-color: var(--el-color-danger);
  --el-button-active-text-color: var(--el-color-white);
}

:host([disabled]) [part=el-button], 
:host([disabled]) [part=el-button]:hover {
  color: var(--el-button-disabled-text-color);
  cursor: not-allowed;
  background-image: none;
  background-color: var(--el-button-disabled-bg-color);
  border-color: var(--el-button-disabled-border-color);
}

:host([link]) [part=el-button]{
  color: var(--el-button-text-color);
  padding: 2px;
  height: auto;
  border-color: transparent !important;
  background-color: transparent!important;
}

:host([link]) [part=el-button]:hover {
  color: var(--el-button-hover-link-text-color);
  border-color: transparent;
  background: transparent;
}
:host([link]) [part=el-button]:active {
  color: var(--el-button-active-color);
  border-color: transparent;
  background: transparent;
}

:host([plain][disabled]) [part=el-button],
:host([text][disabled]) [part=el-button],
:host([link][disabled]) [part=el-button] {
  color: var(--el-button-disabled-text-color);
}

:host([type=primary][plain][disabled]) [part=el-button],
:host([type=primary][text][disabled]) [part=el-button],
:host([type=primary][link][disabled]) [part=el-button] {
  color: var(--el-color-primary-light-5);
  background-color: var(--el-color-primary-light-9); 
  border-color: var(--el-color-primary-light-8); 
}

:host([type=success][plain][disabled]) [part=el-button],
:host([type=success][text][disabled]) [part=el-button],
:host([type=success][link][disabled]) [part=el-button] {
  color: var(--el-color-success-light-5);
  background-color: var(--el-color-success-light-9); 
  border-color: var(--el-color-success-light-8); 
}

:host([type=info][plain][disabled]) [part=el-button],
:host([type=info][text][disabled]) [part=el-button],
:host([type=info][link][disabled]) [part=el-button] {
  color: var(--el-color-info-light-5);
  background-color: var(--el-color-info-light-9); 
  border-color: var(--el-color-info-light-8); 
}

:host([type=warning][plain][disabled]) [part=el-button],
:host([type=warning][text][disabled]) [part=el-button],
:host([type=warning][link][disabled]) [part=el-button] {
  color: var(--el-color-warning-light-5);
  background-color: var(--el-color-warning-light-9); 
  border-color: var(--el-color-warning-light-8); 
}

:host([type=danger][plain][disabled]) [part=el-button],
:host([type=danger][text][disabled]) [part=el-button],
:host([type=danger][link][disabled]) [part=el-button] {
  color: var(--el-color-danger-light-5);
  background-color: var(--el-color-danger-light-9); 
  border-color: var(--el-color-danger-light-8); 
}

:host([text]) [part=el-button] {
  color: var(--el-button-text-color);
  border-color: transparent;
  background-color: transparent;
}
:host([text]) [part=el-button]:hover {
  background-color: var(--el-fill-color-light);
}
:host([text]) [part=el-button]:active {
  background-color: var(--el-fill-color);
}
:host([text][bg]) [part=el-button] {
  background-color: var(--el-fill-color-light);
}
:host([text][bg]) [part=el-button]:hover {
  background-color: var(--el-fill-color);
}
:host([text][bg]) [part=el-button]:active {
  background-color: var(--el-fill-color-dark);
}

:host([text][disabled]) [part=el-button] {
  color: var(--el-button-disabled-text-color);
  border-color: transparent !important;
  background-color: transparent !important;
}

:host([loading]) [part=el-button] {
  position: relative;
  pointer-events: none;
}
:host([loading]) slot[name=icon],
:host([loading]) slot[name=icon]::slotted(*) {
  display: none;
}

/* -- button group - start -- */
:host-context(el-button-group):host(:first-child) [part=el-button] {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
:host-context(el-button-group):host(:last-child) [part=el-button] {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
:host-context(el-button-group):host(:first-child:last-child) [part=el-button] {
  border-radius: var(--el-border-radius-base);
}
:host-context(el-button-group):host([round]:first-child:last-child) [part=el-button] {
  border-radius: var(--el-border-radius-round);
}
:host-context(el-button-group):host([circle]:first-child:last-child) [part=el-button] {
  border-radius: 50%;
}

:host-context(el-button-group):host(:not(:first-child):not(:last-child)) [part=el-button] {
  border-radius: 0;
}
:host-context(el-button-group):host(:not(:last-child)) [part=el-button] {
  margin-right: -1px;
}
:host-context(el-button-group) [part=el-button]:hover,
:host-context(el-button-group) [part=el-button]:focus,
:host-context(el-button-group) [part=el-button]:active {
  z-index: 1;
}

:host-context(el-button-group > el-dropdown) [part=el-button] {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-color: var(--el-button-divide-border-color);
}

:host-context(el-button-group):host([type]:first-child) [part=el-button] {
  border-right-color: var(--el-button-divide-border-color);
}
:host-context(el-button-group):host([type]:last-child) [part=el-button] {
  border-left-color: var(--el-button-divide-border-color);
}

:host-context(el-button-group):host([type]:not(:first-child):not(:last-child)) [part=el-button]{
  border-left-color: var(--el-button-divide-border-color);
  border-right-color: var(--el-button-divide-border-color);
}
/* -- button group - end -- */
    `;

  static properties = {
    type: {
      type: String,
      default: 'default',
      attribute: true,
      reflect: true,
      useDefault: true,
      converter: (value, type) => {
        return value.toLowerCase();
      },
    },
    plain:{
      type: Boolean,
    },
    round: {
      type: Boolean,
    },
    circle: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      attribute: true,
      reflect: true,
    },
    text: {
      type: Boolean,
    },
    link: {
      type: Boolean,
    },
    bg: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      attribute: true,
      default: false,
      reflect: true,
    },
    icon: {
      type: String,
    },
    'loading-icon': {
      type: String,
    },
    color: {
      type: String,
    },
  };
  
  render() {
    return html`
<button part="el-button" type="button" ?disabled=${this.disabled}>
  <slot name="icon">${this.icon ? html`<el-icon icon="${this.icon}"></el-icon>` : ''}</slot>
  ${this.loading ? html`<slot name="loading"><el-icon icon="${this['loading-icon'] ?? 'Loading'}"></el-icon></slot>` : nothing}
  <span part="content"><slot></slot></span>
</button>`;
  }
  
  firstUpdated() {
    this.slot_content = this.renderRoot.firstElementChild.lastElementChild.firstElementChild;
    this.slot_content.addEventListener('slotchange', (e) => {
      if (this.icon) this.style.setProperty('--slot-margin-left', '6px');
    }, { once: true });
  }
  
  updated(changedProps) {
    if (changedProps.has('loading')) {
      if (this.loading) this.disabled = true;
    }
    if (changedProps.has('color')) {
      const color = this.getColor(this.color);
      if (color) {
        this.setColor(color);
      } else {
        this.style.setProperty('--el-button-bg-color', '');
        this.style.setProperty('--el-button-text-color', '');
        this.style.setProperty('--el-button-border-color', '');
        this.style.setProperty('--el-button-hover-bg-color', '');
        this.style.setProperty('--el-button-hover-text-color', '');
        this.style.setProperty('--el-button-hover-border-color', '');
        this.style.setProperty('--el-button-active-bg-color', '');
        this.style.setProperty('--el-button-active-border-color', '');
      }
    }
  }
  
  getColor(color) {
    if (!color) return null;
    const match = color.match(/var\((.*?)\)/);
    if (match) {
      return window.getComputedStyle(window.document.documentElement).getPropertyValue(match[1]);
    }
    return color;
  }
  
  setColor(buttonColor) {
    const darken = (color, amount = 20) => {
      return color.mix('#141414', amount).toHexString();
    }
    const color = new TinyColor(buttonColor);
    buttonColor = color.toHexString();
    const activeBgColor = this.dark ? color.tint(20).toHexString() : darken(color, 20);
    let bgColor, textColor, borderColor, hoverBgColor, hoverTextColor, hoverBorderColor, activeTextColor, activeBorderColor, disabledBgColor, disabledTextColor, disabledBorderColor;
    if (!this.plain) {
      bgColor = buttonColor;
      textColor = (color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 127) ? 'var(--el-color-white)': 'var(--el-color-black)';
      borderColor = buttonColor;
      hoverBgColor = disabledTextColor = this.dark ? darken(color, 30) : color.tint(30).toHexString();
      hoverTextColor = textColor;
      hoverBorderColor = hoverBgColor;
      activeTextColor = textColor;
      activeBorderColor = activeBgColor;
      disabledBgColor = this.dark ? darken(color, 50) : color.tint(50).toString();
      disabledTextColor = this.dark ? 'rgba(255, 255, 255, 0.5)' : 'var(--el-color-white)';
      disabledBorderColor = disabledBgColor;
    } else {
      bgColor = this.dark ? darken(color, 90) : color.tint(90).toHexString();
      textColor = buttonColor;
      borderColor = this.dark ? darken(color, 50) : color.tint(50).toHexString();
      hoverBgColor = buttonColor;
      hoverTextColor = 'var(--el-color-white)';
      hoverBorderColor = buttonColor;
      activeTextColor = 'var(--el-color-white)';
      activeBorderColor = activeBgColor;
      disabledBgColor = this.dark ? darken(color, 90) : color.tint(90).toHexString();
      disabledTextColor = this.dark ? darken(color, 50) : color.tint(50).toHexString();
      disabledBorderColor = this.dark ? darken(color, 80) : color.tint(80).toHexString();
    }
    
    const button = this.renderRoot.firstElementChild;
    button.style.setProperty('--el-button-bg-color', bgColor);
    button.style.setProperty('--el-button-text-color', textColor);
    button.style.setProperty('--el-button-border-color', borderColor);
    button.style.setProperty('--el-button-hover-bg-color', hoverBgColor);
    button.style.setProperty('--el-button-hover-text-color', hoverTextColor);
    button.style.setProperty('--el-button-hover-border-color', hoverBorderColor);
    button.style.setProperty('--el-button-active-bg-color', activeBgColor);
    button.style.setProperty('--el-button-active-text-color', activeTextColor);
    button.style.setProperty('--el-button-active-border-color', activeBorderColor);
    button.style.setProperty('--el-button-disabled-bg-color', disabledBgColor);
    button.style.setProperty('--el-button-disabled-text-color', disabledTextColor);
    button.style.setProperty('--el-button-disabled-border-color', disabledBorderColor);
  }
}

customElements.define('el-button', Button);
