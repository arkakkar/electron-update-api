'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linux = exports.win32_file = exports.win32_portable = exports.darwin = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var darwin = exports.darwin = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var channel, version, latestRelease, latestVersion, shouldUpdate, asset, downloadUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            channel = req.params.channel || _config2.default.channels[0];

            if (_config2.default.channels.indexOf(channel) !== -1) {
              _context.next = 3;
              break;
            }

            throw new _BadRequestError2.default('Invalid channel \'' + channel + '\'.');

          case 3:
            version = req.query.version;

            if (_semver2.default.valid(version)) {
              _context.next = 6;
              break;
            }

            throw new _BadRequestError2.default('Invalid version \'' + version + '\'.');

          case 6:
            _context.next = 8;
            return (0, _github.getLatestRelease)(channel);

          case 8:
            latestRelease = _context.sent;

            if (latestRelease) {
              _context.next = 11;
              break;
            }

            throw new _NotFoundError2.default('Latest release not found.');

          case 11:
            latestVersion = _semver2.default.clean(latestRelease.tag_name);
            shouldUpdate = _semver2.default.lt(version, latestVersion);

            if (!shouldUpdate) {
              _context.next = 24;
              break;
            }

            asset = latestRelease.assets.find(function (a) {
              return a.name.match(_config2.default.patterns.darwin.zip);
            });

            if (asset) {
              _context.next = 17;
              break;
            }

            throw new _NotFoundError2.default('No asset found that matches \'' + _config2.default.patterns.darwin.zip + '\'.');

          case 17:
            downloadUrl = asset.browser_download_url;

            if (!_config2.default.privateRepo) {
              _context.next = 22;
              break;
            }

            _context.next = 21;
            return (0, _github.getPublicDownloadUrl)(asset.url);

          case 21:
            downloadUrl = _context.sent;

          case 22:

            res.json({
              url: downloadUrl,
              name: latestRelease.name,
              notes: latestRelease.body,
              pub_date: latestRelease.published_at
            });

            return _context.abrupt('return');

          case 24:

            res.status(204).end();

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function darwin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var win32_portable = exports.win32_portable = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var channel, latestRelease, zipAsset, downloadUrl;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channel = req.params.channel || _config2.default.channels[0];

            if (_config2.default.channels.indexOf(channel) !== -1) {
              _context2.next = 3;
              break;
            }

            throw new _BadRequestError2.default('Invalid channel \'' + channel + '\'.');

          case 3:
            _context2.next = 5;
            return (0, _github.getLatestRelease)(channel);

          case 5:
            latestRelease = _context2.sent;

            if (latestRelease) {
              _context2.next = 8;
              break;
            }

            throw new _NotFoundError2.default('Latest release not found.');

          case 8:
            zipAsset = latestRelease.assets.find(function (a) {
              return a.name.match(_config2.default.patterns.win32.zip);
            });

            if (zipAsset) {
              _context2.next = 11;
              break;
            }

            throw new _NotFoundError2.default('No asset found that matches \'' + _config2.default.patterns.win32.zip + '\'.');

          case 11:
            downloadUrl = zipAsset.browser_download_url;

            if (!_config2.default.privateRepo) {
              _context2.next = 16;
              break;
            }

            _context2.next = 15;
            return (0, _github.getPublicDownloadUrl)(zipAsset.url);

          case 15:
            downloadUrl = _context2.sent;

          case 16:

            res.json({
              url: downloadUrl,
              name: latestRelease.name,
              notes: latestRelease.body,
              pub_date: latestRelease.published_at,
              version: _semver2.default.clean(latestRelease.tag_name)
            });

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function win32_portable(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var win32_file = exports.win32_file = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var clientLocalVersion, channel, fileName, fileVersion, release, asset, downloadUrl;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            clientLocalVersion = req.query.localVersion;
            channel = req.params.channel || _config2.default.channels[0];

            if (_config2.default.channels.indexOf(channel) !== -1) {
              _context3.next = 4;
              break;
            }

            throw new _BadRequestError2.default('Invalid channel \'' + channel + '\'.');

          case 4:
            fileName = req.params.file;

            if (fileName) {
              _context3.next = 7;
              break;
            }

            throw new _BadRequestError2.default('Invalid file \'' + fileName + '\'.');

          case 7:

            // Try to guess the file version
            fileVersion = (fileName.match(/\d+\.\d+\.\d+/) || [])[0] || null;
            release = null;

            if (!fileVersion) {
              _context3.next = 17;
              break;
            }

            _context3.next = 12;
            return (0, _github.getReleaseByTag)('v' + fileVersion);

          case 12:
            release = _context3.sent;

            if (release) {
              _context3.next = 15;
              break;
            }

            throw new _NotFoundError2.default('Release not found for version \'' + fileVersion + '\'.');

          case 15:
            _context3.next = 28;
            break;

          case 17:
            _context3.next = 19;
            return (0, _github.getLatestRelease)(channel);

          case 19:
            release = _context3.sent;

            if (release) {
              _context3.next = 22;
              break;
            }

            throw new _NotFoundError2.default('Latest release not found.');

          case 22:
            if (!(clientLocalVersion && _semver2.default.lt(release.tag_name, clientLocalVersion))) {
              _context3.next = 28;
              break;
            }

            _context3.next = 25;
            return (0, _github.getReleaseByTag)('v' + clientLocalVersion);

          case 25:
            release = _context3.sent;

            if (release) {
              _context3.next = 28;
              break;
            }

            throw new _NotFoundError2.default('Release for tag v' + clientLocalVersion + ' not found.');

          case 28:
            asset = release.assets.find(function (a) {
              return a.name === fileName;
            });

            if (asset) {
              _context3.next = 31;
              break;
            }

            throw new _NotFoundError2.default('Asset not found.');

          case 31:
            downloadUrl = asset.browser_download_url;

            if (!_config2.default.privateRepo) {
              _context3.next = 36;
              break;
            }

            _context3.next = 35;
            return (0, _github.getPublicDownloadUrl)(asset.url);

          case 35:
            downloadUrl = _context3.sent;

          case 36:

            res.redirect(302, downloadUrl);

          case 37:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function win32_file(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var linux = exports.linux = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    var channel, arch, pkg, latestRelease, asset, downloadUrl;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            channel = req.params.channel || _config2.default.channels[0];

            if (_config2.default.channels.indexOf(channel) !== -1) {
              _context4.next = 3;
              break;
            }

            throw new _BadRequestError2.default('Invalid channel \'' + channel + '\'.');

          case 3:
            arch = req.query.arch || '';
            pkg = req.query.pkg || '';

            if (['i386', 'amd64', 'x86_64'].indexOf(arch) !== -1) {
              _context4.next = 7;
              break;
            }

            throw new _BadRequestError2.default('Invalid arch \'' + arch + '\'.');

          case 7:
            if (['deb', 'rpm'].indexOf(pkg) !== -1) {
              _context4.next = 9;
              break;
            }

            throw new _BadRequestError2.default('Invalid pkg \'' + pkg + '\'.');

          case 9:
            _context4.next = 11;
            return (0, _github.getLatestRelease)(channel);

          case 11:
            latestRelease = _context4.sent;

            if (latestRelease) {
              _context4.next = 14;
              break;
            }

            throw new _NotFoundError2.default('Latest release not found.');

          case 14:
            asset = latestRelease.assets.find(function (a) {
              return a.name.indexOf(pkg) !== -1 && a.name.indexOf(arch) !== -1;
            });

            if (asset) {
              _context4.next = 17;
              break;
            }

            throw new _NotFoundError2.default('No asset found for pkg \'' + pkg + '\' and arch \'' + arch + '\'.');

          case 17:
            downloadUrl = asset.browser_download_url;

            if (!_config2.default.privateRepo) {
              _context4.next = 22;
              break;
            }

            _context4.next = 21;
            return (0, _github.getPublicDownloadUrl)(asset.url);

          case 21:
            downloadUrl = _context4.sent;

          case 22:

            res.json({
              url: downloadUrl,
              name: latestRelease.name,
              notes: latestRelease.body,
              pub_date: latestRelease.published_at,
              version: _semver2.default.clean(latestRelease.tag_name)
            });

          case 23:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function linux(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var _BadRequestError = require('../errors/BadRequestError');

var _BadRequestError2 = _interopRequireDefault(_BadRequestError);

var _NotFoundError = require('../errors/NotFoundError');

var _NotFoundError2 = _interopRequireDefault(_NotFoundError);

var _github = require('../components/github');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }