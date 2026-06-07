import * as appointmentService from '../services/appointmentService.js';

export async function create(req, res, next) {
  try {
    const appointment = await appointmentService.createAppointment(req.validated);
    res.status(201).json({ success: true, data: appointment, message: 'Đặt lịch thành công!' });
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const result = await appointmentService.listAppointments(req.validated);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, estimatedRevenue } = req.validated;
    const updated = await appointmentService.updateAppointmentStatus(id, status, estimatedRevenue);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function dashboard(req, res, next) {
  try {
    const data = await appointmentService.getDashboardData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
