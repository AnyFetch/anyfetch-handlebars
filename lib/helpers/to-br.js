"use strict";

module.exports = function() {
  return function toBr(options) {
    return options.fn(this).replace(/(\r\n|\n|\r)/gm, '<br>');
  };
};
