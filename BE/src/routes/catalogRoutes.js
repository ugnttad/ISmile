import { Router } from 'express';
import * as catalogController from '../controllers/catalogController.js';

const router = Router();

router.get('/services', catalogController.getServices);
router.get('/doctors', catalogController.getDoctors);

export default router;
