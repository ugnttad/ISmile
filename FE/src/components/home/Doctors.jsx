import { useEffect, useMemo, useState } from 'react';
import { Award, BadgeCheck, CalendarCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { ACTIVE_DOCTOR_PROFILES } from '../../constants/clinicData';
import { DOCTOR_IMAGES } from '../../constants/images';
import { useUiPreferences } from '../../context/UiPreferencesContext';
import ImageWithBlur from '../common/ImageWithBlur';

const ACTIVE_DOCTORS = ['le nhi', 'anh dung'];

function normalizeText(value) {
  return `${value || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
}

function isVisibleDoctor(doctor) {
  const name = normalizeText(doctor.full_name);
  return ACTIVE_DOCTORS.some((keyword) => name.includes(keyword));
}

function getDoctorImage(doctor) {
  const key = normalizeText(`${doctor.full_name || ''} ${doctor.title || ''}`);

  if (key.includes('nhi')) return DOCTOR_IMAGES.leNhi;
  if (key.includes('dung')) return DOCTOR_IMAGES.anhDung;

  return doctor.image_url || DOCTOR_IMAGES.anhDung;
}

function doctorIdentity(doctor) {
  return normalizeText(doctor.full_name).replace(/^bs\.\s*/, '').trim();
}

export default function Doctors() {
  const [doctors, setDoctors] = useState(ACTIVE_DOCTOR_PROFILES);
  const [loading, setLoading] = useState(true);
  const { t } = useUiPreferences();

  useEffect(() => {
    api.getDoctors()
      .then((res) => {
        const apiDoctors = Array.isArray(res.data) ? res.data.filter(isVisibleDoctor) : [];
        setDoctors(apiDoctors.length ? apiDoctors : ACTIVE_DOCTOR_PROFILES);
      })
      .catch(() => setDoctors(ACTIVE_DOCTOR_PROFILES))
      .finally(() => setLoading(false));
  }, []);

  const visibleDoctors = useMemo(() => {
    const merged = [...doctors];

    ACTIVE_DOCTOR_PROFILES.forEach((fallbackDoctor) => {
      const fallbackName = doctorIdentity(fallbackDoctor);
      if (!merged.some((doctor) => doctorIdentity(doctor).includes(fallbackName))) {
        merged.push(fallbackDoctor);
      }
    });

    return merged.filter(isVisibleDoctor).slice(0, 2);
  }, [doctors]);

  return (
    <section id="bac-si" className="bg-primary-dark py-16 text-white dark:bg-[#061827] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary-light">
              <BadgeCheck className="h-4 w-4" />
              {t('doctors.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-black leading-tight lg:text-5xl">
              {t('doctors.title')}
            </h2>
          </div>
          <p className="text-sm leading-7 text-white/75 lg:text-base">{t('doctors.desc')}</p>
        </div>

        {loading && visibleDoctors.length === 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="h-[640px] animate-pulse rounded-lg bg-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {visibleDoctors.map((doctor, index) => (
              <article
                key={doctor.id || doctor.full_name}
                className="doctor-card group overflow-hidden rounded-lg bg-white text-slate-800 shadow-[0_26px_80px_rgba(0,0,0,0.22)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.012] hover:shadow-[0_34px_96px_rgba(0,0,0,0.28)] dark:bg-[#0d2237] dark:text-slate-100"
              >
                <div className="grid min-h-[640px] lg:grid-cols-[0.92fr_1.08fr]">
                  <ImageWithBlur
                    src={getDoctorImage(doctor)}
                    alt={doctor.full_name}
                    className="h-[440px] lg:h-full"
                    imageClassName="object-top transition-transform duration-700 group-hover:scale-[1.055]"
                  />

                  <div className="flex min-h-[360px] flex-col justify-between p-6 lg:p-8">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                          {index === 0 ? t('doctors.spotlight') : t('doctors.eyebrow')}
                        </p>
                        <Sparkles className="h-5 w-5 text-gold" />
                      </div>
                      <h3 className="mt-4 text-3xl font-black leading-tight text-ink dark:text-white">
                        {doctor.full_name}
                      </h3>
                      <p className="mt-2 text-base font-black text-primary dark:text-primary-light">{doctor.title}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
                        {doctor.specialty}
                      </p>
                    </div>

                    <div className="mt-7 space-y-4">
                      {doctor.experience_years > 0 && (
                        <div className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-black text-primary dark:bg-white/10 dark:text-primary-light">
                          <Award className="h-4 w-4" />
                          {doctor.experience_years} {t('doctors.experience')}
                        </div>
                      )}
                      <Link
                        to="/dat-lich"
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                      >
                        <CalendarCheck className="h-5 w-5" />
                        {index === 0 ? t('doctors.bookWith') : t('doctors.choose')}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
