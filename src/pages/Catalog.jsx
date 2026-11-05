import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import { Breadcrumb } from '../components/ShopUI';
import { products } from '../data/products';

export default function Catalog() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const list = products.filter((product) => (!category || product.category === category) && (!query || Object.values(product.name).some((name) => name.toLowerCase().includes(query.toLowerCase()))));
  const categoryLabels = { home: 'homeCategory', toys: 'baby' };
  const title = query ? `${t('searchResults')}: “${query}”` : category ? t(categoryLabels[category] || category) : t('ourProducts');

  return <div className="container inner-page"><Breadcrumb items={[{ label: t('shop') }]} /><div className="catalog-heading"><h1>{title}</h1><span>{list.length} {t('product').toLowerCase()}</span></div>
    <div className="filter-list">{['', 'gaming', 'computers', 'phones', 'cameras', 'fashion', 'home', 'beauty', 'sports', 'pets', 'toys'].map((item) => <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => { const next = new URLSearchParams(params); item ? next.set('category', item) : next.delete('category'); setParams(next); }}>{t(item ? categoryLabels[item] || item : 'all')}</button>)}</div>
    {query && <Link to="/products" className="clear-search">{t('clearSearch')}</Link>}
    {list.length ? <div className="product-grid catalog-grid">{list.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>{t('noResults')}</h2><Link to="/products" className="button">{t('viewAll')}</Link></div>}
  </div>;
}
