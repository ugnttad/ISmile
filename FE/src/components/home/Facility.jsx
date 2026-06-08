import { Building2, ShieldCheck, Sparkles, SunMedium } from 'lucide-react';
import { CLINIC_IMAGES } from '../../constants/images';
import { useUiPreferences } from '../../context/UiPreferencesContext';
import ImageWithBlur from '../common/ImageWithBlur';

const facilityIcons = [ShieldCheck, Sparkles, Building2];

export default function Facility() {
  const { t } = useUiPreferences();
  const facilityCopy = Array.isArray(t('facility.cards')) ? t('facility.cards') : [];
  const facilities = [
    { icon: facilityIcons[0], image: CLINIC_IMAGES.treatmentRoom, ...facilityCopy[0] },
    { icon: facilityIcons[1], image: CLINIC_IMAGES.reception, ...facilityCopy[1] },
    { icon: facilityIcons[2], image: CLINIC_IMAGES.rose, ...facilityCopy[2] },
  ];
  const [main, ...rest] = facilities;

  return (
    <section id="co-so" className="bg-white py-16 dark:bg-[#071827] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
              <SunMedium className="h-4 w-4" />
              {t('facility.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-black leading-tight text-ink dark:text-white lg:text-5xl">
              {t('facility.title')}
            </h2>
          </div>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
            {t('facility.desc')}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <article className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_24px_70px_rgba(6,120,201,0.12)] dark:border-sky-300/15 dark:bg-[#0d2237] lg:col-span-8">
            <ImageWithBlur
              src={main.image}
              alt={main.title}
              className="h-[420px] w-full lg:h-[560px]"
            />
            <div className="grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-primary dark:bg-white/10 dark:text-primary-light">
                <main.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-ink dark:text-white">{main.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{main.desc}</p>
              </div>
            </div>
          </article>

          <div className="grid gap-5 lg:col-span-4">
            {rest.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_16px_42px_rgba(6,120,201,0.08)] dark:border-sky-300/15 dark:bg-[#0d2237]">
                  <ImageWithBlur
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full"
                  />
                  <div className="p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary dark:bg-white/10 dark:text-primary-light">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-black text-ink dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-sky-100 bg-white p-2 shadow-[0_22px_64px_rgba(6,120,201,0.1)] dark:border-sky-300/15 dark:bg-[#0d2237]">
            <ImageWithBlur
              src={CLINIC_IMAGES.treatmentRoom}
              alt={t('facility.lobbyAlt')}
              className="h-72 w-full rounded-md lg:h-[440px]"
              imageClassName="object-center"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="overflow-hidden rounded-lg border border-sky-100 bg-white p-2 shadow-[0_18px_48px_rgba(6,120,201,0.1)] dark:border-sky-300/15 dark:bg-[#0d2237]">
              <ImageWithBlur
                src={CLINIC_IMAGES.reception}
                alt={facilityCopy[1].title}
                className="h-52 w-full rounded-md"
                imageClassName="object-center"
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-sky-100 bg-white p-2 shadow-[0_18px_48px_rgba(6,120,201,0.1)] dark:border-sky-300/15 dark:bg-[#0d2237]">
              <ImageWithBlur
                src={CLINIC_IMAGES.rose}
                alt={facilityCopy[2].title}
                className="h-52 w-full rounded-md"
                imageClassName="object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
