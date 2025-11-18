import { ElElement, html } from '../element/index.js';
import Popper from '../popper/popper.js';

export default class Tooltip extends ElElement {
  static properties = {
    ...Popper.properties,
    content: {
      type: String,
    },
    effect: {
      type: String,
      default: 'dark',
    },
  };
  
  render() {
    return html`
<slot></slot>
<el-popper part="el-popper" .triggerRef="${() => this.triggerRef}" role="${this.role}" effect="${this.effect}" placement="${this.placement}" ?noArrow="${this.noArrow}" ?disabled="${this.disabled}" trigger="${this.trigger}">
  <slot name="content">${this.content}</slot>
</el-popper>`;
  }
  
  firstUpdated() {
    if (this.triggerRef) {
      this.triggerRef = this.triggerRef.call(this);
    } else {
      this.triggerRef = this.renderRoot.firstElementChild.assignedElements()[0] ?? this;
    }
  }
  
  get popper() {
    return this.renderRoot.lastElementChild;
  }
  
  show() {
    this.popper.show();
  }
  
  hide() {
    this.popper.hide();
  }
  
  toggle() {
    this.popper.popper();
  }
}

customElements.define('el-tooltip', Tooltip);
