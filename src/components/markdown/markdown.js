import { ElElement, html, css } from '/src/element.js';
import MarkdownParser from './parser.js';


export default class Markdown extends ElElement {
  static styles = css`
:host {
  display: block;
  width: 100%;
}

a {
  color: #3964fe;
  transition: box-shadow .2s cubic-bezier(.4,0,.2,1);
  border-style: solid;
  border-color: transparent;
  border-left-width: 3px;
  border-right-width: 3px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  margin-left: -3px;
  margin-right: -3px;
  text-decoration: none;
  position: relative;
}

h1 {
  font-size: 24px;
}
h2 {
  font-size: 22px;
}
h3 {
  font-size: 20px;
}
h4, h5, h6 {
  font-size: 16px;
}
h1, h2, h3 {
  margin: 32px 0 16px;
}
h4, h5, h6, p {
  margin: 16px 0;
}

p { 
  word-break: break-word;
}

p:first-child {
  margin-top: 0;
}
p:last-child {
  margin-bottom: 0;
}

code {
  box-sizing: border-box;
  font-family: var(--el-font-family);
  background-color: #ebeef2;
  border-radius: 6px;
  align-items: center;
  padding: 0 5px;
  display: inline-flex;
  font-size: .875em!important;
}

blockquote {
  border-left: 2px solid #adb2b8;
  margin: 16px 0 0;
  padding-left: 14px;
}

table {
  border-collapse: collapse;
  width: -moz-max-content;
  width: max-content;
  max-width: -moz-max-content;
  max-width: max-content;
}
table:not(:has(th:nth-child(4),td:nth-child(4))) {
  width: 100%;
  max-width: unset;
}

th {
  border-bottom: 1px solid rgba(0, 0, 0, .12);
  font: 500 15px/25px var(--el-font-family);
  border-top: none;
  padding: 10px 16px;
}
th:first-child {
  padding-left: 0;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  font: 15px/25px var(--el-font-family);
  max-width: 320px;
  min-width: 100px;
  max-width: min(30vw,320px);
  padding: 10px 16px;
}
td:first-child {
  padding-left: 0;
}

ul, ol {
  margin: 16px 0;
  padding-left: 18px;
}
li>ul, li>ol {
  margin-top: 4px;
}
li>:last-child {
  margin-bottom: 0;
}
li::marker {
  color: #61666b;
  line-height: 28px;
}
  `;
  
  static properties = {
    _value: {
      type: String,
      state: true,
      default: '',
    }
  }
  
  get value() {
    return this._value;
  }
  
  set value(val) {
    this._value = val;
    this.parseMarkdown();
  }
  
  render() {
    return html`${this.results}`;
  }
  
  parseMarkdown() {
    const parser = new MarkdownParser();
    const results = parser.parse(this.value);
    this.results = results;
  }
  
}

customElements.define('el-markdown', Markdown);
