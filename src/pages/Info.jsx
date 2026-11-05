import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Benefits } from '../components/ShopUI';

export default function Info({ type: givenType }) {
  const params = useParams();
  const { t } = useTranslation();
  const type = givenType || params.type;
  const titles = { privacy: 'privacy', terms: 'terms', faq: 'faq', about: 'about' };
  if (!titles[type]) return <div className="container inner-page not-found"><strong>404</strong><h1>{t('notFound')}</h1><p>{t('notFoundDesc')}</p><Link to="/" className="button">{t('backHome')}</Link></div>;
  return <div className="container inner-page"><Breadcrumb items={[{ label: t(titles[type]) }]} />{type === 'about' ? <><div className="about-layout"><div><h1>{t('aboutTitle')}</h1><p>{t('aboutText')}</p><p>{t('aboutProject')}</p><Link to="/products" className="button">{t('shopNow')}</Link></div><img src="/assets/dl.beatsnoop 1.png" alt={t('shop')} /></div><Benefits /></> : <article className="info-article"><h1>{t(titles[type])}</h1><p>{t(`${type}Text`)}</p><Link to="/" className="button">{t('backHome')}</Link></article>}</div>;
}
