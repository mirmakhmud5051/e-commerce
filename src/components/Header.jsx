import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingCart, Search, UserRound, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { wishlist, cartCount } = useShop();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
    setMenuOpen(false);
  }

  return <>
    <div className="announcement">
      <div className="container announcement-inner">
        <p>{t('sale')} <Link to="/products">{t('shopNow')}</Link></p>
        <select aria-label="Language / Til / Язык" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option><option value="ru">Русский</option><option value="uz">O‘zbekcha</option>
        </select>
      </div>
    </div>
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>Exclusive</Link>
        <nav className={menuOpen ? 'navigation open' : 'navigation'} aria-label={t('menu')}>
          {[['/', 'home'], ['/contact', 'contact'], ['/about', 'about'], ['/signup', 'signup']].map(([url, key]) =>
            <NavLink key={key} to={url} onClick={() => setMenuOpen(false)}>{t(key === 'signup' && user ? 'account' : key)}</NavLink>)}
        </nav>
        <div className="header-tools">
          <form className="search-box" onSubmit={handleSearch}>
            <input aria-label={t('search')} placeholder={t('search')} value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="icon-button" aria-label={t('search')}><Search size={21} /></button>
          </form>
          <NavLink className="header-icon" to="/wishlist" aria-label={`${t('wishlist')} (${wishlist.length})`}>
            <Heart />{wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </NavLink>
          <NavLink className="header-icon" to="/cart" aria-label={`${t('cart')} (${cartCount})`}>
            <ShoppingCart />{cartCount > 0 && <span className="badge">{cartCount}</span>}
          </NavLink>
          <Link className="header-icon account-icon" to="/signup" aria-label={t('account')}><UserRound size={22} /></Link>
          <button className="icon-button mobile-menu" aria-label={menuOpen ? t('close') : t('menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  </>;
}
