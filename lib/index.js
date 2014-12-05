'use strict';

var hbs = require('handlebars');
var hbsHelpers = require('./helpers/');

hbs.loadAnyfetchHelpers = function loadAnyfetchHelpers(context) {
  hbsHelpers.injectInto(hbs, context);
};

module.exports = hbs;
