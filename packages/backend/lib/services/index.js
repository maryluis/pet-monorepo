"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "assignedWish", {
  enumerable: true,
  get: function get() {
    return _wishService.assignedWish;
  }
});
Object.defineProperty(exports, "cancelFromWish", {
  enumerable: true,
  get: function get() {
    return _wishService.cancelFromWish;
  }
});
Object.defineProperty(exports, "createUserService", {
  enumerable: true,
  get: function get() {
    return _userService.createUserService;
  }
});
Object.defineProperty(exports, "createWish", {
  enumerable: true,
  get: function get() {
    return _wishService.createWish;
  }
});
Object.defineProperty(exports, "followUserService", {
  enumerable: true,
  get: function get() {
    return _followerService.followUserService;
  }
});
Object.defineProperty(exports, "getProfileService", {
  enumerable: true,
  get: function get() {
    return _userService.getProfileService;
  }
});
Object.defineProperty(exports, "getUserCommonInfo", {
  enumerable: true,
  get: function get() {
    return _userService.getUserCommonInfo;
  }
});
Object.defineProperty(exports, "getUsersByPartialSearch", {
  enumerable: true,
  get: function get() {
    return _userService.getUsersByPartialSearch;
  }
});
Object.defineProperty(exports, "getWishes", {
  enumerable: true,
  get: function get() {
    return _wishService.getWishes;
  }
});
Object.defineProperty(exports, "loginService", {
  enumerable: true,
  get: function get() {
    return _userService.loginService;
  }
});
Object.defineProperty(exports, "unFollowUserService", {
  enumerable: true,
  get: function get() {
    return _followerService.unFollowUserService;
  }
});
var _userService = require("./user-service");
var _wishService = require("./wish-service");
var _followerService = require("./follower-service");