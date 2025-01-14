import { Router } from 'express';
import { createWishController } from '@/controllers';
import { authMiddleware } from '@/middlewares';
import API_URLS from '@shared/api-urls';

const router = Router();

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
*                 nullable: true #
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
*                     title:
*                       type: string
*                     description:
*                       type: string
*/
router.post(API_URLS.createWish, authMiddleware, createWishController);

export default router;
