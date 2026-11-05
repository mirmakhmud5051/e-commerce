export function addCartItem(cart, id, quantity = 1, size = 'M', color = '') {
  const key = `${id}-${size}-${color}`;
  const found = cart.find((item) => item.key === key);
  if (found) return cart.map((item) => item.key === key ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item);
  return [...cart, { key, id, quantity: Math.min(99, Math.max(1, quantity)), size, color }];
}

export function cartSubtotal(cart, products) {
  return cart.reduce((sum, item) => sum + (products.find((product) => product.id === item.id)?.price || 0) * item.quantity, 0);
}

export function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

export function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Xotira yopiq bo‘lsa ham sayt ishlaydi. */ }
}
