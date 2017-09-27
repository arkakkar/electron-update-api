'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getAllReleases = getAllReleases;
exports.getReleaseByTag = getReleaseByTag;
exports.getLatestRelease = getLatestRelease;
exports.getLatestServerRelease = getLatestServerRelease;
exports.getPublicDownloadUrl = getPublicDownloadUrl;

var _github = require('github4');

var _github2 = _interopRequireDefault(_github);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var github = new _github2.default(_config2.default.github.api);
if (_config2.default.github.token) {
  github.authenticate({
    type: 'oauth',
    token: _config2.default.github.token
  });
}

function getReleasesByPage(page, callback) {
  github.repos.getReleases({
    user: _config2.default.user,
    repo: _config2.default.repo,
    page: page,
    per_page: 100
  }, function (err, result) {
    if (err) {
      callback(err);
    } else {
      // Exclude drafts
      result = result && result.filter(function (r) {
        return !r.draft;
      }) || [];

      // Exclude prereleases
      result = result && result.filter(function (r) {
        return !r.prerelease;
      }) || [];

      if (result.meta && result.meta.link && result.meta.link.indexOf('rel="next"') !== -1) {
        getReleasesByPage(page + 1, function (err2, releases) {
          if (err2) callback(err2);else callback(null, result.concat(releases));
        });
      } else {
        callback(null, result);
      }
    }
  });
}

function getLatestReleaseForChannel(channel, page, callback) {
  github.repos.getReleases({
    user: _config2.default.user,
    repo: _config2.default.repo,
    page: page
  }, function (err, releases) {
    if (err) {
      callback(err);
    } else {
      (function () {
        // Exclude drafts
        releases = releases && releases.filter(function (r) {
          return !r.draft;
        }) || [];

        // Exclude prereleases
        releases = releases && releases.filter(function (r) {
          return !r.prerelease;
        }) || [];

        var channelIndex = _config2.default.channels.indexOf(channel);
        var release = releases.find(function (release) {
          var releaseChannel = _config2.default.channels.find(function (c) {
            return release.name.indexOf(c) !== -1;
          }) || _config2.default.defaultChannel;
          var releaseChannelIndex = _config2.default.channels.indexOf(releaseChannel);
          return channelIndex <= releaseChannelIndex;
        });

        if (release) {
          callback(null, release);
        } else if (releases.meta && releases.meta.link && releases.meta.link.indexOf('rel="next"') !== -1) {
          getLatestReleaseForChannel(channel, page + 1, callback);
        } else {
          callback(null, null);
        }
      })();
    }
  });
}

function getAllReleases() {
  return new _promise2.default(function (resolve, reject) {
    getReleasesByPage(1, function (err, releases) {
      if (err) reject(err);else resolve(releases);
    });
  });
}

function getReleaseByTag(tag) {
  return new _promise2.default(function (resolve, reject) {
    github.repos.getReleaseByTag({
      user: _config2.default.user,
      repo: _config2.default.repo,
      tag: tag
    }, function (err, release) {
      if (err) reject(err);else resolve(release);
    });
  });
}

function getLatestRelease() {
  var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default.channels[0];

  if (channel == _config2.default.channels[0]) {
    // Request the latest release directly
    return new _promise2.default(function (resolve, reject) {
      github.repos.getLatestRelease({
        user: _config2.default.user,
        repo: _config2.default.repo
      }, function (err, release) {
        if (err) reject(err);else resolve(release);
      });
    });
  }

  return new _promise2.default(function (resolve, reject) {
    getLatestReleaseForChannel(channel, 1, function (err, release) {
      if (err) reject(err);else resolve(release);
    });
  });
}

function getLatestServerRelease(platform) {
  var _express = require('express');
  var _express2 = _interopRequireDefault(_express);
  var app = (0, _express2.default)();
  return new _promise2.default(function (resolve, reject) {
    app.get('https://download.sentieo.com/desktop/releasecheck.json', function (req, res) {
      switch (platform) {
        case 'mac' :
          res.download(res.mac);
          res.end();
          break;
        case 'win32':
          res.download(res.win32);
          res.end();
          break;
        case 'win64':
          res.download(res.win64);
          res.end();
          break;
        case 'default':
          res.send('<a href="https://download.sentieo.com/desktop/home" target="_blank">Sentieo Desktop </a>');
          res.end();
          break;
      }
      resolve();
    });
  });
}

function getPublicDownloadUrl(url) {
  return new _promise2.default(function (resolve, reject) {
    var options = {
      url: url,
      followRedirect: false,
      headers: {
        'Authorization': 'token ' + _config2.default.github.token,
        'Accept': 'application/octet-stream',
        'User-Agent': _config2.default.github.api.headers['user-agent']
      }
    };

    (0, _request2.default)(options, function (err, res) {
      if (err) reject(err);else resolve(res.headers.location);
    });
  });
}

exports.default = github;