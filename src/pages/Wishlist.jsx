import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import { EmptyState, SectionHeading } from '../components/ShopUI';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

export default function Wishlist() {
  const { t } = useTranslation();
  const { wishlist, moveWishlistToCart } = useShop();
  const items = wishlist.map((id) => products.find((product) => product.id === id));
  return <div className="container inner-page wishlist-page">
    <div className="wishlist-heading"><h1>{t('wishlist')} ({items.length})</h1>{items.length > 0 && <button className="button outline-button" onClick={moveWishlistToCart}>{t('moveAll')}</button>}</div>
    {items.length ? <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} wishlistMode />)}</div> : <EmptyState type="wishlist" />}
    <section className="recommendations"><SectionHeading label={t('justForYou')}><Link to="/products" className="button outline-button">{t('seeAll')}</Link></SectionHeading><div className="product-grid">{[products[10], products[2], products[0], products[1]].map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
  </div>;
}
