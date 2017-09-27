'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.latestMirror = exports.latestServerRelease = exports.latest = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var latest = exports.latest = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var platform, preferZip, arch, pkg, latestRelease, asset, pattern, downloadUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            platform = req.params.platform;

            if (['darwin', 'win32', 'linux'].indexOf(platform) !== -1) {
              _context.next = 3;
              break;
            }

            throw new _BadRequestError2.default('Invalid platform \'' + platform + '\'.');

          case 3:
            preferZip = req.query.zip; // darwin or win32

            arch = req.query.arch;
            pkg = req.query.pkg;

            if (!(platform === 'linux')) {
              _context.next = 11;
              break;
            }

            if (['i386', 'amd64', 'x86_64'].indexOf(arch) !== -1) {
              _context.next = 9;
              break;
            }

            throw new _BadRequestError2.default('Invalid arch \'' + arch + '\'.');

          case 9:
            if (['deb', 'rpm'].indexOf(pkg) !== -1) {
              _context.next = 11;
              break;
            }

            throw new _BadRequestError2.default('Invalid pkg \'' + pkg + '\'.');

          case 11:
            _context.next = 13;
            return (0, _github.getLatestRelease)();

          case 13:
            latestRelease = _context.sent;

            if (latestRelease) {
              _context.next = 16;
              break;
            }

            throw new _NotFoundError2.default('Latest release not found.');

          case 16:
            asset = null;
            pattern = null;
            _context.t0 = platform;
            _context.next = _context.t0 === 'darwin' ? 21 : _context.t0 === 'win32' ? 23 : _context.t0 === 'linux' ? 25 : 27;
            break;

          case 21:
            pattern = preferZip ? _config2.default.patterns.darwin.zip : _config2.default.patterns.darwin.dmg;
            return _context.abrupt('break', 27);

          case 23:
            pattern = preferZip ? _config2.default.patterns.win32.zip : _config2.default.patterns.win32.installer;
            return _context.abrupt('break', 27);

          case 25:
            pattern = _config2.default.patterns.linux[pkg][arch];
            return _context.abrupt('break', 27);

          case 27:

            asset = latestRelease.assets.find(function (a) {
              return a.name.match(pattern);
            });

            if (asset) {
              _context.next = 30;
              break;
            }

            throw new _NotFoundError2.default('No asset found that matches \'' + pattern + '\'.');

          case 30:
            downloadUrl = asset.browser_download_url;

            if (!_config2.default.privateRepo) {
              _context.next = 35;
              break;
            }

            _context.next = 34;
            return (0, _github.getPublicDownloadUrl)(asset.url);

          case 34:
            downloadUrl = _context.sent;

          case 35:

            res.redirect(302, downloadUrl);

          case 36:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function latest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var latestServerRelease = exports.latestServerRelease = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var platform, preferZip, arch, pkg, latestServerRelease, asset, pattern, downloadUrl;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            platform = req.params.platform;

            if (['mac', 'win64', 'win32', 'linux'].indexOf(platform) !== -1) {
              _context2.next = 3;
              break;
            }

            throw new _BadRequestError2.default('Invalid platform \'' + platform + '\'.');

          case 3:
            preferZip = req.query.zip; // darwin or win32

            arch = req.query.arch;
            pkg = req.query.pkg;

            if (!(platform === 'linux')) {
              _context2.next = 11;
              break;
            }

            if (['i386', 'amd64', 'x86_64'].indexOf(arch) !== -1) {
              _context2.next = 9;
              break;
            }

            throw new _BadRequestError2.default('Invalid arch \'' + arch + '\'.');

          case 9:
            if (['deb', 'rpm'].indexOf(pkg) !== -1) {
              _context2.next = 11;
              break;
            }

            throw new _BadRequestError2.default('Invalid pkg \'' + pkg + '\'.');

          case 11:
            _context2.next = 13;
            return (0, _github.getLatestServerRelease)(platform);

          case 13:
            latestServerRelease = _context2.sent;

            if (latestRelease) {
              _context2.next = 16;
              break;
            }

            throw new _NotFoundError2.default('Latest release not found.');

          case 16:
            asset = null;
            pattern = null;
            _context2.t0 = platform;
            _context2.next = _context2.t0 === 'darwin' ? 21 : _context2.t0 === 'win32' ? 23 : _context2.t0 === 'linux' ? 25 : 27;
            break;

          case 21:
            pattern = preferZip ? _config2.default.patterns.darwin.zip : _config2.default.patterns.darwin.dmg;
            return _context2.abrupt('break', 27);

          case 23:
            pattern = preferZip ? _config2.default.patterns.win32.zip : _config2.default.patterns.win32.installer;
            return _context2.abrupt('break', 27);

          case 25:
            pattern = _config2.default.patterns.linux[pkg][arch];
            return _context2.abrupt('break', 27);

          case 27:

            asset = latestRelease.assets.find(function (a) {
              return a.name.match(pattern);
            });

            if (asset) {
              _context2.next = 30;
              break;
            }

            throw new _NotFoundError2.default('No asset found that matches \'' + pattern + '\'.');

          case 30:
            downloadUrl = asset.browser_download_url;

            if (!_config2.default.privateRepo) {
              _context2.next = 35;
              break;
            }

            _context2.next = 34;
            return (0, _github.getPublicDownloadUrl)(asset.url);

          case 34:
            downloadUrl = _context2.sent;

          case 35:

            res.redirect(302, downloadUrl);

          case 36:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function latestServerRelease(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var latestMirror = exports.latestMirror = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var mirror, mirrors, platform, mirrorUrl, headers, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mirror = req.params.mirror;
            mirrors = (_config2.default.mirrors || '').split(',');

            if (mirrors.indexOf(mirror) !== -1) {
              _context3.next = 4;
              break;
            }

            throw new _NotFoundError2.default('Mirror \'' + mirror + '\' not found.');

          case 4:
            platform = req.query.platform;

            if (['win32'].indexOf(platform) !== -1) {
              _context3.next = 7;
              break;
            }

            throw new _BadRequestError2.default('Invalid platform \'' + platform + '\'.');

          case 7:
            mirrorUrl = process.env['MIRROR_URL_' + mirror.toUpperCase()];
            headers = {
              'x-forwarded-for': req.get('x-forwarded-for') || req.connection.remoteAddress,
              'user-agent': req.get('user-agent')
            };
            _context3.next = 11;
            return (0, _mirrors.downloadMirror)(mirrorUrl, platform, headers);

          case 11:
            response = _context3.sent;


            res.redirect(302, response.download_link);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function latestMirror(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _BadRequestError = require('../errors/BadRequestError');

var _BadRequestError2 = _interopRequireDefault(_BadRequestError);

var _NotFoundError = require('../errors/NotFoundError');

var _NotFoundError2 = _interopRequireDefault(_NotFoundError);

var _mirrors = require('../components/mirrors');

var _github = require('../components/github');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }