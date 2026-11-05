import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Send, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { t } = useTranslation();
  const { setToast } = useShop();
  function subscribe(event) {
    event.preventDefault();
    setToast(t('subscribed'));
    event.currentTarget.reset();
  }
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <Link to="/" className="logo">Exclusive</Link>
        <h3>{t('subscribe')}</h3><p>{t('firstOrder')}</p>
        <form className="subscribe-form" onSubmit={subscribe}>
          <input type="email" required aria-label={t('email')} placeholder={t('emailPlaceholder')} />
          <button className="icon-button" aria-label={t('subscribe')}><Send size={21} /></button>
        </form>
      </div>
      <div><h3>{t('support')}</h3><p>{t('address')}</p><a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a><a href="tel:+88015888889999">+88015-88888-9999</a></div>
      <div><h3>{t('account')}</h3><Link to="/signup">{t('account')}</Link><Link to="/signup">{t('login')} / {t('signup')}</Link><Link to="/cart">{t('cart')}</Link><Link to="/wishlist">{t('wishlist')}</Link><Link to="/products">{t('shop')}</Link></div>
      <div><h3>{t('quickLink')}</h3><Link to="/info/privacy">{t('privacy')}</Link><Link to="/info/terms">{t('terms')}</Link><Link to="/info/faq">{t('faq')}</Link><Link to="/contact">{t('contact')}</Link></div>
      <div><h3>{t('downloadApp')}</h3><small>{t('appOffer')}</small>
        <div className="download-badges"><img src="/assets/qr.png" alt="QR" width="76" height="76" /><div><a href="https://play.google.com/store" target="_blank" rel="noreferrer" aria-label="Google Play"><img src="/assets/PlaystoreGet.png" alt="Google Play" /></a><a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer" aria-label="App Store"><img src="/assets/download-appstore.png" alt="App Store" /></a></div></div>
        <div className="socials"><a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook size={21} /></a><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram size={21} /></a><a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={21} /></a></div>
      </div>
    </div>
    <p className="copyright">{t('copyright')}</p>
    <button className="back-top icon-button" aria-label={t('backTop')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={21} /></button>
  </footer>;
}
