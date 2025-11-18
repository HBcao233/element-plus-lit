import { html } from '../element/index.js';

/**
 * Token types enumeration.
 * @enum {string}
 */
const TokenType = {
  // Block-level tokens
  HEADING: 'HEADING',
  CODE_BLOCK_START: 'CODE_BLOCK_START',
  CODE_BLOCK_END: 'CODE_BLOCK_END',
  CODE_BLOCK_CONTENT: 'CODE_BLOCK_CONTENT',
  BLOCKQUOTE: 'BLOCKQUOTE',
  UNORDERED_LIST_ITEM: 'UNORDERED_LIST_ITEM',
  ORDERED_LIST_ITEM: 'ORDERED_LIST_ITEM',
  HORIZONTAL_RULE: 'HORIZONTAL_RULE',
  TABLE_ROW: 'TABLE_ROW',
  TABLE_SEPARATOR: 'TABLE_SEPARATOR',
  REFERENCE: 'REFERENCE',
  PARAGRAPH: 'PARAGRAPH',
  BLANK_LINE: 'BLANK_LINE',
  
  // Inline tokens
  TEXT: 'TEXT',
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  INLINE_CODE: 'INLINE_CODE',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
};

/**
 * AST node types enumeration.
 * @enum {string}
 */
const NodeType = {
  DOCUMENT: 'DOCUMENT',
  HEADING: 'HEADING',
  CODE_BLOCK: 'CODE_BLOCK',
  BLOCKQUOTE: 'BLOCKQUOTE',
  UNORDERED_LIST: 'UNORDERED_LIST',
  ORDERED_LIST: 'ORDERED_LIST',
  LIST_ITEM: 'LIST_ITEM',
  HORIZONTAL_RULE: 'HORIZONTAL_RULE',
  TABLE: 'TABLE',
  REFERENCE: 'REFERENCE',
  PARAGRAPH: 'PARAGRAPH',
  TEXT: 'TEXT',
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  INLINE_CODE: 'INLINE_CODE',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
};

/**
 * Lexer for tokenizing Markdown block-level elements.
 */
