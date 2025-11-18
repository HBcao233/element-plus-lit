import { staticHtml as html, literal, nothing, unsafeHTML } from '../element/index.js';

/**
 * Token types enumeration.
 * @enum {string}
 */
const TokenType = {
  HEADING: 'HEADING',
  CODE_FENCE: 'CODE_FENCE',
  INDENTED_CODE: 'INDENTED_CODE',
  BLOCKQUOTE: 'BLOCKQUOTE',
  UNORDERED_LIST_ITEM: 'UNORDERED_LIST_ITEM',
  ORDERED_LIST_ITEM: 'ORDERED_LIST_ITEM',
  HORIZONTAL_RULE: 'HORIZONTAL_RULE',
  TABLE_ROW: 'TABLE_ROW',
  MATH_BLOCK: 'MATH_BLOCK',
  HTML_BLOCK: 'HTML_BLOCK',
  BLANK_LINE: 'BLANK_LINE',
  TEXT: 'TEXT',
  EOF: 'EOF',
};

/**
 * AST node types enumeration.
 * @enum {string}
 */
const NodeType = {
  DOCUMENT: 'DOCUMENT',
  HEADING: 'HEADING',
  PARAGRAPH: 'PARAGRAPH',
  CODE_BLOCK: 'CODE_BLOCK',
  BLOCKQUOTE: 'BLOCKQUOTE',
  UNORDERED_LIST: 'UNORDERED_LIST',
  ORDERED_LIST: 'ORDERED_LIST',
  LIST_ITEM: 'LIST_ITEM',
  HORIZONTAL_RULE: 'HORIZONTAL_RULE',
  TABLE: 'TABLE',
  MATH_BLOCK: 'MATH_BLOCK',
  HTML_BLOCK: 'HTML_BLOCK',
  HTML_INLINE: 'HTML_INLINE',
  TEXT: 'TEXT',
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  CODE: 'CODE',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  LINE_BREAK: 'LINE_BREAK',
  STRIKETHROUGH: 'STRIKETHROUGH',
};

/**
 * Lexical analyzer for Markdown text.
 * Converts raw markdown into a stream of tokens.
 */
