var Command = require('./Command');
var _super = Command.prototype;
var _ = require('lodash');
var colors = require('colors');

module.exports = Command.extend({

  'prefix': '$ asimov.js ',

  'commands': {

    'help': 'Show usage instructions',
    'create [name]': 'Create new project'
  },

  'initialize': function () {

    var self = this;
    _super.initialize.apply(self, arguments);

    console.log(self.lineDelimiter);
    console.log('   Usage:\n\n');

    _.each(self.commands, function (instruction, command) {
      console.log(self.padding + instruction.bold.inverse);
      console.log(self.padding + self.prefix.replace('$', '$'.grey) + command + '\n');
    });

    console.log(self.lineDelimiter);
  }
});