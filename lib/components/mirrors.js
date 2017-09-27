'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadMirror = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var downloadMirror = exports.downloadMirror = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url, platform, headers) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              var options = {
                url: url,
                qs: {
                  platform: platform
                },
                headers: headers
              };

              (0, _request2.default)(options, function (err, res) {
                if (err) {
                  reject(err);
                } else {
                  var json = null;

                  try {
                    json = JSON.parse(res.body);
                  } catch (ex) {
                    reject(ex);
                    json = null;
                  }

                  if (json) {
                    resolve(json);
                  }
                }
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function downloadMirror(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }