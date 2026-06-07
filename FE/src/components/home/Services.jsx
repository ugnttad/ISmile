import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { SERVICE_IMAGES } from '../../constants/images';
import { useUiPreferences } from '../../context/UiPreferencesContext';
import ImageWithBlur from '../common/ImageWithBlur';

function formatPrice(price, t) {
  if (!price) return t('services.contact');

  const millions = price / 1000000;
  const value = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1);
  return `${t('services.from')} ${value} ${t('services.million')}`;
}

function getServiceImage(service) {
  const key = `${service.slug || ''} ${service.name || ''}`.toLowerCase();

  if (key.includes('implant') || key.includes('cay-ghep')) return SERVICE_IMAGES.implant;
  if (key.includes('nieng')) return SERVICE_IMAGES.braces;
  if (key.includes('tram')) return SERVICE_IMAGES.composite;
  if (key.includes('trong-rang-su') || key.includes('rang su') || key.includes('răng sứ')) return SERVICE_IMAGES.crown;
  if (key.includes('veneer') || key.includes('mat-dan')) return SERVICE_IMAGES.veneer;

  return service.image_url || SERVICE_IMAGES.veneer;
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useUiPreferences();

  useEffect(() => {
    api.getServices(true)
      .then((res) => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, rest] = useMemo(() => [services[0], services.slice(1)], [services]);

  return (
    <section id="dich-vu" className="bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] py-16 dark:bg-[linear-gradient(180deg,#071827_0%,#0a2238_100%)] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl lg:mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-4 w-4" />
            {t('services.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight text-ink dark:text-white lg:text-5xl">
            {t('services.title')}
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="h-[520px] animate-pulse rounded-lg bg-white shadow-sm ring-1 ring-sky-100 lg:col-span-7" />
            <div className="grid gap-5 lg:col-span-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 animate-pulse rounded-lg bg-white shadow-sm ring-1 ring-sky-100" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-12">
            {featured && (
              <article className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_24px_70px_rgba(6,120,201,0.12)] dark:border-sky-300/15 dark:bg-[#0d2237] lg:col-span-7">
                <ImageWithBlur
                  src={getServiceImage(featured)}
                  alt={featured.name}
                  className="h-80 w-full lg:h-[420px]"
                />
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">{t('services.featured')}</p>
                      <h3 className="mt-2 text-3xl font-black leading-tight text-ink dark:text-white">{featured.name}</h3>
                    </div>
                    <span className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-black text-primary dark:bg-white/10 dark:text-primary-light">
                      {formatPrice(featured.price_from, t)}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">{featured.description}</p>
                  <Link
                    to="/dat-lich"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                  >
                    <CalendarCheck className="h-5 w-5" />
                    {t('services.bookThis')}
                  </Link>
                </div>
              </article>
            )}

            <div className="grid gap-5 lg:col-span-5">
              {rest.map((service) => (
                <article
                  key={service.id}
                  className="group grid grid-cols-[116px_1fr] overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_16px_42px_rgba(6,120,201,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(6,120,201,0.13)] dark:border-sky-300/15 dark:bg-[#0d2237] sm:grid-cols-[150px_1fr]"
                >
                  <ImageWithBlur
                    src={getServiceImage(service)}
                    alt={service.name}
                    className="h-full min-h-36"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="flex flex-col justify-between p-4">
                    <div>
                      <div className="mb-2 inline-flex rounded-md bg-accent px-2.5 py-1 text-xs font-black text-primary dark:bg-white/10 dark:text-primary-light">
                        {formatPrice(service.price_from, t)}
                      </div>
                      <h3 className="text-lg font-black leading-snug text-ink group-hover:text-primary dark:text-white dark:group-hover:text-primary-light">{service.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600 line-clamp-2 dark:text-slate-300">{service.description}</p>
                    </div>
                    <Link to="/dat-lich" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-primary">
                      {t('services.book')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
