import * as appointmentRepo from '../repositories/appointmentRepository.js';
import * as serviceRepo from '../repositories/serviceRepository.js';
import * as doctorRepo from '../repositories/doctorRepository.js';

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export async function createAppointment(data) {
  if (data.serviceId) {
    const service = await serviceRepo.findById(data.serviceId);
    if (!service) {
      const err = new Error('Dịch vụ không tồn tại');
      err.status = 400;
      throw err;
    }
    data.estimatedRevenue = data.estimatedRevenue || service.price_from;
  }

  if (data.doctorId) {
    const doctor = await doctorRepo.findById(data.doctorId);
    if (!doctor) {
      const err = new Error('Bác sĩ không tồn tại');
      err.status = 400;
      throw err;
    }
  }

  return appointmentRepo.create(data);
}

export async function listAppointments(filters) {
  return appointmentRepo.findAll(filters);
}

export async function updateAppointmentStatus(id, status, estimatedRevenue) {
  if (!VALID_STATUSES.includes(status)) {
    const err = new Error('Trạng thái không hợp lệ');
    err.status = 400;
    throw err;
  }

  const updated = await appointmentRepo.updateStatus(id, status, estimatedRevenue);
  if (!updated) {
    const err = new Error('Lịch hẹn không tồn tại');
    err.status = 404;
    throw err;
  }
  return updated;
}

export async function getDashboardData() {
  const [summary, monthlyStats, statusCounts] = await Promise.all([
    appointmentRepo.getDashboardSummary(),
    appointmentRepo.getMonthlyStats(6),
    appointmentRepo.getStatusCounts(),
  ]);

  return { summary, monthlyStats, statusCounts };
}
