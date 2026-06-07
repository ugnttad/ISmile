import { useCallback, useEffect, useState } from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import { api } from '../../api/client';

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  confirmed: 'bg-primary-light text-primary-dark ring-primary/20',
  completed: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  cancelled: 'bg-red-100 text-red-800 ring-red-200',
};

const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchAppointments = useCallback(async () => {
    await Promise.resolve();
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (status) params.status = status;
      const res = await api.getAppointments(params);
      setAppointments(res.data.data);
      setTotal(res.data.total);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchAppointments();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAppointments]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      await api.updateAppointmentStatus(id, { status: newStatus });
      await fetchAppointments();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const totalPages = Math.ceil(total / 15) || 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-primary/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Lịch hẹn</p>
          <h1 className="mt-2 text-3xl font-black text-ink">Quản lý lịch hẹn</h1>
          <p className="mt-1 text-sm text-slate-500">{total} lịch hẹn</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={fetchAppointments}
            className="rounded-lg border border-slate-200 bg-white p-2.5 transition-colors hover:border-primary/30 hover:bg-accent"
            aria-label="Làm mới"
          >
            <RefreshCw className={`h-4 w-4 text-primary ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-accent text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-black">Bệnh nhân</th>
                <th className="px-4 py-3 font-black">Liên hệ</th>
                <th className="px-4 py-3 font-black">Dịch vụ</th>
                <th className="px-4 py-3 font-black">Bác sĩ</th>
                <th className="px-4 py-3 font-black">Ngày giờ</th>
                <th className="px-4 py-3 font-black">Trạng thái</th>
                <th className="px-4 py-3 font-black">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center font-semibold text-slate-400">Đang tải...</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center font-semibold text-slate-400">Không có lịch hẹn</td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="transition-colors hover:bg-accent/55">
                    <td className="px-4 py-3 font-black text-ink">{appt.patient_name}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="font-semibold">{appt.phone}</div>
                      {appt.email && <div className="text-xs text-slate-400">{appt.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{appt.service_name || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{appt.doctor_name || '—'}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {formatDate(appt.appointment_date)} {formatTime(appt.appointment_time)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-black ring-1 ${STATUS_STYLES[appt.status]}`}>
                        {STATUS_LABELS[appt.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={appt.status}
                        disabled={updating === appt.id}
                        onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold outline-none transition-all focus:border-primary disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.filter((o) => o.value).map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-accent hover:text-primary disabled:opacity-40"
            >
              Trước
            </button>
            <span className="text-sm font-semibold text-slate-500">Trang {page} / {totalPages}</span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-accent hover:text-primary disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
