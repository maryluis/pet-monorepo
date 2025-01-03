import { Router } from 'express';
import { createWishController } from '@/controllers';
import { authMiddleware } from '@/middlewares';
import API_URLS from '@shared/api-urls';

const router = Router();

router.post(API_URLS.createWish, authMiddleware, createWishController);

export default router;
