import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import { addCartItem, cartSubtotal, readStorage, writeStorage } from './shopUtils';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const { t } = useTranslation();
  const [cart, setCart] = useState(() => {
    const saved = readStorage('exclusive-cart', []);
    return Array.isArray(saved) ? saved.filter((item) => products.some((p) => p.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && typeof item.key === 'string') : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = readStorage('exclusive-wishlist', []);
    return Array.isArray(saved) ? [...new Set(saved)].filter((id) => products.some((p) => p.id === id)) : [];
  });
  const [toast, setToast] = useState('');

  useEffect(() => { writeStorage('exclusive-cart', cart); }, [cart]);
  useEffect(() => { writeStorage('exclusive-wishlist', wishlist); }, [wishlist]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  function addToCart(id, quantity = 1, size = 'M', color = '') {
    setCart((previous) => addCartItem(previous, id, quantity, size, color));
    setToast(t('addedCart'));
  }
  function toggleWishlist(id) {
    setWishlist((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }
  function moveWishlistToCart() {
    setCart((previous) => wishlist.reduce((result, id) => addCartItem(result, id), previous));
    setWishlist([]);
    setToast(t('addedCart'));
  }
  function updateQuantity(key, quantity) {
    if (!Number.isFinite(quantity)) return;
    setCart((previous) => previous.map((item) => item.key === key ? { ...item, quantity: Math.min(99, Math.max(1, Math.floor(quantity))) } : item));
  }

  return <ShopContext.Provider value={{
    cart, wishlist, toast, setToast, addToCart, toggleWishlist, moveWishlistToCart, updateQuantity,
    removeFromCart: (key) => setCart((previous) => previous.filter((item) => item.key !== key)),
    clearCart: () => setCart([]),
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cartSubtotal(cart, products),
  }}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
