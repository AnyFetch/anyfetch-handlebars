"use strict";

module.exports = function() {
  /**
   * Cut the first chars of a content
   * @param context {Object} The handlebars context
   * @param options {Object} The handlebars block options (the `len` parameter is set to `200` by default)
   * @return {string} A reduced string
   */
  return function shorten(context, options) {
    var len = options.hash.len || 200;
    var text = options.fn(context);
    var sliced = text;
    if(text.length > len) {
      sliced = text.substr(0, len).trim();
    }
    return sliced + (text.length > len ? "…" : "");
  };
};
