# element-plus-lit

## Usage
```js
import { ElElement, html, css } from 'https://element-plus-lit.vercel.app/dist/element-plus-lit.min.js';

class Layout extends ElElement {
  render() {
    return html`<el-button>Click</el-button>`;
  }
}

customElements.define('my-element', MyElement);
```

More infomation, see [Docs](https://element-plus-lit.vercel.app/)
