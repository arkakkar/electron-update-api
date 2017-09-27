'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ManagedError2 = require('./ManagedError');

var _ManagedError3 = _interopRequireDefault(_ManagedError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFoundError = function (_ManagedError) {
  (0, _inherits3.default)(NotFoundError, _ManagedError);

  function NotFoundError() {
    (0, _classCallCheck3.default)(this, NotFoundError);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotFoundError).apply(this, arguments));
  }

  (0, _createClass3.default)(NotFoundError, [{
    key: 'express',
    value: function express(res) {
      res.status(404).json({
        error: this.message
      });
    }
  }]);
  return NotFoundError;
}(_ManagedError3.default);

exports.default = NotFoundError;