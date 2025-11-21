import { ElElement, html, css } from '/src/index.js';
import { globalCSS } from '../css.js';

const code_basic = `import { ElElement, html } from 'element-plus-lit.min.js';

class MyApp extends ElElement {
  static properties = {
    tableData: {
      type: Array,
      default: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
  }
  
  render() {
    return html\`
<el-table .data="\${this.tableData}">
  <el-table-column prop="date" label="Date" width="180"></el-table-column>
  <el-table-column prop="name" label="Name" width="180"></el-table-column>
  <el-table-column prop="address" label="Address"></el-table-column>
</el-table>\`;
  }
}

customElements.define('my-app', MyApp)`;
const code_stripe = `import { ElElement, html } from 'element-plus-lit.min.js';

class MyTable extends ElElement {
  static properties = {
    tableData: {
      type: Array,
      default: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
  }
  
  render() {
    return html\`
<el-table .data="\${this.tableData}" stripe>
  <el-table-column prop="date" label="Date" width="180"></el-table-column>
  <el-table-column prop="name" label="Name" width="180"></el-table-column>
  <el-table-column prop="address" label="Address"></el-table-column>
</el-table>\`;
  }
}`;
const code_border = `import { ElElement, html } from 'element-plus-lit.min.js';

class MyTable extends ElElement {
  static properties = {
    tableData: {
      type: Array,
      default: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
  }
  
  render() {
    return html\`
<el-table .data="\${this.tableData}" border>
  <el-table-column prop="date" label="Date" width="180"></el-table-column>
  <el-table-column prop="name" label="Name" width="180"></el-table-column>
  <el-table-column prop="address" label="Address"></el-table-column>
</el-table>\`;
  }
}`;
const code_status = `import { ElElement, html, css } from 'element-plus-lit.min.js';

class MyTable extends ElElement {
  static styles = css\`
el-table::part(warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
el-table::part(success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
  \`;

  static properties = {
    tableData: {
      type: Array,
      default: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
    rowPart: {
      type: Function,
      default: (row, rowIndex) => { if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) { 
          return 'success-row';
        } 
      },
    },
  }
  
  render() {
    return html\`
<el-table .data="\${this.tableData}" .rowPart="\${this.rowPart}">
  <el-table-column prop="date" label="Date" width="180"></el-table-column>
  <el-table-column prop="name" label="Name" width="180"></el-table-column>
  <el-table-column prop="address" label="Address"></el-table-column>
</el-table>\`;
  }
}`;
const code_tooltip = `import { ElElement, html } from 'element-plus-lit.min.js';

class MyTable extends ElElement {
  static properties = {
    tableData: {
      type: Array,
      default: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
  }
  
  render() {
    return html\`
<el-table .data="\${this.tableData}">
  <el-table-column type="selection" width="55"></el-table-column>
  <el-table-column prop="date" label="Date" width="120"></el-table-column>
  <el-table-column prop="name" label="Name" width="120"></el-table-column>
  <el-table-column 
    prop="address" 
    label="use show-overflow-tooltip" 
    show-overflow-tooltip 
    width="240"
  ></el-table-column>
  <el-table-column prop="address" label="address"></el-table-column>
</el-table>\`;
  }
}`;

export class Table extends ElElement {
  static category = 'Data';
  static styles = [
    globalCSS,
    css`
el-table::part(warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
el-table::part(success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
    `,
  ];
  
  static properties = {
    tableData: {
      type: Array,
      default: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
    rowPart: {
      type: Function,
      default: (row, rowIndex) => { if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) { 
          return 'success-row';
        } 
      },
    },
  }
  
  render() {
    return html`
<el-h1>Table</el-h1>
<p>Display multiple data with similar format. You can sort, filter, compare your data in a table.</p>
<el-h2>Basic Table</el-h2>
<p>Basic table is just for data display.</p>
<p>After setting attribute <code>data</code> of el-table with an object array, you can use <code>prop</code> (corresponding to a key of the object in data array) in <code>el-table-column</code> to insert data to table columns, and set the attribute <code>label</code> to define the column name. You can also use the attribute <code>width</code> to define the width of columns.</p>
<docs-example .code="${code_basic}">
  <el-table .data="${this.tableData}" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</docs-example>

<el-h2>Striped Table</el-h2>
<p>Striped table makes it easier to distinguish different rows.</p>
<p>Attribute <code>stripe</code> accepts a Boolean. If <code>true</code>, table will be striped.</p>
<docs-example .code="${code_stripe}">
  <el-table .data="${this.tableData}" stripe>
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</docs-example>

<el-h2>Table with border</el-h2>
<p>By default, Table has no vertical border. If you need it, you can set attribute <code>border</code> to <code>true</code>.</p>
<docs-example .code="${code_border}">
  <el-table .data="${this.tableData}" border>
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</docs-example>

<el-h2>Table with status</el-h2>
<p>You can highlight your table content to distinguish between "success, information, warning, danger" and other states.</p>
<p>Use <code>.rowPart</code> in <code>el-table</code> to add custom classes to a certain row. Then you can style it with custom classes.</p>
<docs-example .code="${code_status}">
  <el-table .data="${this.tableData}" .rowPart="${this.rowPart}">
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</docs-example>

<el-h2>Table with show overflow tooltip</el-h2>
<p>When the content is too long, it will break into multiple lines, you can use <code>show-overflow-tooltip</code> to keep it in one line.</p>
<p>Attribute <code>show-overflow-tooltip</code>, which accepts a Boolean value. When set true, the extra content will show in tooltip when hover on the cell.</p>
<docs-example .code="${code_tooltip}">
  <el-table .data="${this.tableData}">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="date" label="Date" width="120"></el-table-column>
    <el-table-column prop="name" label="Name" width="120"></el-table-column>
    <el-table-column 
      prop="address" 
      label="use show-overflow-tooltip" 
      show-overflow-tooltip 
      width="240"
    ></el-table-column>
    <el-table-column prop="address" label="address"></el-table-column>
  </el-table>
</docs-example>

<el-h2>API</el-h2>
<el-h3 id="attributes">Attributes</el-h3>
    `;
  }
  
}

customElements.define('docs-table', Table);
