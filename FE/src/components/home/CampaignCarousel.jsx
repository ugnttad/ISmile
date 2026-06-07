import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarCheck, Images, Pause, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CAMPAIGN_IMAGES } from '../../constants/images';
import { useUiPreferences } from '../../context/UiPreferencesContext';
import ImageWithBlur from '../common/ImageWithBlur';

const formatIndex = (index) => String(index + 1).padStart(2, '0');

export default function CampaignCarousel() {
  const slides = useMemo(() => CAMPAIGN_IMAGES, []);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { language, t } = useUiPreferences();

  useEffect(() => {
    if (!playing || slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [playing, slides.length]);

  const current = slides[active];
  const currentCopy = language === 'vi' ? current : t(`campaign.typeCopy.${current.type}`);
  const goTo = (index) => setActive((index + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef8ff_46%,#ffffff_100%)] py-16 dark:bg-[linear-gradient(180deg,#071827_0%,#0a2238_46%,#071827_100%)] lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
              <Images className="h-4 w-4" />
              {t('campaign.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-black leading-tight text-ink dark:text-white lg:text-5xl">
              {t('campaign.title')}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
            {t('campaign.desc')}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_392px]">
          <article className="relative overflow-hidden rounded-lg border border-sky-100 bg-white shadow-[0_30px_90px_rgba(6,120,201,0.16)] dark:border-sky-300/15 dark:bg-[#0d2237]">
            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/90 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
                {t(`campaign.labels.${current.type}`)}
              </span>
              <span className="rounded-lg bg-ink/80 px-3 py-2 text-xs font-black text-white shadow-sm backdrop-blur">
                {formatIndex(active)} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <ImageWithBlur
              src={current.src}
              alt={currentCopy.title}
              className="h-[540px] w-full bg-white sm:h-[640px] lg:h-[690px]"
              fit={current.fit}
              imageClassName="object-center"
              loading="eager"
            />

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent p-5 text-white sm:hidden">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-light">{currentCopy.kicker}</p>
              <h3 className="mt-1 text-2xl font-black leading-tight">{currentCopy.title}</h3>
            </div>
          </article>

          <aside className="flex flex-col rounded-lg border border-sky-100 bg-white p-5 shadow-[0_22px_64px_rgba(6,120,201,0.1)] dark:border-sky-300/15 dark:bg-[#0d2237]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-primary dark:bg-white/10 dark:text-primary-light">
                  <Sparkles className="h-4 w-4" />
                  {currentCopy.kicker}
                </div>
                <h3 className="mt-4 text-3xl font-black leading-tight text-ink dark:text-white">{currentCopy.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{currentCopy.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
                aria-label={playing ? t('campaign.pause') : t('campaign.play')}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-1">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.title}-progress`}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-1.5 rounded-full transition-colors ${
                    active === index ? 'bg-primary' : 'bg-sky-100 hover:bg-sky-200'
                  }`}
                  aria-label={`${t('campaign.chooseImage')} ${index + 1}: ${
                    language === 'vi' ? slide.title : t(`campaign.typeCopy.${slide.type}.title`)
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 max-h-[388px] space-y-2 overflow-y-auto pr-1">
              {slides.map((slide, index) => {
                const slideCopy = language === 'vi' ? slide : t(`campaign.typeCopy.${slide.type}`);

                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => goTo(index)}
                    className={`grid w-full grid-cols-[72px_1fr_auto] items-center gap-3 rounded-lg border p-2 text-left transition-all ${
                      active === index
                        ? 'border-primary/35 bg-accent shadow-sm dark:bg-white/10'
                        : 'border-sky-100 bg-white hover:border-primary/25 hover:bg-sky-50 dark:border-sky-300/15 dark:bg-white/5 dark:hover:bg-white/10'
                    }`}
                  >
                    <ImageWithBlur
                      src={slide.src}
                      alt={slideCopy.title}
                      className="h-16 w-[72px] rounded-md"
                      fit="cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-black uppercase tracking-wide text-primary">
                        {slideCopy.kicker}
                      </span>
                      <span className="mt-1 block truncate text-sm font-black leading-snug text-ink dark:text-white">{slideCopy.title}</span>
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${active === index ? 'bg-primary' : 'bg-sky-200'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-auto space-y-4 border-t border-sky-100 pt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-100 text-primary transition-colors hover:bg-accent"
                    aria-label={t('campaign.prev')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-100 text-primary transition-colors hover:bg-accent"
                    aria-label={t('campaign.next')}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                  {slides.length} {t('campaign.moments')}
                </span>
              </div>

              <Link
                to="/dat-lich"
                className="flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-ink/15 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                {t('campaign.book')}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
