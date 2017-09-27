'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncHandler = asyncHandler;
exports.errorHandler1 = errorHandler1;
exports.errorHandler2 = errorHandler2;

var _ManagedError = require('../errors/ManagedError');

var _ManagedError2 = _interopRequireDefault(_ManagedError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncHandler(handler) {
  return function (req, res, next) {
    if (!handler) {
      next(new Error('Invalid handler ' + handler + ', it must be a function.'));
    } else {
      handler(req, res, next).catch(next);
    }
  };
}

// Handled errors
function errorHandler1(err, req, res, next) {
  if (err instanceof _ManagedError2.default) {
    err.express(res);
  } else {
    next(err);
  }
}

// Unexpected errors
function errorHandler2(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: err.message,
    sid: res.sentry
  });
}