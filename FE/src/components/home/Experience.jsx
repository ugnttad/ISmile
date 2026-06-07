import { CalendarCheck, CheckCircle2, Clock, MapPin, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../constants/contact';
import { CLINIC_IMAGES } from '../../constants/images';
import { useUiPreferences } from '../../context/UiPreferencesContext';
import ImageWithBlur from '../common/ImageWithBlur';

const stepIcons = [MessageCircle, CalendarCheck, CheckCircle2];

export default function Experience() {
  const { t } = useUiPreferences();
  const steps = t('experience.steps');

  return (
    <section className="bg-white py-16 dark:bg-[#071827] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-lg bg-primary p-6 text-white shadow-[0_24px_70px_rgba(6,120,201,0.18)] dark:bg-[#082f49] lg:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-bold text-primary-light ring-1 ring-white/20">
                <Sparkles className="h-4 w-4" />
                {t('experience.eyebrow')}
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight lg:text-5xl">
                {t('experience.title')}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 lg:text-base">
                {t('experience.desc')}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 rounded-lg bg-white p-4 text-primary-dark shadow-lg transition-transform hover:-translate-y-0.5 dark:bg-white/10 dark:text-white">
                <PhoneCall className="h-5 w-5 text-primary dark:text-primary-light" />
                <div>
                  <p className="text-xs font-black uppercase text-slate-400 dark:text-slate-300">{t('common.hotline')}</p>
                  <p className="text-sm font-black">{CONTACT.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 ring-1 ring-white/20">
                <Clock className="h-5 w-5 text-primary-light" />
                <div>
                  <p className="text-xs font-black uppercase text-white/60">{t('common.openingHours')}</p>
                  <p className="text-sm font-black text-white">{CONTACT.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 ring-1 ring-white/20">
                <MapPin className="h-5 w-5 text-primary-light" />
                <div>
                  <p className="text-xs font-black uppercase text-white/60">{t('common.address')}</p>
                  <p className="text-sm font-black text-white">{CONTACT.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_18px_52px_rgba(6,120,201,0.09)] dark:border-sky-300/15 dark:bg-[#0d2237] sm:col-span-2 lg:col-span-4">
              <ImageWithBlur
                src={CLINIC_IMAGES.videoPlaceholder}
                alt="Không gian nha khoa iSmile"
                className="h-80 w-full lg:h-full"
                imageClassName="object-center"
              />
            </div>

            <div className="grid gap-4 sm:col-span-1 lg:col-span-2">
              {steps.map(({ title, desc }, index) => {
                const Icon = stepIcons[index] || CheckCircle2;

                return (
                  <article key={title} className="rounded-lg border border-sky-100 bg-[#f8fcff] p-5 shadow-sm dark:border-sky-300/15 dark:bg-[#0d2237]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary shadow-sm dark:bg-white/10 dark:text-primary-light">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-black uppercase text-primary/50 dark:text-primary-light/60">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-black text-ink dark:text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
                  </article>
                );
              })}
            </div>

            <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_18px_52px_rgba(6,120,201,0.08)] dark:border-sky-300/15 dark:bg-[#0d2237] sm:col-span-3 lg:col-span-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{t('experience.quickAction')}</p>
                  <h3 className="mt-1 text-2xl font-black text-ink dark:text-white">{t('experience.quickTitle')}</h3>
                </div>
                <Link
                  to="/dat-lich"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                >
                  <CalendarCheck className="h-5 w-5" />
                  {t('common.chooseSchedule')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
