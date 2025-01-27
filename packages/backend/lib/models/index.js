"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Follower", {
  enumerable: true,
  get: function get() {
    return _follower["default"];
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "Wish", {
  enumerable: true,
  get: function get() {
    return _wish["default"];
  }
});
var _wish = _interopRequireDefault(require("./wish"));
var _user = _interopRequireDefault(require("./user"));
var _follower = _interopRequireDefault(require("./follower"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_user["default"].hasMany(_wish["default"], {
  foreignKey: 'authorId',
  as: 'myWishes'
});
_user["default"].hasMany(_wish["default"], {
  foreignKey: 'executorId',
  as: 'assignedWishes'
});
_user["default"].hasMany(_follower["default"], {
  foreignKey: 'followedId',
  as: 'followers'
});
_user["default"].hasMany(_follower["default"], {
  foreignKey: 'followerId',
  as: 'subscribers'
});
_follower["default"].belongsTo(_user["default"], {
  foreignKey: 'followerId',
  as: 'follower'
});
_follower["default"].belongsTo(_user["default"], {
  foreignKey: 'followedId',
  as: 'followed'
});
_wish["default"].belongsTo(_user["default"], {
  foreignKey: 'authorId',
  as: 'author'
});
_wish["default"].belongsTo(_user["default"], {
  foreignKey: 'executorId',
  as: 'executor'
});