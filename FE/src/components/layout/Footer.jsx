import { Link } from 'react-router-dom';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { IMAGES } from '../../constants/images';
import { CONTACT } from '../../constants/contact';
import { useUiPreferences } from '../../context/UiPreferencesContext';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M14.2 8.1h2.1V4.7c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.2v2.9H5v3.8h3.3v7.1h4v-7.1h3.3l.5-3.8h-3.8V10c0-1.1.3-1.9 1.9-1.9Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useUiPreferences();
  const infoLinks = [
    { href: '/dich-vu', label: t('footer.infoLinks.0') },
    { href: '/doi-ngu', label: t('footer.infoLinks.1') },
    { href: '/co-so', label: t('footer.infoLinks.2') },
    { href: '/dat-lich', label: t('footer.infoLinks.3') },
  ];
  const serviceLinks = Array.isArray(t('footer.serviceLinks')) ? t('footer.serviceLinks') : [];

  return (
    <footer className="bg-[linear-gradient(180deg,#0877c8_0%,#1db9e8_100%)] text-white dark:bg-[linear-gradient(180deg,#082f49_0%,#035c9c_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr]">
          <div>
            <img src={IMAGES.logoWhite} alt="iSmile" className="mb-8 h-24 w-auto max-w-56 object-contain" />
            <h3 className="text-3xl font-black leading-tight">{CONTACT.clinicName}</h3>

            <ul className="mt-8 space-y-5 text-lg font-bold leading-7">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                <span>{t('common.address')}: {CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 shrink-0" />
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-primary-light">
                  {t('common.phone')}: {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href={CONTACT.emailHref} className="transition-colors hover:text-primary-light">
                  {t('common.email')}: {CONTACT.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <p className="text-lg font-black uppercase">{t('common.contactUs')}</p>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Nha khoa iSmile"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-light"
              >
                <FacebookIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-2xl font-black uppercase">{t('footer.info')}</h4>
            <ul className="space-y-4 text-lg font-bold">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="transition-colors hover:text-primary-light">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-2xl font-black uppercase">{t('footer.services')}</h4>
            <ul className="space-y-4 text-lg font-bold">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link to="/dich-vu" className="transition-colors hover:text-primary-light">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm font-semibold text-white/80">
          © {new Date().getFullYear()} {CONTACT.clinicName}
        </div>
      </div>
    </footer>
  );
}
