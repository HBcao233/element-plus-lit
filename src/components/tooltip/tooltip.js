import { ElElement, html, css } from '/src/element.js';
import Popper from '../popper/popper.js';

export default class Tooltip extends ElElement {
  static styles = css`
:host {
  -webkit-tap-highlight-color: transparent;
}
  `;
  
  static properties = {
    ...Popper.properties,
    content: {
      type: String,
    },
    effect: {
      type: String,
      default: 'dark',
    },
    trigger: {
      type: String,
      default: 'hover',
      converter: (value, type) => {
        if (Popper.triggers.includes(value)) return value;
        return 'hover';
      },
    },
  };
  
  render() {
    return html`
<slot></slot>
<el-popper 
  part="el-popper" 
  .triggerRef="${() => this.triggerRef}" 
  role="${this.role}" 
  effect="${this.effect}" 
  placement="${this.placement}" 
  ?noArrow="${this.noArrow}" 
  ?disabled="${this.disabled}" 
  trigger="${this.trigger}" 
>
  <slot name="content">${this.content}</slot>
</el-popper>`;
  }
  
  get open() {
    return this.popper?.open;
  }
  
  set open(v) {
    if (this.popper) this.popper.open = !!v;
  }
  
  firstUpdated() {
    if (this.triggerRef) {
      this.triggerRef = this.triggerRef.call(this);
    } else {
      this.triggerRef = this.renderRoot.firstElementChild.assignedElements()[0] ?? this;
    }
    this.popper = this.renderRoot.lastElementChild;
  }
  
  show() {
    this.open = true;
  }
  
  hide() {
    this.open = false;
  }
  
  toggle() {
    this.open = !this.open;
  }
}

customElements.define('el-tooltip', Tooltip);
