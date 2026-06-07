import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import { loginSchema } from '../validators/authValidators.js';
import * as authController from '../controllers/authController.js';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.me);

export default router;
