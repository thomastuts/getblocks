getblocks
==============

> Parses files for specific blocks and returns the lines inside of them

## Install

```
npm install getblocks
```


## Examples

### Default options & read from file path

This example will read a file from the given path, and return any fenced blocks it finds.

```js
var getblocks = require('getblocks');

getblocks.find({
  path: 'test/default.html'
});
```

#### Input:

```html
<!-- block:first -->
  <script src="aaa.js"></script>
  <script src="bbb.js"></script>
  <script>
    // This is an inline script
  </script>
<!-- endblock -->

<!-- block:second -->
  <script>
    // An additional inline script
  </script>
  <script src="ccc.js"></script>
  <script src="ddd.js"></script>
<!-- endblock -->
```

#### Output:

```js
{
  first: {
    start: 2,
    end: 6,
    content: [
      '  <script src="aaa.js"></script>',
      '  <script src="bbb.js"></script>',
      '  <script>',
      '    // This is an inline script',
      '  </script>'
    ]
  },
  second: {
    start: 10,
    end: 14,
    content: [
      '  <script>',
      '    // An additional inline script',
      '  </script>',
      '  <script src="ccc.js"></script>',
      '  <script src="ddd.js"></script>'
    ]
  }
}
```

### Custom options & passed content (instead of reading a file)

This example will read a file from the given path, and return any fenced blocks it finds.

```js
var getblocks = require('getblocks');

getblocks.find({
  content: 'HTML_CONTENT_HERE', // pass HTML content, e.g. from a previously read file
  trimmed: true,
  startTag: '#@',
  endTag: '@#',
  startKeyword: 'foo',
  endKeyword: 'bar'
});
```

#### Input:

```html
#@ foo:first @#
  <script src="aaa.js"></script>
  <script src="bbb.js"></script>
  <script>
    // This is an inline script
  </script>
#@ bar @#

#@ foo:second @#
  <script>
    // An additional inline script
  </script>
  <script src="ccc.js"></script>
  <script src="ddd.js"></script>
#@ bar @#
```

#### Output:

```js
{
  first: {
    start: 2,
    end: 6,
    content: [
      '<script src="aaa.js"></script>',
      '<script src="bbb.js"></script>',
      '<script>',
      '// This is an inline script',
      '</script>'
    ]
  },
  second: {
    start: 10,
    end: 14,
    content: [
      '<script>',
      '// An additional inline script',
      '</script>',
      '<script src="ccc.js"></script>',
      '<script src="ddd.js"></script>'
    ]
  }
}
```

___

## API

### find(options)

#### options.path

Type: `String`  

If a path is set, getblocks will read a file from the given path and use that to parse content. You can either use `options.path` or `options.content`, but not both.

#### options.content

Type: `String`  

If the content parameter is filled in, getblocks will parse that content. You can either use `options.path` or `options.content`, but not both.


#### options.startTag

Type: `String`  
Default: `'<!--'`

The starting tag of a block definition.


#### options.endTag

Type: `String`  
Default: `'-->'`

The ending tag of a block definition.


#### options.startKeyword

Type: `String`  
Default: `'block'`

The keyword of a block start definition.


#### options.endKeyword

Type: `String`  
Default: `'endblock'`

The keyword of a block end definition.


#### options.trimmed

Type: `Boolean`  
Default: `false`

If set to true, getblocks will trim all excess whitespace (i.e. indentation) before returning the output.



## License

MIT © [Thomas Tuts](github.com/thomastuts)
