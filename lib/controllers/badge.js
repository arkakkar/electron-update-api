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
    var type, allStats, count, link;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = req.params.type;

            if (['downloads'].indexOf(type) !== -1) {
              _context.next = 3;
              break;
            }

            throw new _BadRequestError2.default('Invalid type \'' + type + '\'.');

          case 3:
            _context.next = 5;
            return _stats2.default.get();

          case 5:
            allStats = _context.sent;
            count = (0, _numeral2.default)(_config2.default.downloadsCountOffset + allStats.platforms_r.all).format('0.0a');
            link = 'https://img.shields.io/badge/downloads-' + count + '-brightgreen.svg';


            (0, _request2.default)(link).pipe(res);

          case 9:
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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _BadRequestError = require('../errors/BadRequestError');

var _BadRequestError2 = _interopRequireDefault(_BadRequestError);

var _stats = require('../components/stats');

var _stats2 = _interopRequireDefault(_stats);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }