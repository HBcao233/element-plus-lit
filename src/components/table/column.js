import { ElElement, nothing } from '../element/index.js';

export default class TableColumn extends ElElement {
  static properties = {
    prop: {
      type: String,
      attribute: true,
    },
    label: {
      type: String,
      attribute: true,
    },
    width: {
      type: Number,
      attribute: true,
    },
    type: {
      type: String,
    },
    showOverflowTooltip: {
      type: Boolean,
      attribute: 'show-overflow-tooltip',
    },
  }
  
  render() {
    return nothing;
  }
}

customElements.define('el-table-column', TableColumn);
