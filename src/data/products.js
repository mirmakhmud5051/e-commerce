export const products = [
  { id: 1, name: { en: 'HAVIT HV-G92 Gamepad', ru: 'Геймпад HAVIT HV-G92', uz: 'HAVIT HV-G92 geympadi' }, price: 120, oldPrice: 160, image: 'controller-red.png', category: 'gaming', rating: 5, reviews: 88, discount: 40 },
  { id: 2, name: { en: 'AK-900 Wired Keyboard', ru: 'Проводная клавиатура AK-900', uz: 'AK-900 simli klaviatura' }, price: 960, oldPrice: 1160, image: 'keyboard.png', category: 'computers', rating: 4, reviews: 75, discount: 35 },
  { id: 3, name: { en: 'IPS LCD Gaming Monitor', ru: 'Игровой монитор IPS LCD', uz: 'IPS LCD o‘yin monitori' }, price: 370, oldPrice: 400, image: 'monitor.png', category: 'computers', rating: 5, reviews: 99, discount: 30 },
  { id: 4, name: { en: 'S-Series Comfort Chair', ru: 'Кресло S-Series Comfort', uz: 'S-Series qulay kreslo' }, price: 375, oldPrice: 400, image: 'chair.png', category: 'home', rating: 4, reviews: 99, discount: 25 },
  { id: 5, name: { en: 'The North Coat', ru: 'Куртка The North', uz: 'The North kurtkasi' }, price: 260, oldPrice: 360, image: 'coat.png', category: 'fashion', rating: 5, reviews: 65 },
  { id: 6, name: { en: 'Gucci Duffle Bag', ru: 'Дорожная сумка Gucci', uz: 'Gucci sayohat sumkasi' }, price: 960, oldPrice: 1160, image: 'bag.png', category: 'fashion', rating: 5, reviews: 65 },
  { id: 7, name: { en: 'RGB Liquid CPU Cooler', ru: 'Жидкостный кулер RGB', uz: 'RGB protsessor sovutgichi' }, price: 160, oldPrice: 170, image: 'cooler.png', category: 'computers', rating: 5, reviews: 65 },
  { id: 8, name: { en: 'Small Bookshelf', ru: 'Небольшая книжная полка', uz: 'Kichik kitob javoni' }, price: 360, image: 'bookshelf.png', category: 'home', rating: 5, reviews: 65 },
  { id: 9, name: { en: 'Breed Dry Dog Food', ru: 'Сухой корм для собак Breed', uz: 'Breed itlar uchun quruq yem' }, price: 100, image: 'dog-food.png', category: 'pets', rating: 3, reviews: 35 },
  { id: 10, name: { en: 'CANON EOS DSLR Camera', ru: 'Фотоаппарат CANON EOS DSLR', uz: 'CANON EOS DSLR kamerasi' }, price: 360, image: 'camera.png', category: 'cameras', rating: 4, reviews: 95 },
  { id: 11, name: { en: 'ASUS FHD Gaming Laptop', ru: 'Игровой ноутбук ASUS FHD', uz: 'ASUS FHD o‘yin noutbuki' }, price: 700, oldPrice: 850, image: 'laptop.png', category: 'computers', rating: 5, reviews: 325 },
  { id: 12, name: { en: 'Curology Product Set', ru: 'Набор косметики Curology', uz: 'Curology kosmetika to‘plami' }, price: 500, image: 'cosmetics.png', category: 'beauty', rating: 4, reviews: 145 },
  { id: 13, name: { en: 'Kids Electric Car', ru: 'Детский электромобиль', uz: 'Bolalar elektromobili' }, price: 960, image: 'car.png', category: 'toys', rating: 5, reviews: 65, isNew: true, colors: ['#db4444', '#111'] },
  { id: 14, name: { en: 'Jr. Zoom Soccer Cleats', ru: 'Бутсы Jr. Zoom', uz: 'Jr. Zoom futbol butsasi' }, price: 1160, image: 'shoes.png', category: 'sports', rating: 5, reviews: 35, colors: ['#eeff61', '#db4444'] },
  { id: 15, name: { en: 'GP11 Shooter USB Gamepad', ru: 'USB-геймпад GP11 Shooter', uz: 'GP11 Shooter USB geympadi' }, price: 660, image: 'controller-black.png', category: 'gaming', rating: 4, reviews: 55, isNew: true, colors: ['#151515', '#db4444'] },
  { id: 16, name: { en: 'Quilted Satin Jacket', ru: 'Стёганая атласная куртка', uz: 'Atlas matoli qavilgan kurtka' }, price: 660, image: 'jacket.png', category: 'fashion', rating: 5, reviews: 55, colors: ['#17453d', '#db4444'] },
  { id: 17, name: { en: 'Havic HV G-92 Gamepad', ru: 'Геймпад Havic HV G-92', uz: 'Havic HV G-92 geympadi' }, price: 192, image: 'controller-white.png', gallery: ['controller-1.png', 'controller-2.png', 'controller-3.png', 'controller-4.png'], category: 'gaming', rating: 4, reviews: 150, colors: ['#a0bce0', '#db4444'] },
  { id: 18, name: { en: 'iPhone 14 Pro', ru: 'iPhone 14 Pro', uz: 'iPhone 14 Pro' }, price: 999, image: 'iphone.jpeg', category: 'phones', rating: 5, reviews: 210 },
  { id: 19, name: { en: 'JBL Boombox 2', ru: 'Колонка JBL Boombox 2', uz: 'JBL Boombox 2 karnayi' }, price: 299, image: 'jbl.png', category: 'headphones', rating: 5, reviews: 120 },
  { id: 20, name: { en: 'PlayStation 5', ru: 'Игровая консоль PlayStation 5', uz: 'PlayStation 5 o‘yin konsoli' }, price: 499, image: 'ps5.png', category: 'gaming', rating: 5, reviews: 180 },
  { id: 21, name: { en: 'GUCCI Intense Oud Perfume', ru: 'Парфюм GUCCI Intense Oud', uz: 'GUCCI Intense Oud atiri' }, price: 120, image: 'perfume.png', category: 'beauty', rating: 5, reviews: 64 },
];

export const productName = (product, language) => product.name[language] || product.name.en;
export const money = (number) => `$${Number(number).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
