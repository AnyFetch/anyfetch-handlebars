"use strict";

/**
 * @param hbs {Handlebars} The handlebars object
 */
module.exports = function() {
  /**
   * Trim strings
   * @param context {Object} The hbs context
   * @param options {Object} The hbs options
   * @return {string} The trimmed string
   */
  return function trim(context, options) {
    return options.fn(context).replace(/  +/g, ' ').trim();
  };
};
