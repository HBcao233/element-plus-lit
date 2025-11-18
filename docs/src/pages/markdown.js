import { ElElement, html, css } from '/src/index.js';
import { globalCSS } from '../css.js';

export class Markdown extends ElElement {
  static category = 'Others';
  static styles = globalCSS;
  
  static properties = {
    
  }
  
  render() {
    return html``;
  }
}

customElements.define('docs-markdown', Markdown);