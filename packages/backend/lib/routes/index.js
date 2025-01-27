"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "followerRouters", {
  enumerable: true,
  get: function get() {
    return _followerRoutes["default"];
  }
});
Object.defineProperty(exports, "userRoutes", {
  enumerable: true,
  get: function get() {
    return _userRoutes["default"];
  }
});
Object.defineProperty(exports, "wishRoutes", {
  enumerable: true,
  get: function get() {
    return _wishRoutes["default"];
  }
});
var _userRoutes = _interopRequireDefault(require("./user-routes"));
var _wishRoutes = _interopRequireDefault(require("./wish-routes"));
var _followerRoutes = _interopRequireDefault(require("./follower-routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }