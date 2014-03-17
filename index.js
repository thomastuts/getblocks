var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function find(options) {

  var defaultOptions = {
    startTag: '<!--',
    endTag: '-->',
    startKeyword: 'block',
    endKeyword: 'endblock',
    trimmed: false
  };

  // Merge default options with the ones given
  options = _.merge(defaultOptions, options);

  // Set up regexes to find our blocks
  var REGEX = {
    start: new RegExp(options.startTag + '\\s*' + options.startKeyword +':(\\w+)\\s*' + options.endTag),
    end: new RegExp(options.startTag + '\\s*' + options.endKeyword + '\\s*' + options.endTag)
  };

  var output = {};
  var insideBlock = false;
  var currentBlock;
  var content;

  // If a file path is given, read the file
  if (options.path) {
    // Read file
    content = fs.readFileSync(options.path, 'utf8');
  }

  if (options.content) {
    content = options.content;
  }

  // Create an array with a line in each element
  var lines = content.replace(/\r\n/g, '\n').split(/\n/);

  lines.forEach(function (line, index) {
    var lineNumber = ++index;
    var start = line.match(REGEX.start);
    var end = REGEX.end.test(line);

    // If a starting tag is found, add the block's name and start parsing it
    if (start) {
      var blockName = start[1];
      var block = output[blockName] = {
        start: null,
        end: null,
        content: []
      };

      // Add the first line *inside* of the block, not the actual starting block line
      block.start = ++lineNumber;
      currentBlock = blockName;
      insideBlock = true;
    }

    if (end && output[currentBlock]) {
      // Add the last line *inside* of the block, not the actual ending block line
      output[currentBlock].end = --lineNumber;

      // Remove the first line (block starting tag)
      // TODO: figure out a proper way to deal with this
      output[currentBlock].content.splice(0, 1);

      // End the current block parsing
      insideBlock = false;
    }

    if (insideBlock) {
      line = options.trimmed ? line.trim() : line;
      output[currentBlock].content.push(line);
    }
  });

  return output;
}

exports.find = find;