class Lexer {
  /**
   * Creates a new Lexer instance.
   */
  constructor() {
    this.lines = [];
    this.currentIndex = 0;
    
    this.patterns = {
      heading: /^(#{1,6})\s+(.+)$/,
      codeFence: /^(`{3,}|~{3,})(\w*)?$/,
      indentedCode: /^(?: {4}|\t)(.*)$/,
      blockquote: /^>\s*(.*)$/,
      unorderedListItem: /^(\s*)([\*\-\+])\s+(.+)$/,
      orderedListItem: /^(\s*)(\d+)\.\s+(.+)$/,
      horizontalRule: /^(-{3,}|\*{3,}|_{3,})$/,
      tableRow: /^\|(.+)\|$/,
      tableSeparator: /^\|[\s\-:\|]+\|$/,
      mathBlock: /^\$\$\s*$/,
      htmlBlock: /^<(\/?)(div|p|section|article|aside|header|footer|nav|main|figure|figcaption|table|thead|tbody|tfoot|tr|th|td|ul|ol|li|dl|dt|dd|blockquote|pre|h[1-6]|hr|form|fieldset|legend|details|summary)(\s[^>]*)?>.*$/i,
      htmlSelfClosing: /^<(br|hr|img|input|meta|link)(\s[^>]*)?\/?>.*$/i,
    };
    
    this.blockTags = [
      'div', 'p', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
      'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'blockquote', 'pre', 'h1', 'h2', 'h3',
      'h4', 'h5', 'h6', 'hr', 'form', 'fieldset', 'legend', 'details', 'summary'
    ];
  }

  /**
   * Tokenizes the input markdown text.
   * @param {string} markdown - The markdown text to tokenize.
   * @return {Array<Object>} Array of tokens.
   */
  tokenize(markdown) {
    this.lines = markdown.split('\n');
    this.currentIndex = 0;
    const tokens = [];

    while (this.currentIndex < this.lines.length) {
      const token = this.nextToken();
      if (token) {
        tokens.push(token);
      }
    }

    tokens.push({ type: TokenType.EOF, value: null });
    return tokens;
  }

  /**
   * Gets the next token from the input.
   * @return {Object|null} The next token or null.
   */
  nextToken() {
    if (this.currentIndex >= this.lines.length) {
      return null;
    }

    const line = this.lines[this.currentIndex];
    
    if (line.trim() === '') {
      this.currentIndex++;
      return { type: TokenType.BLANK_LINE, value: '' };
    }
    
    const selfClosingMatch = line.match(this.patterns.htmlSelfClosing);
    if (selfClosingMatch) {
      this.currentIndex++;
      return {
        type: TokenType.HTML_BLOCK,
        content: line,
      };
    }

    const htmlBlockMatch = line.match(this.patterns.htmlBlock);
    if (htmlBlockMatch) {
      return this.tokenizeHtmlBlock(htmlBlockMatch);
    }

    const headingMatch = line.match(this.patterns.heading);
    if (headingMatch) {
      this.currentIndex++;
      return {
        type: TokenType.HEADING,
        level: headingMatch[1].length,
        content: headingMatch[2],
      };
    }

    const codeFenceMatch = line.match(this.patterns.codeFence);
    if (codeFenceMatch) {
      return this.tokenizeCodeBlock(codeFenceMatch);
    }

    const mathBlockMatch = line.match(this.patterns.mathBlock);
    if (mathBlockMatch) {
      return this.tokenizeMathBlock();
    }

    const hrMatch = line.match(this.patterns.horizontalRule);
    if (hrMatch) {
      this.currentIndex++;
      return { type: TokenType.HORIZONTAL_RULE };
    }

    const blockquoteMatch = line.match(this.patterns.blockquote);
    if (blockquoteMatch) {
      return this.tokenizeBlockquote();
    }

    const tableRowMatch = line.match(this.patterns.tableRow);
    if (tableRowMatch && this.currentIndex + 1 < this.lines.length) {
      const nextLine = this.lines[this.currentIndex + 1];
      if (this.patterns.tableSeparator.test(nextLine)) {
        return this.tokenizeTable();
      }
    }

    const ulMatch = line.match(this.patterns.unorderedListItem);
    if (ulMatch) {
      this.currentIndex++;
      return {
        type: TokenType.UNORDERED_LIST_ITEM,
        indent: ulMatch[1].length,
        marker: ulMatch[2],
        content: ulMatch[3],
      };
    }

    const olMatch = line.match(this.patterns.orderedListItem);
    if (olMatch) {
      this.currentIndex++;
      return {
        type: TokenType.ORDERED_LIST_ITEM,
        indent: olMatch[1].length,
        number: olMatch[2],
        content: olMatch[3],
      };
    }

    const indentedCodeMatch = line.match(this.patterns.indentedCode);
    if (indentedCodeMatch) {
      return this.tokenizeIndentedCodeBlock();
    }

    this.currentIndex++;
    return { type: TokenType.TEXT, value: line };
  }
  
  /**
   * Tokenizes an HTML block.
   * @param {Array} match - The regex match for the opening tag.
   * @return {Object} HTML block token.
   */
  tokenizeHtmlBlock(match) {
    const isClosingTag = match[1] === '/';
    const tagName = match[2].toLowerCase();
    const lines = [this.lines[this.currentIndex]];
    
    this.currentIndex++;

    // 如果是自闭合标签或已经闭合的单行标签
    if (lines[0].trim().endsWith('/>') || 
        (lines[0].includes(`<${tagName}`) && lines[0].includes(`</${tagName}>`))) {
      return {
        type: TokenType.HTML_BLOCK,
        content: lines.join('\n'),
      };
    }

    // 如果是闭合标签，只返回这一行
    if (isClosingTag) {
      return {
        type: TokenType.HTML_BLOCK,
        content: lines.join('\n'),
      };
    }

    // 查找配对的闭合标签
    let depth = 1;
    while (this.currentIndex < this.lines.length && depth > 0) {
      const line = this.lines[this.currentIndex];
      lines.push(line);
      
      // 计算标签深度
      const openTags = (line.match(new RegExp(`<${tagName}(\\s[^>]*)?>`, 'gi')) || []).length;
      const closeTags = (line.match(new RegExp(`</${tagName}>`, 'gi')) || []).length;
      
      depth += openTags - closeTags;
      this.currentIndex++;
      
      if (depth === 0) {
        break;
      }
    }

    return {
      type: TokenType.HTML_BLOCK,
      content: lines.join('\n'),
    };
  }

  /**
   * Tokenizes a fenced code block.
   * @param {Array} openingMatch - The regex match for the opening fence.
   * @return {Object} Code block token.
   */
  tokenizeCodeBlock(openingMatch) {
    const fenceChar = openingMatch[1][0];
    const fenceLength = openingMatch[1].length;
    const language = openingMatch[2] || '';
    
    this.currentIndex++;
    const content = [];

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];
      const closingMatch = line.match(this.patterns.codeFence);
      
      if (closingMatch &&
          closingMatch[1][0] === fenceChar &&
          closingMatch[1].length >= fenceLength &&
          !closingMatch[2]) {
        this.currentIndex++;
        break;
      }
      
      content.push(line);
      this.currentIndex++;
    }

    return {
      type: TokenType.CODE_FENCE,
      language,
      content: content.join('\n'),
    };
  }

  /**
   * Tokenizes a math block.
   * @return {Object} Math block token.
   */
  tokenizeMathBlock() {
    this.currentIndex++;
    const content = [];

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];
      
      if (this.patterns.mathBlock.test(line)) {
        this.currentIndex++;
        break;
      }
      
      content.push(line);
      this.currentIndex++;
    }

    return {
      type: TokenType.MATH_BLOCK,
      content: content.join('\n'),
    };
  }

  /**
   * Tokenizes a blockquote.
   * @return {Object} Blockquote token.
   */
  tokenizeBlockquote() {
    const lines = [];

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];
      const match = line.match(this.patterns.blockquote);
      
      if (!match) {
        break;
      }
      
      lines.push(match[1]);
      this.currentIndex++;
    }

    return {
      type: TokenType.BLOCKQUOTE,
      content: lines.join('\n'),
    };
  }

  /**
   * Tokenizes an indented code block.
   * @return {Object} Indented code block token.
   */
  tokenizeIndentedCodeBlock() {
    const lines = [];

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];
      const match = line.match(this.patterns.indentedCode);
      
      if (!match) {
        break;
      }
      
      lines.push(match[1]);
      this.currentIndex++;
    }

    return {
      type: TokenType.INDENTED_CODE,
      content: lines.join('\n'),
    };
  }

  /**
   * Tokenizes a table.
   * @return {Object} Table token.
   */
  tokenizeTable() {
    const headerLine = this.lines[this.currentIndex];
    const separatorLine = this.lines[this.currentIndex + 1];
    
    const headers = this.parseTableRow(headerLine);
    const alignments = this.parseTableSeparator(separatorLine);
    
    this.currentIndex += 2;
    
    const rows = [];
    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];
      
      if (!this.patterns.tableRow.test(line)) {
        break;
      }
      
      rows.push(this.parseTableRow(line));
      this.currentIndex++;
    }

    return {
      type: TokenType.TABLE_ROW,
      headers,
      alignments,
      rows,
    };
  }

  /**
   * Parses a table row into cells.
   * @param {string} line - The table row line.
   * @return {Array<string>} Array of cell contents.
   */
  parseTableRow(line) {
    return line.slice(1, -1).split('|').map(cell => cell.trim());
  }

  /**
   * Parses table separator to determine alignments.
   * @param {string} line - The separator line.
   * @return {Array<string>} Array of alignment values ('left', 'center', 'right', or '').
   */
  parseTableSeparator(line) {
    const cells = line.split('|').filter(cell => cell.trim());
    return cells.map(cell => {
      const trimmed = cell.trim();
      if (trimmed.startsWith(':') && trimmed.endsWith(':')) {
        return 'center';
      } else if (trimmed.endsWith(':')) {
        return 'right';
      } else if (trimmed.startsWith(':')) {
        return 'left';
      }
      return '';
    });
  }
}

/**
 * Parser that converts tokens into an Abstract Syntax Tree (AST).
 */
class Parser {
  /**
   * Creates a new Parser instance.
   */
  constructor() {
    this.tokens = [];
    this.currentIndex = 0;
  }

  /**
   * Parses tokens into an AST.
   * @param {Array<Object>} tokens - The tokens to parse.
   * @return {Object} The root AST node (document).
   */
  parse(tokens) {
    this.tokens = tokens;
    this.currentIndex = 0;

    const children = [];

    while (!this.isAtEnd()) {
      const node = this.parseBlockNode();
      if (node) {
        children.push(node);
      }
    }

    return {
      type: NodeType.DOCUMENT,
      children,
    };
  }

  /**
   * Parses a block-level node.
   * @return {Object|null} The parsed AST node or null.
   */
  parseBlockNode() {
    const token = this.currentToken();

    if (!token || token.type === TokenType.EOF) {
      return null;
    }

    if (token.type === TokenType.BLANK_LINE) {
      this.advance();
      return this.parseBlockNode();
    }

    switch (token.type) {
      case TokenType.HTML_BLOCK:
        return this.parseHtmlBlock();
      case TokenType.HEADING:
        return this.parseHeading();
      case TokenType.CODE_FENCE:
      case TokenType.INDENTED_CODE:
        return this.parseCodeBlock();
      case TokenType.MATH_BLOCK:
        return this.parseMathBlock();
      case TokenType.BLOCKQUOTE:
        return this.parseBlockquote();
      case TokenType.HORIZONTAL_RULE:
        return this.parseHorizontalRule();
      case TokenType.TABLE_ROW:
        return this.parseTable();
      case TokenType.UNORDERED_LIST_ITEM:
        return this.parseList(TokenType.UNORDERED_LIST_ITEM);
      case TokenType.ORDERED_LIST_ITEM:
        return this.parseList(TokenType.ORDERED_LIST_ITEM);
      case TokenType.TEXT:
        return this.parseParagraph();
      default:
        this.advance();
        return null;
    }
  }
  
  /**
   * Parses an HTML block node.
   * @return {Object} HTML block AST node.
   */
  parseHtmlBlock() {
    const token = this.currentToken();
    this.advance();

    return {
      type: NodeType.HTML_BLOCK,
      content: token.content,
    };
  }

  /**
   * Parses a heading node.
   * @return {Object} Heading AST node.
   */
  parseHeading() {
    const token = this.currentToken();
    this.advance();

    return {
      type: NodeType.HEADING,
      level: token.level,
      children: this.parseInline(token.content),
    };
  }

  /**
   * Parses a code block node.
   * @return {Object} Code block AST node.
   */
  parseCodeBlock() {
    const token = this.currentToken();
    this.advance();

    return {
      type: NodeType.CODE_BLOCK,
      language: token.language || '',
      content: token.content,
    };
  }

  /**
   * Parses a math block node.
   * @return {Object} Math block AST node.
   */
  parseMathBlock() {
    const token = this.currentToken();
    this.advance();

    return {
      type: NodeType.MATH_BLOCK,
      content: token.content,
    };
  }

  /**
   * Parses a blockquote node.
   * Recursively parses the blockquote content as markdown.
   * @return {Object} Blockquote AST node.
   */
  parseBlockquote() {
    const token = this.currentToken();
    this.advance();

    const lexer = new Lexer();
    const tokens = lexer.tokenize(token.content);
    const parser = new Parser();
    const ast = parser.parse(tokens);

    return {
      type: NodeType.BLOCKQUOTE,
      children: ast.children,
    };
  }

  /**
   * Parses a horizontal rule node.
   * @return {Object} Horizontal rule AST node.
   */
  parseHorizontalRule() {
    this.advance();
    return { type: NodeType.HORIZONTAL_RULE };
  }

  /**
   * Parses a table node.
   * @return {Object} Table AST node.
   */
  parseTable() {
    const token = this.currentToken();
    this.advance();

    const headers = token.headers.map(header => this.parseInline(header));
    const rows = token.rows.map(row => 
      row.map(cell => this.parseInline(cell))
    );

    return {
      type: NodeType.TABLE,
      headers,
      alignments: token.alignments,
      rows,
    };
  }

  /**
   * Parses a list node (ordered or unordered).
   * @param {string} listItemType - The type of list items.
   * @return {Object} List AST node.
   */
  parseList(listItemType) {
    const items = [];
    const listType = listItemType === TokenType.UNORDERED_LIST_ITEM 
      ? NodeType.UNORDERED_LIST 
      : NodeType.ORDERED_LIST;

    while (!this.isAtEnd() && this.currentToken().type === listItemType) {
      const token = this.currentToken();
      this.advance();

      const item = {
        type: NodeType.LIST_ITEM,
        indent: token.indent,
        children: this.parseInline(token.content),
      };

      items.push(item);
    }

    const root = this.buildNestedList(items);

    return {
      type: listType,
      children: root,
    };
  }

  /**
   * Builds a nested list structure from flat list items based on indentation.
   * @param {Array<Object>} items - Flat array of list items.
   * @return {Array<Object>} Nested list items.
   */
  buildNestedList(items) {
    const stack = [{ children: [], indent: -2 }];

    items.forEach(item => {
      while (stack.length > 1 && stack[stack.length - 1].indent >= item.indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1];
      
      if (!parent.children) {
        parent.children = [];
      }
      
      parent.children.push(item);
      stack.push(item);
    });

    return stack[0].children;
  }

  /**
   * Parses a paragraph node.
   * Collects consecutive text lines into a single paragraph.
   * @return {Object} Paragraph AST node.
   */
  parseParagraph() {
    const lines = [];

    while (!this.isAtEnd()) {
      const token = this.currentToken();
      
      if (token.type !== TokenType.TEXT) {
        break;
      }

      lines.push(token.value);
      this.advance();

      const nextToken = this.currentToken();
      if (!nextToken || 
          nextToken.type === TokenType.BLANK_LINE || 
          nextToken.type !== TokenType.TEXT) {
        break;
      }
    }

    const children = [];
    lines.forEach((line, index) => {
      if (index > 0) {
        children.push({ type: NodeType.LINE_BREAK });
      }
      children.push(...this.parseInline(line));
    });

    return {
      type: NodeType.PARAGRAPH,
      children,
    };
  }

  /**
   * Parses inline content (bold, italic, code, links, etc.).
   * @param {string} text - The text to parse.
   * @return {Array<Object>} Array of inline AST nodes.
   */
  parseInline(text) {
    const nodes = [];
    const tokens = [];

    const patterns = [
      { type: NodeType.IMAGE, regex: /!\[([^\]]*)\]\(([^)]+)\)/g },
      { type: NodeType.LINK, regex: /\[([^\]]+)\]\(([^)]+)\)|https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g },
      { type: NodeType.CODE, regex: /`([^`]+)`/g },
      { type: NodeType.BOLD, regex: /\*\*(.+?)\*\*/g },
      { type: NodeType.ITALIC, regex: /\*(.+?)\*/g },
      { type: NodeType.STRIKETHROUGH, regex: /~~(.+?)~~/g },
      { type: NodeType.HTML_INLINE, regex: /<([a-z][a-z0-9]*)\b[^>]*>.*?<\/\1>|<[a-z][a-z0-9]*\b[^>]*\/?>/gi },
    ];

    patterns.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern.regex);

      while ((match = regex.exec(text)) !== null) {
        tokens.push({
          type: pattern.type,
          start: match.index,
          end: match.index + match[0].length,
          match: match,
        });
      }
    });

    tokens.sort((a, b) => a.start - b.start);

    const filteredTokens = [];
    let lastEnd = 0;

    for (const token of tokens) {
      if (token.start >= lastEnd) {
        filteredTokens.push(token);
        lastEnd = token.end;
      }
    }

    let currentPos = 0;

    for (const token of filteredTokens) {
      if (currentPos < token.start) {
        const textContent = text.slice(currentPos, token.start);
        if (textContent) {
          nodes.push({
            type: NodeType.TEXT,
            value: textContent,
          });
        }
      }

      switch (token.type) {
        case NodeType.IMAGE:
          nodes.push({
            type: NodeType.IMAGE,
            alt: token.match[1],
            url: token.match[2],
          });
          break;
        case NodeType.LINK:
          nodes.push({
            type: NodeType.LINK,
            text: token.match[1] ?? token.match[0],
            url: token.match[2] ?? token.match[0],
          });
          break;
        case NodeType.CODE:
          nodes.push({
            type: NodeType.CODE,
            value: token.match[1],
          });
          break;
        case NodeType.BOLD:
          nodes.push({
            type: NodeType.BOLD,
            children: [{ type: NodeType.TEXT, value: token.match[1] }],
          });
          break;
        case NodeType.ITALIC:
          nodes.push({
            type: NodeType.ITALIC,
            children: [{ type: NodeType.TEXT, value: token.match[1] }],
          });
          break;
        case NodeType.STRIKETHROUGH: 
          nodes.push({
            type: NodeType.STRIKETHROUGH,
            children: [{ type: NodeType.TEXT, value: token.match[1] }],
          });
          break;
        case NodeType.HTML_INLINE:
          nodes.push({
            type: NodeType.HTML_INLINE,
            content: token.match[0],
          });
          break;
      }

      currentPos = token.end;
    }

    if (currentPos < text.length) {
      const textContent = text.slice(currentPos);
      if (textContent) {
        nodes.push({
          type: NodeType.TEXT,
          value: textContent,
        });
      }
    }

    if (nodes.length === 0) {
      nodes.push({
        type: NodeType.TEXT,
        value: text,
      });
    }

    return nodes;
  }

