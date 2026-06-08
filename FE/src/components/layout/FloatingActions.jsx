import { useState, useEffect } from 'react';
import { CalendarCheck, PhoneCall, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../constants/contact';
import { useUiPreferences } from '../../context/UiPreferencesContext';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M14.2 8.1h2.1V4.7c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.2v2.9H5v3.8h3.3v7.1h4v-7.1h3.3l.5-3.8h-3.8V10c0-1.1.3-1.9 1.9-1.9Z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { t } = useUiPreferences();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {showScrollToTop && (
        <button
          onClick={handleScrollToTop}
          aria-label={t('common.scrollToTop') || 'Scroll to top'}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_14px_36px_rgba(6,120,201,0.2)] ring-1 ring-sky-100 transition-all hover:-translate-y-0.5 hover:bg-accent dark:bg-[#0d2237] dark:text-primary-light dark:ring-sky-300/15 dark:hover:bg-white/10"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href={CONTACT.phoneHref}
        aria-label={t('common.hotline')}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_14px_36px_rgba(6,120,201,0.2)] ring-1 ring-sky-100 transition-all hover:-translate-y-0.5 hover:bg-accent dark:bg-[#0d2237] dark:text-primary-light dark:ring-sky-300/15 dark:hover:bg-white/10"
      >
        <PhoneCall className="h-5 w-5" />
      </a>
      <a
        href={CONTACT.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook iSmile"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_14px_36px_rgba(6,120,201,0.2)] ring-1 ring-sky-100 transition-all hover:-translate-y-0.5 hover:bg-accent dark:bg-[#0d2237] dark:text-primary-light dark:ring-sky-300/15 dark:hover:bg-white/10"
      >
        <FacebookIcon className="h-5 w-5" />
      </a>
      <Link
        to="/dat-lich"
        aria-label={t('common.bookNow')}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_18px_42px_rgba(6,120,201,0.34)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
      >
        <CalendarCheck className="h-5 w-5" />
      </Link>
    </div>
  );
}
