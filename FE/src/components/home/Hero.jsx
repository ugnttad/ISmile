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
    <section className="relative overflow-hidden pt-5 sm:pt-7 lg:pt-12">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-200 via-cyan-100 to-transparent opacity-40 blur-3xl dark:from-sky-900 dark:via-cyan-900 dark:opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-200 to-cyan-100 opacity-30 blur-3xl dark:from-blue-900 dark:to-cyan-900 dark:opacity-10"></div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-8">
        {/* Hero Image with enhanced effects */}
        <div className="mb-8 transform transition-transform duration-500 hover:scale-[1.02]">
          <div className="rounded-2xl bg-gradient-to-br from-white via-white to-sky-50/50 p-2 shadow-[0_40px_120px_rgba(6,120,201,0.25)] ring-1 ring-white dark:from-white/10 dark:via-white/5 dark:to-sky-950/30 dark:shadow-[0_40px_120px_rgba(6,120,201,0.15)] dark:ring-sky-300/20 sm:p-3 lg:p-4">
            <div className="relative overflow-hidden rounded-xl">
              {/* Shine effect overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <ImageWithBlur
                src={IMAGES.hero}
                alt="Nha khoa iSmile"
                className="h-[30vh] sm:h-[50vh] lg:h-[70vh] w-full rounded-lg object-cover"
                imageClassName="object-center"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Left content */}
          <div>
            {/* Badge with animation */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 px-4 py-2.5 text-sm font-black text-primary shadow-[0_4px_16px_rgba(6,120,201,0.12)] dark:border-sky-400/30 dark:from-sky-950/40 dark:to-cyan-950/40 dark:text-primary-light animate-pulse">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              {t('hero.badge')}
            </div>

            {/* Main heading with gradient */}
            <h1 className="max-w-5xl text-4xl font-black leading-[1.1] bg-gradient-to-r from-ink via-blue-900 to-blue-700 bg-clip-text text-transparent dark:from-white dark:via-sky-200 dark:to-cyan-300 sm:text-6xl lg:text-7xl">
              {t('hero.title')}
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t('hero.desc')}
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/dat-lich"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cyan-600 px-8 py-4 font-black text-white shadow-[0_20px_60px_rgba(6,120,201,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(6,120,201,0.45)] active:translate-y-0 dark:from-primary dark:to-cyan-500"
              >
                <CalendarCheck className="h-5 w-5 transition-transform group-hover:scale-110" />
                {t('common.bookVisit')}
                <ArrowRight className="h-5 w-5 transition-all group-hover:translate-x-1" />
              </Link>

              <Link
                to="/dich-vu"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white px-8 py-4 font-black text-primary shadow-[0_10px_30px_rgba(6,120,201,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/80 hover:bg-sky-50 hover:shadow-[0_15px_50px_rgba(6,120,201,0.25)] dark:border-cyan-400/50 dark:bg-white/5 dark:text-primary-light dark:hover:bg-white/10 dark:hover:border-cyan-400"
              >
                <span className="transition-all group-hover:underline underline-offset-4">{t('hero.explore')}</span>
              </Link>
            </div>
          </div>

          {/* Right sidebar with stats & promises */}
          <aside className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/50 p-6 shadow-[0_24px_64px_rgba(6,120,201,0.12)] dark:border-sky-300/20 dark:from-white/10 dark:to-sky-950/20 dark:shadow-[0_24px_64px_rgba(6,120,201,0.08)] backdrop-blur-sm">
            {/* Promises */}
            <div className="space-y-3 mb-6">
              {promises.map((text, index) => {
                const Icon = promiseIcons[index] || Sparkles;

                return (
                  <div key={text} className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-sky-100 to-cyan-100 px-4 py-3.5 transition-all duration-300 hover:from-sky-200 hover:to-cyan-200 dark:from-sky-950/40 dark:to-cyan-950/40 dark:hover:from-sky-900/50 dark:hover:to-cyan-900/50">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white to-sky-50 text-primary shadow-[0_4px_12px_rgba(6,120,201,0.15)] transition-transform group-hover:scale-110 dark:from-white/20 dark:to-white/10 dark:text-primary-light">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-ink dark:text-white">{text}</span>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent dark:via-sky-400/20"></div>

            {/* Stats with better layout */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Thống kê</p>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((item) => (
                  <div key={item.label} className="group rounded-xl border border-sky-100 bg-white p-3 text-center transition-all hover:border-primary/30 hover:bg-sky-50 hover:shadow-[0_8px_24px_rgba(6,120,201,0.12)] dark:border-sky-300/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <p className="text-2xl font-black bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent dark:from-primary-light dark:to-cyan-400">{item.value}</p>
                    <p className="mt-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
