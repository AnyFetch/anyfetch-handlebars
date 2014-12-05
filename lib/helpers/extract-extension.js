"use strict";

/**
 * @param hbs {Handlebars} The handlebars object
 */
module.exports = function(hbs) {
  /**
   * Extract extension from a path
   * @param path {string} The path to extract
   * @return {string} The extension
   */
  return function extractExtension(path) {
    var extension = '_blank';
    var safePath = hbs.Utils.escapeExpression(path);
    var lastIndexOf = safePath.lastIndexOf('.');
    if(lastIndexOf !== -1) {
      extension = safePath.substr(lastIndexOf + 1);

      var availableExtensions = ["aac", "ai", "aiff", "avi", "bmp", "c", "cpp", "css", "dat", "dmg", "doc", "dotx", "dwg", "dxf", "eps", "exe", "flv", "gif", "h", "hpp", "html", "ics", "iso", "java", "jpg", "key", "mid", "mp3", "mp4", "mpg", "odf", "ods", "odt", "otp", "ots", "ott", "pdf", "php", "png", "ppt", "psd", "py", "qt", "rar", "rb", "rtf", "sql", "tga", "tgz", "tiff", "txt", "wav", "xls", "xlsx", "xml", "yml", "zip"];
      if(availableExtensions.indexOf(extension) === -1) {
        extension = '_blank';
      }
    }
    return new hbs.SafeString(extension);
  };
};
