import { ElElement, html, css } from '/src/index.js';

export class CodeBlock extends ElElement {
  static category = 'Others';
  static styles = css`
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
`;
  static properties = {
  }
  
  render() {
    return html`
<el-h1 id="code-block">CodeBlock</el-h1>
<p>Show code.</p>
<el-h2 id="basic-usage">Basic Usage</el-h2>
<p>Set <code>language</code> attribute and <code>code</code> attribute. </p>
<div class="example">
  <div class="example-showcase">
    <el-code-block language="markdown" .code="${`# 一级标题
## 二级标题
### 三级标题

**这是粗体文本**  
*这是斜体文本*  
~~这是删除线文本~~  
\`这是行内代码\`

## 列表效果
- 无序列表项1
- 无序列表项2
  - 嵌套列表项

1. 有序列表项1
2. 有序列表项2
   1. 嵌套有序列表

## 链接和图片
[访问示例网站](https://example.com)  
![图片](https://via.placeholder.com/150)

## 引用效果
> 这是引用文本
> 可以跨多行
> > 嵌套引用也是可能的

## 代码块效果
\`\`\`python
def hello_world():
    print("Hello, World!")
    return True
\`\`\`

## 表格效果
| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |

## 任务列表
- [ ] 未完成任务
- [x] 已完成任务
- [ ] 另一个任务

## 数学公式
$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$

## 分隔符
---`}"></el-code-block>
  </div>
  <el-divider></el-divider>
  <div class="op-btns"></div>
  <div class="example-source-wrapper">
    <el-code-block language="html" .code="${`<el-code-block language="markdown" .code="\${\`# 一级标题
# 二级标题
# 三级标题

**这是粗体文本**  
*这是斜体文本*  
~~这是删除线文本~~  
\`这是行内代码\`

## 列表效果
- 无序列表项1
- 无序列表项2
  - 嵌套列表项

1. 有序列表项1
2. 有序列表项2
   1. 嵌套有序列表

## 链接和图片
[访问示例网站](https://example.com)  
![图片](https://via.placeholder.com/150)

## 引用效果
> 这是引用文本
> 可以跨多行
> > 嵌套引用也是可能的

## 代码块效果
\`\`\`python
def hello_world():
    print("Hello, World!")
    return True
\`\`\`

## 表格效果
| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |

## 任务列表
- [ ] 未完成任务
- [x] 已完成任务
- [ ] 另一个任务

## 数学公式
$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$

## 分隔符
---\`}"></el-code-block>`}"></el-code-block>
  </div>
</div>
    `;
  }
  
}

customElements.define('docs-code-block', CodeBlock);
