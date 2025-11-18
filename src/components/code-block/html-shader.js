import { html } from '../element/index.js';

/**
 * Void elements that don't have closing tags.
 */
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 
  'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

/**
 * Regular expressions for parsing.
 */
const REGEX = {
  WHITESPACE: /\s/,
  TAG_NAME_CHAR: /[a-zA-Z0-9\-:_]/,
  ATTR_NAME_CHAR: /[a-zA-Z0-9\-:_@.]/,  // 添加了 . 支持
  NON_WHITESPACE_OR_GT: /[\s>]/,
};

/**
 * Token types enumeration.
 * @enum {string}
 */
const TokenType = {
  // Tag tokens
  TAG_OPEN: 'TAG_OPEN',
  TAG_CLOSE: 'TAG_CLOSE',
  TAG_SELF_CLOSE: 'TAG_SELF_CLOSE',
  TAG_NAME: 'TAG_NAME',
  END_TAG_OPEN: 'END_TAG_OPEN',
  
  // Attribute tokens
  ATTRIBUTES: 'ATTRIBUTES',
  
  // Content tokens
  TEXT: 'TEXT',
  COMMENT: 'COMMENT',
  DOCTYPE: 'DOCTYPE',
};

/**
 * AST node types enumeration.
 * @enum {string}
 */
const NodeType = {
  DOCUMENT: 'DOCUMENT',
  ELEMENT: 'ELEMENT',
  TEXT: 'TEXT',
  COMMENT: 'COMMENT',
  DOCTYPE: 'DOCTYPE',
  ATTRIBUTE: 'ATTRIBUTE',
};

/**
 * Lexer for tokenizing HTML elements.
 */
class HTMLLexer {
  constructor() {
    this.text = '';
    this.pos = 0;
    this.tokens = [];
  }

  /**
   * Tokenize HTML text into a stream of tokens.
   *
   * @param {string} html The HTML text to tokenize.
   * @return {Array<Object>} Array of tokens.
   */
  tokenize(text) {
    this.text = text;
    this.pos = 0;
    this.tokens = [];

    while (this.pos < this.text.length) {
      // Check for comment
      if (this.match('<!--')) {
        this.tokenizeComment();
        continue;
      }

      // Check for DOCTYPE
      if (this.matchIgnoreCase('<!DOCTYPE')) {
        this.tokenizeDoctype();
        continue;
      }

      // Check for end tag
      if (this.match('</')) {
        this.tokenizeEndTag();
        continue;
      }

      // Check for start tag
      if (this.match('<')) {
        this.tokenizeStartTag();
        continue;
      }

      // Text content
      this.tokenizeText();
    }

    return this.tokens;
  }

  /**
   * Tokenize a comment.
   */
  tokenizeComment() {
    const start = this.pos;
    this.pos += 4; // Skip <!--

    while (this.pos < this.text.length) {
      if (this.match('-->')) {
        this.pos += 3;
        break;
      }
      this.pos++;
    }
    const raw = this.text.slice(start, this.pos);
    const content = raw.slice(4, -3);

    this.tokens.push({
      type: TokenType.COMMENT,
      content,
      raw,
    });
  }

  /**
   * Tokenize a DOCTYPE declaration.
   */
  tokenizeDoctype() {
    const start = this.pos;
    
    while (this.pos < this.text.length && this.text[this.pos] !== '>') {
      this.pos++;
    }
    
    if (this.text[this.pos] === '>') {
      this.pos++;
    }

    this.tokens.push({
      type: TokenType.DOCTYPE,
      raw: this.text.slice(start, this.pos),
    });
  }

  /**
   * Tokenize an end tag.
   */
  tokenizeEndTag() {
    // </
    this.tokens.push({
      type: TokenType.END_TAG_OPEN,
      raw: '</',
    });
    this.pos += 2;

    // Skip whitespace
    this.skipWhitespace();

    // Tag name
    const tagName = this.readTagName();
    if (tagName) {
      this.tokens.push({
        type: TokenType.TAG_NAME,
        name: tagName,
        raw: tagName,
      });
    }

    // Skip whitespace
    this.skipWhitespace();

    // >
    if (this.text[this.pos] === '>') {
      this.tokens.push({
        type: TokenType.TAG_CLOSE,
        raw: '>',
      });
      this.pos++;
    }
  }