class MarkdownLexer {
  constructor() {
    this.patterns = {
      heading: /^(#{1,6})\s+(.+)$/,
      codeBlockFence: /^(`{3,}|~{3,})(\w*)?$/,
      indentedCode: /^(?: {4}|\t)(.*)$/,
      blockquote: /^>\s+(.+)$/,
      unorderedList: /^([\*\-\+])\s+(.+)$/,
      orderedList: /^(\d+\.)\s+(.+)$/,
      horizontalRule: /^(-{3,}|\*{3,})$/,
      tableRow: /^\|(.+)\|$/,
      tableSeparator: /^\|[\s\-:\|]+\|$/,
      reference: /^\[(\^\d+)\]:\s+(.+)$/,
    };
  }

  /**
   * Tokenize Markdown text into a stream of tokens.
   *
   * @param {string} markdown The Markdown text to tokenize.
   * @return {Array<Object>} Array of tokens.
   */
  tokenize(markdown) {
    const lines = markdown.split('\n');
    const tokens = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const nextLine = lines[i + 1];

      // Blank line
      if (line.trim() === '') {
        tokens.push({ type: TokenType.BLANK_LINE, raw: line });
        i++;
        continue;
      }

      // Heading
      const headingMatch = line.match(this.patterns.heading);
      if (headingMatch) {
        tokens.push({
          type: TokenType.HEADING,
          level: headingMatch[1].length,
          marker: headingMatch[1],
          content: headingMatch[2],
          raw: line,
        });
        i++;
        continue;
      }

      // Code block fence
      const fenceMatch = line.match(this.patterns.codeBlockFence);
      if (fenceMatch) {
        const fenceChar = fenceMatch[1][0];
        const fenceLength = fenceMatch[1].length;
        const lang = fenceMatch[2] || '';
        
        tokens.push({
          type: TokenType.CODE_BLOCK_START,
          fence: fenceMatch[1],
          fenceChar,
          fenceLength,
          language: lang,
          raw: line,
        });
        i++;

        // Collect code block content
        while (i < lines.length) {
          const contentLine = lines[i];
          const endMatch = contentLine.match(this.patterns.codeBlockFence);
          
          if (endMatch && 
              endMatch[1][0] === fenceChar && 
              endMatch[1].length >= fenceLength && 
              !endMatch[2]) {
            tokens.push({
              type: TokenType.CODE_BLOCK_END,
              fence: endMatch[1],
              raw: contentLine,
            });
            i++;
            break;
          }

          tokens.push({
            type: TokenType.CODE_BLOCK_CONTENT,
            content: contentLine,
            raw: contentLine,
          });
          i++;
        }
        continue;
      }

      // Horizontal rule
      if (this.patterns.horizontalRule.test(line)) {
        tokens.push({
          type: TokenType.HORIZONTAL_RULE,
          raw: line,
        });
        i++;
        continue;
      }

      // Table row
      const tableMatch = line.match(this.patterns.tableRow);
      if (tableMatch) {
        if (nextLine && this.patterns.tableSeparator.test(nextLine)) {
          // Table header
          tokens.push({
            type: TokenType.TABLE_ROW,
            isHeader: true,
            cells: this.parseTableCells(line),
            raw: line,
          });
          i++;
          
          // Table separator
          tokens.push({
            type: TokenType.TABLE_SEPARATOR,
            cells: this.parseTableCells(lines[i]),
            raw: lines[i],
          });
          i++;
          continue;
        } else {
          // Regular table row
          tokens.push({
            type: TokenType.TABLE_ROW,
            isHeader: false,
            cells: this.parseTableCells(line),
            raw: line,
          });
          i++;
          continue;
        }
      }

      // Blockquote
      const blockquoteMatch = line.match(this.patterns.blockquote);
      if (blockquoteMatch) {
        tokens.push({
          type: TokenType.BLOCKQUOTE,
          content: blockquoteMatch[1],
          raw: line,
        });
        i++;
        continue;
      }

      // Unordered list
      const ulMatch = line.match(this.patterns.unorderedList);
      if (ulMatch) {
        tokens.push({
          type: TokenType.UNORDERED_LIST_ITEM,
          marker: ulMatch[1],
          content: ulMatch[2],
          raw: line,
        });
        i++;
        continue;
      }

      // Ordered list
      const olMatch = line.match(this.patterns.orderedList);
      if (olMatch) {
        tokens.push({
          type: TokenType.ORDERED_LIST_ITEM,
          marker: olMatch[1],
          content: olMatch[2],
          raw: line,
        });
        i++;
        continue;
      }

      // Reference
      const refMatch = line.match(this.patterns.reference);
      if (refMatch) {
        tokens.push({
          type: TokenType.REFERENCE,
          label: refMatch[1],
          content: refMatch[2],
          raw: line,
        });
        i++;
        continue;
      }

      // Indented code block
      const indentMatch = line.match(this.patterns.indentedCode);
      if (indentMatch) {
        const codeLines = [indentMatch[1]];
        i++;

        while (i < lines.length) {
          const nextIndentMatch = lines[i].match(this.patterns.indentedCode);
          if (nextIndentMatch) {
            codeLines.push(nextIndentMatch[1]);
            i++;
          } else if (lines[i].trim() === '') {
            // Allow blank lines in indented code blocks
            codeLines.push('');
            i++;
          } else {
            break;
          }
        }

        tokens.push({
          type: TokenType.CODE_BLOCK_START,
          fence: '```',
          language: '',
          raw: '',
        });
        codeLines.forEach(codeLine => {
          tokens.push({
            type: TokenType.CODE_BLOCK_CONTENT,
            content: codeLine,
            raw: codeLine,
          });
        });
        tokens.push({
          type: TokenType.CODE_BLOCK_END,
          fence: '```',
          raw: '',
        });
        continue;
      }

      // Paragraph
      tokens.push({
        type: TokenType.PARAGRAPH,
        content: line,
        raw: line,
      });
      i++;
    }

    return tokens;
  }

  /**
   * Parse table cells from a table row.
   *
   * @param {string} line The table row line.
   * @return {Array<string>} Array of cell contents.
   */
  parseTableCells(line) {
    return line.slice(1, -1).split('|').map(cell => cell.trim());
  }
}

/**
 * Inline lexer for tokenizing inline Markdown elements.
 */
