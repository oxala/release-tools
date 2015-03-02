'use strict';

// Core modules
var fs = require('fs');
var path = require('path');

// External modules
var Bluebird   = require('bluebird');
var dateFormat = require('dateformat');

var changelog = module.exports = {
  update: function (args) {
    return Bluebird.resolve().then(function () {
      if (changelog.exists() && changelog.needsUpdate()) {
        return changelog.setVersion(args.version);
      }
    });
  },

  changelogPath: function () {
    return path.resolve(process.env.CHANGELOG_HOME || process.cwd(), 'CHANGELOG.md');
  },

  exists: function () {
    return fs.existsSync(this.changelogPath());
  },

  needsUpdate: function () {
    return this.read().indexOf('## Upcoming') > -1;
  },

  setVersion: function (version) {
    var currentContent = this.read();
    var date           = date;
    var formattedDate  = dateFormat(date, 'yyyy-mm-dd');
    var needle         = '## Upcoming';
    var replacement    = '## v' + version + ' - ' + formattedDate;

    this.write(currentContent.replace(needle, replacement));
  },

  read: function () {
    return fs.readFileSync(this.changelogPath()).toString();
  },

  write: function (newContent) {
    fs.writeFileSync(this.changelogPath(), newContent);
  }
};