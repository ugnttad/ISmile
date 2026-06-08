import { PlayCircle, Sparkles } from 'lucide-react';
import { useUiPreferences } from '../../context/UiPreferencesContext';

const VIDEO_ID = '0iOOyrXIlRU';

export default function VideoIntro() {
  const { t } = useUiPreferences();

  return (
    <section className="bg-white py-14 dark:bg-[#071827] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-black uppercase tracking-[0.16em] text-primary dark:bg-white/10 dark:text-primary-light">
              <Sparkles className="h-4 w-4" />
              {t('video.eyebrow')}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-ink dark:text-white lg:text-5xl">
              {t('video.title')}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
              {t('video.desc')}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-sky-100 bg-white p-2 shadow-[0_26px_80px_rgba(6,120,201,0.16)] dark:border-sky-300/15 dark:bg-[#0d2237]">
            <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="Nha khoa iSmile video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="pointer-events-none absolute left-4 top-4 hidden items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-primary shadow-sm backdrop-blur sm:flex">
                <PlayCircle className="h-4 w-4" />
                iSmile Video
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
