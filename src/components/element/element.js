import { LitElement } from '../../../static/lit-all.min.js';
export * from '../../../static/lit-all.min.js';

export class ElElement extends LitElement {
  
  constructor() {
    super();
    if (this.constructor.properties) for (let [k, v] of Object.entries(this.constructor.properties)) {
      if (v.default !== undefined) {
        this[k] = v.default;
      }
    }
    
    // 修改 firstUpdated, 派发 loaded 事件
    const originalFirstUpdated = this.firstUpdated;
    this.firstUpdated = (...args) => {
      this.dispatchEvent(new Event('loaded', {
        bubbles: true,
        composed: true,
        cancelable: false,
      }));
      this.renderRoot.addEventListener('scroll', (e) => {
        this.dispatchEvent(new Event('scroll', {
          bubbles: true,
          composed: true,
          cancelable: false,
        }));
      }, true);
      originalFirstUpdated && originalFirstUpdated.apply(this, args);
    }
    const originalUpdated = this.updated;
    this.updated = (...args) => {
      this.dispatchEvent(new Event('updated', {
        bubbles: true,
        composed: true,
        cancelable: false,
      }));
      originalUpdated && originalUpdated.apply(this, args);
    }
    
    this.setup && this.setup();
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.onMounted && this.onMounted();
  }
  
  disconnectedCallback() {
    this.onBeforeUnmounted && this.onBeforeUnmounted();
    super.disconnectedCallback()
  }

}
