import { ElElement, html, css } from '/src/index.js';

export class Overview extends ElElement {
  static category = 'Overview';
  static styles = css`
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;
  
  render() {
    return html`
<div class="container">
  Overview
</div>`;
  }
}

customElements.define('docs-overview', Overview);