  /**
   * Gets the current token.
   * @return {Object|null} The current token or null.
   */
  currentToken() {
    return this.tokens[this.currentIndex] || null;
  }

  /**
   * Advances to the next token.
   */
  advance() {
    if (!this.isAtEnd()) {
      this.currentIndex++;
    }
  }

  /**
   * Checks if we've reached the end of the token stream.
   * @return {boolean} True if at end, false otherwise.
   */
  isAtEnd() {
    return this.currentIndex >= this.tokens.length ||
           this.currentToken()?.type === TokenType.EOF;
  }
}

/**
 * Renderer that converts AST to HTML using template literals.
 */
class Renderer {
  /**
   * Renders an AST to HTML.
   * @param {Object} ast - The AST to render.
   * @return {Array} Array of HTML template results.
   */
  render(ast) {
    if (ast.type === NodeType.DOCUMENT) {
      return ast.children.map(child => this.renderNode(child));
    }
    return [this.renderNode(ast)];
  }

  /**
   * Renders a single AST node.
   * @param {Object} node - The node to render.
   * @return {*} The rendered HTML.
   */
  renderNode(node) {
    switch (node.type) {
      case NodeType.HEADING:
        return this.renderHeading(node);
      case NodeType.PARAGRAPH:
        return this.renderParagraph(node);
      case NodeType.CODE_BLOCK:
        return this.renderCodeBlock(node);
      case NodeType.MATH_BLOCK:
        return this.renderMathBlock(node);
      case NodeType.BLOCKQUOTE:
        return this.renderBlockquote(node);
      case NodeType.UNORDERED_LIST:
      case NodeType.ORDERED_LIST:
        return this.renderList(node);
      case NodeType.HORIZONTAL_RULE:
        return this.renderHorizontalRule(node);
      case NodeType.TABLE:
        return this.renderTable(node);
      case NodeType.HTML_BLOCK:
        return this.renderHtmlBlock(node);
      default:
        return '';
    }
  }
  