  /**
   * Tokenize a start tag.
   */
  tokenizeStartTag() {
    // <
    this.tokens.push({
      type: TokenType.TAG_OPEN,
      raw: '<',
    });
    this.pos++;

    // Skip whitespace
    this.skipWhitespace();

    // Tag name
    const tagName = this.readTagName();
    if (tagName) {
      this.tokens.push({
        type: TokenType.TAG_NAME,
        name: tagName,
        raw: tagName,
      });
    }

    // Attributes
    let attributes = '';
    while (this.pos < this.text.length) {
      // this.skipWhitespace();

      // Check for end of tag
      if (this.match('/>')) {
        if (attributes.trim()) {
          this.tokens.push({
            type: TokenType.ATTRIBUTES,
            content: attributes.trim(),
            raw: attributes,
          });
        }
        this.tokens.push({
          type: TokenType.TAG_SELF_CLOSE,
          raw: '/>',
        });
        this.pos += 2;
        return;
      }

      if (this.text[this.pos] === '>') {
        if (attributes.trim()) {
          this.tokens.push({
            type: TokenType.ATTRIBUTES,
            content: attributes.trim(),
            raw: attributes,
          });
        }
        this.tokens.push({
          type: TokenType.TAG_CLOSE,
          raw: '>',
        });
        this.pos++;
        return;
      }

      attributes += this.text[this.pos];
      this.pos++;
    }
  }

  /**
   * Tokenize text content.
   */
  tokenizeText() {
    const start = this.pos;
    while (this.pos < this.text.length && this.text[this.pos] !== '<') {
      this.pos++;
    }
    
    const content = this.text.slice(start, this.pos);

    if (content) {
      this.tokens.push({
        type: TokenType.TEXT,
        content,
        raw: content,
      });
    }
  }

  /**
   * Read a tag name.
   *
   * @return {string} The tag name.
   */
  readTagName() {
    const start = this.pos;
    
    while (this.pos < this.text.length && REGEX.TAG_NAME_CHAR.test(this.text[this.pos])) {
      this.pos++;
    }

    return this.text.slice(start, this.pos);
  }

  /**
   * Skip whitespace characters.
   */
  skipWhitespace() {
    while (this.pos < this.text.length && REGEX.WHITESPACE.test(this.text[this.pos])) {
      this.pos++;
    }
  }

  /**
   * Check if current position matches a string.
   *
   * @param {string} str The string to match.
   * @return {boolean} True if matches.
   */
  match(str) {
    return this.text.slice(this.pos, this.pos + str.length) === str;
  }

  /**
   * Check if current position matches a string (case-insensitive).
   *
   * @param {string} str The string to match.
   * @return {boolean} True if matches.
   */
  matchIgnoreCase(str) {
    return this.text.slice(this.pos, this.pos + str.length).toLowerCase() === str.toLowerCase();
  }
}

/**
 * Parser for building AST from tokens.
 */
