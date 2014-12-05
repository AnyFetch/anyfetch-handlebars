"use strict";

module.exports = function() {
  /**
   * Lookup an item from an object and inject it in context
   * @param obj {Object} The object to lookup
   * @param options {Object} The handlebars block options (must contain the field hash option)
   * @return {string} The result of the hbs execution
   */
  return function contextLookup(obj, options) {
    if(Array.isArray(obj) && options.hash.reverse) {
      obj = obj.slice(0);
      obj.reverse();
    }

    this.looked = obj && obj[options.hash.field];
    return options.fn(this);
  };
};
