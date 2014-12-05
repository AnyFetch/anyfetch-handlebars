"use strict";

module.exports = function(hbs) {
  /**
   * Build a reverse list from a list structure
   * @param list {Object} The context list
   * @param options {Object} The handlebars block options (the `sep` parameter is set to `,` by default)
   * @return {string} A joined list
   */
  return function reverseListHandler(list, options) {
    if(Array.isArray(list)) {
      list = list.slice(0);
      list.reverse();
    }

    return hbs.helpers.list(list, options);
  };
};
