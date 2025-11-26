import { ElElement, html, css } from '/src/element.js';
import { copyToClipboard } from '/src/utils.js';
import MarkdownShader from './markdown-shader.js';
import PythonShader from './python-shader.js';
import HTMLShader from './html-shader.js';

const shaders = {
  'markdown': MarkdownShader,
  'python': PythonShader,
  'html': HTMLShader,
}

export default class CodeBlock extends ElElement {
  static styles = css`
:host {
  --el-code-block-bg-color: #f9fafb;
  --el-code-block-banner-bg-color: var(--el-code-block-bg-color);
  --el-code-block-border-radius: 12px;
  display: block;
  color: var(--el-color-black);
  background: var(--el-code-block-bg-color);
  border-radius: var(--el-code-block-border-radius);
}

[part=banner-wrap] {
  z-index: 6;
  background-color: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
[part=banner] {
  background: var(--el-code-block-banner-bg-color);
  padding: calc(var(--ds-md-zoom)*8px)calc(var(--ds-md-zoom)*12px);
  font-size: 13px;
  line-height: 13px;
  justify-content: space-between;
  display: flex;
  border-top-left-radius: var(--el-code-block-border-radius);
  border-top-right-radius: var(--el-code-block-border-radius);
}
[part=banner-content] {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px;
  display: flex;
}

[part=language] {
  flex-shrink: 0;
  color: var(--el-color-black);
  font-family: var(--el-font-family);
  margin-left: 8px;
  font-size: 12px;
  line-height: 18px;
}

[part=controls] {
  flex-shrink: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
  color: #61666b;
  align-items: center;
  display: flex;
}

[part=controls] el-button::part(el-button) {
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
}
[part=controls] el-button::part(el-button):hover {
  background-color: rgba(38, 49, 72, .06);
}
[part=controls] el-button el-icon {
  color: #61666b;
}
[part=controls] el-button::part(content) {
  display: none;
}

pre {
  font-size: 13px;
  font-family: var(--el-font-family);
  white-space: pre-wrap;
  word-break: break-all;
  padding: 16px;
  margin: 0!important;
}

.token.property,
.token.tag, 
.token.symbol, 
.token.deleted, 
.token.important {
  color: #e45649;
}

.token.doctype, 
.token.punctuation, 
.token.entity {
  color: #383a42;
}

.token.keyword {
  color: #a626a4;
}

.token.url {
  color: #0184bc;
}

.token.variable, 
.token.operator, 
.token.function {
  color: #4078f2;
}

.token.bold {
  font-weight: 700;
}
.token.comment,
.token.italic {
  font-style: italic;
}
  `;
  
  static properties = {
    language: {
      type: String,
      default: 'text',
    },
    code: {
      type: String,
    },
  }
  
  render() {
    return html`
<div part="banner-wrap">
  <div part="banner">
    <div part="banner-content">
      <div part="language"><span>${this.language}</span></div>
      <div part="controls">
        <el-button icon="CopyDocument" @click="${this.onCopy}"></el-button>
        <el-button icon="Download"></el-button>
      </div>
    </div>
  </div>
</div>
<pre><code class="language-${this.language}">${this.codeColoring(this.code)}</code></pre>`;
  }
  
  codeColoring(code) {
    if (!code) return '';
    const shaderConstructor = shaders[this.language];
    if (!shaderConstructor) return code;
    const shader = new shaderConstructor();
    const colored = shader.parse(code)
    return colored;
  }
  
  onCopy() {
    copyToClipboard(this.code);
  }
}

customElements.define('el-code-block', CodeBlock);
