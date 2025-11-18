import { ElElement, html, css } from '/src/index.js';
import { camelToKebab } from './utils.js';
import * as pages from './pages/index.js';


const sidebars = {
  'Overview': [],
  'Basic': [],
  'Form': [],
  'Data': [],
  'Navigation': [],
  'Feedback': [],
  'Others': [],
};
for (const page of Object.values(pages)) {
  if (page.category in sidebars) {
    sidebars[page.category].push(page.name);
  }
}

class Layout extends ElElement {
  static styles = css`
el-header {
  border-bottom: 1px solid var(--el-border-color);
}

.sidebar-button::part(el-button) {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: var(--text-color);
}
.sidebar-button el-icon {
  font-size: 20px; 
  margin-right: 0.5rem
}

.sidebar-group__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 24px;
}

a {
  font-weight: 500;
  text-decoration: inherit;
  color: var(--el-color-primary);
}
.link {
  display: block;
  padding: 10px 16px;
  line-height: 1.5;
  font-size: .9rem;
  border-radius: 8px;
}
.link.active {
  background-color: rgba(var(--el-color-primary-rgb), .1);
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-light);
  transition: color .5s;
}
.link .link-text {
  margin: 0;
}

.link.active .link-text {
  font-weight: 600;
  color: var(--el-color-primary);
  transition: color .25s;
}
`;
  
  static properties = {
    sidebar_showed: {
      type: Boolean,
      state: true,
    },
  }
  
  render() {
    return html`
<el-container>
  <el-aside>
    <el-sidebar ?open="${this.sidebar_showed}" @hide="${() => (this.sidebar_showed = false)}">
      ${Object.entries(sidebars).map(([title, items]) => html`
        <div class="sidebar-group">
          <p class="sidebar-group__title">${title}</p>
          ${items.map(item => html`
            <a class="link${router.currentPath.slice(1) == camelToKebab(item) ? ' active':''}" href="/${camelToKebab(item)}">
              <p class="link-text">${item}</p>
            </a>
          `)}
        </div>
      `)}
    </el-sidebar>
  </el-aside>
  <el-header height="40">
    <el-button class="sidebar-button" @click="${() => (this.sidebar_showed = true)}">
      <el-icon>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="11" height="2" fill="#606266"></rect><rect x="2" y="11" width="14" height="2" fill="#606266"></rect><rect x="2" y="15" width="8" height="2" fill="#606266"></rect><rect x="2" y="3" width="16" height="2" fill="#606266"></rect></svg>
      </el-icon>
      Menu
    </el-button>
  </el-header>
  <el-main>
    <slot></slot>
  </el-main>
</el-container>`;
  }

  firstUpdated() {
    this.renderRoot.querySelector('el-sidebar').querySelectorAll('a').forEach(i => i.addEventListener('click', (e) => {
      e.preventDefault();
      const url = new URL(e.target.closest('a').href);
      router.push(url.pathname);
      this.sidebar_showed = false;
    }));
    
    this.renderRoot.querySelector('el-main').addEventListener('click', (e) => {
      for (const i of e.composedPath()) {
        if (i.localName === 'a') {
          if (!i.href.includes('#')) return;
          i.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          return;
        }
      }
    });
  }
}

customElements.define('docs-app', Layout);
