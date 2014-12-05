"use strict";

/**
 * @param hbs {Handlebars} The handlebars object
 */
module.exports = function(hbs) {
  /**
   * Transform a date to a RFC 3339 (ISO) representation
   * @param date {string} The date
   * @return {string} A RFC 3339 date
   */
  return function dateRfc(date) {
    var dateObj = date;

    // Return null on empty date
    if(!date) {
      return "";
    }

    if(typeof(date) === "string") {
      dateObj = new Date(hbs.Utils.escapeExpression(date));
    }
    return new hbs.SafeString(dateObj.toISOString());
  };
};
