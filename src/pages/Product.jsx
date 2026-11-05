import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Minus, Plus, Truck, RefreshCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products, productName, money } from '../data/products';
import ProductCard, { Stars } from '../components/ProductCard';
import { Breadcrumb, SectionHeading } from '../components/ShopUI';
import Info from './Info';

export default function Product() {
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));
  return product ? <ProductDetails key={product.id} product={product} /> : <Info type="404" />;
}

function ProductDetails({ product }) {
  const { t, i18n } = useTranslation();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState(product.colors?.[0] || '#a0bce0');
  const [image, setImage] = useState(product.image);
  const navigate = useNavigate();
  const name = productName(product, i18n.language);
  const liked = wishlist.includes(product.id);
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);
  for (const item of products) {
    if (related.length >= 4) break;
    if (item.id !== product.id && !related.some((p) => p.id === item.id)) related.push(item);
  }
  function buy() { addToCart(product.id, quantity, size, color); navigate('/cart'); }

  return <div className="container inner-page product-page">
    <Breadcrumb items={[{ label: t('shop'), to: '/products' }, { label: t(({ home: 'homeCategory', toys: 'baby' })[product.category] || product.category), to: `/products?category=${product.category}` }, { label: name }]} />
    <div className="product-detail-layout">
      <div className="product-gallery">
        <div className="gallery-thumbnails">{(product.gallery || [product.image]).map((file, index) => <button className={image === file ? 'selected' : ''} key={file} aria-label={`${name} ${index + 1}`} onClick={() => setImage(file)}><img src={`/assets/${file}`} alt={`${name} ${index + 1}`} /></button>)}</div>
        <div className="gallery-main"><img src={`/assets/${image}`} alt={name} /></div>
      </div>
      <div className="product-detail-info">
        <h1>{name}</h1><div className="detail-rating"><Stars rating={product.rating} /><span>({product.reviews} {t('reviews')})</span><i /><span className="in-stock">{t('inStock')}</span></div>
        <p className="detail-price">{money(product.price)}</p><p className="product-description">{t(product.id === 17 ? 'gamepadDesc' : 'productDesc')}</p>
        <div className="detail-colors"><span>{t('colors')}:</span><div className="color-options">{(product.colors || ['#a0bce0', '#db4444']).map((item) => <button key={item} className={`color-swatch ${color === item ? 'selected' : ''}`} style={{ '--swatch': item }} aria-label={`${t('selectColor')}: ${item}`} aria-pressed={color === item} onClick={() => setColor(item)} />)}</div></div>
        <div className="detail-sizes"><span>{t('size')}:</span>{['XS', 'S', 'M', 'L', 'XL'].map((item) => <button className={size === item ? 'selected' : ''} key={item} onClick={() => setSize(item)} aria-pressed={size === item}>{item}</button>)}</div>
        <div className="detail-buy-row"><div className="quantity-stepper"><button aria-label={t('decrease')} disabled={quantity === 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button><span>{quantity}</span><button aria-label={t('increase')} disabled={quantity === 99} onClick={() => setQuantity(Math.min(99, quantity + 1))}><Plus size={18} /></button></div><button className="button" onClick={buy}>{t('buyNow')}</button><button className={`detail-heart ${liked ? 'liked' : ''}`} aria-label={liked ? t('removeWishlist') : t('addWishlist')} aria-pressed={liked} onClick={() => toggleWishlist(product.id)}><Heart size={23} fill={liked ? 'currentColor' : 'none'} /></button></div>
        <button className="detail-add-link" onClick={() => addToCart(product.id, quantity, size, color)}>{t('addToCart')}</button>
        <div className="delivery-box"><div><Truck size={32} /><div><h3>{t('freeDelivery')}</h3><p>{t('deliveryDetail')}</p></div></div><div><RefreshCcw size={30} /><div><h3>{t('returnDelivery')}</h3><p>{t('returnDetail')} <Link to="/info/terms">{t('terms')}</Link></p></div></div></div>
      </div>
    </div>
    <section className="recommendations"><SectionHeading label={t('related')} /><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>
  </div>;
}
