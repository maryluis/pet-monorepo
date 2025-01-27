"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
var _apiUrls = _interopRequireDefault(require("../common/api-urls"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

/**
* @swagger
* /followers:
*   post:
*     summary: Follow a user
*     tags:
*       - Followers
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               followedId:
*                 type: string
*                 description: ID of the user to follow
*                 example: "8e835855-60f2-4d2f-867b-88ae44c1a699"
*     responses:
*       200:
*         description: You are followed
*       403:
*         description: Access denied
*       401:
*         description: Invalid token
*       404:
*         description: Not found
*       500:
*         description: Internal server error
*/
router.post(_apiUrls["default"].followers, _middlewares.authMiddleware, _controllers.followUserController);

/**
* @swagger
* /followers:
*   delete:
*     summary: Undo a following a user
*     tags:
*       - Followers
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               followedId:
*                 type: string
*                 description: ID of the user to follow
*                 example: "8e835855-60f2-4d2f-867b-88ae44c1a699"
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message:
*                  type: string
*                  example: "unfollowed"
*/
router["delete"](_apiUrls["default"].followers, _middlewares.authMiddleware, _controllers.unFollowUserController);
var _default = exports["default"] = router;