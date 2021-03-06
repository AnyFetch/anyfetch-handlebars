# Anyfetch-Handlebars
> Visit http://anyfetch.com for details about AnyFetch.

Inject new helpers in handlebars.

# How to install?

```
npm install
```

Check everything is working with `npm test`.

# How to use it

```js
var hbs = require('anyfetch-handlebars');
hbs.loadAnyfetchHelpers(/* Your context */);
```

# Example

```js
var hbs = require('anyfetch-handlebars');

// An example of context
var rawDocument = {
  data: {
    text: 'Test of document'
  },
  metadata: {
    path: '/test/document.txt'
  },
  highlight: {}
};

hbs.loadAnyfetchHelpers(rawDocument);

var compiled = hbs.compile("{ \
  \"title\": \
    {{#if metadata.title}} \
      \"{{attr 'title'}}\" \
    {{else}} \
      {{#if metadata.path}} \
        \"{{extractFilename metadata.path}}\" \
      {{else}} \
        \"Unknown document: no path.\" \
      {{/if}} \
    {{/if~}}, \
  \"path\": \"{{attr 'path'}}\", \
  \"snippet\": \"{{#trim .}}{{shortAttr 'text'}}{{/trim}}\" \
}");

var json = compiled(rawDocument);

// Beautify JSON
json = JSON.stringify(JSON.parse(json), null, 4);
```

This results in:

```json
{
  "title": "document",
  "path": "/test/document.txt",
  "snippet": "Test of document"
}
```

# Contributing to anyfetch-handlebars

This repo is used extensively by AnyFetch.
If your document-type needs a custom handlebars helper, you're welcome to fork. See [Contributing](CONTRIBUTING.md) for details.
>>>>>>> master

Support: `support@anyfetch.com`.
