# Exclusive — React amaliy ish

`images/` papkasidagi 7 ta namuna asosida tayyorlangan internet-do‘kon. Oddiy JavaScript, React va CSS ishlatilgan. TypeScript, Tailwind yoki tayyor UI shablon ishlatilmagan.

## Ishga tushirish

Node.js 22.12 yoki undan yangi versiya tavsiya qilinadi.

```bash
npm install
npm run dev
```

Terminalda chiqqan manzilni brauzerda oching. Odatda: **http://localhost:5173**. Google orqali kirish uchun `localhost` manzilidan foydalaning.

Windows PowerShell `npm.ps1` xatosini chiqarsa, quyidagilarni ishlating:

```powershell
npm.cmd install
npm.cmd run dev
```

Tayyor build va testlar:

```bash
npm run build
npm run preview
npm test
```

`dist/` — tayyor sayt. Hostingga joylansa, SPA uchun barcha sahifa manzillarini `index.html` ga yo‘naltirish kerak.

## Nimalar ishlaydi?

- Bosh sahifada 3 ta slayddan iborat bitta Swiper: avtomatik almashish, surish va nuqtalar orqali tanlash.
- Har bir mahsulotning alohida tafsilot sahifasi. Oq geympadda 4 ta qo‘shimcha rasm mavjud.
- Wishlistga mahsulot qo‘shish, o‘chirish va barchasini savatga o‘tkazish.
- Savatga qo‘shish, sonini o‘zgartirish va o‘chirish. Narxlar darhol qayta hisoblanadi.
- Rang yoki o‘lchami boshqa mahsulotlar savatda alohida saqlanadi.
- Ingliz, rus va o‘zbek tillari: menyu, formalar, xabarlar va mahsulot nomlari tarjima qilingan.
- Mahsulotlarni uchala tildagi nomi bo‘yicha qidirish va kategoriya bo‘yicha saralash.
- `EXCLUSIVE10` kuponi bilan 10% chegirma.
- Buyurtma formasi, majburiy maydonlar va sinov buyurtmasi tasdig‘i.
- Firebase orqali email/parol bilan ro‘yxatdan o‘tish, kirish, chiqish va Google orqali kirish.
- Aloqa formasi va telefonlarga mos menyu.
- Savat, wishlist va tanlangan til brauzer yangilanganda saqlanadi.

## Kodni tushuntirish

```text
src/
  main.jsx                — React ilovasini ishga tushiradi
  App.jsx                 — React Router orqali sahifalarni tanlaydi
  i18n.js                 — en, ru va uz tarjimalar
  firebase.js             — Firebase konfiguratsiyasi, Auth va Analytics
  styles.css              — dizayn va media querylar
  data/products.js        — mahsulotlar ro‘yxati
  context/
    AuthContext.jsx       — Firebase foydalanuvchisi va hisobni tiklash
    authErrors.js         — Firebase xatolari uchun tarjima kalitlari
    ShopContext.jsx       — savat va wishlist uchun umumiy state
    shopUtils.js          — savat hisob-kitobi va localStorage yordamchilari
  components/             — Header, Footer, ProductCard va umumiy qismlar
  pages/                  — Home, Product, Wishlist, Cart va boshqa sahifalar
public/assets/            — mahsulot rasmlari va shriftlar
tests/cart.test.js        — savatning 6 ta asosiy testi
tests/auth.test.js        — kirish xabarlari uchun 4 ta test
```

**SPA**: havolaga bosilganda React Router kerakli komponentni chiqaradi. Brauzer yangi HTML hujjatni yuklamaydi.

**useState**: mahsulot soni, tanlangan rang, formalar va savat holatini saqlaydi.

**Context**: savat va wishlistni Header, kartalar hamda sahifalar o‘rtasida ulashadi. Masalan, mahsulot qo‘shilganda Headerdagi hisoblagich ham yangilanadi.

**useEffect**: savat yoki wishlist o‘zgarsa, ularni `localStorage` ga yozadi. Qayta ochilganda saqlangan ma’lumot o‘qiladi.

**i18next**: `t('home')` tanlangan tilga qarab “Home”, “Главная” yoki “Bosh sahifa” matnini qaytaradi.

**Firebase Auth**: `createUserWithEmailAndPassword` hisob yaratadi, `signInWithEmailAndPassword` hisobga kiritadi, `signInWithPopup` Google oynasini ochadi. `onAuthStateChanged` kirilgan foydalanuvchini kuzatadi. Parolni dasturimiz `localStorage` ga yozmaydi; kirish holatini Firebase SDK boshqaradi.

**map**: mahsulotlar ro‘yxatidan kartalarni yaratadi. **filter** esa qidiruv va mahsulot o‘chirishda ishlatiladi.

## Firebase sozlamalari

Loyiha `exclusive-7a83c` Firebase loyihasiga ulangan. Firebase Console’da quyidagilarni tekshiring:

1. **Authentication → Sign-in method** bo‘limida **Email/Password** ni yoqing.
2. Shu bo‘limda **Google** ni yoqing, loyiha uchun support email tanlang va saqlang.
3. **Authentication → Settings → Authorized domains** bo‘limida `localhost` mavjud. Agar `127.0.0.1` yoki boshqa hosting manzilidan foydalansangiz, o‘sha domenni ham qo‘shing. Port raqami domen ro‘yxatiga yozilmaydi.

Firebase konfiguratsiyasi `src/firebase.js` ichida. Google Analytics faqat production buildda (`npm run build` va `npm run preview`), brauzer uni qo‘llab-quvvatlasa ishga tushadi. `npm run dev` paytida Analytics ishga tushmaydi.

Oldingi mahalliy demo hisoblar Firebase hisobiga avtomatik ko‘chirilmaydi. Firebase orqali yangidan ro‘yxatdan o‘ting.

Rasmiy yo‘riqnomalar: [Email/Password](https://firebase.google.com/docs/auth/web/password-auth), [Google orqali kirish](https://firebase.google.com/docs/auth/web/google-signin).

## Demo qismlari

Hisobga kirish Firebase Authentication orqali ishlaydi. Savat, wishlist, buyurtmalar va aloqa xabarlari shu brauzerda saqlanadi; Firestore ulanmagan. Haqiqiy to‘lov tizimi ulanmagan. Bank tugmasi bu holatni tushuntiradi.

Footer ilova do‘konlarining umumiy sahifalariga olib boradi; ushbu o‘quv loyihasining mobil ilovasi yo‘q.

## Kutubxonalar va rasmlar

React, React Router, react-i18next/i18next, Swiper, Lucide React va Firebase. Vite loyihani ishga tushirish va build qilish uchun ishlatilgan.

Namuna: foydalanuvchi bergan Exclusive dizayni. Mahsulot rasmlari dizaynni takrorlash uchun ochiq repozitoriylardan olingan:

- [M-Subhan-Ali / EcommerceFigma](https://github.com/M-Subhan-Ali/EcommerceFigma)
- [abhiWeb43 / exclusiveEcommerce](https://github.com/abhiWeb43/exclusiveEcommerce)
- [ahrafi16 / Exclusive](https://github.com/ahrafi16/Exclusive)
- [Google Fonts: Poppins va Inter](https://github.com/google/fonts)

Rasmlar va shriftlar loyiha ichida saqlangan. Shrift litsenziyalari `public/assets/` ichida.
