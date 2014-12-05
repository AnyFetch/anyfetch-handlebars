"use strict";

var documentHighlighter = require('document-highlighter');

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
