import { Router } from 'express';
import {
  createUser,
  login,
  getProfile,
  getUsersBySearch,
  getUserCommonInfoByNickname,
  getTokenStatus,
} from '@/controllers';
import { authMiddleware, optionalAuthMiddleware } from '@/middlewares';
import API_URLS from '@shared/api-urls';

const router = Router();

/**
* @swagger
* /auth/create:
*   post:
*     summary: Create a user
*     tags:
*       - Auth
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nickname:
*                 type: string
*               password:
*                 type: string
*               confirmPassword:
*                 type: string
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message:
*                  type: string
*                  example: "User created successfully"
*                user:
*                   type: object
*                   properties:
*                     nickname:
*                       type: string
*                     id:
*                       type: string
*                       example: "8e835855-60f2-4d2f-867b-88ae44c1a699"
*/
router.post(`${API_URLS.createUser}`, createUser);

/**
* @swagger
* /auth/login:
*   post:
*     summary: Login
*     tags:
*       - Auth
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nickname:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message:
*                  type: string
*                  example: "Success"
*                token:
*                   type: string
*                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlODM1ODU1LTYwZjEtNGQyZi04NjdiLTg4YWU0NGMxYTY5OSIsImlhdCI6MTczNjg1NTc4NiwiZXhwIjoxNzM2ODU5Mzg2fQ._mpOk4olEQSU0rsnXheUjAgeaeL4yRzUEAQ_Kgr8kxI"
*/
router.post(API_URLS.login, login);

// TODO change when will work on profile page
/**
* @swagger
* /users/profile:
*   get:
*     tags:
*       - Users
*     security:
*      - BearerAuth: []
*     responses:
*       200:
*         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "8e835855-60f1-4d2f-867b-88ae44c1a699"
 *                 nickname:
 *                   type: string
 *                   description: "User's nickname"
 *                 myWishes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "432594b0-46ff-4903-8d98-42171406e4d7"
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       isAssigned:
 *                         type: boolean
 *                       isReceived:
 *                         type: boolean
 *                 isAssignedWishes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "6059a7b6-b112-447c-95bb-c15af798de02"
 *                       title:
 *                         type: string
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
 *                       nickname:
 *                         type: string
*/
router.get(API_URLS.profile, authMiddleware, getProfile);


/**
* @swagger
* /users:
*   get:
*     summary: Search user
*     tags:
*       - Users
*     parameters:
*       - name: pageNumber
*         in: query
*         required: true
*         schema:
*           type: string
*           example: '1'
*       - name: search
*         in: query
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 users:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: string
*                         format: uuid
*                         example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                       nickname:
*                         type: string
*                 hasMore:
*                   type: boolean
*/
router.get(API_URLS.users, optionalAuthMiddleware, getUsersBySearch);

/**
* @swagger
* /auth/check:
*   get:
*     tags:
*       - Auth
*     security:
*      - BearerAuth: []
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: string
*               format: uuid,
*               example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*/
router.get(API_URLS.authCheck, authMiddleware, getTokenStatus);

/**
* @swagger
* /users/{nickname}:
*   get:
*     summary: Get user by nickname
*     tags:
*       - Users
*     parameters:
*       - name: nickname
*         in: path
*         required: true
*         description: The nickname of the user to fetch
*         schema:
*           type: string
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string,
*                   format: uuid,
*                   example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                 nickname:
*                   type: string
*                 followersCount:
*                   type: number
*                 subscribersCount:
*                   type: number
*                 amISubscribed:
*                   type: boolean
*                 wishes:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: string,
*                         format: uuid,
*                         example: "caae8c3f-8400-4684-9d1b-b9d4e4ee6d7e"
*                       title:
*                         type: string
*                       description:
*                         type: string
*                       isAssigned:
*                         type: boolean
*                       isReceived:
*                         type: boolean
*/
router.get(`${API_URLS.users}/:nickname`, optionalAuthMiddleware, getUserCommonInfoByNickname);

export default router;
