#!/usr/bin/env node

var Base = require('../lib/core/Base');
var _super = Base.prototype;
var npath = require('path');
var pkg = require('../package.json');
var fs = require('fs');
var loadPathPkgPath = npath.join(process.cwd(), 'package.json');
var pkgExists = fs.existsSync(loadPathPkgPath);
var meta = pkgExists ? require(loadPathPkgPath) : {};
var _ = require('lodash');
var commandsPath = '../lib/commands/';

var CLI = Base.extend({

  'namespace': 'cli',

  'paths': {

    'create': commandsPath + 'Create',
    'start': commandsPath + 'Start',
    'help': commandsPath + 'Help',
    'test': commandsPath + 'Test'
  },

  'initialize': function () {

    var self = this;
    _super.initialize.apply(self, arguments);

    // self.logger.pending(self.namespace, 'Loading asimov.js @ ' + self.options.pkg.version);
    // self.logger.log(self.namespace, 'New to asimov.js? Check out http://asimovjs.org');
    // self.logger.log(self.namespace, 'The time is ' + new Date());

    var command = self.getCommand(self.options.args);
    var loadPath = self.paths[command];
    var Command = require(loadPath);

    self.assert('function', Command, 'Invalid command');
    new Command(_.merge(self.options, {
      'command': command
    }));
  },

  'getCommand': function (args) {

    var self = this;
    var pathIndex;

    _.find(args, function (arg, index) {
      if (arg.indexOf('asimov.js/bin') > 0) {
        pathIndex = index;
      }
    });

    self.assert('number', pathIndex, 'Failed to start CLI, invalid load path');
    return self.options.command = args[pathIndex + 1];
  }
});

module.exports = new CLI({
  'pkg': pkg,
  'args': process.argv,
  'meta': meta
});