  /**
   * Renders an HTML block node.
   * @param {Object} node - The HTML block node.
   * @return {*} The rendered HTML.
   */
  renderHtmlBlock(node) {
    return unsafeHTML(node.content);
  }

  /**
   * Renders a heading node.
   * @param {Object} node - The heading node.
   * @return {*} The rendered HTML.
   */
  renderHeading(node) {
    const tags = [literal`h1`, literal`h2`, literal`h3`, literal`h4`, literal`h5`, literal`h6`];
    const tag = tags[node.level - 1];
    const content = this.renderInlineNodes(node.children);
    return html`<${tag}>${content}</${tag}>`;
  }

  /**
   * Renders a paragraph node.
   * @param {Object} node - The paragraph node.
   * @return {*} The rendered HTML.
   */
  renderParagraph(node) {
    const content = this.renderInlineNodes(node.children);
    return html`<p>${content}</p>`;
  }

  /**
   * Renders a code block node.
   * @param {Object} node - The code block node.
   * @return {*} The rendered HTML.
   */
  renderCodeBlock(node) {
    return html`<el-code-block language="${node.language}" .code=${node.content}></el-code-block>`;
  }

  /**
   * Renders a math block node.
   * @param {Object} node - The math block node.
   * @return {*} The rendered HTML.
   */
  renderMathBlock(node) {
    return html`<el-katex block .expression="${node.content}"></el-katex>`;
  }

