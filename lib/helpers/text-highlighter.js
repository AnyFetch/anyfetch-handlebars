"use strict";

var documentHighlighter = require('document-highlighter');

/**
 * @param hbs {Handlebars} The handlebars object
 * @param context {Object} The handlebars context
 */
module.exports = function(hbs, context) {
  /**
   * Highlights a text
   * @param text {string} A (potentially unsafe) text
   * @return {Handlebars.SafeString} The highlighted result
   */
  return function textHighlighter(text) {
    var safeQuery = hbs.Utils.escapeExpression(context.query || "");
    var safeText = hbs.Utils.escapeExpression(text);
    return new hbs.SafeString(
      hbs.Utils.escapeQuotes(documentHighlighter.text(safeText, safeQuery).text)
    );
  };
};
