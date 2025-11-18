import { ElElement, html, css } from '/src/index.js';
import { copyToClipboard } from './utils.js';

export class Example extends ElElement {
  static styles = css`
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

.example-showcase + el-divider {
  margin: 0;
}

.op-btns {
  padding: .5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
  box-sizing: border-box;
}

.op-btns a {
  margin: 0 .5rem;
  cursor: pointer;
  color: var(--el-text-color-secondary);
  transition: .2s;
  font-size: 16px;
}

el-code-block,
el-code-block::part(banner) {
  border-radius: unset;
}

el-code-block {
  overflow: hidden;
  transition: height .3s ease;
}
  `;
  
  static properties = {
    code: {
      type: String,
    },
    sourceShowed: {
      type: Boolean,
      state: true,
    },
    codeHeight: {
      state: true,
    },
    language: {
      type: String,
      default: 'js',
    },
  }
  
  render() {
    return html`
<div class="example">
  <div class="example-showcase">
    <slot></slot>
  </div>
  <el-divider></el-divider>
  <div class="op-btns">
    <el-tooltip content="Edit on github">
      <a href="https://github.com/hbcao233/element-plus-lit">
        <el-icon><svg data-v-8918782f="" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path fill="currentColor" d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588c-.094-.117.34.427.433.539c.19.227.33.365.44.438c.204.137.587.196 1.15.14c.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292c-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047c.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308c1.477-.933 2.613-1.226 3.422-1.096c.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19c.691.936 1.058 2.045 1.058 3.293c0 3.757-1.674 5.665-4.642 6.392c.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716a1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446l.005-.705c.005-.708.007-1.338.007-1.998c0-.697-.183-1.152-.425-1.36c-.661-.57-.326-1.655.54-1.752c2.967-.333 4.337-1.482 4.337-4.66c0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947c-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66c.865.097 1.201 1.177.544 1.748c-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"></path></svg></el-icon>
      </a>
    </el-tooltip>
    <el-tooltip content="Copy code">
      <a href="javascript:;" @click="${this.onCopy}">
        <el-icon><svg viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-8918782f=""><path fill="currentColor" d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"></path></svg></el-icon>
      </a>
    </el-tooltip>
    <el-tooltip content="View source">
      <a href="javascript:;" @click="${this.viewSource}">
        <el-icon><svg viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-8918782f=""><path fill="currentColor" d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"></path></svg></el-icon>
      </a>
    </el-tooltip>
  </div>
  <div class="example-source-wrapper">
    <el-code-block language="${this.language}" .code="${this.code}"></el-code-block>
  </div>
</div>
    `;
  }
  
  firstUpdated() {
    this.codeBlock = this.renderRoot.querySelector('el-code-block');
    this.renderRoot.addEventListener('slotchange', () => {
      if (!this.code) {
        const nodes = this.renderRoot.querySelector('slot').assignedNodes();
        const codes = nodes.map(node => node.outerHTML?.trim() ?? node.textContent.trim());
        this.code = codes.join('\n').trim();
      }
      setTimeout(() => {
        const rect = this.codeBlock.getBoundingClientRect();
        this.codeHeight = rect.height;
        this.codeBlock.style.height = '0px';
      });
    });
  }
  
  onCopy() {
    copyToClipboard(this.code);
  }
  
  viewSource() {
    this.sourceShowed = !this.sourceShowed;
    if (this.sourceShowed) this.codeBlock.style.height = this.codeHeight + 'px';
    else this.codeBlock.style.height = 0;
  }
}

customElements.define('docs-example', Example);
