import { ElElement, html, css } from '/src/index.js';


export class Tooltip extends ElElement {
  static category = 'Feedback';
  static styles = css`
.container {
  width: 100%;
  overflow: auto;
  border: 1px solid var(--el-border-color);
  padding: 10px;
  box-sizing: border-box;
}

.row {
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.center {
  justify-content: center;
}

el-tooltip {
  margin: 5px;
}
`;
  
  render() {
    return html`
<el-h1 id="tooltip">Tooltip</el-h1>
<div class="container">
  <div class="row center">
    <el-tooltip content="Top Left prompts info" placement="top-start">
      <el-button>top-start</el-button>
    </el-tooltip>
    <el-tooltip content="Top Center prompts info" placement="top">
      <el-button>top</el-button>
    </el-tooltip>
    <el-tooltip content="Top Right prompts info" placement="top-end">
      <el-button>top-end</el-button>
    </el-tooltip>
  </div>
  <div class="row">
    <el-tooltip content="Left Top prompts info" placement="left-start">
      <el-button>left-start</el-button>
    </el-tooltip>
    <el-tooltip content="Right Top prompts info" placement="right-start">
      <el-button>right-start</el-button>
    </el-tooltip>
  </div>
  <div class="row">
    <el-tooltip content="Left Center prompts info" placement="left">
      <el-button>left</el-button>
    </el-tooltip>
    <el-tooltip content="Right Center prompts info" placement="right">
      <el-button>right</el-button>
    </el-tooltip>
  </div>
  <div class="row">
    <el-tooltip content="Left Bottom prompts info" placement="left-end">
      <el-button>left-end</el-button>
    </el-tooltip>
    <el-tooltip content="Right Bottom prompts info" placement="right-end">
      <el-button>right-ebd</el-button>
    </el-tooltip>
  </div>
  <div class="row center">
    <el-tooltip content="Bottom Left prompts info" placement="bottom-start">
      <el-button>bottom-start</el-button>
    </el-tooltip>
    <el-tooltip content="Bottom Center prompts info" placement="bottom">
      <el-button>bottom</el-button>
    </el-tooltip>
    <el-tooltip content="Bottom Right prompts info" placement="bottom-end">
      <el-button>bottom-end</el-button>
    </el-tooltip>
  </div>
</div>

<el-h2 id="theme">Theme</el-h2>
<div class="container">
  <el-tooltip effect="dark" content="Top center">
    <el-button>Dark</el-tooltip>
  </el-tooltip>
  <el-tooltip effect="light" placement="bottom" content="Bottom center">
    <el-button>Light</el-tooltip>
  </el-tooltip>
  <el-tooltip effect="customized" placement="bottom" content="Bottom center">
    <el-button>Customized theme</el-tooltip>
  </el-tooltip>
  <style>
el-tooltip[effect=customized]::part(popper) {
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

el-tooltip[effect=customized]::part(popper__arrow)::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
  </style>
</div>

<el-h2 id="more-content">More Content</el-h2>
<el-tooltip placement="top">
  <el-button>Top center</el-button>
  <div slot="content">multiple lines<br/>second line</div>
</el-tooltip>`;
  }
}

customElements.define('docs-tooltip', Tooltip);
