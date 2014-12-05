"use strict";

module.exports = function(hbs) {
  /**
   * Build a list from a list structure
   * @param list {Object} The context list
   * @param options {Object} The handlebars block options (the `sep` parameter is set to `,` by default)
   * @return {string} A joined list
   */
  return function listHandler(list, options) {
    if(!list || (Array.isArray(list) && !list.length)) {
      return options.inverse(this);
    }

    var limit = options.hash.l || list.length;

    var data;
    if(options.data) {
      data = hbs.createFrame(options.data);
    }

    if(typeof(list) === "string" || !list.length) {
      if(data) {
        data.first = true;
        data.last = true;
        data.index = 0;
      }
      return options.fn(list, {data: data});
    }

    var buffer = "";
    for(var i = 0; i < limit && i < list.length; i += 1) {
      var ctx = list[i];
      if(data) {
        data.first = false;
        data.last = false;
        if(i === 0) {
          data.first = true;
        }
        if(i === limit - 1 || i === list.length - 1) {
          data.last = true;
        }
        data.index = i;
      }

      buffer += options.fn(ctx, {data: data});
      if(i < limit - 1 && i < list.length - 1) {
        buffer += options.hash.sep || ",";
      }
    }
    return buffer;
  };
};
