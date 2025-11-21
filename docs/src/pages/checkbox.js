import { ElElement, html } from '/src/index.js';
import { globalCSS } from '../css.js';


const code_basic = `import { ElElement, html } from 'element-plus-lit.min.js';

class MyApp extends ElElement {
  static properties = {
    checked1: {
      type: Boolean,
      state: true,
      default: true,
    },
    checked2: {
      type: Boolean,
      state: true,
    },
    checked3: {
      type: Boolean,
      state: true,
    },
    checked4: {
      type: Boolean,
      state: true,
    },
    checked5: {
      type: Boolean,
      state: true,
    },
    checked6: {
      type: Boolean,
      state: true,
    },
  }
  
  render() {
    return \`<div>
  <el-checkbox 
    .checked="\${this.checked1}" 
    @change="\${(e) => this.checked1 = e.target.checked}" 
    label="\${this.checked1 ? 'Checked':'Option'} 1" 
    size="large"
  ></el-checkbox>
  <el-checkbox 
    .checked="\${this.checked2}" 
    @change="\${(e) => this.checked2 = e.target.checked}" 
    label="\${this.checked2 ? 'Checked':'Option'} 2" 
    size="large"
  ></el-checkbox>
</div>
<div>
  <el-checkbox 
    .checked="\${this.checked3}" 
    @change="\${(e) => this.checked3 = e.target.checked}" 
    label="\${this.checked3 ? 'Checked':'Option'} 3" 
  ></el-checkbox>
  <el-checkbox 
    .checked="\${this.checked4}" 
    @change="\${(e) => this.checked4 = e.target.checked}" 
    label="\${this.checked4 ? 'Checked':'Option'} 4" 
  ></el-checkbox>
</div>
<div>
  <el-checkbox 
    .checked="\${this.checked5}" 
    @change="\${(e) => this.checked5 = e.target.checked}" 
    label="\${this.checked5 ? 'Checked':'Option'} 5" 
    size="small"
  ></el-checkbox>
  <el-checkbox 
    .checked="\${this.checked6}" 
    @change="\${(e) => this.checked6 = e.target.checked}" 
    label="\${this.checked6 ? 'Checked':'Option'} 6" 
    size="small"
  ></el-checkbox>
</div>\`;
  }
}

customElements.define('my-app', MyApp)`;

export class Checkbox extends ElElement {
  static category = 'Form';
  static styles = globalCSS
  
  static properties = {
    checked1: {
      type: Boolean,
      state: true,
      default: true,
    },
    checked2: {
      type: Boolean,
      state: true,
      default: false,
    },
    checked3: {
      type: Boolean,
      state: true,
    },
    checked4: {
      type: Boolean,
      state: true,
    },
    checked5: {
      type: Boolean,
      state: true,
    },
    checked6: {
      type: Boolean,
      state: true,
    },
  }
  
  render() {
    return html`
<el-h1>Checkbox</el-h1>
<p>A group of options for multiple choices.</p>
<el-h2>Basic Usage</el-h2>
<p>Checkbox can be used alone to switch between two states.</p>
<p>Define <code>checked</code> in el-checkbox to control the checkbox status. It should be noted that the responsive behavior of lit is one-way, so you must obtain the state of the checkbox by setting the <code>change</code> event.</p>
<docs-example .code="${code_basic}">
  <div>
    <el-checkbox 
      .checked="${this.checked1}" 
      @change="${(e) => this.checked1 = e.target.checked}" 
      label="${this.checked1 ? 'Checked':'Option'} 1" 
      size="large"
    ></el-checkbox>
    <el-checkbox 
      .checked="${this.checked2}" 
      @change="${(e) => this.checked2 = e.target.checked}" 
      label="${this.checked2 ? 'Checked':'Option'} 2" 
      size="large"
    ></el-checkbox>
  </div>
  <div>
    <el-checkbox 
      .checked="${this.checked3}" 
      @change="${(e) => this.checked3 = e.target.checked}" 
      label="${this.checked3 ? 'Checked':'Option'} 3" 
    ></el-checkbox>
    <el-checkbox 
      .checked="${this.checked4}" 
      @change="${(e) => this.checked4 = e.target.checked}" 
      label="${this.checked4 ? 'Checked':'Option'} 4" 
    ></el-checkbox>
  </div>
  <div>
    <el-checkbox 
      .checked="${this.checked5}" 
      @change="${(e) => this.checked5 = e.target.checked}" 
      label="${this.checked5 ? 'Checked':'Option'} 5" 
      size="small"
    ></el-checkbox>
    <el-checkbox 
      .checked="${this.checked6}" 
      @change="${(e) => this.checked6 = e.target.checked}" 
      label="${this.checked6 ? 'Checked':'Option'} 6" 
      size="small"
    ></el-checkbox>
  </div>
</docs-example>

<el-h2>API</el-h2>
<el-h3 id="attributes">Attributes</el-h3>
    `;
  }
  
}

customElements.define('docs-checkbox', Checkbox);
