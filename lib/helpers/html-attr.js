"use strict";

module.exports = function(hbs) {
  /**
   * Outputs the best option for a given html attribute
   * @param attributeName {string} The name of the attribute
   * @return {string} The catched value
   */
  return function htmlAttr(attributeName) {
    if(this.highlight[attributeName]) {
      return new hbs.SafeString(
        hbs.Utils.escapeQuotes(this.highlight[attributeName].trim())
      );
    }
    else if(this.metadata[attributeName]) {
      return new hbs.SafeString(
        hbs.Utils.escapeQuotes(this.metadata[attributeName])
      );
    }
    else if(this.data[attributeName]) {
      return new hbs.SafeString(
        hbs.Utils.escapeQuotes(this.data[attributeName])
      );
    }
    else {
      return "";
    }
  };
};
