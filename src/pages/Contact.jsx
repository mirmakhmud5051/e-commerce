import { useTranslation } from 'react-i18next';
import { Phone, Mail } from 'lucide-react';
import { Breadcrumb } from '../components/ShopUI';
import { useShop } from '../context/ShopContext';
import { writeStorage } from '../context/shopUtils';

export default function Contact() {
  const { t } = useTranslation();
  const { setToast } = useShop();
  function send(event) {
    event.preventDefault();
    writeStorage('exclusive-message', Object.fromEntries(new FormData(event.currentTarget)));
    setToast(t('messageSent'));
    event.currentTarget.reset();
  }
  return <div className="container inner-page contact-page"><Breadcrumb items={[{ label: t('contact') }]} /><div className="contact-layout">
    <aside className="contact-details"><div><h2><span><Phone size={22} /></span>{t('callUs')}</h2><p>{t('callDesc')}</p><a href="tel:+8801611112222">+8801611112222</a></div><div><h2><span><Mail size={22} /></span>{t('writeUs')}</h2><p>{t('writeDesc')}</p><a href="mailto:customer@exclusive.com">customer@exclusive.com</a><a href="mailto:support@exclusive.com">support@exclusive.com</a></div></aside>
    <form className="contact-form" onSubmit={send}><div className="contact-inputs"><input required name="name" aria-label={t('yourName')} placeholder={`${t('yourName')} *`} autoComplete="name" /><input required type="email" name="email" aria-label={t('yourEmail')} placeholder={`${t('yourEmail')} *`} autoComplete="email" /><input required type="tel" name="phone" aria-label={t('yourPhone')} placeholder={`${t('yourPhone')} *`} autoComplete="tel" /></div><textarea required name="message" aria-label={t('yourMessage')} placeholder={t('yourMessage')} rows={8} /><button className="button">{t('sendMessage')}</button></form>
  </div></div>;
}
