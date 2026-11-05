import { mkdir, writeFile } from 'node:fs/promises';

// Figma namunasidagi mahsulotlarning ochiq joylangan rasmlari.
const base = 'https://raw.githubusercontent.com/M-Subhan-Ali/EcommerceFigma/main/src/Components/';
const images = {
  'controller-red.png': 'SalesTimer/images/img2.png',
  'keyboard.png': 'SalesTimer/images/img1.png',
  'monitor.png': 'SalesTimer/images/img3.png',
  'chair.png': 'SalesTimer/images/img4.png',
  'coat.png': 'BestSellingProducts/SellingImages/coat.png',
  'bag.png': 'BestSellingProducts/SellingImages/bag.png',
  'cooler.png': 'BestSellingProducts/SellingImages/speaker.png',
  'bookshelf.png': 'BestSellingProducts/SellingImages/desk.png',
  'dog-food.png': 'ExploreOurProduct/Images/dog.png',
  'camera.png': 'ExploreOurProduct/Images/camera.png',
  'laptop.png': 'ExploreOurProduct/Images/laptop.png',
  'cosmetics.png': 'ExploreOurProduct/Images/makeup.png',
  'car.png': 'ExploreOurProduct/Images/toyCar.png',
  'shoes.png': 'ExploreOurProduct/Images/soccer.png',
  'controller-black.png': 'ExploreOurProduct/Images/controller.png',
  'jacket.png': 'ExploreOurProduct/Images/jacket.png',
  'controller-white.png': 'ProductDetailPage/Images/mainC.png',
  'controller-1.png': 'ProductDetailPage/Images/c1.png',
  'controller-2.png': 'ProductDetailPage/Images/c2.png',
  'controller-3.png': 'ProductDetailPage/Images/c3.png',
  'controller-4.png': 'ProductDetailPage/Images/c4.png',
  'ps5.png': 'Arrival/Images/ps5.png',
  'speakers.png': 'Arrival/Images/speaker.png',
  'perfume.png': 'Arrival/Images/gucci.png',
  'qr.png': 'Footer/images/qrcode.png',
};
await mkdir('public/assets', { recursive: true });
await Promise.all(Object.entries(images).map(async ([name, path]) => {
  const response = await fetch(base + path);
  if (!response.ok) throw new Error(`Asset not found: ${name}`);
  await writeFile(`public/assets/${name}`, Buffer.from(await response.arrayBuffer()));
}));
console.log(`${Object.keys(images).length} assets downloaded.`);
