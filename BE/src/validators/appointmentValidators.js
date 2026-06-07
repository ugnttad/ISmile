import { z } from 'zod';

export const createAppointmentSchema = z.object({
  patientName: z.string().min(2, 'Họ tên tối thiểu 2 ký tự').max(255),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  serviceId: z.string().uuid('Dịch vụ không hợp lệ').optional().nullable(),
  doctorId: z.string().uuid('Bác sĩ không hợp lệ').optional().nullable(),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày không hợp lệ'),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Giờ không hợp lệ'),
  note: z.string().max(1000).optional(),
});

export const listAppointmentsSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  estimatedRevenue: z.coerce.number().int().min(0).optional(),
});
