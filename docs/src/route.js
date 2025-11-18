import * as pages from './pages/index.js';
import { ElElement, html, css, unsafeHTML } from '/src/index.js';
import { camelToKebab } from './utils.js';

const routes = Object.keys(pages).map(k => {
  const name = camelToKebab(k);
  return {
    name: name,
    page: `<docs-${name}></docs-${name}>`,
  };
});


class Router {
  get currentPath() {
    return window.location.pathname;
  }
  
  push(path) {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new CustomEvent('pushstate', {
      detail: { path },
    }));
  }
  
  replace(path) {
    window.history.replaceState(null, '', path);
    window.dispatchEvent(new CustomEvent('replacestate', {
      detail: { path },
    }));
  }
}
window.router = new Router();

class Route extends ElElement {
  static styles = css``;
  
  static properties = {
    currentPath: {
      type: String,
      state: true,
      default: window.location.pathname,
    },
  }
  
  render() {
    if (this.currentPath === '/') return html`<docs-home></docs-home>`;
    for (const i of routes) {
      if (i.name == this.currentPath.slice(1)) return unsafeHTML(i.page);
    }
    return html`404 Not Found`;
  }
  
  setup() {
    window.addEventListener('pushstate', (e) => {
      this.currentPath = e.detail.path;
    });
    window.addEventListener('replacestate', (e) => {
      this.currentPath = e.detail.path;
    });
  }
  
}

customElements.define('docs-route', Route);
