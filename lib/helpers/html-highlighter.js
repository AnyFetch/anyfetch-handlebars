"use strict";

var documentHighlighter = require('document-highlighter');

// Setup document HL
documentHighlighter.defaultOptions.before = '<span class="anyfetch-hlt">';
documentHighlighter.defaultOptions.after = '</span>';
documentHighlighter.defaultOptions.beforeSecond = '<span class="anyfetch-hlt anyfetch-secondary">';
documentHighlighter.defaultOptions.afterSecond = '</span>';

documentHighlighter.defaultOptions.language = 'fr';


/**
 * @param hbs {Handlebars} The handlebars object
 * @param context {Object} The handlebars context
 */
module.exports = function(hbs, context) {
  /**
   * Highlights an HTML string
   * @param html {string} A safe html string
   * @return {Handlebars.SafeString} The highlighted result
   */
  return function htmlHighlighter(html) {
    var safeQuery = hbs.Utils.escapeExpression(context.query || "");
    return new hbs.SafeString(
      hbs.Utils.escapeQuotes(documentHighlighter.html(html, safeQuery).html)
    );
  };
};