  /**
   * Renders a blockquote node.
   * @param {Object} node - The blockquote node.
   * @return {*} The rendered HTML.
   */
  renderBlockquote(node) {
    const content = node.children.map(child => this.renderNode(child));
    return html`<blockquote>${content}</blockquote>`;
  }

  /**
   * Renders a list node (ordered or unordered).
   * @param {Object} node - The list node.
   * @return {*} The rendered HTML.
   */
  renderList(node) {
    const tag = node.type === NodeType.UNORDERED_LIST ? 'ul' : 'ol';
    const items = this.renderListItems(node.children);
    return unsafeHTML(`<${tag}>${items}</${tag}>`);
  }

  /**
   * Renders list items recursively.
   * @param {Array<Object>} items - The list items.
   * @return {string} The rendered HTML string.
   */
  renderListItems(items) {
    let htmlStr = '';

    let i = 0;
    while (i < items.length) {
      const item = items[i];
      const hasChildren = item.children && item.children.some(
        child => child.type === NodeType.LIST_ITEM
      );

      htmlStr += '<li>';
      
      const inlineChildren = item.children.filter(
        child => child.type !== NodeType.LIST_ITEM
      );
      if (inlineChildren.length > 0) {
        inlineChildren.forEach(child => {
          if (child.type === NodeType.TEXT) {
            htmlStr += this.escapeHtml(child.value);
          } else {
            htmlStr += child.value || '';
          }
        });
      }

      if (hasChildren) {
        const nestedItems = item.children.filter(
          child => child.type === NodeType.LIST_ITEM
        );
        
        const listHtml = this.renderListItems(nestedItems);
        htmlStr += `<ul>${listHtml}</ul>`;
      }

      htmlStr += '</li>';
      i++;
    }

    return htmlStr;
  }

