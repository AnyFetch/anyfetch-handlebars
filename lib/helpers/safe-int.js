"use strict";

module.exports = function() {
  /**
   * Get an safe integer from an unsafe source, possibly undefined.
   * @param integer {mixed} The source
   * @return {integer} A safe integer
   */
  return function safeInt(integer) {
    integer = parseInt(integer);

    // Return 0 NaN
    if(!integer) {
      return 0;
    }
    return integer;
  };
};
