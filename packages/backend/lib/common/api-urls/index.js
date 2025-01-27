"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var authUrls = {
  authCheck: '/auth/check',
  createUser: '/auth/create',
  login: '/auth/login'
};
var followersUrls = {
  followers: '/followers'
};
var usersUrls = {
  profile: '/users/profile',
  users: '/users',
  usersSearch: function usersSearch(search, pageNumber) {
    return "/users?search=".concat(search, "&pageNumber=").concat(pageNumber);
  },
  userByNickname: function userByNickname(nickname) {
    return "/users/".concat(nickname);
  }
};
var wishesUrls = {
  assignWish: '/wishes/assign',
  cancelAssignWish: '/wishes/cancel',
  createWish: '/wishes',
  wishes: '/wishes',
  wishesList: function wishesList(authorId) {
    var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var executorId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var executorIdQuery = executorId ? "&executorId=".concat(executorId) : '';
    var pageNumberQuery = pageNumber ? "&pageNumber=".concat(pageNumber) : '&pageNumber=1';
    return "/wishes?authorId=".concat(authorId).concat(executorIdQuery).concat(pageNumberQuery);
  }
};
var API_URLS = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, authUrls), followersUrls), usersUrls), wishesUrls);
var _default = exports["default"] = Object.freeze(API_URLS);