class InlineLexer {
  constructor() {
    this.patterns = [
      { type: TokenType.IMAGE, regex: /!\[([^\]]*)\]\(([^)]+)\)/g },
      { type: TokenType.LINK, regex: /\[([^\]]+)\]\(([^)]+)\)/g },
      { type: TokenType.INLINE_CODE, regex: /`([^`]+)`/g },
      { type: TokenType.BOLD, regex: /\*\*(.+?)\*\*/g },
      { type: TokenType.ITALIC, regex: /\*(.+?)\*/g },
    ];
  }

  /**
   * Tokenize inline text into inline tokens.
   *
   * @param {string} text The text to tokenize.
   * @return {Array<Object>} Array of inline tokens.
   */
  tokenize(text) {
    const matches = [];

    // Collect all matches
    this.patterns.forEach(pattern => {
      const regex = new RegExp(pattern.regex);
      let match;

      while ((match = regex.exec(text)) !== null) {
        matches.push({
          type: pattern.type,
          start: match.index,
          end: match.index + match[0].length,
          match,
          raw: match[0],
        });
      }
    });

    // Sort by position
    matches.sort((a, b) => a.start - b.start);

    // Remove overlapping matches (keep first occurrence)
    const filtered = [];
    let lastEnd = 0;

    for (const match of matches) {
      if (match.start >= lastEnd) {
        filtered.push(match);
        lastEnd = match.end;
      }
    }

    // Build token stream
    const tokens = [];
    let pos = 0;

    for (const match of filtered) {
      // Add text before match
      if (pos < match.start) {
        tokens.push({
          type: TokenType.TEXT,
          content: text.slice(pos, match.start),
        });
      }

      // Add matched token
      switch (match.type) {
        case TokenType.IMAGE:
          tokens.push({
            type: TokenType.IMAGE,
            alt: match.match[1],
            url: match.match[2],
            raw: match.raw,
          });
          break;
        case TokenType.LINK:
          tokens.push({
            type: TokenType.LINK,
            text: match.match[1],
            url: match.match[2],
            raw: match.raw,
          });
          break;
        case TokenType.INLINE_CODE:
          tokens.push({
            type: TokenType.INLINE_CODE,
            content: match.match[1],
            raw: match.raw,
          });
          break;
        case TokenType.BOLD:
          tokens.push({
            type: TokenType.BOLD,
            content: match.match[1],
            raw: match.raw,
          });
          break;
        case TokenType.ITALIC:
          tokens.push({
            type: TokenType.ITALIC,
            content: match.match[1],
            raw: match.raw,
          });
          break;
      }

      pos = match.end;
    }

    // Add remaining text
    if (pos < text.length) {
      tokens.push({
        type: TokenType.TEXT,
        content: text.slice(pos),
      });
    }

    // If no tokens, return text token
    if (tokens.length === 0) {
      tokens.push({
        type: TokenType.TEXT,
        content: text,
      });
    }

    return tokens;
  }
}

/**
 * Parser for building AST from tokens.
 */
class MarkdownParser {
  constructor() {
    this.inlineLexer = new InlineLexer();
  }

  /**
   * Parse tokens into an AST.
   *
   * @param {Array<Object>} tokens The token stream.
   * @return {Object} The AST root node.
   */
  parse(tokens) {
    this.tokens = tokens;
    this.pos = 0;
    
    const root = {
      type: NodeType.DOCUMENT,
      children: [],
    };

    while (this.pos < this.tokens.length) {
      const node = this.parseBlock();
      if (node) {
        root.children.push(node);
      }
    }

    return root;
  }

  /**
   * Parse a block-level element.
   *
   * @return {Object|null} The AST node or null.
   */
  parseBlock() {
    const token = this.current();

    if (!token) return null;

    switch (token.type) {
      case TokenType.BLANK_LINE:
        this.advance();
        return { type: NodeType.BLANK_LINE };

      case TokenType.HEADING:
        return this.parseHeading();

      case TokenType.CODE_BLOCK_START:
        return this.parseCodeBlock();

      case TokenType.HORIZONTAL_RULE:
        return this.parseHorizontalRule();

      case TokenType.TABLE_ROW:
        return this.parseTable();

      case TokenType.BLOCKQUOTE:
        return this.parseBlockquote();

      case TokenType.UNORDERED_LIST_ITEM:
        return this.parseUnorderedList();

      case TokenType.ORDERED_LIST_ITEM:
        return this.parseOrderedList();

      case TokenType.REFERENCE:
        return this.parseReference();

      case TokenType.PARAGRAPH:
        return this.parseParagraph();

      default:
        this.advance();
        return null;
    }
  }

  /**
   * Parse a heading node.
   *
   * @return {Object} The heading AST node.
   */
  parseHeading() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.HEADING,
      level: token.level,
      marker: token.marker,
      children: this.parseInline(token.content),
    };
  }

  /**
   * Parse a code block node.
   *
   * @return {Object} The code block AST node.
   */
  parseCodeBlock() {
    const startToken = this.current();
    this.advance();

    const contentLines = [];

    while (this.pos < this.tokens.length) {
      const token = this.current();

      if (token.type === TokenType.CODE_BLOCK_END) {
        this.advance();
        break;
      }

      if (token.type === TokenType.CODE_BLOCK_CONTENT) {
        contentLines.push(token.content);
        this.advance();
      } else {
        break;
      }
    }

    return {
      type: NodeType.CODE_BLOCK,
      language: startToken.language,
      content: contentLines.join('\n'),
      fence: startToken.fence,
    };
  }

  /**
   * Parse a horizontal rule node.
   *
   * @return {Object} The horizontal rule AST node.
   */
  parseHorizontalRule() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.HORIZONTAL_RULE,
      raw: token.raw,
    };
  }

  /**
   * Parse a table node.
   *
   * @return {Object} The table AST node.
   */
  parseTable() {
    const headerToken = this.current();
    this.advance();

    const separatorToken = this.current();
    this.advance();

    const headers = headerToken.cells;
    const alignments = separatorToken.cells;
    const rows = [];

    while (this.pos < this.tokens.length) {
      const token = this.current();

      if (token.type === TokenType.TABLE_ROW && !token.isHeader) {
        const cells = token.cells.slice(0, headers.length);
        while (cells.length < headers.length) {
          cells.push('');
        }
        rows.push(cells);
        this.advance();
      } else {
        break;
      }
    }

    return {
      type: NodeType.TABLE,
      headers,
      alignments,
      rows,
    };
  }

  /**
   * Parse a blockquote node.
   *
   * @return {Object} The blockquote AST node.
   */
  parseBlockquote() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.BLOCKQUOTE,
      children: this.parseInline(token.content),
    };
  }

  /**
   * Parse an unordered list node.
   *
   * @return {Object} The unordered list AST node.
   */
  parseUnorderedList() {
    const items = [];

    while (this.pos < this.tokens.length) {
      const token = this.current();

      if (token.type === TokenType.UNORDERED_LIST_ITEM) {
        items.push({
          type: NodeType.LIST_ITEM,
          marker: token.marker,
          children: this.parseInline(token.content),
        });
        this.advance();
      } else {
        break;
      }
    }

    return {
      type: NodeType.UNORDERED_LIST,
      children: items,
    };
  }

  /**
   * Parse an ordered list node.
   *
   * @return {Object} The ordered list AST node.
   */
  parseOrderedList() {
    const items = [];

    while (this.pos < this.tokens.length) {
      const token = this.current();

      if (token.type === TokenType.ORDERED_LIST_ITEM) {
        items.push({
          type: NodeType.LIST_ITEM,
          marker: token.marker,
          children: this.parseInline(token.content),
        });
        this.advance();
      } else {
        break;
      }
    }

    return {
      type: NodeType.ORDERED_LIST,
      children: items,
    };
  }

  /**
   * Parse a reference node.
   *
   * @return {Object} The reference AST node.
   */
  parseReference() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.REFERENCE,
      label: token.label,
      children: this.parseInline(token.content),
    };
  }

  /**
   * Parse a paragraph node.
   *
   * @return {Object} The paragraph AST node.
   */
  parseParagraph() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.PARAGRAPH,
      children: this.parseInline(token.content),
    };
  }

  /**
   * Parse inline content into inline AST nodes.
   *
   * @param {string} text The text to parse.
   * @return {Array<Object>} Array of inline AST nodes.
   */
  parseInline(text) {
    const tokens = this.inlineLexer.tokenize(text);
    const nodes = [];

    for (const token of tokens) {
      switch (token.type) {
        case TokenType.TEXT:
          nodes.push({
            type: NodeType.TEXT,
            content: token.content,
          });
          break;

        case TokenType.BOLD:
          nodes.push({
            type: NodeType.BOLD,
            raw: token.raw,
            children: [{
              type: NodeType.TEXT,
              content: token.content,
            }],
          });
          break;

        case TokenType.ITALIC:
          nodes.push({
            type: NodeType.ITALIC,
            children: [{
              type: NodeType.TEXT,
              content: token.content,
            }],
          });
          break;

        case TokenType.INLINE_CODE:
          nodes.push({
            type: NodeType.INLINE_CODE,
            content: token.content,
          });
          break;

        case TokenType.LINK:
          nodes.push({
            type: NodeType.LINK,
            text: token.text,
            url: token.url,
          });
          break;

        case TokenType.IMAGE:
          nodes.push({
            type: NodeType.IMAGE,
            alt: token.alt,
            url: token.url,
          });
          break;
      }
    }

    return nodes;
  }

  /**
   * Get the current token.
   *
   * @return {Object|null} The current token or null.
   */
  current() {
    return this.tokens[this.pos] || null;
  }

  /**
   * Advance to the next token.
   */
  advance() {
    this.pos++;
  }
}

/**
 * Renderer for converting AST to HTML.
 */
class MarkdownRenderer {
  /**
   * Render an AST to HTML.
   *
   * @param {Object} ast The AST root node.
   * @return {Array} Array of HTML elements.
   */
  render(ast) {
    if (ast.type === NodeType.DOCUMENT) {
      return ast.children.flatMap(child => this.renderNode(child));
    }

    return this.renderNode(ast);
  }

  /**
   * Render a single AST node.
   *
   * @param {Object} node The AST node to render.
   * @return {Array} Array of HTML elements.
   */
  renderNode(node) {
    switch (node.type) {
      case NodeType.BLANK_LINE:
        return this.renderBlankLine()
        
      case NodeType.HEADING:
        return this.renderHeading(node);

      case NodeType.CODE_BLOCK:
        return this.renderCodeBlock(node);

      case NodeType.HORIZONTAL_RULE:
        return this.renderHorizontalRule(node);

      case NodeType.TABLE:
        return this.renderTable(node);

      case NodeType.BLOCKQUOTE:
        return this.renderBlockquote(node);

      case NodeType.UNORDERED_LIST:
        return this.renderUnorderedList(node);

      case NodeType.ORDERED_LIST:
        return this.renderOrderedList(node);

      case NodeType.REFERENCE:
        return this.renderReference(node);

      case NodeType.PARAGRAPH:
        return this.renderParagraph(node);

      default:
        return [];
    }
  }
  
  /**
   * Render a blank line node.
   *
   * @return {Array} Array of HTML elements.
   */
  renderBlankLine() {
    return ['\n'];
  }

  /**
   * Render a heading node.
   *
   * @param {Object} node The heading node.
   * @return {Array} Array of HTML elements.
   */
  renderHeading(node) {
    const content = this.renderInline(node.children);
    return [
      html`<span class="token title important"><span class="token punctuation">${node.marker}</span> ${content}</span>\n`,
    ];
  }

  /**
   * Render a code block node.
   *
   * @param {Object} node The code block node.
   * @return {Array} Array of HTML elements.
   */
  renderCodeBlock(node) {
    const lang = node.language ? ` class="language-${node.language}"` : '';
    return [
      html`<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">${node.language}</span>\n<span class="token code-block${lang}">${node.content}</span>\n<span class="token punctuation">\`\`\`</span></span>\n`,
    ];
  }

  /**
   * Render a horizontal rule node.
   *
   * @param {Object} node The horizontal rule node.
   * @return {Array} Array of HTML elements.
   */
  renderHorizontalRule(node) {
    return [
      html`<span class="token horizontal punctuation">${node.raw}</span>`,
    ];
  }

  /**
   * Render a table node.
   *
   * @param {Object} node The table node.
   * @return {Array} Array of HTML elements.
   */
  renderTable(node) {
    return [
      html`<span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span>${node.headers.map(i => html`<span class="token table-header important"> ${i} </span><span class="token punctuation">|</span>`)}</span>\n<span class="token table-line"><span class="token punctuation">|</span>${node.alignments.map(i => html`<span class="token punctuation">${i}</span><span class="token punctuation">|</span>`)}</span>\n${node.rows.map(j => html`<span class="token table-data-rows"><span class="token punctuation">|</span>${j.map(i => html`<span class="token table-data"> ${i} </span><span class="token punctuation">|</span>`)}</span>\n`)}</span>`,
    ];
  }

  /**
   * Render a blockquote node.
   *
   * @param {Object} node The blockquote node.
   * @return {Array} Array of HTML elements.
   */
  renderBlockquote(node) {
    const content = this.renderInline(node.children);
    return [
      html`<span class="token blockquote punctuation">></span> ${content}\n`,
    ];
  }

  /**
   * Render an unordered list node.
   *
   * @param {Object} node The unordered list node.
   * @return {Array} Array of HTML elements.
   */
  renderUnorderedList(node) {
    return node.children.flatMap(item => {
      const content = this.renderInline(item.children);
      return html`<span class="token list punctuation">${item.marker}</span> ${content}\n`;
    });
  }

  /**
   * Render an ordered list node.
   *
   * @param {Object} node The ordered list node.
   * @return {Array} Array of HTML elements.
   */
  renderOrderedList(node) {
    return node.children.flatMap(item => {
      const content = this.renderInline(item.children);
      return html`<span class="token list punctuation">${item.marker}</span> ${content}\n`;
    });
  }

  /**
   * Render a reference node.
   *
   * @param {Object} node The reference node.
   * @return {Array} Array of HTML elements.
   */
  renderReference(node) {
    const content = this.renderInline(node.children);
    return [
      html`<span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">${node.label}</span><span class="token punctuation">]</span><span class="token punctuation">:</span> ${content}</span>\n`,
    ];
  }

  /**
   * Render a paragraph node.
   *
   * @param {Object} node The paragraph node.
   * @return {Array} Array of HTML elements.
   */
  renderParagraph(node) {
    const content = this.renderInline(node.children);
    return [html`${content}\n`];
  }

  /**
   * Render inline nodes.
   *
   * @param {Array<Object>} nodes Array of inline nodes.
   * @return {Array} Array of HTML elements.
   */
  renderInline(nodes) {
    return nodes.flatMap(node => this.renderInlineNode(node));
  }

  /**
   * Render a single inline node.
   *
   * @param {Object} node The inline node.
   * @return {*} HTML element.
   */
  renderInlineNode(node) {
    switch (node.type) {
      case NodeType.TEXT:
        return this.escapeHtml(node.content);

      case NodeType.BOLD: {
        const marker = node.raw.slice(0, 2);
        const content = this.escapeHtml(node.children[0].content);
        return html`<span class="token bold"><span class="token punctuation">${marker}</span><span class="token content">${content}</span><span class="token punctuation">${marker}</span></span>`;
      }

      case NodeType.ITALIC:
        return html`<span class="token italic">${this.escapeHtml(node.children[0].content)}</span>`;

      case NodeType.INLINE_CODE:
        return html`<span class="token code-snippet code keyword">\`${this.escapeHtml(node.content)}\`</span>`;

      case NodeType.LINK:
        return html`<span class="token url">[<span class="token content">${this.escapeHtml(node.text)}</span>](<span class="token url">${node.url}</span>)</span>`;

      case NodeType.IMAGE:
        return html`<span class="token url"><span class="token operator">!</span>[<span class="token content">${this.escapeHtml(node.alt)}</span>](<span class="token url">${node.url}</span>)</span>`;

      default:
        return '';
    }
  }

  /**
   * Escape HTML special characters.
   *
   * @param {string} text The text to escape.
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

    return text.replace(
      /[&<>"']/g, 
      char => escapeMap[char],
    );
  }
}

/**
 * Markdown Shader.
 *
 * This class provides syntax highlighting for Markdown text by:
 * 1. Tokenizing the input using a lexer
 * 2. Building an Abstract Syntax Tree (AST)
 * 3. Rendering the AST to styled HTML
 */
export default class MarkdownShader {
  constructor() {
    this.lexer = new MarkdownLexer();
    this.parser = new MarkdownParser();
    this.renderer = new MarkdownRenderer();
  }

  /**
   * Parse Markdown text and return syntax-highlighted HTML.
   *
   * @param {string} markdown The Markdown text to parse.
   * @return {Array} Array of HTML elements.
   */
  parse(markdown) {
    // Tokenize
    const tokens = this.lexer.tokenize(markdown);
    
    // Parse to AST
    const ast = this.parser.parse(tokens);
    
    // Render to HTML
    return this.renderer.render(ast);
  }
}