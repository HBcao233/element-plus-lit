import { ElElement, html, css } from '/src/element.js';

export default class Popper extends ElElement {
  static effects = ['light', 'dark'];
  static triggers = ['click', 'hover', 'contextmemu', 'focus'];
  static roleTypes = [
    'dialog',
    'grid',
    'group',
    'listbox',
    'menu',
    'navigation',
    'tooltip',
    'tree',
  ];
  static placements = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
  ];
  static styles = css`
:host {
  tabindex: -1;
  --el-popper-border-radius: var(--el-popover-border-radius, 4px);
}

:host {
  position: fixed;
  top: 0;
  left: 0;
  width: fit-content;
  border-radius: var(--el-popper-border-radius);
  padding: 5px 11px;
  margin: 0;
  z-index: 2000;
  font-size: 12px;
  line-height: 20px;
  min-width: 10px;
  overflow-wrap: break-word;
  word-break: normal;
  overflow: visible;
}
:host(*):popover-open {
  animation: fadeIn .3s ease;
}
@keyframes fadeIn {
  from { 
    opacity: 0; 
  }
  to { 
    opacity: 1;
  }
}

:host([part~=is-light]) {
  background: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
}

:host([part~=is-dark]) {
  color: var(--el-bg-color);
  background: var(--el-text-color-primary);
  border: 1px solid var(--el-text-color-primary);
}

:host([is-pure]) {
  padding: 0;
}

:host([open]) {
  visibility: visible;
  opacity: 1;
}

:host > .el-popper__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
}

:host > .el-popper__arrow::before {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
  content: "";
  transform: rotate(45deg);
  background: #303133;
  box-sizing: border-box;
}

:host([part~=is-light]) > .el-popper__arrow::before {
  border: 1px solid #e4e7ed;
  background: #fff;
  right: 0;
}

:host([part~=is-dark]) > .el-popper__arrow::before {
  border: 1px solid #303133;
  background: #303133;
  right: 0;
}

:host([data-popper-placement^=top]) > .el-popper__arrow {
  bottom: -5px;
  right: 0;
}

:host([data-popper-placement^=bottom]) > .el-popper__arrow {
  top: -5px;
  right: 0;
}

:host([data-popper-placement^=left]) > .el-popper__arrow {
  right: -5px;
}

:host([data-popper-placement^=right]) > .el-popper__arrow {
  left: -5px;
}

:host([data-popper-placement^=top]) > .el-popper__arrow::before {
  border-bottom-right-radius: 2px;
}

:host([data-popper-placement^=bottom]) > .el-popper__arrow::before {
  border-top-left-radius: 2px;
}

:host([data-popper-placement^=left]) > .el-popper__arrow::before {
  border-top-right-radius: 2px;
}

:host([data-popper-placement^=right]) > .el-popper__arrow::before {
  border-bottom-left-radius: 2px;
}

:host([data-popper-placement^=top]) > .el-popper__arrow::before {
  border-top-color: transparent;
  border-left-color: transparent;
}

:host([data-popper-placement^=bottom]) > .el-popper__arrow::before {
  border-bottom-color: transparent;
  border-right-color: transparent;
}

:host([data-popper-placement^=left]) > .el-popper__arrow::before {
  border-left-color: transparent;
  border-bottom-color: transparent;
}

:host([data-popper-placement^=right]) > .el-popper__arrow::before {
  border-right-color: transparent;
  border-top-color: transparent;
}
  `;
  
  static properties = {
    placement: {
      type: String,
      default: 'top',
      attribute: true,
      converter: (value, type) => {
        if (Popper.placements.includes(value)) return value;
        return 'top';
      },
    },
    role: {
      type: String,
      default: 'tooltip',
      converter: (value, type) => {
        if (Popper.roleTypes.includes(value)) return value;
        return 'tooltip';
      },
    },
    offset: {
      type: Number,
      default: 12,
      attribute: true,
      reflect: true,
      useDefault: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      attribute: true,
    },
    noArrow: {
      type: Boolean,
      default: false,
    },
    effect: {
      type: String,
      default: 'dark',
    },
    trigger: {
      type: String,
      default: 'click',
      converter: (value, type) => {
        if (Popper.triggers.includes(value)) return value;
        return 'click';
      },
    },
    
    open: {
      type: Boolean,
      default: false,
      attribute: true,
      reflect: true,
    },
    _placement: {
      type: String,
      state: true,
    },
    // hover 模式时的隐藏延迟
    hideDelay: {
      type: Number,
      default: 150,
    },
  };
  
  render() {
    return html`
<slot></slot>
<span part="arrow" class="el-popper__arrow" ?hidden="${this.noArrow}"></span>`;
  }
  
  get arrow() {
    return this.renderRoot.lastElementChild;
  }
  
  willUpdate(changedProps) {
    if (changedProps.has('open')) {
      const oldValue = changedProps.get('open');
      if (!oldValue && this.open) {
        const success = this.dispatchEvent(new Event('before-show', {
          bubbles: true,
          composed: true,
          cancelable: true,
        }));
        if (!success) this.open = false;
      } else if (oldValue && !this.open) {
        const success = this.dispatchEvent(new Event('before-hide', {
          bubbles: true,
          composed: true,
          cancelable: true,
        }));
        if (!success) this.open = true;
      }
    }
  }
  
  updated(changedProps) {
    if (changedProps.has('placement')) {
      this._placement = this.placement;
      this.dataset.popperPlacement = this._placement;
    } 
    if (changedProps.has('_placement')) {
      this.dataset.popperPlacement = this._placement;
    }
    if (changedProps.has('open')) {
      if (this.open) {
        this.showPopover();
        this.adjustPosition();
        this.dispatchEvent(new Event('show', {
          bubbles: true,
          composed: false,
          cancelable: false,
        }));
      } else {
        this.hidePopover();
        this.dispatchEvent(new Event('hide', {
          bubbles: true,
          composed: false,
          cancelable: false,
        }));
      }
    }
  }
  
  show() {
    clearTimeout(this.hideTimer);
    this.open = true;
  }
  
  hide() {
    this.open = false;
  }
  
  scheduleHide() {
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.hide();
    }, this.hideDelay);
  }
  
  toggle() {
    this.open = !this.open;
  }
  
  onMounted() {
    this.setAttribute('popover', 'manual');
    this.setAttribute('exportparts', 'arrow:popper__arrow');
    window.addEventListener('resize', this);
    document.addEventListener('scroll', this, {
      capture: true,
      passive: true,
    });
    this.touch_timer = null;
  }
  
  firstUpdated() {
    this.part.add('is-' + this.effect);
    this.arrow.part.add('arrow-' + this.effect);
    this.exportparts += ', arrow-' + this.effect;
      
    if (!this.triggerRef) return;

    this.triggerRef = this.triggerRef();
    if (!this.triggerRef) return;
    
    this.reference = this.triggerRef;
    // click
    this.triggerRef.addEventListener('click', this);
    // hover
    this.triggerRef.addEventListener('mouseenter', this);
    this.triggerRef.addEventListener('mouseleave', this);
    this.addEventListener('mouseenter', () => {
      if (this.disabled) return;
      if (this.trigger !== 'hover') return;
      this.show();
    });
    this.addEventListener('mouseleave', () => {
      if (this.disabled) return;
      if (this.trigger !== 'hover') return;
      this.scheduleHide();
    })
    
    // contextmemu
    this.triggerRef.addEventListener('contextmemu', this);
    this.triggerRef.addEventListener('touchstart', this);
    this.triggerRef.addEventListener('touchend', this);
    // focus
    this.triggerRef.addEventListener('focus', this, true);
    this.triggerRef.addEventListener('blur', this, true);
  }
  
  onBeforeUnmounted() {
    window.removeEventListener('resize', this);
    document.removeEventListener('scroll', this, true);
    document.removeEventListener('click', this);

    if (!this.triggerRef) return;
    
    // click 
    this.triggerRef.removeEventListener('click', this);
    // hover
    this.triggerRef.removeEventListener('mouseenter', this);
    this.triggerRef.removeEventListener('mouseleave', this);
    // contextmemu
    this.triggerRef.removeEventListener('contextmemu', this);
    this.triggerRef.removeEventListener('touchstart', this);
    this.triggerRef.removeEventListener('touchend', this);
    // focus 
    this.triggerRef.removeEventListener('focus', this, true);
    this.triggerRef.removeEventListener('blur', this, true);
  }
  
  handleEvent(e) {
    const handlers = {
      'resize': this.onResize,
      'scroll': this.onScroll,
      'click': this.onClick,
      'mouseenter': this.onMouseenter,
      'mouseleave': this.onMouseleave,
      'contextmemu': this.onContextmemu,
      'touchstart': this.onTouchstart,
      'touchend': this.onTouchend,
      'focus': this.onFocus,
      'blur': this.onBlur,
    }
    handlers[e.type].call(this, e);
  }
  
  onResize(e) {
    if (this.disabled) return;
    if (!this.open) return;
    this.adjustPosition();
  }
  
  onScroll(e) {
    if (this.disabled) return;
    if (!this.open) return;
    requestAnimationFrame(this.adjustPosition.bind(this));
  }
  
  onClick(e) {
    if (this.disabled) return;
    if (this.trigger === 'click') {
      this.show();
    }
  }
  
  onMouseenter() {
    if (this.disabled) return;
    if (this.trigger !== 'hover') return;
    this.show();
  }
  
  onMouseleave(e) {
    if (this.disabled) return;
    if (this.trigger !== 'hover') return;
    this.scheduleHide();
  }
  
  onContextmemu(e) {
    if (this.disabled) return;
    if (this.trigger !== 'contextmemu') return;
    this.show();
  }
  
  onTouchstart(e) {
    if (this.disabled) return;
    if (this.trigger !== 'contextmemu') return;
    this.touch_timer = setTimeout(() => {
      this.show();
    }, 500);
  }
  
  onTouchend(e) {
    if (this.disabled) return;
    if (this.trigger !== 'contextmemu') return;
    clearTimeout(this.touch_timer)
  }
  
  onFocus(e) {
    if (this.disabled) return;
    if (this.trigger !== 'focus') return;
    this.reference = e.target;
    this.show();
  }
  
  onBlur(e) {
    if (this.disabled) return;
    if (this.trigger !== 'focus') return;
    this.hide();
  }
  
  adjustPosition() {
    if (this.disabled) return;
    
    const rect = this.reference.getBoundingClientRect();
    const popper_rect = this.getBoundingClientRect();
    const pw = popper_rect.width;
    const ph = popper_rect.height;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offset = this.offset;
    const conditions = {
      'top': rect.y - offset < ph,
      'bottom': rect.y + rect.height + offset > vh,
      'left': rect.x - pw - offset < 0,
      'right': rect.x + rect.width + offset + pw > vw,
    }
    const converts = {
      'top': 'bottom',
      'bottom': 'top',
      'left': 'right',
      'right': 'left',
    }
    let placement = this.placement;
    let [p1, p2] = placement.split('-');
    if (conditions[p1]) {
      placement = converts[p1] + (p2 ? '-' + p2: '');
    } 
    this._placement = placement;
    [p1, p2] = placement.split('-');
    
    let x = 0, y = 0;
    let arrowX = 0, arrowY = 0;
    const arrow_rect = this.arrow.getBoundingClientRect();
    const {width: aw, height: ah} = arrow_rect;
    let p_offset = 0;
    switch (p1) {
      case 'top':
      case 'bottom':
        x = rect.x + rect.width / 2 - pw / 2;
        arrowX = - pw / 2 + aw / 2;
        
        if (p2 === 'start') {
          p_offset = pw / 6;
        } else if (p2 === 'end') {
          p_offset = - pw / 6;
        } 
        x += p_offset;
        arrowX -= p_offset;
        
        x = Math.min(Math.max(x, 1), vw - pw - 1);
        // 右侧超出
        if (rect.x + offset >= vw) x = rect.x - pw - 1  + offset;
        // 左侧超出
        else if (rect.x + rect.width <= 10) x = rect.x + rect.width - offset + 1;
        
        // 箭头右移
        if (rect.x + rect.width / 2 + pw / 2 + offset - p_offset >= vw) {
          arrowX += rect.x + rect.width / 2 + pw / 2 + offset - p_offset - vw;
          arrowX = Math.min(arrowX, - 2);
        }
        // 箭头左移
        else if (rect.x + rect.width / 2 - pw / 2 + p_offset <= 0) {
          arrowX += rect.x + rect.width / 2 - pw / 2 + p_offset;
          arrowX = Math.max(arrowX, aw + 5 - pw);
        }
        
        break
      case 'left':
        x = rect.x - pw - offset;
        break;
      case 'right':
        x = rect.x + rect.width + offset;
    }
    switch (p1) {
      case 'left':
      case 'right':
        y = rect.y + rect.height / 2 - ph / 2;
        arrowY = ph / 2;
        arrowY -= ah;
        break;
      case 'top':
        y = rect.y - ph - offset - 5;
        break;
      case 'bottom':
        y = rect.y + rect.height + offset + 5;
        break;
    }
    this.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    this.arrow.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0)`;
  }
}

customElements.define('el-popper', Popper);
