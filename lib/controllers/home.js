'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var latestRelease;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _github.getLatestRelease)();

          case 2:
            latestRelease = _context.sent;

            res.json({
              status: 'online',
              user: _config2.default.user,
              repo: _config2.default.repo,
              generatedAt: new Date(),
              latest: {
                id: latestRelease.id,
                name: latestRelease.name,
                tag_name: latestRelease.tag_name,
                published_at: latestRelease.published_at,
                body: latestRelease.body,
                assets: latestRelease.assets.map(function (asset) {
                  return {
                    id: asset.id,
                    name: asset.name,
                    content_type: asset.content_type,
                    browser_download_url: asset.browser_download_url
                  };
                })
              }
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _github = require('../components/github');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }