import { Router } from 'express';
import { createUser, login, getProfile } from '../controllers';
import { authenticateToken } from '../middlewares';
import API_URLS from '../../../api-urls';

const router = Router();

router.post(API_URLS.createUser, createUser);
router.post(API_URLS.login, login);
router.get(API_URLS.profile, authenticateToken, getProfile);

export default router as userRoutes;
