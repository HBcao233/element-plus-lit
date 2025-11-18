import { ElElement, html, css } from '../element/index.js';

export default class Divider extends ElElement {
  static styles = css`
:host {
  position: relative;
}

:host([direction=horizontal]) {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  border-top: 1px var(--el-border-color) var(--el-border-style);
}

:host([direction=vertical]) {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
  border-left: 1px var(--el-border-color) var(--el-border-style);
}

[part=text] {
  position: absolute;
  background-color: var(--el-bg-color);
  padding: 0 20px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  font-size: 14px;
}

:host([content-position=left]) [part=text] {
  left: 20px;
  transform: translateY(-50%);
}
:host([content-position=center]) [part=text] {
  left: 50%;
  transform: translate(-50%, -50%);
}
:host([content-position=right]) [part=text] {
  right: 20px;
  transform: translateY(-50%);
}
  `;
  
  static properties = {
    role: {
      type: String,
      attribute: true,
      reflect: true,
      default: 'separator',
    },
    direction: {
      type: String,
      attribute: true,
      reflect: true,
      default: 'horizontal',
      converter: (value, type) => {
        if (value === 'vertical') return 'vertical';
        return 'horizontal';
      },
    },
    borderStyle: {
      type: String,
      attribute: 'border-style',
      reflect: true,
      default: 'solid',
    },
    contentPosition: {
      type: String,
      attribute: 'content-position',
      reflect: true,
      default: 'center',
    },
  }
  
  render() {
    return html`<div part="text"><slot></slot></div>`;
  }
  
  updated(changedProps) {
    if (changedProps.has('borderStyle')) {
      this.style.setProperty('--el-border-style', this.borderStyle);
    }
  }
  
}

customElements.define('el-divider', Divider);