class HTMLParser {
  constructor() {}

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
      const node = this.parseNode();
      if (node) {
        root.children.push(node);
      }
    }

    return root;
  }

  /**
   * Parse a node.
   *
   * @return {Object|null} The AST node or null.
   */
  parseNode() {
    const token = this.current();

    if (!token) return null;

    switch (token.type) {
      case TokenType.DOCTYPE:
        return this.parseDoctype();

      case TokenType.COMMENT:
        return this.parseComment();

      case TokenType.TAG_OPEN:
        return this.parseElement();

      case TokenType.TEXT:
        return this.parseText();

      default:
        this.advance();
        return null;
    }
  }

  /**
   * Parse a DOCTYPE node.
   *
   * @return {Object} The DOCTYPE AST node.
   */
  parseDoctype() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.DOCTYPE,
      raw: token.raw,
    };
  }

  /**
   * Parse a comment node.
   *
   * @return {Object} The comment AST node.
   */
  parseComment() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.COMMENT,
      content: token.content,
      raw: token.raw,
    };
  }

  /**
   * Parse a text node.
   *
   * @return {Object} The text AST node.
   */
  parseText() {
    const token = this.current();
    this.advance();

    return {
      type: NodeType.TEXT,
      content: token.content,
    };
  }

  /**
   * Parse an element node.
   *
   * @return {Object} The element AST node.
   */
  parseElement() {
    // <
    this.advance();

    // Tag name
    const tagNameToken = this.current();
    if (!tagNameToken || tagNameToken.type !== TokenType.TAG_NAME) {
      while (this.current() 
        && this.current().type !== TokenType.TAG_CLOSE 
        && this.current().type !== TokenType.TAG_SELF_CLOSE
      ) {
        this.advance();
      }
      if (this.current()) {
        this.advance();
      }
      return null;
    }
    const tagName = tagNameToken.name;
    this.advance();

    // Attributes
    let attributes = '';
    const token = this.current();
    if (token?.type === TokenType.ATTRIBUTES) {
      attributes = token.content;
      this.advance();
    }
    
    const closeToken = this.current();
    if (closeToken?.type === TokenType.TAG_SELF_CLOSE) {
      this.advance();
      return {
        type: NodeType.ELEMENT,
        tagName,
        attributes,
        children: [],
        selfClosing: true,
      };
    }
    
    if (closeToken?.type === TokenType.TAG_CLOSE) {
      this.advance();
    }

    // Children (for self-closing or void elements, we don't parse children)
    const children = [];

    if (!VOID_ELEMENTS.has(tagName.toLowerCase())) {
      while (this.pos < this.tokens.length) {
        const token = this.current();

        // Check for end tag
        if (token.type === TokenType.END_TAG_OPEN) {
          const nextToken = this.tokens[this.pos + 1];
          if (nextToken && nextToken.type === TokenType.TAG_NAME && 
              nextToken.name.toLowerCase() === tagName.toLowerCase()) {
            // Skip </tagName>
            this.advance(); // </
            this.advance(); // tagName
            if (this.current()?.type === TokenType.TAG_CLOSE) {
              this.advance(); // >
            }
            break;
          }
        }

        const childNode = this.parseNode();
        if (childNode) {
          children.push(childNode);
        }
      }
    }

    return {
      type: NodeType.ELEMENT,
      tagName,
      attributes,
      children,
      selfClosing: false,
    };
  }

  /**
   * Parse an attribute.
   *
   * @return {Object|null} The attribute node.
   */
  parseAttribute() {
    const nameToken = this.current();
    this.advance();

    const attr = {
      type: NodeType.ATTRIBUTE,
      name: nameToken.name,
      value: null,
      quote: null,
    };

    // Check for =
    if (this.current()?.type === TokenType.ATTR_EQUALS) {
      this.advance();

      // Get value
      if (this.current()?.type === TokenType.ATTR_VALUE) {
        const valueToken = this.current();
        attr.value = valueToken.value;
        attr.quote = valueToken.quote;
        this.advance();
      }
    }

    return attr;
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
class HTMLRenderer {
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
   * @return {Array|string} Array of HTML elements or string.
   */
  renderNode(node) {
    switch (node.type) {
      case NodeType.DOCTYPE:
        return this.renderDoctype(node);

      case NodeType.COMMENT:
        return this.renderComment(node);

      case NodeType.TEXT:
        return this.renderText(node);

      case NodeType.ELEMENT:
        return this.renderElement(node);

      default:
        return [];
    }
  }

  /**
   * Render a DOCTYPE node.
   *
   * @param {Object} node The DOCTYPE node.
   * @return {Array} Array of HTML elements.
   */
  renderDoctype(node) {
    return [
      html`<span class="token doctype">${node.raw}</span>`,
    ];
  }

  /**
   * Render a comment node.
   *
   * @param {Object} node The comment node.
   * @return {Array} Array of HTML elements.
   */
  renderComment(node) {
    return [
      html`<span class="token comment">&lt;!--${node.content}--&gt;</span>`,
    ];
  }

  /**
   * Render a text node.
   *
   * @param {Object} node The text node.
   * @return {string} The escaped text.
   */
  renderText(node) {
    return node.content;
  }

  /**
   * Render an element node.
   *
   * @param {Object} node The element node.
   * @return {Array} Array of HTML elements.
   */
  renderElement(node) {
    const parts = [];

    // Opening tag
    parts.push(html`<span class="token punctuation">&lt;</span>`);
    parts.push(html`<span class="token tag">${node.tagName}</span>`);

    // Attributes
    if (node.attributes) {
      parts.push(' ');
      parts.push(html`<span class="token attributes">${node.attributes}</span>`);
    }

    if (node.selfClosing) {
      parts.push(html`<span class="token punctuation">/&gt;</span>`);
      return parts;
    }

    parts.push(html`<span class="token punctuation">&gt;</span>`);
    
    if (!VOID_ELEMENTS.has(node.tagName.toLowerCase())) {
      for (const child of node.children) {
        const rendered = this.renderNode(child);
        if (Array.isArray(rendered)) {
          parts.push(...rendered);
        } else {
          parts.push(rendered);
        }
      }

      // Closing tag
      parts.push(html`<span class="token punctuation">&lt;/</span>`);
      parts.push(html`<span class="token tag">${node.tagName}</span>`);
      parts.push(html`<span class="token punctuation">&gt;</span>`);
    }

    return parts;
  }
}

/**
 * HTML Shader.
 *
 * This class provides syntax highlighting for HTML text by:
 * 1. Tokenizing the input using a lexer
 * 2. Building an Abstract Syntax Tree (AST)
 * 3. Rendering the AST to styled HTML
 */
export default class HTMLShader {
  constructor() {
    this.lexer = new HTMLLexer();
    this.parser = new HTMLParser();
    this.renderer = new HTMLRenderer();
  }

  /**
   * Parse HTML text and return syntax-highlighted HTML.
   *
   * @param {string} html The HTML text to parse.
   * @return {Array} Array of HTML elements.
   */
  parse(text) {
    // Tokenize
    const tokens = this.lexer.tokenize(text);
    
    // Parse to AST
    const ast = this.parser.parse(tokens);
    
    // Render to HTML
    return this.renderer.render(ast);
  }
}