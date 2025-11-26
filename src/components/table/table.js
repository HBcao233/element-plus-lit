import { ElElement, staticHtml as html, css, literal, nothing } from '/src/element.js'; 
import './column.js';

export default class Table extends ElElement {
  static styles = css`
:host {
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-border: 1px solid var(--el-table-border-color);
  --el-table-text-color: var(--el-text-color-regular);
  --el-table-header-text-color: var(--el-text-color-secondary);
  --el-table-row-hover-bg-color: var(--el-fill-color-light);
  --el-table-current-row-bg-color: var(--el-color-primary-light-9);
  --el-table-header-bg-color: var(--el-bg-color);
  --el-table-fixed-box-shadow: var(--el-box-shadow-light);
  --el-table-bg-color: var(--el-fill-color-blank);
  --el-table-tr-bg-color: var(--el-bg-color);
  --el-table-expanded-cell-bg-color: var(--el-fill-color-blank);
  --el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, .15);
  --el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, .15);
  --el-table-index: var(--el-index-normal);
}

[part=el-table] {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  max-width: 100%;
  background-color: var(--el-table-bg-color);
  font-size: var(--el-font-size-base);
  color: var(--el-table-text-color);
  overflow: auto;
}

[part=table] {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  max-width: 100%;
  background-color: var(--el-table-bg-color);
  font-size: var(--el-font-size-base);
  color: var(--el-table-text-color);
  
  border-right: 0;
  border-bottom: 0;
}

[part=thead] {
  color: var(--el-table-header-text-color);
}

[part~=tr] {
  background-color: var(--el-table-tr-bg-color);
}

[part~=th], 
[part~=td] {
  padding: 8px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  z-index: var(--el-table-index);
}

[part~=th] {
  font-weight: 600;
  background-color: var(--el-table-header-bg-color);
}

[part~=cell] {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  line-height: 23px;
  padding: 0 12px;
}

:host(:not([border])) [part~=th] {
  border-right: none;
}

:host [part~=th],
:host [part~=td] {
  border-bottom: var(--el-table-border);
}

:host([border]) [part~=th],
:host([border]) [part~=td] {
  border-right: var(--el-table-border);
}

:host([border]) [part~=th]:first-child,
:host([border]) [part~=td]:first-child {
  border-left: var(--el-table-border);
}

:host([border]) [part~=tr]:first-child [part~=th] {
  border-top: var(--el-table-border);
}

:host([stripe]) [part~=tr]:nth-child(2n) [part~=td] {
  background: var(--el-fill-color-lighter);
}

:host [part=tbody] [part~=tr]:hover > [part~=td] {
  background-color: var(--el-table-row-hover-bg-color);
}
  `;
  
  static properties = {
    data: {
      type: Array,
      attribute: true,
      default: [],
    },
    tableContent: {
      type: Object,
      state: true,
    },
    width: {
      type: Number,
      state: true,
      default: 80,
    },
    border: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    rowPart: {
      type: Function,
      attribute: 'row-part',
      default: () => {},
    },
    
    
    columns: {
      type: Array,
      state: true,
      default: [],
    },
    selection: {
      type: Object,
      state: true,
      default: {},
    },
    
  }
  
  render() {
    return html`<slot></slot><el-scrollbar part="el-table"><table part="table" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed; border-collapse: separate; width: ${this.width}px">${(() => html`<colgroup>${this.columns.map(col => html`<col width="${col.width || 80}"></col>`)}</colgroup><thead part="thead"><tr part="tr">${this.columns.map(this.renderHead.bind(this))}</div></tr></thead><tbody part="tbody">${this.data.map(this.renderRow.bind(this))}</tbody>`)()}</table></el-scrollbar>`;
  }
  
  updated(changedProps) {
  }
  
  firstUpdated() {
    this.renderRoot.addEventListener('slotchange', () => {
      this.columns = this.renderRoot.firstElementChild.assignedElements();
      this.width = this.columns.reduce((prev, curr) => prev + (curr.width || 80), 0);
    });
  }
  
  renderHead(col) {
    const count = Object.values(this.selection).reduce((count, item) => item === true ? count + 1 : count, 0);
    return html`<th part="th ${col.type === 'selection' ? 'column-selection': ''}"><div part="cell">${col.type === 'selection' ? html`<el-checkbox ?checked="${count === this.columns.length}" ?indeterminate="${count > 0 && count < this.columns.length}" @change="${this.selectAll}"></el-checkbox>` : col.label}</th>`;
  }
  
  renderRow(row, rowIndex) {
    const renderColumn = (col, colIndex) => {
      const content = row[col.prop];
      const tag = col.showOverflowTooltip ? literal`el-tooltip` : literal`div`;
      return html`<td part="td${col.type === 'selection' ? ' column-selection': ''}" data-column="${colIndex}"><${tag} part="cell" .triggerRef="${function() { return this.parentElement }}">${col.type === 'selection' ? html`<el-checkbox ?checked="${this.selection[rowIndex]}" @change="${this.select}"></el-checkbox>`: html`${content}${col.showOverflowTooltip ? html`<span slot="content">${content}</span>` : nothing}`}</${tag}></td>`;
    }
    const row_part = this.rowPart && this.rowPart.call(this, row, rowIndex);
    return html`<tr part="tr${row_part ? ' '+row_part:''}" data-row="${rowIndex}">${this.columns.map(renderColumn)}</tr>`;
  }
  
  select(e) {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const td = checkbox.parentElement.parentElement;
    const tr = td.parentElement;
    const row = tr.dataset.row;
    this.selection[row] = checked;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('select', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        selection: [row],
      }
    }));
  }
  
  selectAll(e) {
    const checkbox = e.target;
    const checked = checkbox.checked;
    this.columns.map((_, i) => this.selection[i] = checked);
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('selectall', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        selection: checked ? this.columns.map((_, i) => i) : [],
      },
    }));
  }
}

customElements.define('el-table', Table);
