"use strict";

var crypto = require('crypto');

/**
 * @param hbs {Handlebars} The handlebars object
 */
module.exports = function(hbs) {
  /**
   * Transform an email to a gravatar url
   * @param email {string} The email to fetch the gravatar from
   * @return {string} A gravatar URL
   */
  return function gravatar(email) {
    var hash;
    if(email.length > 0) {
      hash = email.trim().toLowerCase();
      hash = crypto.createHash('md5').update(hash).digest("hex");
    }
    else {
      hash = "00000000000000000000000000000000";
    }
    return new hbs.SafeString('https://www.gravatar.com/avatar/' + hash + '?d=mm&s=96');
  };
};
