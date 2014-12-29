"use strict";

var queryParser = require('logic-query-parser');

function getAllStrings(query) {
  var strings = [];

  if(!query || !query.type) {
    return [];
  }

  if(query.type === 'string') {
    return [query.value];
  }

  if(query.values) {
    strings = query.values.reduce(function(previous, current) {
      return previous.concat(getAllStrings(current));
    }, []);
  }

  return strings;
}

/**
 * @param hbs {Handlebars} The handlebars object
 * @param context {Object} The handlebars context
 */
module.exports = function(hbs, context) {
  /**
   * Check if is highlight
   * @param obj {objetct} A (potentially unsafe) object
   * @return {Handlebars.SafeString} The highlighted result
   */
  return function isHighlight(obj) {
    var strings = [];

    try {
      var tree = queryParser.parse(context.query || "");
      var query = queryParser.utils.binaryTreeToQueryJson(tree);
      strings = getAllStrings(query);
    } catch(e) {
      return false;
    }

    return strings.some(function(string) {
      return Object.keys(obj).some(function(name) {
        // Check if string length is greater than 3 to avoid a little word to match all fields
        // Example : 'c' will match 'anyfetch.com'
        return string && string.length >= 3 && obj[name].toLowerCase().indexOf(string.toLowerCase()) !== -1;
      });
    });
  };
};
