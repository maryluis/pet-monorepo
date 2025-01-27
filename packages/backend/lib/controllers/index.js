"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "assignedWishController", {
  enumerable: true,
  get: function get() {
    return _wishController.assignedWishController;
  }
});
Object.defineProperty(exports, "cancelWishController", {
  enumerable: true,
  get: function get() {
    return _wishController.cancelWishController;
  }
});
Object.defineProperty(exports, "createUser", {
  enumerable: true,
  get: function get() {
    return _userController.createUser;
  }
});
Object.defineProperty(exports, "createWishController", {
  enumerable: true,
  get: function get() {
    return _wishController.createWishController;
  }
});
Object.defineProperty(exports, "followUserController", {
  enumerable: true,
  get: function get() {
    return _followerController.followUserController;
  }
});
Object.defineProperty(exports, "getProfile", {
  enumerable: true,
  get: function get() {
    return _userController.getProfile;
  }
});
Object.defineProperty(exports, "getTokenStatus", {
  enumerable: true,
  get: function get() {
    return _userController.getTokenStatus;
  }
});
Object.defineProperty(exports, "getUserCommonInfoByNickname", {
  enumerable: true,
  get: function get() {
    return _userController.getUserCommonInfoByNickname;
  }
});
Object.defineProperty(exports, "getUsersBySearch", {
  enumerable: true,
  get: function get() {
    return _userController.getUsersBySearch;
  }
});
Object.defineProperty(exports, "getWishesController", {
  enumerable: true,
  get: function get() {
    return _wishController.getWishesController;
  }
});
Object.defineProperty(exports, "login", {
  enumerable: true,
  get: function get() {
    return _userController.login;
  }
});
Object.defineProperty(exports, "unFollowUserController", {
  enumerable: true,
  get: function get() {
    return _followerController.unFollowUserController;
  }
});
var _userController = require("./user-controller");
var _wishController = require("./wish-controller");
var _followerController = require("./follower-controller");