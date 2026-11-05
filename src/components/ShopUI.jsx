import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingBag, Truck, Headphones, ShieldCheck } from 'lucide-react';
import { money } from '../data/products';

export function Breadcrumb({ items }) {
  const { t } = useTranslation();
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">{t('home')}</Link>{items.map((item, index) => <span key={index}><span className="breadcrumb-slash">/</span>{item.to ? <Link to={item.to}>{item.label}</Link> : <span className="breadcrumb-current">{item.label}</span>}</span>)}</nav>;
}

export function SectionHeading({ label, title, children }) {
  return <div className="section-heading"><div><p className="section-label">{label}</p>{title && <h2>{title}</h2>}</div>{children}</div>;
}

export function EmptyState({ type }) {
  const { t } = useTranslation();
  return <div className="empty-state"><div className="empty-icon">{type === 'wishlist' ? <Heart size={42} /> : <ShoppingBag size={42} />}</div><h2>{t(type === 'wishlist' ? 'emptyWishlist' : 'emptyCart')}</h2><p>{t(type === 'wishlist' ? 'emptyWishlistDesc' : 'emptyCartDesc')}</p><Link className="button" to="/products">{t('continueShopping')}</Link></div>;
}

export function Benefits() {
  const { t } = useTranslation();
  return <div className="benefits">{[[Truck, 'delivery', 'deliveryDesc'], [Headphones, 'customer', 'customerDesc'], [ShieldCheck, 'guarantee', 'guaranteeDesc']].map(([Icon, title, text]) => <div key={title}><div className="benefit-icon"><Icon size={32} /></div><h3>{t(title)}</h3><p>{t(text)}</p></div>)}</div>;
}

export function OrderTotals({ subtotal, discount = 0 }) {
  const { t } = useTranslation();
  return <div className="order-totals"><div><span>{t('subtotal')}:</span><span>{money(subtotal)}</span></div><div><span>{t('shipping')}:</span><span>{t('free')}</span></div>{discount > 0 && <div className="discount-row"><span>{t('discount')} (10%):</span><span>−{money(discount)}</span></div>}<div><span>{t('total')}:</span><span>{money(subtotal - discount)}</span></div></div>;
}
