"use strict";

var shorten = require('./shorten.js')();

module.exports = function(hbs) {
  var shortenOpts = {
    hash: {
      len: 200
    },
    fn: function(context) {
      return context;
    }
  };

  /**
   * Select the best option to fetch a value and shorten it if needed
   * @param attributeName {Object} The handlebars context
   * @return {string} A reduced string
   */
  return function shortAttr(attributeName) {
    if(this.highlight[attributeName]) {
      return new hbs.SafeString(hbs.Utils.escapeQuotes(this.highlight[attributeName]));
    }
    if(this.metadata[attributeName]) {
      return hbs.Utils.escapeQuotes(shorten(this.metadata[attributeName], shortenOpts), false);
    }
    else if(this.data[attributeName]) {
      return hbs.Utils.escapeQuotes(shorten(this.data[attributeName], shortenOpts), false);
    }
    else {
      return "";
    }

  };
};
