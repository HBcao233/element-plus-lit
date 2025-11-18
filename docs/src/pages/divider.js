import { ElElement, html, css } from '/src/index.js';
import { globalCSS } from '../css.js';

export class Divider extends ElElement {
  static category = 'Others';
  static styles = globalCSS;
  static properties = {
  }
  
  render() {
    return html`
<el-h1 id="divider">Divider</el-h1>
<p>The dividing line that separates the content.</p>
<el-h2 id="basic-usage">Basic Usage</el-h2>
<p>Divide the text of different paragraphs.</p>
<docs-example>
  <span>I sit at my window this morning where the world like a passer-by stops for a moment, nods to me and goes.</span>
  <el-divider></el-divider>
  <span>There little thoughts are the rustle of leaves; they have their whisper of joy in my mind.</span>
</docs-example>
<el-h2 id="custom-content">Custom content</el-h2>
<p>You can customize the content on the divider line.</p>
<docs-example>
  <span>What you are you do not see, what you see is your shadow. </span>
  <el-divider content-position="left">Rabindranath Tagore</el-divider>
  <span>
    My wishes are fools, they shout across thy song, my Master. Let me but
    listen.
  </span>
  <el-divider>
    <el-icon icon="StarFilled"></el-icon>
  </el-divider>
  <span>I cannot choose the best. The best chooses me.</span>
  <el-divider content-position="right">Rabindranath Tagore</el-divider>
</docs-example>

<el-h2 id="dashed-line">dashed line</el-h2>
<p>You can set the style of divider.</p>
<docs-example>
  <div>
    <span>What language is thine, O sea?</span>
    <el-divider border-style="dashed"></el-divider>
    <span>The language of eternal question.</span>
  </div>
  <el-divider border-style="dotted"></el-divider>
  <span>What language is thy answer, O sky?</span>
  <el-divider border-style="double"></el-divider>
  <span>The language of eternal silence.</span>
</docs-example>

<el-h2 id="Vertical-divider">Vertical divider</el-h2>
<docs-example>
  <span>Rain</span>
  <el-divider direction="vertical"></el-divider>
  <span>Home</span>
  <el-divider direction="vertical" border-style="dashed"></el-divider>
  <span>Grass</span>
</docs-example>

<el-h2 id="api">API</el-h2>
<el-h3 id="attributes">Attributes</el-h3>
    `;
  }
  
}

customElements.define('docs-divider', Divider);