  /**
   * Renders a horizontal rule node.
   * @param {Object} node - The horizontal rule node.
   * @return {*} The rendered HTML.
   */
  renderHorizontalRule(node) {
    return html`<hr>`;
  }

  /**
   * Renders a table node.
   * @param {Object} node - The table node.
   * @return {*} The rendered HTML.
   */
  renderTable(node) {
    const thead = html`<thead><tr>${
      node.headers.map((header, index) => {
        const align = node.alignments[index] || nothing;
        const content = this.renderInlineNodes(header);
        return html`<th align="${align}">${content}</th>`;
      })
    }</tr></thead>`;

    const tbody = html`<tbody>${
      node.rows.map(row => html`<tr>${
        row.map((cell, index) => {
          const align = node.alignments[index] || nothing;
          const content = this.renderInlineNodes(cell);
          return html`<td align="${align}">${content}</td>`;
        })
      }</tr>`)
    }</tbody>`;

    return html`<el-scrollbar><table>${thead}${tbody}</table></el-scrollbar>`;
  }

  /**
   * Renders an array of inline nodes.
   * @param {Array<Object>} nodes - The inline nodes.
   * @return {Array} The rendered content.
   */
  renderInlineNodes(nodes) {
    return nodes.map(node => this.renderInlineNode(node));
  }

