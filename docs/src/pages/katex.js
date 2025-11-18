import { ElElement, html, css } from '/src/index.js';

export class Katex extends ElElement {
  static category = 'Others';
  static styles = css`
p {
  margin: 1rem 0;
  line-height: 1.7;
}

pre, code, kbd, samp {
  font-family: var(--code-font-family);
}

:not(pre)>code {
  border-radius: 4px;
  padding: .15rem .5rem;
  background-color: var(--el-fill-color-light);
  transition: color .25s,background-color .5s;
  font-size: 14px;
}

.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
}
.example-showcase {
  padding: 1.5rem;
  margin: .5px;
  background-color: var(--el-bg-color);
  border-radius: var(--el-border-radius-base);
  overflow: auto;
}
`;
  static properties = {
  }
  
  render() {
    return html`
<el-h1 id="katex">Katex</el-h1>
<p><a href="" target="_blank">KaTeX</a> is a fast math typesetting library for the web.</p>
<el-h2 id="basic-usage">Basic Usage</el-h2>
<p>Set <code>expression</code> attribute with a <code>String</code>. </p>
<div class="example">
  <div class="example-showcase">
    <el-katex .expression="${`
% \\f is defined as #1f(#2) using the macro
\\def\\f#1#2{#1f(#2)}
\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`}"></el-katex>
  </div>
  <el-divider></el-divider>
  <div class="op-btns"></div>
  <div class="example-source-wrapper">
    <el-code-block language="html" .code="${`<el-katex .expression="\${\`
% \\f is defined as #1f(#2) using the macro
\\def\\f#1#2{#1f(#2)}
\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi\`}"></el-katex>`}"></el-code-block>
  </div>
</div>
    `;
  }
  
}

customElements.define('docs-katex', Katex);
