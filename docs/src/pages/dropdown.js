import { ElElement, html, css } from '/src/index.js';

export class Dropdown extends ElElement {
  static styles = css`
.container {
  width: 100%;
  overflow: auto;
  border: 1px solid var(--el-border-color);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

el-dropdown {
  margin: 5px;
}
`;
  
  render() {
    return html`
<el-h1 id="tooltip">Tooltip</el-h1>
<div class="container">
  <el-dropdown placement="top-start">
    <el-button>top-start</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>The Action 1st</el-dropdown-item>
      <el-dropdown-item>The Action 2nd</el-dropdown-item>
      <el-dropdown-item>The Action 3rd</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown placement="top">
    <el-button>top</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>The Action 1st</el-dropdown-item>
      <el-dropdown-item>The Action 2nd</el-dropdown-item>
      <el-dropdown-item>The Action 3rd</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown placement="top-end">
    <el-button>top-end</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>The Action 1st</el-dropdown-item>
      <el-dropdown-item>The Action 2nd</el-dropdown-item>
      <el-dropdown-item>The Action 3rd</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
   
  <el-dropdown placement="bottom-start">
    <el-button>bottom-start</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>The Action 1st</el-dropdown-item>
      <el-dropdown-item>The Action 2nd</el-dropdown-item>
      <el-dropdown-item>The Action 3rd</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown placement="bottom">
    <el-button>bottom</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>The Action 1st</el-dropdown-item>
      <el-dropdown-item>The Action 2nd</el-dropdown-item>
      <el-dropdown-item>The Action 3rd</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown placement="bottom-end">
    <el-button>bottom-end</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>The Action 1st</el-dropdown-item>
      <el-dropdown-item>The Action 2nd</el-dropdown-item>
      <el-dropdown-item>The Action 3rd</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
    `;
  }
}

customElements.define('docs-dropdown', Dropdown);
