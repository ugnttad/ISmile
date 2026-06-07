import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, HeartPulse, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { IMAGES } from '../../constants/images';
import { useUiPreferences } from '../../context/UiPreferencesContext';
import ImageWithBlur from '../common/ImageWithBlur';

const promiseIcons = [ShieldCheck, Sparkles, HeartPulse];

export default function Hero() {
  const { t } = useUiPreferences();
  const promises = t('hero.promises');
  const stats = t('hero.stats');

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eff9ff_0%,#ffffff_54%,#f8fcff_100%)] dark:bg-[linear-gradient(180deg,#061827_0%,#0a2238_54%,#071827_100%)]">
      <div className="mx-auto max-w-[1440px] px-3 pt-5 sm:px-5 lg:px-8 lg:pt-7">
        <div className="rounded-lg bg-white p-2 shadow-[0_26px_80px_rgba(6,120,201,0.14)] ring-1 ring-sky-100 dark:bg-white/5 dark:ring-sky-300/15">
          <ImageWithBlur
            src={IMAGES.hero}
            alt="Nha khoa iSmile"
            className="h-[50vh] min-h-80 rounded-md sm:h-[60vh] lg:h-[68vh]"
            imageClassName="object-center"
            loading="eager"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-sky-100 bg-white px-3 py-2 text-sm font-black text-primary shadow-sm dark:border-sky-300/15 dark:bg-white/5 dark:text-primary-light">
              <Star className="h-4 w-4 fill-gold text-gold" />
              {t('hero.badge')}
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.04] text-ink dark:text-white sm:text-6xl lg:text-7xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t('hero.desc')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dat-lich"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                {t('common.bookVisit')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#dich-vu"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white px-7 py-4 font-black text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent dark:border-sky-300/15 dark:bg-white/5 dark:text-primary-light dark:hover:bg-white/10"
              >
                {t('hero.explore')}
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_18px_52px_rgba(6,120,201,0.09)] dark:border-sky-300/15 dark:bg-white/5">
            <div className="space-y-3">
              {promises.map((text, index) => {
                const Icon = promiseIcons[index] || Sparkles;

                return (
                  <div key={text} className="flex items-center gap-3 rounded-lg bg-accent px-4 py-3 dark:bg-white/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm dark:bg-[#0d2237] dark:text-primary-light">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-black text-ink dark:text-white">{text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-3 divide-x divide-sky-100 border-t border-sky-100 pt-5 dark:divide-sky-300/15 dark:border-sky-300/15">
              {stats.map((item) => (
                <div key={item.label} className="px-3 first:pl-0">
                  <p className="text-2xl font-black text-primary dark:text-primary-light">{item.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
