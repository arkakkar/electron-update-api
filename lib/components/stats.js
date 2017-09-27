'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var get = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var releases, downloadsTotal, downloadsByFile, downloadsByVersion, downloadsByVersionR, downloadsByVersionRD, downloadsByVersionRDP, downloadsByPlatform, versionsDesc, i, deltaCount, deltaPercent;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _github.getAllReleases)();

          case 2:
            releases = _context.sent;
            downloadsTotal = 0;
            downloadsByFile = {};
            downloadsByVersion = {};
            downloadsByVersionR = {}; // R = real downloads, i.e. only final assets (excludes RELEASES, nupkg files, etc)

            downloadsByVersionRD = {}; // D = calculated deltas

            downloadsByVersionRDP = {}; // P = percentage deltas

            downloadsByPlatform = {
              darwin: { dmg: 0, zip: 0 },
              win32: { installer: 0, portable: 0 },
              linux: {
                deb: { i386: 0, amd64: 0 },
                rpm: { i386: 0, x86_64: 0 }
              },
              undetected: 0
            };


            releases.forEach(function (release) {
              var version = release.tag_name;
              downloadsByVersion[version] = 0;
              downloadsByVersionR[version] = 0;

              release.assets.forEach(function (asset) {
                downloadsTotal += asset.download_count;
                downloadsByVersion[version] += asset.download_count;

                if (!downloadsByFile[asset.name]) downloadsByFile[asset.name] = 0;
                downloadsByFile[asset.name] += asset.download_count;

                var patterns = _config2.default.patterns;
                if (!patterns) {
                  return;
                }

                if (patterns.darwin) {
                  if (patterns.darwin.dmg && asset.name.match(patterns.darwin.dmg)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.darwin.dmg += asset.download_count;
                    return;
                  }

                  if (patterns.darwin.zip && asset.name.match(patterns.darwin.zip)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.darwin.zip += asset.download_count;
                    return;
                  }
                }

                if (patterns.win32) {
                  if (patterns.win32.installer && asset.name.match(patterns.win32.installer)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.win32.installer += asset.download_count;
                    return;
                  }

                  if (patterns.win32.zip && asset.name.match(patterns.win32.zip)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.win32.portable += asset.download_count;
                    return;
                  }
                }

                if (patterns.linux && patterns.linux.deb) {
                  if (patterns.linux.deb.i386 && asset.name.match(patterns.linux.deb.i386)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.linux.deb.i386 += asset.download_count;
                    return;
                  }

                  if (patterns.linux.deb.amd64 && asset.name.match(patterns.linux.deb.amd64)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.linux.deb.amd64 += asset.download_count;
                    return;
                  }
                }

                if (patterns.linux && patterns.linux.rpm) {
                  if (patterns.linux.rpm.i386 && asset.name.match(patterns.linux.rpm.i386)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.linux.rpm.i386 += asset.download_count;
                    return;
                  }

                  if (patterns.linux.rpm.x86_64 && asset.name.match(patterns.linux.rpm.x86_64)) {
                    downloadsByVersionR[version] += asset.download_count;
                    downloadsByPlatform.linux.rpm.x86_64 += asset.download_count;
                    return;
                  }
                }

                downloadsByPlatform.undetected += asset.download_count;
              });
            });

            downloadsByPlatform.darwin.all = downloadsByPlatform.darwin.dmg + downloadsByPlatform.darwin.zip;
            downloadsByPlatform.win32.all = downloadsByPlatform.win32.installer + downloadsByPlatform.win32.portable;
            downloadsByPlatform.linux.deb.all = downloadsByPlatform.linux.deb.i386 + downloadsByPlatform.linux.deb.amd64;
            downloadsByPlatform.linux.rpm.all = downloadsByPlatform.linux.rpm.i386 + downloadsByPlatform.linux.rpm.x86_64;
            downloadsByPlatform.linux.all = downloadsByPlatform.linux.deb.all + downloadsByPlatform.linux.rpm.all;
            downloadsByPlatform.all = downloadsByPlatform.darwin.all + downloadsByPlatform.win32.all + downloadsByPlatform.linux.all;

            versionsDesc = (0, _keys2.default)(downloadsByVersionR);

            for (i = 0; i < versionsDesc.length - 1; i++) {
              deltaCount = downloadsByVersionR[versionsDesc[i]] - downloadsByVersionR[versionsDesc[i + 1]];
              deltaPercent = deltaCount / downloadsByVersionR[versionsDesc[i + 1]] * 100;

              deltaPercent = Math.round(deltaPercent * 100) / 100;
              downloadsByVersionRD[versionsDesc[i]] = deltaCount;
              downloadsByVersionRDP[versionsDesc[i]] = deltaPercent;
            }
            downloadsByVersionRD[versionsDesc[versionsDesc.length - 1]] = 0;
            downloadsByVersionRDP[versionsDesc[versionsDesc.length - 1]] = 0;

            return _context.abrupt('return', {
              total: downloadsTotal,
              platforms_r: downloadsByPlatform,
              versions: downloadsByVersion,
              versions_r: downloadsByVersionR,
              versions_rd: downloadsByVersionRD,
              versions_rdp: downloadsByVersionRDP,
              files: downloadsByFile
            });

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function get() {
    return _ref.apply(this, arguments);
  };
}();

var _github = require('../components/github');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  get: get
};