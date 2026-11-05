import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Info from './pages/Info';
import { useShop } from './context/ShopContext';

export default function App() {
  const { pathname } = useLocation();
  const { toast, setToast } = useShop();
  const { t } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <>
    <Header />
    <main><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Catalog />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<Info type="about" />} />
      <Route path="/info/:type" element={<Info />} />
      <Route path="*" element={<Info type="404" />} />
    </Routes></main>
    <Footer />
    {toast && <div className="toast" role="status"><Check size={20} /><span>{toast}</span><button className="icon-button" onClick={() => setToast('')} aria-label={t('close')}><X size={18} /></button></div>}
  </>;
}