  /**
   * Renders a single inline node.
   * @param {Object} node - The inline node.
   * @return {*} The rendered content.
   */
  renderInlineNode(node) {
    switch (node.type) {
      case NodeType.TEXT:
        return this.escapeHtml(node.value);
      case NodeType.BOLD:
        return html`<strong>${this.renderInlineNodes(node.children)}</strong>`;
      case NodeType.ITALIC:
        return html`<em>${this.renderInlineNodes(node.children)}</em>`;
      case NodeType.STRIKETHROUGH:
        return html`<del>${this.renderInlineNodes(node.children)}</del>`;
      case NodeType.CODE:
        return html`<code>${this.escapeHtml(node.value)}</code>`;
      case NodeType.LINK:
        return html`<a href="${node.url}" target="_blank" rel="noreferrer">${this.escapeHtml(node.text)}</a>`;
      case NodeType.IMAGE:
        return html`<a href="${node.url}" target="_blank" rel="noreferrer">${this.escapeHtml(node.url)}</a>`;
      case NodeType.LINE_BREAK:
        return html`<br/>`;
      case NodeType.HTML_INLINE:
        return unsafeHTML(node.content);
      default:
        return '';
    }
  }

  /**
   * Escapes HTML special characters.
   * @param {string} text - The text to escape.
   * @return {string} The escaped text.
   */
  escapeHtml(text) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return text.replace(/[&<>"']/g, char => escapeMap[char]);
  }
}

/**
 * Main Markdown parser using lexer, parser, and renderer.
 * Converts Markdown text to HTML using a three-stage pipeline:
 * 1. Lexical analysis (Markdown → Tokens)
 * 2. Parsing (Tokens → AST)
 * 3. Rendering (AST → HTML)
 */
export default class MarkdownParser {
  /**
   * Creates a new MarkdownParser instance.
   */
  constructor() {
    this.lexer = new Lexer();
    this.parser = new Parser();
    this.renderer = new Renderer();
  }

  /**
   * Parses markdown text and returns HTML.
   * @param {string} markdown - The markdown text to parse.
   * @return {Array} Array of HTML template results.
   */
  parse(markdown) {
    const tokens = this.lexer.tokenize(markdown);
    const ast = this.parser.parse(tokens);
    return this.renderer.render(ast);
  }
}