'use strict';

var hbs = require('handlebars');
var hbsHelpers = require('./helpers/');
var hbsPartials = require('./partials/');

hbs.loadAnyfetchHelpers = function loadAnyfetchHelpers(context) {
  hbsHelpers.injectInto(hbs, context);
  hbsPartials.injectInto(hbs);
};

module.exports = hbs;
