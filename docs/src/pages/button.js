import { ElElement, html, css } from '/src/index.js';

export class Button extends ElElement {
  static category = 'Basic';
  static styles = css`
container > *:last-child {
  margin-bottom: 15px;
}

.button-row {
  display: flex; 
  flex-wrap: wrap; 
  gap: 1.3rem; 
  margin-top: 1rem;
  align-items: center;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}`;
  
  render() {
    return html`
<el-h1 id="button" href="#button">Button</el-h1>
<p>Commonly used button.</p>
<el-h2 id="basic-usage" href="#basic-usage">Basic Usage</el-h2>
<div class="button-row">
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</div>
<p>plain button</p>
<div class="button-row">
  <el-button plain>Default</el-button>
  <el-button type="primary" plain>Primary</el-button>
  <el-button type="success" plain>Success</el-button>
  <el-button type="info" plain>Info</el-button>
  <el-button type="warning" plain>Warning</el-button>
  <el-button type="danger" plain>Danger</el-button>
</div>
<p>round button</p>
<div class="button-row">
  <el-button round>Round</el-button>
  <el-button type="primary" round>Primary</el-button>
  <el-button type="success" round>Success</el-button>
  <el-button type="info" round>Info</el-button>
  <el-button type="warning" round>Warning</el-button>
  <el-button type="danger" round>Danger</el-button>
</div>
<p>circle button</p>
<div class="button-row" style="gap: 1rem">
  <el-button icon="Search" circle ></el-button>
  <el-button type="primary" icon="Edit" circle ></el-button>
  <el-button type="success" icon="Check" circle /></el-button>
  <el-button type="info" icon="Message" circle /></el-button>
  <el-button type="warning" icon="Star" circle /></el-button>
  <el-button type="danger" icon="Delete" circle /></el-button>
</div>

<el-h2 id="disabled-button" href="#disabled-button">Disabled Button</el-h2>
<div class="button-row">
  <el-button disabled>Default</el-button>
  <el-button type="primary" disabled>Primary</el-button>
  <el-button type="success" disabled>Success</el-button>
  <el-button type="info" disabled>Info</el-button>
  <el-button type="warning" disabled>Warning</el-button>
  <el-button type="danger" disabled>Danger</el-button>
</div>
<div class="button-row">
  <el-button plain disabled>Default</el-button>
  <el-button type="primary" plain disabled>Primary</el-button>
  <el-button type="success" plain disabled>Success</el-button>
  <el-button type="info" plain disabled>Info</el-button>
  <el-button type="warning" plain disabled>Warning</el-button>
  <el-button type="danger" plain disabled>Danger</el-button>
</div>

<el-h2 id="link-button" href="#link-button">Link Button</el-h2>
<div class="button-row">
  <el-button link>link</el-button>
  <el-button type="primary" link>Primary</el-button>
  <el-button type="success" link>Success</el-button>
  <el-button type="info" link>Info</el-button>
  <el-button type="warning" link>Warning</el-button>
  <el-button type="danger" link>Danger</el-button>
</div>
<div class="button-row">
  <el-button link disabled>link</el-button>
  <el-button type="primary" link disabled>Primary</el-button>
  <el-button type="success" link disabled>Success</el-button>
  <el-button type="info" link disabled>Info</el-button>
  <el-button type="warning" link disabled>Warning</el-button>
  <el-button type="danger" link disabled>Danger</el-button>
</div>

<el-h2 id="text-button" href="#text-button">Text Button</el-h2>
<div class="button-row">
  <el-button text>Default</el-button>
  <el-button type="primary" text>Primary</el-button>
  <el-button type="success" text>Success</el-button>
  <el-button type="info" text>Info</el-button>
  <el-button type="warning" text>Warning</el-button>
  <el-button type="danger" text>Danger</el-button>
</div>
<div class="button-row">
  <el-button text disabled>text</el-button>
  <el-button type="primary" text disabled>Primary</el-button>
  <el-button type="success" text disabled>Success</el-button>
  <el-button type="info" text disabled>Info</el-button>
  <el-button type="warning" text disabled>Warning</el-button>
  <el-button type="danger" text disabled>Danger</el-button>
</div>

<p>text button with background</p>
<div class="button-row">
  <el-button text bg>Default</el-button>
  <el-button type="primary" text bg>Primary</el-button>
  <el-button type="success" text bg>Success</el-button>
  <el-button type="info" text bg>Info</el-button>
  <el-button type="warning" text bg>Warning</el-button>
  <el-button type="danger" text bg>Danger</el-button>
</div>
<div class="button-row">
  <el-button text bg disabled>text</el-button>
  <el-button type="primary" text bg disabled>Primary</el-button>
  <el-button type="success" text bg disabled>Success</el-button>
  <el-button type="info" text bg disabled>Info</el-button>
  <el-button type="warning" text bg disabled>Warning</el-button>
  <el-button type="danger" text bg disabled>Danger</el-button>
</div>

<el-h2 id="icon-button" href="#icon-button">Icon Button</el-h2>
<div class="button-row" style="gap: 1rem">
  <el-button type="primary" icon="Edit"></el-button>
  <el-button type="primary" icon="Share"></el-button>
  <el-button type="primary" icon="Delete"></el-button>
  <el-button type="primary" icon="Search">Search</el-button>
  <el-button type="primary">
    Upload<el-icon icon="Upload" style="margin-left: 5px"></el-icon>
  </el-button>
</div>
    
<el-h2 id="button-group" href="#button-group">Button Group</el-h2>
<div class="button-row">
  <el-button-group>
    <el-button type="primary" icon="Edit"></el-button>
    <el-button type="primary" icon="Share"></el-button>
    <el-button type="danger" icon="Delete"></el-button>
  </el-button-group>
</div>

<el-h2 id="loading-button" href="#loading-button">Loading Button</el-h2>
<div class="button-row">
  <el-button type="primary" loading>Loading</el-button>
  <el-button type="primary" loading-icon="Eleme" loading>Loading</el-button>
  <el-button type="primary" loading>
    <div class="custom-loading" slot="loading">
      <svg class="circular" viewBox="-10, -10, 50, 50">
        <path
          class="path"
          d="M 30 15 L 28 17 M 25.61 25.61 A 15 15, 0, 0, 1, 15 30 A 15 15, 0, 1, 1, 27.99 7.5 L 15 15"
          style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
        />
      </svg>
    </div>
    Loading
  </el-button>
</div>
<style>
el-button .custom-loading .circular {
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>
    
<el-h2 id="sizes" href="#sizes">Sizes</el-h2>
<div class="button-row">
  <el-button size="large">Large</el-button>
  <el-button>Default</el-button>
  <el-button size="small">Small</el-button>
</div>
<div class="button-row">
  <el-button size="large" round>Large</el-button>
  <el-button round>Default</el-button>
  <el-button size="small" round>Small</el-button>
</div>
<div class="button-row">
  <el-button size="large" circle icon="Search"></el-button>
  <el-button circle icon="Search"></el-button>
  <el-button size="small" circle icon="Search"></el-button>
</div>

<el-h2 id="custom-color" href="#custom-color">Custom Color</el-h2>
<div class="button-row">
  <el-button color="#ff8aac">Default</el-button>
  <el-button color="#ff8aac" disabled>Disabled</el-button>
  <el-button color="#ff8aac" plain>Plain</el-button>
  <el-button color="#ff8aac" disabled plain>Disabled Plain</el-button>
</div>`;
  }
}

customElements.define('docs-button', Button);
