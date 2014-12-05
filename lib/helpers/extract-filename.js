"use strict";

/**
 * @param hbs {Handlebars} The handlebars object
 */
module.exports = function(hbs) {
  /**
   * Extract filename from a path
   * @param path {string} The path to extract
   * @return {string} The filename
   */
  return function extractFilename(path) {
    var safePath = hbs.Utils.escapeExpression(path);
    var filename = safePath.substr(safePath.lastIndexOf('/') + 1);
    if(filename.lastIndexOf('.') !== -1) {
      filename = filename.substr(0, filename.lastIndexOf('.'));
    }

    return new hbs.SafeString(filename);
  };
};
