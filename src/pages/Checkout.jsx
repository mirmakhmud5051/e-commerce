import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { readStorage, writeStorage } from '../context/shopUtils';
import { products, productName, money } from '../data/products';
import { Breadcrumb, EmptyState, OrderTotals } from '../components/ShopUI';
import Coupon, { useCoupon } from '../components/Coupon';

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const { cart, subtotal, clearCart } = useShop();
  const [coupon, applyCoupon] = useCoupon();
  const [payment, setPayment] = useState('cash');
  const [saved] = useState(() => readStorage('exclusive-billing', {}));
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  function placeOrder(event) {
    event.preventDefault();
    if (payment !== 'cash') { setError(true); return; }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.save) writeStorage('exclusive-billing', data);
    else { try { localStorage.removeItem('exclusive-billing'); } catch { /* Optional storage */ } }
    const number = `EX-${Date.now().toString().slice(-8)}`;
    writeStorage('exclusive-last-order', { number, items: cart, total: subtotal * (coupon ? 0.9 : 1), billing: data, date: new Date().toISOString() });
    setOrder(number);
    clearCart();
    writeStorage('exclusive-coupon', false);
    window.scrollTo(0, 0);
  }

  if (order) return <div className="container inner-page"><div className="order-success"><CheckCircle2 size={70} /><h1>{t('orderSuccess')}</h1><p>{t('orderDesc')}</p><p>{t('orderNumber')}: <strong>{order}</strong></p><Link className="button" to="/products">{t('continueShopping')}</Link></div></div>;

  return <div className="container inner-page checkout-page"><Breadcrumb items={[{ label: t('cart'), to: '/cart' }, { label: t('billing') }]} />
    {!cart.length ? <EmptyState type="cart" /> : <><h1>{t('billing')}</h1><form className="checkout-layout" onSubmit={placeOrder}>
      <div className="billing-fields">{[
        ['firstName', 'text', true], ['company', 'text', false], ['street', 'text', true], ['apartment', 'text', false], ['city', 'text', true], ['phone', 'tel', true], ['email', 'email', true],
      ].map(([key, type, required]) => <label key={key}>{t(key)}{required && <span className="required-mark">*</span>}<input name={key} type={type} required={required} defaultValue={saved[key] || ''} autoComplete={{ firstName: 'given-name', company: 'organization', street: 'address-line1', apartment: 'address-line2', city: 'address-level2', phone: 'tel', email: 'email' }[key]} /></label>)}
        <label className="checkbox-label"><input type="checkbox" name="save" defaultChecked={Boolean(saved.save)} />{t('saveInfo')}</label>
      </div>
      <div className="checkout-summary"><div className="checkout-products">{cart.map((item) => { const product = products.find((p) => p.id === item.id); return <div key={item.key}><img src={`/assets/${product.image}`} alt={productName(product, i18n.language)} /><span>{productName(product, i18n.language)}{item.quantity > 1 && <small> × {item.quantity}</small>}</span><span>{money(product.price * item.quantity)}</span></div>; })}</div>
        <OrderTotals subtotal={subtotal} discount={coupon ? subtotal * 0.1 : 0} />
        <div className="payment-method"><label><input type="radio" name="payment" value="bank" checked={payment === 'bank'} onChange={() => setPayment('bank')} />{t('bank')}</label><div className="payment-cards"><span>VISA</span><span>●●</span><span>UnionPay</span></div></div>
        <label className="payment-method cash-method"><input type="radio" name="payment" value="cash" checked={payment === 'cash'} onChange={() => { setPayment('cash'); setError(false); }} />{t('cash')}</label>
        {(payment === 'bank' || error) && <p className="field-note error-text" role="status">{t('bankInfo')}</p>}
        <Coupon applied={coupon} onApply={applyCoupon} />
        <button type="submit" className="button place-order">{t('placeOrder')}</button>
      </div>
    </form></>}
  </div>;
}
