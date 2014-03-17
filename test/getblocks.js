var fs = require('fs');
var expect = require('chai').expect;
var getblocks = require('../index');

describe('Default options', function () {

  var expectedOutput = {
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
  };

  it('should return the expected output when a path is given', function () {
    var output = getblocks.find({
      path: 'test/default.html'
    });

    expect(output).to.eql(expectedOutput);
  });

  it('should return the expected output when content is given', function () {
    var content = fs.readFileSync('test/default.html', 'utf8');

    var output = getblocks.find({
      content: content
    });

    expect(output).to.eql(expectedOutput);
  });

});

describe('Custom options', function () {

  var expectedOutput = {
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
  };

  it('should return the expected output when a path is given', function () {
    var output = getblocks.find({
      path: 'test/custom.html',
      trimmed: true,
      startTag: '#@',
      endTag: '@#',
      startKeyword: 'foo',
      endKeyword: 'bar'
    });

    expect(output).to.eql(expectedOutput);
  });

  it('should return the expected output when content is given', function () {
    var content = fs.readFileSync('test/custom.html', 'utf8');

    var output = getblocks.find({
      content: content,
      trimmed: true,
      startTag: '#@',
      endTag: '@#',
      startKeyword: 'foo',
      endKeyword: 'bar'
    });

    expect(output).to.eql(expectedOutput);
  });

});
