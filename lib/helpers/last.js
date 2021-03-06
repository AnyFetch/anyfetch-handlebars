"use strict";

module.exports = function() {
  /**
   * Select only the last item
   * @param list {Object} The context list
   * @param options {Object} The handlebars block options
   * @return {string} The result of the hbs execution
   */
  return function last(list, options) {
    if(!list || !list[0]) {
      return options.inverse(this);
    }

    if(typeof(list) === "string" || !list.length) {
      return options.fn(list);
    }

    return options.fn(list[list.length - 1]);
  };
};
