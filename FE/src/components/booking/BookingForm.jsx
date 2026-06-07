import { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Stethoscope,
  User,
} from 'lucide-react';
import { api } from '../../api/client';
import { useUiPreferences } from '../../context/UiPreferencesContext';

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

const inputBase = 'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-sky-300/15 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500';
const inputWithIcon = 'w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-sky-300/15 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500';
const activeDoctorNames = ['lê nhi', 'le nhi', 'anh dũng', 'anh dung'];

function isVisibleDoctor(doctor) {
  const name = `${doctor.full_name || ''}`.toLowerCase();
  return activeDoctorNames.some((keyword) => name.includes(keyword));
}

export default function BookingForm() {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useUiPreferences();
  const [form, setForm] = useState({
    patientName: '',
    phone: '',
    email: '',
    serviceId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '09:00',
    note: '',
  });

  useEffect(() => {
    Promise.all([api.getServices(), api.getDoctors()])
      .then(([svcRes, docRes]) => {
        setServices(svcRes.data);
        setDoctors(docRes.data.filter(isVisibleDoctor));
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createAppointment({
        ...form,
        serviceId: form.serviceId || null,
        doctorId: form.doctorId || null,
        email: form.email || undefined,
      });
      setSuccess(true);
      setForm({
        patientName: '',
        phone: '',
        email: '',
        serviceId: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '09:00',
        note: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <div className="rounded-lg border border-primary/10 bg-white p-8 text-center shadow-[0_28px_80px_rgba(3,92,156,0.14)] dark:border-sky-300/15 dark:bg-[#0d2237] lg:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-400/15">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
        </div>
        <h3 className="mt-6 text-2xl font-black text-ink dark:text-white">{t('bookingForm.successTitle')}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          {t('bookingForm.successDesc')}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
        >
          {t('bookingForm.another')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-primary/10 bg-white p-5 shadow-[0_28px_80px_rgba(3,92,156,0.14)] dark:border-sky-300/15 dark:bg-[#0d2237] lg:p-8">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-sky-300/15">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{t('bookingForm.eyebrow')}</span>
          <h3 className="mt-2 text-2xl font-black text-ink dark:text-white">{t('bookingForm.title')}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{t('bookingForm.desc')}</p>
        </div>
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20 sm:flex">
          <Calendar className="h-6 w-6" />
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-300/20 dark:bg-red-500/10 dark:text-red-200">{error}</div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">{t('bookingForm.fullName')}</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              className={inputWithIcon}
              placeholder={t('bookingForm.namePlaceholder')}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">{t('bookingForm.phone')}</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              pattern="^(0|\+84)[0-9]{8,10}$"
              className={inputWithIcon}
              placeholder="0901234567"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputWithIcon}
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">{t('bookingForm.service')}</label>
          <div className="relative">
            <Stethoscope className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <select
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
              className={inputWithIcon}
            >
              <option value="">{t('bookingForm.servicePlaceholder')}</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">{t('bookingForm.doctor')}</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              className={inputWithIcon}
            >
              <option value="">{t('bookingForm.doctorPlaceholder')}</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.full_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">{t('bookingForm.date')}</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <input
              type="date"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={handleChange}
              required
              min={minDate}
              className={inputWithIcon}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Clock className="h-4 w-4 text-primary" />
            {t('bookingForm.time')}
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                type="button"
                aria-pressed={form.appointmentTime === time}
                onClick={() => setForm((p) => ({ ...p, appointmentTime: time }))}
                className={`h-11 rounded-lg border text-sm font-bold transition-all ${
                  form.appointmentTime === time
                    ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary/50 hover:bg-accent hover:text-primary dark:border-sky-300/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-primary-light'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">{t('bookingForm.note')}</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-primary" />
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={3}
              className={`${inputBase} pl-11 resize-none`}
              placeholder={t('bookingForm.notePlaceholder')}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:translate-y-0 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {loading ? t('bookingForm.sending') : t('bookingForm.submit')}
      </button>
    </form>
  );
}
