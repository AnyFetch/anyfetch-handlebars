"use strict";

require('should');

var hbs = require('../lib');

describe("Handlebars projection blocks", function() {
  before(function contextInjection() {
    this.context = {
      commaList: ['a', 'b', 'c'],
      lookupList: [{}, {}, {}],
      siblingList: ['c', 'b', 'a']
    };

    hbs.loadAnyfetchHelpers(this.context);
  });

  describe("{{#trim}}", function() {
    it('should escape whitelines', function() {
      hbs
        .compile("{{#trim .}}  hello  {{/trim}}")(this.context)
        .should.eql('hello');
    });
  });

  describe("{{#escapeQuotes}}", function() {
    it('should escape quotes', function() {
      hbs
        .compile('{{#escapeQuotes .}}"hello\r"{{/escapeQuotes}}')(this.context)
        .should.eql('\\"hello\\r\\"');
    });
  });

  describe("{{#shorten}}", function() {
    it('should output shorter text', function() {
      hbs
        .compile("{{#shorten . len=4}}Hello{{/shorten}}")(this.context)
        .should.eql('Hell…');
    });
  });

  describe("{{#list}}", function() {
    it('should output a correct comma separated list', function() {
      hbs
        .compile("{{#list commaList}}{{@index}}/{{.}}{{/list}}")(this.context)
        .should.eql('0/a,1/b,2/c');
    });

    it('should be able to customize the separators', function() {
      hbs
        .compile("{{#list commaList sep='/'}}{{.}}{{/list}}")(this.context)
        .should.eql('a/b/c');
    });

    it('should treat the block neutrally in case of non-list', function() {
      hbs
        .compile("{{#list 'hi'}}{{.}}{{/list}}")(this.context)
        .should.eql('hi');
    });

    it('should treat the block neutrally in case of non-list', function() {
      hbs
        .compile("{{#list commaList l=2}}{{.}}{{/list}}")(this.context)
        .should.eql('a,b');
    });
  });

  describe("{{#reverseList}}", function() {
    it('should output a correct comma separated list', function() {
      hbs
        .compile("{{#reverseList commaList}}{{@index}}/{{.}}{{/reverseList}}")(this.context)
        .should.eql('0/c,1/b,2/a');
    });

    it('should be able to customize the separators', function() {
      hbs
        .compile("{{#reverseList commaList sep='/'}}{{.}}{{/reverseList}}")(this.context)
        .should.eql('c/b/a');
    });

    it('should treat the block neutrally in case of non-list', function() {
      hbs
        .compile("{{#reverseList 'hi'}}{{.}}{{/reverseList}}")(this.context)
        .should.eql('hi');
    });

    it('should treat the block neutrally in case of non-list', function() {
      hbs
        .compile("{{#reverseList commaList l=2}}{{.}}{{/reverseList}}")(this.context)
        .should.eql('c,b');
    });
  });

  describe("{{#contextLookup}}", function() {
    it('should go through the sibling list', function() {
      hbs
        .compile("{{#each lookupList}}{{#contextLookup ../siblingList field=@index}}{{looked}}{{/contextLookup}}{{/each}}")(this.context)
        .should.eql('cba');
    });

    it('should go through the sibling list with reverse options', function() {
      hbs
        .compile("{{#each lookupList}}{{#contextLookup ../siblingList field=@index reverse=true}}{{looked}}{{/contextLookup}}{{/each}}")(this.context)
        .should.eql('abc');
    });
  });

  describe("{{#first}}", function() {
    it('should output the first item', function() {
      hbs
        .compile("{{#first commaList}}{{.}}{{/first}}")(this.context)
        .should.eql('a');
    });

    it('should treat the block neutrally in case of non-list', function() {
      hbs
        .compile("{{#first 'hi'}}{{.}}{{/first}}")(this.context)
        .should.eql('hi');
    });
  });

  describe("{{#last}}", function() {
    it('should output the last item', function() {
      hbs
        .compile("{{#last commaList}}{{.}}{{/last}}")(this.context)
        .should.eql('c');
    });

    it('should treat the block neutrally in case of non-list', function() {
      hbs
        .compile("{{#last 'hi'}}{{.}}{{/last}}")(this.context)
        .should.eql('hi');
    });
  });
});
