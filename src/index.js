import ElementPlusIcons from '../static/element-plus-icons.js';
import { TinyColor } from '../static/tinycolor_v4.2.0.min.js';
export * from '../static/lit-all.min.js';
export * from './components/index.js';
export { ElementPlusIcons, TinyColor };

const styles = `
@font-face {
  font-family: "KaTeX_AMS";
  src: url(/static/fonts/KaTeX_AMS-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_AMS-Regular.woff) format("woff"), url(/static/fonts/KaTeX_AMS-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Caligraphic";
  src: url(/static/fonts/KaTeX_Caligraphic-Bold.woff2) format("woff2"), url(/static/fonts/KaTeX_Caligraphic-Bold.woff) format("woff"), url(/static/fonts/KaTeX_Caligraphic-Bold.ttf) format("truetype");
  font-weight: bold;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Caligraphic";
  src: url(/static/fonts/KaTeX_Caligraphic-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Caligraphic-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Caligraphic-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Fraktur";
  src: url(/static/fonts/KaTeX_Fraktur-Bold.woff2) format("woff2"), url(/static/fonts/KaTeX_Fraktur-Bold.woff) format("woff"), url(/static/fonts/KaTeX_Fraktur-Bold.ttf) format("truetype");
  font-weight: bold;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Fraktur";
  src: url(/static/fonts/KaTeX_Fraktur-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Fraktur-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Fraktur-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Main";
  src: url(/static/fonts/KaTeX_Main-Bold.woff2) format("woff2"), url(/static/fonts/KaTeX_Main-Bold.woff) format("woff"), url(/static/fonts/KaTeX_Main-Bold.ttf) format("truetype");
  font-weight: bold;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Main";
  src: url(/static/fonts/KaTeX_Main-BoldItalic.woff2) format("woff2"), url(/static/fonts/KaTeX_Main-BoldItalic.woff) format("woff"), url(/static/fonts/KaTeX_Main-BoldItalic.ttf) format("truetype");
  font-weight: bold;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Main";
  src: url(/static/fonts/KaTeX_Main-Italic.woff2) format("woff2"), url(/static/fonts/KaTeX_Main-Italic.woff) format("woff"), url(/static/fonts/KaTeX_Main-Italic.ttf) format("truetype");
  font-weight: normal;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Main";
  src: url(/static/fonts/KaTeX_Main-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Main-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Main-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Math";
  src: url(/static/fonts/KaTeX_Math-BoldItalic.woff2) format("woff2"), url(/static/fonts/KaTeX_Math-BoldItalic.woff) format("woff"), url(/static/fonts/KaTeX_Math-BoldItalic.ttf) format("truetype");
  font-weight: bold;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Math";
  src: url(/static/fonts/KaTeX_Math-Italic.woff2) format("woff2"), url(/static/fonts/KaTeX_Math-Italic.woff) format("woff"), url(/static/fonts/KaTeX_Math-Italic.ttf) format("truetype");
  font-weight: normal;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_SansSerif";
  src: url(/static/fonts/KaTeX_SansSerif-Bold.woff2) format("woff2"), url(/static/fonts/KaTeX_SansSerif-Bold.woff) format("woff"), url(/static/fonts/KaTeX_SansSerif-Bold.ttf) format("truetype");
  font-weight: bold;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_SansSerif";
  src: url(/static/fonts/KaTeX_SansSerif-Italic.woff2) format("woff2"), url(/static/fonts/KaTeX_SansSerif-Italic.woff) format("woff"), url(/static/fonts/KaTeX_SansSerif-Italic.ttf) format("truetype");
  font-weight: normal;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_SansSerif";
  src: url(/static/fonts/KaTeX_SansSerif-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_SansSerif-Regular.woff) format("woff"), url(/static/fonts/KaTeX_SansSerif-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Script";
  src: url(/static/fonts/KaTeX_Script-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Script-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Script-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Size1";
  src: url(/static/fonts/KaTeX_Size1-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Size1-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Size1-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Size2";
  src: url(/static/fonts/KaTeX_Size2-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Size2-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Size2-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Size3";
  src: url(/static/fonts/KaTeX_Size3-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Size3-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Size3-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Size4";
  src: url(/static/fonts/KaTeX_Size4-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Size4-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Size4-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "KaTeX_Typewriter";
  src: url(/static/fonts/KaTeX_Typewriter-Regular.woff2) format("woff2"), url(/static/fonts/KaTeX_Typewriter-Regular.woff) format("woff"), url(/static/fonts/KaTeX_Typewriter-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
:root {
  --el-color-white: #ffffff;
  --el-color-black: #000000;
  --el-color-primary-rgb: 64, 158, 255;
  --el-color-success-rgb: 103, 194, 58;
  --el-color-warning-rgb: 230, 162, 60;
  --el-color-danger-rgb: 245, 108, 108;
  --el-color-error-rgb: 245, 108, 108;
  --el-color-info-rgb: 144, 147, 153;
  --el-font-size-extra-large: 20px;
  --el-font-size-large: 18px;
  --el-font-size-medium: 16px;
  --el-font-size-base: 14px;
  --el-font-size-small: 13px;
  --el-font-size-extra-small: 12px;
  --el-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  --el-font-weight-primary: 500;
  --el-font-line-height-primary: 24px;
  --el-index-normal: 1;
  --el-index-top: 1000;
  --el-index-popper: 2000;
  --el-border-radius-base: 4px;
  --el-border-radius-small: 2px;
  --el-border-radius-round: 20px;
  --el-border-radius-circle: 100%;
  --el-transition-duration: .3s;
  --el-transition-duration-fast: .2s;
  --el-transition-function-ease-in-out-bezier: cubic-bezier(.645, .045, .355, 1);
  --el-transition-function-fast-bezier: cubic-bezier(.23, 1, .32, 1);
  --el-transition-all: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  --el-transition-fade: opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
  --el-transition-md-fade: transform var(--el-transition-duration) var(--el-transition-function-fast-bezier), opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
  --el-transition-fade-linear: opacity var(--el-transition-duration-fast) linear;
  --el-transition-border: border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
  --el-transition-box-shadow: box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
  --el-transition-color: color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
  --el-component-size-large: 40px;
  --el-component-size: 32px;
  --el-component-size-small: 24px;
}


:root {
  color-scheme: light;
  --el-color-primary: #409eff;
  --el-color-primary-light-3: rgb(121, 187, 255);
  --el-color-primary-light-5: rgb(160, 207, 255);
  --el-color-primary-light-7: rgb(198, 226, 255);
  --el-color-primary-light-8: rgb(217, 236, 255);
  --el-color-primary-light-9: rgb(236, 245, 255);
  --el-color-primary-dark-2: rgb(51, 126, 204);
  --el-color-success: #67c23a;
  --el-color-success-light-3: rgb(149, 212, 117);
  --el-color-success-light-5: rgb(179, 225, 157);
  --el-color-success-light-7: rgb(209, 237, 196);
  --el-color-success-light-8: rgb(225, 243, 216);
  --el-color-success-light-9: rgb(240, 249, 235);
  --el-color-success-dark-2: rgb(82, 155, 46);
  --el-color-warning: #e6a23c;
  --el-color-warning-light-3: rgb(238, 190, 119);
  --el-color-warning-light-5: rgb(243, 209, 158);
  --el-color-warning-light-7: rgb(248, 227, 197);
  --el-color-warning-light-8: rgb(250, 236, 216);
  --el-color-warning-light-9: rgb(253, 246, 236);
  --el-color-warning-dark-2: rgb(184, 130, 48);
  --el-color-danger: #f56c6c;
  --el-color-danger-light-3: rgb(248, 152, 152);
  --el-color-danger-light-5: rgb(250, 182, 182);
  --el-color-danger-light-7: rgb(252, 211, 211);
  --el-color-danger-light-8: rgb(253, 226, 226);
  --el-color-danger-light-9: rgb(254, 240, 240);
  --el-color-danger-dark-2: rgb(196, 86, 86);
  --el-color-error: #f56c6c;
  --el-color-error-light-3: rgb(248, 152, 152);
  --el-color-error-light-5: rgb(250, 182, 182);
  --el-color-error-light-7: rgb(252, 211, 211);
  --el-color-error-light-8: rgb(253, 226, 226);
  --el-color-error-light-9: rgb(254, 240, 240);
  --el-color-error-dark-2: rgb(196, 86, 86);
  --el-color-info: #909399;
  --el-color-info-light-3: rgb(177, 179, 184);
  --el-color-info-light-5: rgb(200, 201, 204);
  --el-color-info-light-7: rgb(222, 223, 224);
  --el-color-info-light-8: rgb(233, 233, 235);
  --el-color-info-light-9: rgb(244, 244, 245);
  --el-color-info-dark-2: rgb(115, 118, 122);
  --el-bg-color: #ffffff;
  --el-bg-color-page: #f2f3f5;
  --el-bg-color-overlay: #ffffff;
  --el-text-color-primary: #303133;
  --el-text-color-regular: #606266;
  --el-text-color-secondary: #909399;
  --el-text-color-placeholder: #a8abb2;
  --el-text-color-disabled: #c0c4cc;
  --el-border-color: #dcdfe6;
  --el-border-color-light: #e4e7ed;
  --el-border-color-lighter: #ebeef5;
  --el-border-color-extra-light: #f2f6fc;
  --el-border-color-dark: #d4d7de;
  --el-border-color-darker: #cdd0d6;
  --el-fill-color: #f0f2f5;
  --el-fill-color-light: #f5f7fa;
  --el-fill-color-lighter: #fafafa;
  --el-fill-color-extra-light: #fafcff;
  --el-fill-color-dark: #ebedf0;
  --el-fill-color-darker: #e6e8eb;
  --el-fill-color-blank: #ffffff;
  --el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
  --el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, .12);
  --el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, .12);
  --el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16);
  --el-disabled-bg-color: var(--el-fill-color-light);
  --el-disabled-text-color: var(--el-text-color-placeholder);
  --el-disabled-border-color: var(--el-border-color-light);
  --el-overlay-color: rgba(0, 0, 0, .8);
  --el-overlay-color-light: rgba(0, 0, 0, .7);
  --el-overlay-color-lighter: rgba(0, 0, 0, .5);
  --el-mask-color: rgba(255, 255, 255, .9);
  --el-mask-color-extra-light: rgba(255, 255, 255, .3);
  --el-border-width: 1px;
  --el-border-style: solid;
  --el-border-color-hover: var(--el-text-color-disabled);
  --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
  --el-svg-monochrome-grey: var(--el-border-color);
}
:root {
  --el-popup-modal-bg-color: var(--el-color-black);
  --el-popup-modal-opacity: .5;
}
:root {
  --el-loading-spinner-size: 42px;
  --el-loading-fullscreen-spinner-size: 50px;
}
:root {
  --el-menu-active-color: var(--el-color-primary);
  --el-menu-text-color: var(--el-text-color-primary);
  --el-menu-hover-text-color: var(--el-color-primary);
  --el-menu-bg-color: var(--el-fill-color-blank);
  --el-menu-hover-bg-color: var(--el-color-primary-light-9);
  --el-menu-item-height: 56px;
  --el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
  --el-menu-horizontal-height: 60px;
  --el-menu-horizontal-sub-item-height: 36px;
  --el-menu-item-font-size: var(--el-font-size-base);
  --el-menu-item-hover-fill: var(--el-color-primary-light-9);
  --el-menu-border-color: var(--el-border-color);
  --el-menu-base-level-padding: 20px;
  --el-menu-level-padding: 20px;
  --el-menu-icon-width: 24px;
}`;
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style)
}, { once: true });
