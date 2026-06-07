import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import {
  createAppointmentSchema,
  listAppointmentsSchema,
  updateStatusSchema,
} from '../validators/appointmentValidators.js';
import * as appointmentController from '../controllers/appointmentController.js';

const router = Router();

router.get('/dashboard/stats', authenticate, appointmentController.dashboard);
router.post('/', validate(createAppointmentSchema), appointmentController.create);
router.get('/', authenticate, validate(listAppointmentsSchema, 'query'), appointmentController.list);
router.patch('/:id/status', authenticate, validate(updateStatusSchema), appointmentController.updateStatus);

export default router;
