import { Router } from 'express';
import { createUser, login, getProfile, getUsersBySearch } from '@/controllers';
import { authMiddleware, optionalAuthMiddleware } from '@/middlewares';
import API_URLS from '@shared/api-urls';

const router = Router();

router.post(API_URLS.createUser, createUser);
router.post(API_URLS.login, login);
router.get(API_URLS.profile, authMiddleware, getProfile);
router.get(API_URLS.users, optionalAuthMiddleware, getUsersBySearch);

export default router;
