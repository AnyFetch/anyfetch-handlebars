"use strict";
var autoload = require('auto-load');
var handlebars = require('handlebars');

/*
 * Meta function to escape escape characters (\n ==> \\n)
 * @see http://stackoverflow.com/questions/4253367/how-to-escape-a-json-string-containing-newline-characters-using-javascript
 */
function escapeQuotes(string, beforeHbsEscaping) {
  if(string instanceof handlebars.SafeString) {
    return string;
  }
  string = string + ""; // Ensure we've got a string


  // We want to replace '\' with '\\', that's meta… indeed…
  // E.g {"azer": "hello\\,"} becomes {"azer": "hello\\\\,"}
  // Else it will be parsed later in the second JSON-parse, and fail miserably and make our lives a living nightmare.
  string = string.replace(/\\/g, '\\\\');

  if(beforeHbsEscaping !== false) {
    string = string.replace(/"/g, '\\"');
  }
  return string
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t')
    .trim();
}

/**
 * Inject the handlebars helpers into the handlebars object
 *
 * @param hbs {Handlebars} The handlebars object
 * @param context {Object} The handlebars context
 */
module.exports.injectInto = function(hbs, context) {
  var helpers = autoload(__dirname);
  delete helpers.index;

  // Patch escapeExpression for JSON
  hbs.Utils.escapeQuotes = escapeQuotes;

  Object.keys(helpers).forEach(function(k) {
    hbs.registerHelper(k, helpers[k](hbs, context));
  });

};

