import { LitElement } from '/static/lit-all.min.js';
export * from '/static/lit-all.min.js';

export class ElElement extends LitElement {
  /*#defineProperty(k) {
    const that = this;
    let _value;
    Object.defineProperty(this, k, {
      get() {
        return _value;
      },
      set(value) {
        _value = new Proxy(value, {
          set(obj, prop, value, receiver) {
            Reflect.set(obj, prop, value, receiver);
            that.requestUpdate();
            return true;
          }
        });
      },
      enumerable: true,
      configurable: false,
    });
  }*/
  
  constructor() {
    super();
    if (this.constructor.properties) for (let [k, v] of Object.entries(this.constructor.properties)) {
      /*if (v.type === Array || v.type === Object) {
        this.#defineProperty(k);
        if (v.type === Array) this[k] = v.default ?? [];
        else this[k] = v.default ?? {};
      }*/
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
