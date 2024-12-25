import { Router } from 'express';
import { createWishController } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import API_URLS from '../../../api-urls';

const router = Router();

router.post(API_URLS.createWish, authenticateToken, createWishController);

export default router as wishRoutes;
