"use strict";

module.exports = function(hbs) {
  /**
   * Create string correctly escaped for JSON
   * @param context {Object} The context inside the block
   * @param options {Object} The handlebars block options
   * @return {string} A correct string ready to use in JSON
   */
  return function escapeQuotes(context, options) {
    return hbs.Utils.escapeQuotes(options.fn(context));
  };
};
