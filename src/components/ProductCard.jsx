import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Eye, ShoppingCart, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { productName, money } from '../data/products';

export function Stars({ rating = 5 }) {
  return <span className="stars" aria-label={`${rating}/5`}>{[1, 2, 3, 4, 5].map((number) => <span key={number} className={number <= rating ? '' : 'star-empty'}>★</span>)}</span>;
}

export default function ProductCard({ product, wishlistMode = false }) {
  const { t, i18n } = useTranslation();
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const [color, setColor] = useState(product.colors?.[0] || '');
  const liked = wishlist.includes(product.id);
  const name = productName(product, i18n.language);

  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`/product/${product.id}`} className="product-image-link" aria-label={name}><img src={`/assets/${product.image}`} alt={name} loading="lazy" /></Link>
      {product.discount && <span className="product-label">-{product.discount}%</span>}
      {product.isNew && !product.discount && <span className="product-label new-label">{t('new')}</span>}
      <div className="product-actions">
        <button className={`round-button ${liked ? 'liked' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label={wishlistMode ? t('removeWishlist') : liked ? t('removeWishlist') : t('addWishlist')} aria-pressed={liked}>
          {wishlistMode ? <Trash2 size={18} /> : <Heart size={19} fill={liked ? 'currentColor' : 'none'} />}
        </button>
        {!wishlistMode && <Link className="round-button" to={`/product/${product.id}`} aria-label={t('viewProduct')}><Eye size={19} /></Link>}
      </div>
      <button className={`card-add ${wishlistMode ? 'visible' : ''}`} onClick={() => addToCart(product.id, 1, 'M', color)}><ShoppingCart size={18} />{t('addToCart')}</button>
    </div>
    <Link to={`/product/${product.id}`} className="product-name">{name}</Link>
    <div className="product-prices"><span>{money(product.price)}</span>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
    {!wishlistMode && <div className="rating"><Stars rating={product.rating} /><span>({product.reviews})</span></div>}
    {!wishlistMode && product.colors && <div className="color-options">{product.colors.map((item) => <button key={item} style={{ '--swatch': item }} className={`color-swatch ${color === item ? 'selected' : ''}`} aria-label={`${t('selectColor')}: ${item}`} aria-pressed={color === item} onClick={() => setColor(item)} />)}</div>}
  </article>;
}
