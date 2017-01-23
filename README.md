# release-tools [![Build Status](https://travis-ci.org/sdepold/release-tools.svg?branch=master)](https://travis-ci.org/sdepold/release-tools)

A tiny collection of release helpers that will help you bumping and publishing your package without too much hassles.

The projects ships a bunch of source code that get's used by very thin CLI wrappers. This way it is possible to actually use the sources independently from the command line, which can be handy if you want to integrate the logic into your own work flow.

## Installation

```
npm install -g release-tools
```

## Executables

Right now this project is very `npm` focussed but could in theory be used with every other dependency management tool as well.

### npm_bump

This executable is doing the following steps:

* It checks if your project contains a `CHANGELOG.md` file.
* If there is a changelog, it will check if the changelog contains the needle `## Upcoming` and replaces it with the new version and the current timestamp.
* If there is a changelog, it will commit the changes in changelog with the commit message `Add changes in version: v<version>`.
* It will now update run `npm version` which will set the version of your package.json to the new value, commit the change with the commit message `Bump to version: v<version>` and finally create a tag for the new version á la `v<version>`.
* It will now push your changes and your tags to the remote server (via git).

#### Usage

```
npm_bump 1.2.3
npm_bump --bugfix # bumps from 1.2.3 to 1.2.4
npm_bump --minor  # bumps from 1.2.3 to 1.3.0
npm_bump --major  # bumps from 1.2.3 to 2.0.0
```

### npm_release

This executable is doing the following steps:

- Call `npm_bump`. See the above steps.
- Release the package to npm via `npm publish`.

#### Usage

```
npm_release 1.2.3
npm_release --bugfix # bumps from 1.2.3 to 1.2.4
npm_release --minor  # bumps from 1.2.3 to 1.3.0
npm_release --major  # bumps from 1.2.3 to 2.0.0
```

### Automatic change type detection

The flag `--auto` will parse the commits since the last git tag and checks the
subject and the body of the commit messages for some specific markers:

- `[major]` will generate a major version bump
- `[minor]`, `[feature]` will generate a minor version bump
- `[patch]`, `[bugfix]`, `[fix]`  will generate a patch version bump

If no change type is detected – because the markers are missing – you can also
specify a fallback type which is picked up in such cases:

```
npm_release --auto --auto-fallback minor
```

This will bump the minor version in case no marker has been found.

#### Example

TBD

## Exported functions

### npm.bump
This function is called by `npm_bump` and expects an object as first parameter:

```javascript
var releaseTools = require('release-tools');

releaseTools.npm.bump({ version: '1.2.3' }); // Change version to a specific value.
releaseTools.npm.bump({ bugfix: true });     // Change version to next bugfix version.
releaseTools.npm.bump({ minor: true });      // change version to next minor release.
releaseTools.npm.bump({ major: true });      // Change version to next major release.
```

### npm.release
This function is called by `npm_release` and expects an object as first parameter:

```javascript
releaseTools.npm.release({ version: '1.2.3' }); // Change version to a specific value.
releaseTools.npm.release({ bugfix: true });     // Change version to next bugfix version.
releaseTools.npm.release({ minor: true });      // change version to next minor release.
releaseTools.npm.release({ major: true });      // Change version to next major release.
```

## One word about changelogs

Many of my projects are (roughly) following the schema of [keepachangelog](http://keepachangelog.com/).

## License
MIT
