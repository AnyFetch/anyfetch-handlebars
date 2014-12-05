"use strict";

/**
 * @param hbs {Handlebars} The handlebars object
 */
module.exports = function(hbs) {
  /**
   * Hide the domain from an email address
   * @param email {string} The email
   * @return {string} The part of email
   */
  return function hideDomain(email) {
    if(email.lastIndexOf('@') !== -1) {
      email = email.substr(0, email.lastIndexOf('@'));
    }

    return new hbs.SafeString(email);
  };
};
