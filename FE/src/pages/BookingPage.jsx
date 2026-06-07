import { CalendarCheck, Clock, MapPin, PhoneCall, ShieldCheck } from 'lucide-react';
import BookingForm from '../components/booking/BookingForm';
import { CLINIC_IMAGES } from '../constants/images';
import { CONTACT } from '../constants/contact';
import { useUiPreferences } from '../context/UiPreferencesContext';
import ImageWithBlur from '../components/common/ImageWithBlur';

export default function BookingPage() {
  const { t } = useUiPreferences();
  const steps = t('bookingPage.steps');

  return (
    <section className="min-h-[70vh] bg-[linear-gradient(180deg,#eef9ff_0%,#f8fcff_50%,#ffffff_100%)] py-12 dark:bg-[linear-gradient(180deg,#061827_0%,#0a2238_50%,#071827_100%)] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
          <div className="space-y-5 lg:col-span-2">
            <div className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_22px_64px_rgba(6,120,201,0.12)] dark:border-sky-300/15 dark:bg-[#0d2237]">
              <ImageWithBlur
                src={CLINIC_IMAGES.reception}
                alt="Nha Khoa iSmile"
                className="h-64 w-full"
                imageClassName="object-center"
              />
              <div className="p-6">
                <span className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-primary dark:bg-white/10 dark:text-primary-light">
                  <CalendarCheck className="h-4 w-4" />
                  {t('bookingPage.badge')}
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight text-ink dark:text-white lg:text-5xl">
                  {t('bookingPage.title')}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
                  {t('bookingPage.desc')}
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-lg border border-sky-100 bg-white p-4 shadow-sm dark:border-sky-300/15 dark:bg-[#0d2237]">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-ink dark:text-white">{step}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 rounded-lg border border-primary/10 bg-white p-4 shadow-sm transition-colors hover:border-primary/30 dark:border-sky-300/15 dark:bg-[#0d2237]">
                <PhoneCall className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-300">{t('common.hotline')}</p>
                  <p className="text-sm font-black text-ink dark:text-white">{CONTACT.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-primary/10 bg-white p-4 shadow-sm dark:border-sky-300/15 dark:bg-[#0d2237]">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-300">{t('common.openingHours')}</p>
                  <p className="text-sm font-black text-ink dark:text-white">{CONTACT.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-primary/10 bg-white p-4 shadow-sm dark:border-sky-300/15 dark:bg-[#0d2237]">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-300">{t('common.address')}</p>
                  <p className="text-sm font-black text-ink dark:text-white">{CONTACT.address}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-lagoon/20 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm dark:border-cyan-300/20 dark:bg-[#0d2237] dark:text-slate-300">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-lagoon" />
              {t('bookingPage.privacy')}
            </div>
          </div>

          <div className="lg:col-span-3">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
