import { css } from '/src/index.js';
export const globalCSS = css`
p {
  margin: 1rem 0;
  line-height: 1.7;
}

pre, code, kbd, samp {
  font-family: var(--code-font-family);
}

:not(pre)>code {
  border-radius: 4px;
  padding: .15rem .5rem;
  background-color: var(--el-fill-color-light);
  transition: color .25s,background-color .5s;
  font-size: 14px;
}
`;