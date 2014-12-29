"use strict";

/**
 * @param hbs {string} The handlebars object
 */
module.exports = function(hbs) {
  /**
   * Outputs the best option for a given attribute
   * @param attributeName {string} The name of the attribute
   * @return {string} The catched value
   */
  return function attr(attributeName, defaultValue) {
    console.log(arguments);
    if(this.highlight[attributeName]) {
      return new hbs.SafeString(
        hbs.Utils.escapeQuotes(this.highlight[attributeName].trim())
      );
    }
    if(this.metadata[attributeName]) {
      return hbs.Utils.escapeQuotes(this.metadata[attributeName], false);
    }
    else if(this.data[attributeName]) {
      return hbs.Utils.escapeQuotes(this.data[attributeName], false);
    }
    else {
      return typeof defaultValue === 'string' ? defaultValue : "";
    }
  };
};
