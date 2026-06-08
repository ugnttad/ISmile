import { ArrowRight, CalendarCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithBlur from '../components/common/ImageWithBlur';
import { SERVICE_CATALOG } from '../constants/services';
import { useUiPreferences } from '../context/UiPreferencesContext';

export default function ServicesPage() {
  const { t } = useUiPreferences();
  const [featured, ...rest] = SERVICE_CATALOG;

  return (
    <section className="bg-[linear-gradient(180deg,#eef9ff_0%,#ffffff_46%,#f6fbff_100%)] py-12 dark:bg-[linear-gradient(180deg,#061827_0%,#0a2238_46%,#071827_100%)] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-4 w-4" />
              {t('services.eyebrow')}
            </span>
            <h1 className="mt-3 text-4xl font-black leading-tight text-ink dark:text-white lg:text-6xl">
              Dịch vụ nha khoa iSmile
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
            Chọn dịch vụ cần tư vấn để xem hình ảnh, lợi ích và quy trình cơ bản trước khi đặt lịch với phòng khám.
          </p>
        </div>

        <article className="mb-5 grid overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_26px_80px_rgba(6,120,201,0.14)] dark:border-sky-300/15 dark:bg-[#0d2237] lg:grid-cols-[1.05fr_0.95fr]">
          <ImageWithBlur
            src={featured.image}
            alt={featured.name}
            className="h-80 lg:h-[500px]"
            imageClassName="object-center transition-transform duration-700 hover:scale-[1.025]"
          />
          <div className="flex flex-col justify-between p-6 lg:p-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">{t('services.featured')}</p>
              <h2 className="mt-3 text-3xl font-black text-ink dark:text-white lg:text-5xl">{featured.name}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">{featured.intro}</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/dich-vu/${featured.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Xem chi tiết <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dat-lich"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white px-5 py-3 text-sm font-black text-primary transition-all hover:-translate-y-0.5 hover:bg-accent dark:border-sky-300/15 dark:bg-white/5 dark:text-primary-light dark:hover:bg-white/10"
              >
                <CalendarCheck className="h-4 w-4" />
                {t('common.bookNow')}
              </Link>
            </div>
          </div>
        </article>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service) => (
            <Link
              key={service.slug}
              to={`/dich-vu/${service.slug}`}
              className="group overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_16px_42px_rgba(6,120,201,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(6,120,201,0.16)] dark:border-sky-300/15 dark:bg-[#0d2237]"
            >
              <ImageWithBlur
                src={service.image}
                alt={service.name}
                className="h-52 w-full"
                imageClassName="object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-xl font-black text-ink group-hover:text-primary dark:text-white dark:group-hover:text-primary-light">{service.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-primary">
                  Xem dịch vụ <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
