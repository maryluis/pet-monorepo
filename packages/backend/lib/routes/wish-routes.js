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
* /wishes:
*   post:
*     summary: Create a wish
*     tags:
*       - Wishes
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               description:
*                 type: string
*                 nullable: true
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message:
*                  type: string
*                  example: "Wish created successfully"
*                wish:
*                   type: object
*                   properties:
*                     authorId:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                     executorId:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                       nullable: true
*                     id:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                     isAssigned:
*                       type: boolean
*                     isReceived:
*                       type: boolean
*                     title:
*                       type: string
*                     description:
*                       type: string
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2025-01-20T21:00:45.947Z"
*                     updatedAt:
*                       type: string
*                       format: date-time
*                       example: "2025-01-20T21:00:45.947Z"
*/
router.post(_apiUrls["default"].createWish, _middlewares.authMiddleware, _controllers.createWishController);

/**
* @swagger
* /wishes/assign:
*   put:
*     summary: Assign wish
*     tags:
*       - Wishes
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               wishId:
*                 type: string
*                 format: uuid
*                 example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                wish:
*                   type: object
*                   properties:
*                     authorId:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                     executorId:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                       nullable: true
*                     id:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                     isAssigned:
*                       type: boolean
*                     isReceived:
*                       type: boolean
*                     title:
*                       type: string
*                     description:
*                       type: string
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2025-01-20T21:00:45.947Z"
*                     updatedAt:
*                       type: string
*                       format: date-time
*                       example: "2025-01-20T21:00:45.947Z"
*/
router.put(_apiUrls["default"].assignWish, _middlewares.authMiddleware, _controllers.assignedWishController);

/**
* @swagger
* /wishes/cancel:
*   put:
*     summary: Cancel assign wish
*     tags:
*       - Wishes
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               wishId:
*                 type: string
*                 format: uuid
*                 example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                wish:
*                   type: object
*                   properties:
*                     authorId:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                     executorId:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                       nullable: true
*                     id:
*                       type: string
*                       format: uuid
*                       example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                     isAssigned:
*                       type: boolean
*                     isReceived:
*                       type: boolean
*                     title:
*                       type: string
*                     description:
*                       type: string
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2025-01-20T21:00:45.947Z"
*                     updatedAt:
*                       type: string
*                       format: date-time
*                       example: "2025-01-20T21:00:45.947Z"
*/
router.put(_apiUrls["default"].cancelAssignWish, _middlewares.authMiddleware, _controllers.cancelWishController);

/**
* @swagger
* /wishes:
*   get:
*     summary: Get wishes by author
*     tags:
*       - Wishes
*     parameters:
*     - name: pageNumber
*       in: query
*       schema:
*         type: string
*         example: '1'
*     - name: authorId
*       in: query
*       required: true
*       schema:
*         type: string
*         format: uuid
*         example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*     - name: executorId
*       in: query
*       schema:
*         type: string
*         format: uuid
*         example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                hasMore:
*                  type: boolean
*                wishes:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      authorId:
*                        type: string
*                        format: uuid
*                        example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                      executorId:
*                        type: string
*                        format: uuid
*                        example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                        nullable: true
*                      id:
*                        type: string
*                        format: uuid
*                        example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                      isAssigned:
*                        type: boolean
*                      isReceived:
*                        type: boolean
*                      title:
*                        type: string
*                      description:
*                        type: string
*                      createdAt:
*                        type: string
*                        format: date-time
*                        example: "2025-01-20T21:00:45.947Z"
*                      updatedAt:
*                        type: string
*                        format: date-time
*                        example: "2025-01-20T21:00:45.947Z"
*/
router.get(_apiUrls["default"].wishes, _controllers.getWishesController);
var _default = exports["default"] = router;