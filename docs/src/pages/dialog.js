import { ElElement, html, css } from '/src/index.js';


export class Dialog extends ElElement {
  static category = 'Feedback';
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
    open1: {
      type: Boolean,
      state: true,
    },
  }
  
  render() {
    return html`
<el-h1 id="dialog">Dialog</el-h1>
<p>Informs users while preserving the current page state.</p>
<el-h2 id="basic-usage">Basic Usage</el-h2>
<p>Dialog pops up a dialog box, and it's quite customizable.</p>
<p>Set <code>open</code> attribute with a <code>Boolean</code>, and Dialog shows when it is <code>true</code>. The Dialog has two parts: <code>body</code> and <code>footer</code>, and the latter requires a <code>slot</code> named <code>footer</code>. The optional <code>title</code> attribute (empty by default) is for defining a title. Finally, this example demonstrates how before-close is used.</p>
<div class="example">
  <div class="example-showcase">
    <el-button @click="${() => this.open1 = true}">Click to open the Dialog</el-button>
    <el-dialog title="Tips" ?open="${this.open1}" @hide="${this.onHide}">
      <span>This is a message</span>
    </el-dialog>
  </div>
  <el-divider></el-divider>
  <div class="op-btns"></div>
</div>
    `;
  }
  
  onHide() {
    this.open1 = false;
  }
}

customElements.define('docs-dialog', Dialog);
