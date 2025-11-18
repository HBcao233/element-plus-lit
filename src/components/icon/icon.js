import { ElElement, html, css, styleMap, unsafeSVG, nothing } from '../element/index.js';
import ElementPlusIcons from '../../../static/element-plus-icons.js';

export default class Icon extends ElElement {
  static styles = css`
.el-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: inherit;
  font-size: inherit;
}

.el-icon.is-loading {
  animation: rotating 2s linear infinite;
}

.el-icon > svg,
::slotted(svg) {
  width: 1em;
  height: 1em;
}

@keyframes rotating {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
  `;
  static properties = {
    icon: {
      type: String,
    },
    size: {
      type: String,
      converter: (value, type) => {
        if (!value) return '';
        if (isNaN(parseFloat(value))) return value;
        return value + 'px';
      },
    },
    color: {
      type: String,
    },
    styles: {
      default: {},
    },
  }
  
  render() { 
    return html`
<i class="el-icon${['Loading', 'Eleme'].includes(this.icon) ? ' is-loading': ''}" style=${styleMap(this.styles)}>
  <slot>${unsafeSVG(ElementPlusIcons[this.icon] ?? '')}</slot>
</i>`;
  }
  
  updated(changedProps) {
    if (changedProps.has('color')) {
      this.styles['--color'] = this.color;
    } 
    if (changedProps.has('size')) {
      this.styles['--size'] = this.size;
    }
  }
}

customElements.define('el-icon', Icon);
