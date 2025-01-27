"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constants = require("../common/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  var _req$header;
  var token = (_req$header = req.header('Authorization')) === null || _req$header === void 0 ? void 0 : _req$header.replace('Bearer ', '');
  if (!token) {
    res.status(_constants.errorCodes.accessDenied).json({
      message: 'Access denied'
    });
  }
  var SECRET_KEY = process.env.SECRET_KEY;
  _jsonwebtoken["default"].verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(_constants.errorCodes.invalidToken).json({
        message: 'Invalid token',
        code: _constants.errorCodes.invalidToken
      });
    } else {
      req.id = decoded.id;
      next();
    }
  });
};
var optionalAuthMiddleware = exports.optionalAuthMiddleware = function optionalAuthMiddleware(req, res, next) {
  if (req.header('Authorization')) {
    var _req$header2;
    var token = (_req$header2 = req.header('Authorization')) === null || _req$header2 === void 0 ? void 0 : _req$header2.replace('Bearer ', '');
    var SECRET_KEY = process.env.SECRET_KEY;
    _jsonwebtoken["default"].verify(token, SECRET_KEY, function (err, decoded) {
      if (decoded !== null && decoded !== void 0 && decoded.id) {
        req.id = decoded.id;
      }
    });
  }
  next();
};