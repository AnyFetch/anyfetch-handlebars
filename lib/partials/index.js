"use strict";
var fs = require('fs');

module.exports.partials = {};

fs.readdirSync(__dirname).forEach(function walkPartials(filename) {
  if(/\.json\.hbs$/.test(filename)) {
    var partial = fs.readFileSync(__dirname + '/' + filename, {encoding: "utf8"});
    var key = filename.split('.')[0];
    module.exports.partials[key] = partial;
  }
});

/**
 * Inject the handlebars partials into the handlebars object
 *
 * @param hbs {Handlebars} The handlebars object
 */
module.exports.injectInto = function(hbs) {
  Object.keys(module.exports.partials).forEach(function(k) {
    hbs.registerPartial(k, module.exports.partials[k]);
  });
};

