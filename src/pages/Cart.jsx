import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products, productName, money } from '../data/products';
import { Breadcrumb, EmptyState, OrderTotals } from '../components/ShopUI';
import Coupon, { useCoupon } from '../components/Coupon';

export default function Cart() {
  const { t, i18n } = useTranslation();
  const { cart, subtotal, updateQuantity, removeFromCart, setToast } = useShop();
  const [coupon, applyCoupon] = useCoupon();
  return <div className="container inner-page cart-page"><Breadcrumb items={[{ label: t('cart') }]} />
    {!cart.length ? <EmptyState type="cart" /> : <>
      <div className="cart-table-wrap"><table className="cart-table"><thead><tr><th>{t('product')}</th><th>{t('price')}</th><th>{t('quantity')}</th><th>{t('subtotal')}</th></tr></thead><tbody>{cart.map((item) => {
        const product = products.find((product) => product.id === item.id);
        const name = productName(product, i18n.language);
        return <tr key={item.key}><td><div className="cart-product"><button className="cart-remove" onClick={() => removeFromCart(item.key)} aria-label={`${t('remove')}: ${name}`}><X size={13} /></button><Link to={`/product/${product.id}`}><img src={`/assets/${product.image}`} alt={name} /></Link><div><Link to={`/product/${product.id}`}>{name}</Link>{item.color && <small>{t('size')}: {item.size} <span className="mini-swatch" style={{ background: item.color }} /></small>}</div></div></td><td>{money(product.price)}</td><td><input type="number" min="1" max="99" value={item.quantity} aria-label={`${t('quantity')}: ${name}`} onChange={(e) => updateQuantity(item.key, Number(e.target.value))} /></td><td>{money(product.price * item.quantity)}</td></tr>;
      })}</tbody></table></div>
      <div className="cart-buttons"><Link className="button outline-button" to="/products">{t('returnShop')}</Link><button className="button outline-button" onClick={() => setToast(t('cartUpdated'))}>{t('updateCart')}</button></div>
      <div className="cart-bottom"><Coupon applied={coupon} onApply={applyCoupon} /><div className="cart-total-box"><h2>{t('cartTotal')}</h2><OrderTotals subtotal={subtotal} discount={coupon ? subtotal * 0.1 : 0} /><Link className="button" to="/checkout">{t('checkout')}</Link></div></div>
    </>}
  </div>;
}
