import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Clock, Languages, MapPin, Menu, Moon, PhoneCall, Sun, X } from 'lucide-react';
import { IMAGES } from '../../constants/images';
import { CONTACT } from '../../constants/contact';
import { LANGUAGE_OPTIONS, useUiPreferences } from '../../context/UiPreferencesContext';

function getNavLinks(t) {
  return [
    { to: '/', label: t('nav.home') },
    { to: '/#dich-vu', label: t('nav.services') },
    { to: '/#bac-si', label: t('nav.doctors') },
    { to: '/#co-so', label: t('nav.facility') },
    { to: '/dat-lich', label: t('nav.booking') },
  ];
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useUiPreferences();
  const navLinks = getNavLinks(t);
  const themeLabel = theme === 'dark' ? t('common.themeLight') : t('common.themeDark');

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 shadow-[0_10px_34px_rgba(6,120,201,0.08)] backdrop-blur-xl dark:border-sky-300/15 dark:bg-[#071827]/95">
      <div className="hidden bg-primary text-white dark:bg-[#082f49] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6 text-white/90">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary-light" />
              {CONTACT.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary-light" />
              {CONTACT.hours}
            </span>
          </div>
          <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 font-semibold tracking-wide text-white">
            <PhoneCall className="h-3.5 w-3.5 text-primary-light" />
            {t('common.hotline')} {CONTACT.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-20">
          <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
            <img src={IMAGES.logo} alt="Nha Khoa iSmile" className="h-10 w-auto lg:h-12" />
          </Link>

          <nav className="hidden items-center gap-1 rounded-lg bg-sky-50/80 p-1 ring-1 ring-sky-100 dark:bg-white/5 dark:ring-sky-300/15 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="rounded-md px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-white hover:text-primary hover:shadow-sm dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-primary-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
              <PhoneCall className="h-4 w-4 text-primary" />
              {CONTACT.phone}
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent dark:border-sky-300/15 dark:bg-white/5 dark:text-primary-light dark:hover:bg-white/10"
              aria-label={themeLabel}
              title={themeLabel}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <label className="relative flex h-10 items-center rounded-lg border border-sky-100 bg-white pl-3 pr-2 text-primary shadow-sm dark:border-sky-300/15 dark:bg-white/5 dark:text-primary-light">
              <Languages className="h-4 w-4" />
              <span className="sr-only">{t('common.language')}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="h-full bg-transparent pl-2 text-xs font-black text-ink outline-none dark:text-white"
                aria-label={t('common.language')}
              >
                {LANGUAGE_OPTIONS.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.short}
                  </option>
                ))}
              </select>
            </label>

            <Link
              to="/dat-lich"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              <CalendarCheck className="h-4 w-4" />
              {t('common.bookNow')}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-sky-100 p-2 text-primary shadow-sm transition-colors hover:bg-accent dark:border-sky-300/15 dark:text-primary-light dark:hover:bg-white/10"
              aria-label={themeLabel}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="rounded-lg border border-sky-100 p-2 text-primary shadow-sm transition-colors hover:bg-accent dark:border-sky-300/15 dark:text-primary-light dark:hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-sky-100 bg-white px-4 py-4 shadow-2xl dark:border-sky-300/15 dark:bg-[#071827] lg:hidden">
          <label className="mb-3 flex items-center gap-2 rounded-lg border border-sky-100 px-3 py-3 text-sm font-bold text-slate-700 dark:border-sky-300/15 dark:text-slate-100">
            <Languages className="h-4 w-4 text-primary" />
            <span>{t('common.language')}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="ml-auto bg-transparent text-sm font-black outline-none dark:text-white"
            >
              {LANGUAGE_OPTIONS.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-accent hover:text-primary dark:text-slate-100 dark:hover:bg-white/10 dark:hover:text-primary-light"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/dat-lich"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20"
            onClick={() => setOpen(false)}
          >
            <CalendarCheck className="h-4 w-4" />
            {t('common.bookNow')}
          </Link>
        </div>
      )}
    </header>
  );
}
