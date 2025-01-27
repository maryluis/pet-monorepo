import { Router } from 'express';
import { followUserController, unFollowUserController } from '@/controllers';
import { authMiddleware } from '@/middlewares';
import API_URLS from '@shared/api-urls';

const router = Router();

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
router.post(API_URLS.followers, authMiddleware, followUserController);

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
router.delete(API_URLS.followers, authMiddleware, unFollowUserController);

export default router;
