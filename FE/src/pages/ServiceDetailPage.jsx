import { ArrowLeft, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ImageWithBlur from '../components/common/ImageWithBlur';
import { getServiceBySlug, SERVICE_CATALOG } from '../constants/services';
import { CONTACT } from '../constants/contact';
import { useUiPreferences } from '../context/UiPreferencesContext';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const { t } = useUiPreferences();

  if (!service) return <Navigate to="/dich-vu" replace />;

  const related = SERVICE_CATALOG.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <section className="bg-[linear-gradient(180deg,#eef9ff_0%,#ffffff_52%,#f8fcff_100%)] py-12 dark:bg-[linear-gradient(180deg,#061827_0%,#0a2238_52%,#071827_100%)] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/dich-vu" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-primary">
          <ArrowLeft className="h-4 w-4" />
          {t('services.allServices')}
        </Link>

        <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <article className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_26px_80px_rgba(6,120,201,0.14)] dark:border-sky-300/15 dark:bg-[#0d2237]">
            <ImageWithBlur
              src={service.image}
              alt={service.name}
              className="h-[360px] w-full lg:h-[620px]"
              imageClassName="object-center"
              loading="eager"
            />
          </article>

          <aside className="flex flex-col justify-between rounded-lg border border-sky-100 bg-white p-6 shadow-[0_22px_64px_rgba(6,120,201,0.1)] dark:border-sky-300/15 dark:bg-[#0d2237] lg:p-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">{t('services.eyebrow')}</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-ink dark:text-white lg:text-6xl">{service.name}</h1>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{service.intro}</p>

              <div className="mt-7 grid gap-3">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-lg bg-accent p-4 dark:bg-white/10">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-bold text-ink dark:text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                to="/dat-lich"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                {t('common.bookNow')}
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center rounded-lg border border-sky-200 bg-white px-5 py-3.5 text-sm font-black text-primary transition-all hover:-translate-y-0.5 hover:bg-accent dark:border-sky-300/15 dark:bg-white/5 dark:text-primary-light dark:hover:bg-white/10"
              >
                {CONTACT.phone}
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-lg border border-sky-100 bg-white p-6 shadow-sm dark:border-sky-300/15 dark:bg-[#0d2237]">
            <h2 className="text-2xl font-black text-ink dark:text-white">{t('services.process')}</h2>
            <div className="mt-5 space-y-3">
              {service.process.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/dich-vu/${item.slug}`}
                className="group overflow-hidden rounded-lg border border-sky-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(6,120,201,0.12)] dark:border-sky-300/15 dark:bg-[#0d2237]"
              >
                <ImageWithBlur
                  src={item.image}
                  alt={item.name}
                  className="h-36 w-full"
                  imageClassName="object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-4">
                  <p className="text-sm font-black text-ink dark:text-white">{item.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-300">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
