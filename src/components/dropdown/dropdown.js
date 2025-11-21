import { ElElement, html, css } from '../element/index.js';
import Popper from '../popper/popper.js';

export default class Dropdown extends ElElement {
  static properties = {
    ...Popper.properties,
    effect: {
      type: String,
      default: 'light',
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
  <el-scrollbar>
    <slot name="dropdown"></slot>
  </el-scrollbar>
</el-popper>`;
  }
  
  get open() {
    return this.popper?.open;
  }
  
  set open(v) {
    if (this.popper) this.popper.open = !!v;
  }
  
  firstUpdated() {
    this.triggerRef = this.renderRoot.firstElementChild.assignedElements()[0];
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

customElements.define('el-dropdown', Dropdown);
