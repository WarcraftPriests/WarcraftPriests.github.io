/**
 * TooltipBuilder.js
 * Safe DOM-based tooltip HTML generation for Highcharts
 * Eliminates XSS risks from string concatenation while maintaining Highcharts compatibility
 */

/**
 * Creates a wrapper div for tooltip content
 * @returns {HTMLDivElement}
 */
function createWrapper() {
  var wrapper = document.createElement('div');
  wrapper.style.display = 'inline-block';
  wrapper.style.marginBottom = '-3px';
  return wrapper;
}

/**
 * Creates a Wowhead link element with safe text content
 * @param {string} text - Display text (will be escaped)
 * @param {string} url - Link URL
 * @param {string} itemId - Item/spell ID
 * @param {number|string} ilvl - Item level (optional)
 * @returns {HTMLAnchorElement}
 */
export function createWowheadLink(text, url, itemId, ilvl, options) {
  options = options || {};
  var link = document.createElement('a');
  link.textContent = text; // Automatically escapes
  link.className = options.className || 'wowheadLink';
  link.target = '_blank';
  
  if (ilvl != null && ilvl !== '') {
    link.href = url + itemId + '?ilvl=' + ilvl;
  } else {
    link.href = url + itemId;
  }
  
  return link;
}

/**
 * Creates a talent import link (clickable to copy)
 * @param {string} talentName - Talent name to display
 * @returns {HTMLAnchorElement}
 */
export function createTalentLink(talentName) {
  var link = document.createElement('a');
  link.className = 'tooltipLink';
  link.title = 'Click here to copy Talent Import string';
  link.textContent = ' ' + talentName + ' '; // Spaces for padding
  return link;
}

/**
 * Creates plain text node (for fallback when no link available)
 * @param {string} text - Text to display
 * @returns {Text}
 */
export function createTextNode(text) {
  return document.createTextNode(text);
}

/**
 * Creates a space separator for multiple items
 * @returns {Text}
 */
export function createSpacer() {
  return document.createTextNode('  ');
}

/**
 * Creates a separator span for multi-link lines
 * @param {string} text - Separator text
 * @param {string} className - Optional css class
 * @returns {HTMLSpanElement}
 */
export function createSeparator(text, className) {
  var separator = document.createElement('span');
  separator.textContent = text;
  if (className) {
    separator.className = className;
  }
  return separator;
}

/**
 * Wraps an element with an optional class for layout control
 * @param {HTMLElement|Text} content - Content to wrap
 * @param {string} className - Optional css class
 * @returns {HTMLElement|Text}
 */
export function wrapElement(content, className) {
  if (!className) {
    return content;
  }

  var wrapper = document.createElement('span');
  wrapper.className = className;
  wrapper.appendChild(content);
  return wrapper;
}

/**
 * Builds a complete tooltip line with wrapper div
 * Returns HTML string for Highcharts compatibility
 * @param {HTMLElement|Text|Array<HTMLElement|Text>} content - Content to wrap
 * @returns {string} HTML string
 */
export function buildTooltipLine(content) {
  var wrapper = createWrapper();
  
  if (Array.isArray(content)) {
    content.forEach(function(item) {
      wrapper.appendChild(item);
    });
  } else {
    wrapper.appendChild(content);
  }
  
  return wrapper.outerHTML;
}

/**
 * Builds a Wowhead item/spell link line
 * @param {string} displayName - Name to display
 * @param {string} itemId - Item/spell ID
 * @param {string} url - Wowhead URL
 * @param {number|string} ilvl - Item level (optional)
 * @returns {string} HTML string
 */
export function buildWowheadLinkLine(displayName, itemId, url, ilvl, options) {
  var link = createWowheadLink(displayName, url, itemId, ilvl, options);
  return buildTooltipLine(link);
}

/**
 * Builds a talent import link line
 * @param {string} talentName - Talent name
 * @returns {string} HTML string
 */
export function buildTalentLinkLine(talentName) {
  var link = createTalentLink(talentName);
  return buildTooltipLine(link);
}

/**
 * Builds a plain text line (no link)
 * @param {string} text - Text to display
 * @returns {string} HTML string
 */
export function buildTextLine(text) {
  var textNode = createTextNode(text);
  return buildTooltipLine(textNode);
}

/**
 * Builds a line with multiple links (e.g., trinket combos)
 * @param {Array<{text: string, itemId: string, url: string, ilvl: string}>} items - Array of item configs
 * @returns {string} HTML string
 */
export function buildMultiLinkLine(items, options) {
  options = options || {};

  var elements = [];
  var separatorText = options.separatorText != null ? options.separatorText : '  ';
  
  items.forEach(function(item, index) {
    var link = createWowheadLink(item.text, item.url, item.itemId, item.ilvl, {
      className: options.linkClassName || 'wowheadLink'
    });
    elements.push(wrapElement(link, options.itemClassName));
    
    // Add spacer between items (but not after last)
    if (index < items.length - 1) {
      if (options.separatorClassName || separatorText !== '  ') {
        elements.push(createSeparator(separatorText, options.separatorClassName));
      } else {
        elements.push(createSpacer());
      }
    }
  });

  if (options.lineClassName) {
    var lineWrapper = document.createElement('span');
    lineWrapper.className = options.lineClassName;
    elements.forEach(function(element) {
      lineWrapper.appendChild(element);
    });
    return buildTooltipLine(lineWrapper);
  }

  return buildTooltipLine(elements);
}

// Default export for backward compatibility with 'TooltipBuilder.method()' pattern
export default {
  createWrapper,
  createWowheadLink,
  createTalentLink,
  createTextNode,
  createSpacer,
  createSeparator,
  wrapElement,
  buildTooltipLine,
  buildWowheadLinkLine,
  buildTalentLinkLine,
  buildTextLine,
  buildMultiLinkLine
};
