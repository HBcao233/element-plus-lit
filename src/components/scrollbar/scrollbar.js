import { ElElement, html, css } from '../element/index.js';

export default class Scrollbar extends ElElement {
  static styles = css`
:host {
  --el-scrollbar-opacity: .3;
  --el-scrollbar-bg-color: var(--el-text-color-secondary);
  --el-scrollbar-hover-opacity: .5;
  --el-scrollbar-hover-bg-color: var(--el-text-color-secondary);
}

:host {
  overflow: hidden;
  position: relative;
  height: 100%;
}

[part=wrap] {
  display: block;
  overflow: auto;
  height: 100%;
  scrollbar-width: none;
}
[part=wrap]::-webkit-scrollbar {
  display: none;
}

[part~=bar] {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
}
[part="bar horizontal"] {
  height: 6px;
  left: 2px;
}

[part=thumb] {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: var(--el-scrollbar-bg-color, var(--el-text-color-secondary));
  transition: var(--el-transition-duration) background-color;
  opacity: var(--el-scrollbar-opacity, .3);
}

[part~=horizontal] > [part="thumb"] {
  height: 100%;
}
  `;
  
  static properties = {}
  
  render() {
    return html`<div part="wrap"><slot></slot></div><div part="bar horizontal"><div part="thumb"></div></div><div part="bar vertical"><div part="thumb"></div></div>`;
  }
  
  firstUpdated() {
    this.wrap = this.renderRoot.firstElementChild;
    this.horizontal = this.wrap.nextElementSibling;
    this.vertical = this.horizontal.nextElementSibling;
    this.renderRoot.addEventListener('slotchange', (e) => {
      this.horizontal.firstElementChild.style.width = (this.wrap.clientWidth / this.wrap.scrollWidth * this.wrap.clientWidth - 4) + 'px';
    });
    this.wrap.addEventListener('scroll', (e) => {
      const percentX = (this.wrap.scrollLeft) / (this.wrap.scrollWidth - this.wrap.clientWidth) * 100;
      this.horizontal.firstElementChild.style.transform = `translateX(${percentX}%)`;
    })
    
  }

}

customElements.define('el-scrollbar', Scrollbar);
