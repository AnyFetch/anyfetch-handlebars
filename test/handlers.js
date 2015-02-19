"use strict";

require('should');

var hbs = require('../lib');

describe("Handlebars projection handlers", function() {
  before(function contextInjection() {
    this.context = {
      query: 'hello world',
      hlHtml: '<em>Hi !</em> and <span class="hello">hello</span> world',
      hlText: 'Hi ! and hello world',
      grMail: "ricard.robin@gmail.com",
      exPath: "/root/hello_world.txt",
      highlight: {
        hlt: 'Hello <span class="anyfetch-hlt">world</span>\nThat\'s a nice day\twow!'
      },
      metadata: {
        attr: "Hello\\\\ world\"&",
        anotherAttr: "Hello world",
        long: "Look, I'll give you Jesse Pinkman, OK? Like you said, he's the problem, he's always been the problem and without him, we would... and he's in town, alright? He's not in Virginia or wherever the hell you're looking for him. He's right here in Albuquerque and I can take you to him, I'll take you right to him. What do you say? It's complicated and I don't wish to discuss it. It's none of your concern. You know what, let's just say that I have a hell of a lot more on my mind, right now, than thinking about buying a damn car wash. Okay? So if you could just... please. Stop. Stop! You keep saying that word - danger... danger!",
        someCount: 42,
      },
      data: {
        attr: "Wuh"
      },
      theDate: new Date(0),
      undefinedValue: undefined
    };

    hbs.loadAnyfetchHelpers(this.context);
  });


  describe("{{attr attrName}}", function() {
    it("should fetch the best level of metadata for an attribute", function() {
      hbs
        .compile("{{attr 'anotherAttr'}}")(this.context)
        .should.eql(this.context.metadata.anotherAttr);
    });

    it("should escape JSON-literals in attribute", function() {
      hbs
        .compile("{{attr 'attr'}}")(this.context)
        .should.eql('Hello\\\\\\\\ world&quot;&amp;');
    });

    it("should escape correctly the highlighted content", function() {
      hbs
        .compile("{{attr 'hlt'}}")(this.context)
        .should.eql('Hello <span class=\\"anyfetch-hlt\\">world</span>\\nThat\'s a nice day\\twow!');
    });

    it("should output empty string as a fallback", function() {
      hbs
        .compile("{{attr 'attru'}}")(this.context)
        .should.eql('');
    });

    it("should output the default string as a fallback", function() {
      hbs
        .compile("{{attr 'attru' 'test'}}")(this.context)
        .should.eql('test');
    });
  });

  describe("{{shortAttr attrName}}", function() {
    it("should fetch the best level of metadata for an attribute and reduce it", function() {
      hbs
        .compile("{{shortAttr 'long'}}")(this.context)
        .should.eql('Look, I&#x27;ll give you Jesse Pinkman, OK? Like you said, he&#x27;s the problem, he&#x27;s always been the problem and without him, we would... and he&#x27;s in town, alright? He&#x27;s not in Virginia or wherever the hell y…');
    });

    it("should output empty string as a fallback", function() {
      hbs
        .compile("{{shortAttr 'attru'}}")(this.context)
        .should.eql('');
    });
  });

  describe("{{htmlAttr attrName}}", function() {
    it("should fetch the best level of metadata for an attribute without escaping except the quotes", function() {
      hbs
        .compile("{{htmlAttr 'attr'}}")(this.context)
        .should.eql('Hello\\\\\\\\ world\\"&');
    });

    it("should output empty string as a fallback", function() {
      hbs
        .compile("{{htmlAttr 'attru'}}")(this.context)
        .should.eql('');
    });
  });

  describe("{{htmlHighlighter html}}", function() {
    it('should highlight the html', function() {
      hbs
        .compile("{{htmlHighlighter hlHtml}}")(this.context)
        .should.eql('<em>Hi !</em> and <strong><span class=\\"hello\\">hello</span> world</strong>');
    });
  });

  describe("{{textHighlighter text}}", function() {
    it('should highlight the text', function() {
      hbs
        .compile("{{textHighlighter hlText}}")(this.context)
        .should.eql('Hi ! and <strong>hello world</strong>');
    });
  });

  describe("{{isHighlight text}}", function() {
    it('should return true', function() {
      hbs
        .compile("{{isHighlight .}}")(this.context)
        .should.eql("true");
    });
  });

  describe("{{gravatar email}}", function() {
    it('should output a valid gravatar url', function() {
      hbs
        .compile("{{gravatar grMail}}")(this.context)
        .should.eql('https://www.gravatar.com/avatar/b46620604f6b72c29c26e3cafabb3ca8?d=mm&s=96');
    });

    it('should output a blank gravatar url if the mail is blank', function() {
      hbs
        .compile("{{gravatar ''}}")(this.context)
        .should.eql('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=96');
    });
  });

  describe("{{extractFilename path}}", function() {
    it('should output a valid filename', function() {
      hbs
        .compile("{{extractFilename exPath}}")(this.context)
        .should.eql('hello_world');
    });
  });

  describe("{{extractExtension path}}", function() {
    it('should output a valid extension when known', function() {
      hbs
        .compile("{{extractExtension exPath}}")(this.context)
        .should.eql('txt');
    });

    it('should output a blank extension otherwise', function() {
      hbs
        .compile("{{extractExtension 'hello.crx'}}")(this.context)
        .should.eql('_blank');
    });
  });

  describe("{{dateRfc date}}", function() {
    it('should output a valid RFC date', function() {
      hbs
        .compile("{{dateRfc theDate}}")(this.context)
        .should.eql('1970-01-01T00:00:00.000Z');
    });

    it('should output a valid RFC date with a string', function() {
      hbs
        .compile("{{dateRfc '1970-01-01T00:00:00.000Z'}}")(this.context)
        .should.eql('1970-01-01T00:00:00.000Z');
    });

    it('should handle empty string', function() {
      hbs
        .compile("{{dateRfc ''}}")(this.context)
        .should.eql('');
    });
  });

  describe("{{hideDomainEmail Email}}", function() {
    it('should output the first part of the email', function() {
      hbs
        .compile("{{hideDomainEmail grMail}}")(this.context)
        .should.eql('ricard.robin');
    });
    it('should do nothing if not an email', function() {
      hbs
        .compile("{{hideDomainEmail query}}")(this.context)
        .should.eql(this.context.query);
    });
  });

  describe("{{safeInt integer}}", function() {
    it('should output 0 for other than number', function() {
      hbs
        .compile("{{safeInt metadata}}")(this.context)
        .should.eql('0');
    });
    it('should output 0 for undefined', function() {
      hbs
        .compile("{{safeInt undefinedValue}}")(this.context)
        .should.eql('0');
    });
    it('should output', function() {
      hbs
        .compile("{{safeInt metadata.someCount}}")(this.context)
        .should.eql(this.context.metadata.someCount.toString());
    });
  });
});
