import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { ChevronRight, ArrowRight, ArrowLeft, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductCard from '../components/ProductCard';
import { SectionHeading, Benefits } from '../components/ShopUI';
import { products } from '../data/products';

function Countdown({ round = false }) {
  const { t } = useTranslation();
  const [deadline] = useState(() => Date.now() + 3 * 86400000 + 23 * 3600000 + 19 * 60000 + 56000);
  const [remaining, setRemaining] = useState(deadline - Date.now());
  useEffect(() => {
    const timer = setInterval(() => setRemaining(Math.max(0, deadline - Date.now())), 1000);
    return () => clearInterval(timer);
  }, [deadline]);
  const values = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  return <div className={round ? 'countdown round-countdown' : 'countdown'}>{['days', 'hours', 'minutes', 'seconds'].map((key, index) => <div key={key}><span>{t(key)}</span><strong>{String(values[index]).padStart(2, '0')}</strong></div>)}</div>;
}

export default function Home() {
  const { t } = useTranslation();
  const flashRef = useRef(null);
  const categoriesRef = useRef(null);
  const categories = [[Smartphone, 'phones'], [Monitor, 'computers'], [Watch, 'watches'], [Camera, 'cameras'], [Headphones, 'headphones'], [Gamepad2, 'gaming']];
  const sideLinks = [['women', 'fashion'], ['men', 'fashion'], ['electronics', 'computers'], ['homeCategory', 'home'], ['medicine', 'beauty'], ['sports', 'sports'], ['baby', 'toys'], ['pets', 'pets'], ['beauty', 'beauty']];
  const slides = [
    { tag: 'iphoneSeries', title: 'voucher', image: 'iphone.jpeg', id: 18, className: 'phone-slide' },
    { tag: 'gaming', title: 'gamingTitle', image: 'ps5.png', id: 20, className: 'console-slide' },
    { tag: 'headphones', title: 'soundTitle', image: 'jbl.png', id: 19, className: 'speaker-slide' },
  ];
  function Arrows({ target }) {
    return <div className="section-arrows"><button className="circle-arrow" aria-label={t('previous')} onClick={() => target.current?.scrollBy({ left: -300, behavior: 'smooth' })}><ArrowLeft size={22} /></button><button className="circle-arrow" aria-label={t('next')} onClick={() => target.current?.scrollBy({ left: 300, behavior: 'smooth' })}><ArrowRight size={22} /></button></div>;
  }

  return <div className="container homepage">
    <div className="hero-layout">
      <aside className="category-sidebar">{sideLinks.map(([label, category], index) => <Link key={label} to={`/products?category=${category}`}><span>{t(label)}</span>{index < 2 && <ChevronRight size={18} />}</Link>)}</aside>
      <Swiper className="hero-swiper" modules={[Autoplay, Pagination, A11y]} pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }} loop>
        {slides.map((slide, index) => <SwiperSlide key={slide.id}><div className={`hero-slide ${slide.className}`}><div className="hero-copy"><p>{index === 0 && <img src="/assets/apple-logo.png" alt="Apple" />}{t(slide.tag)}</p><h1>{t(slide.title)}</h1><Link to={`/product/${slide.id}`}>{t('shopNow')}<ArrowRight size={23} /></Link></div><img className="hero-product" src={`/assets/${slide.image}`} alt={products.find((p) => p.id === slide.id).name.en} /></div></SwiperSlide>)}
      </Swiper>
    </div>

    <section className="home-section flash-section">
      <SectionHeading label={t('today')} title={t('flashSales')}><Countdown /><Arrows target={flashRef} /></SectionHeading>
      <div className="product-scroll" ref={flashRef}>{[...products.slice(0, 4), products[16]].map((product) => <ProductCard key={product.id} product={product} />)}</div>
      <div className="section-bottom"><Link to="/products" className="button">{t('viewAll')}</Link></div>
    </section>

    <section className="home-section category-section">
      <SectionHeading label={t('categories')} title={t('browseCategory')}><Arrows target={categoriesRef} /></SectionHeading>
      <div className="category-grid" ref={categoriesRef}>{categories.map(([Icon, name]) => <Link key={name} to={`/products?category=${name}`} className={name === 'cameras' ? 'category-tile highlighted' : 'category-tile'}><Icon size={50} strokeWidth={1.3} /><span>{t(name)}</span></Link>)}</div>
    </section>

    <section className="home-section best-section">
      <SectionHeading label={t('thisMonth')} title={t('bestSelling')}><Link to="/products" className="button">{t('seeAll')}</Link></SectionHeading>
      <div className="product-grid">{products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>

    <section className="music-banner"><div className="music-copy"><p>{t('categories')}</p><h2>{t('music')}</h2><Countdown round /><Link to="/product/19" className="button green-button">{t('buyNow')}</Link></div><img src="/assets/jbl.png" alt="JBL Boombox 2" /></section>

    <section className="home-section explore-section">
      <SectionHeading label={t('ourProducts')} title={t('explore')}><Link to="/products" className="circle-arrow" aria-label={t('viewAll')}><ArrowRight size={22} /></Link></SectionHeading>
      <div className="product-grid">{products.slice(8, 16).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      <div className="section-bottom"><Link to="/products" className="button">{t('viewAll')}</Link></div>
    </section>

    <section className="home-section arrival-section">
      <SectionHeading label={t('featured')} title={t('newArrival')} />
      <div className="arrival-grid">
        <div className="arrival-tile arrival-ps5"><img src="/assets/ps5.png" alt="PlayStation 5" /><div><h3>PlayStation 5</h3><p>{t('playstationDesc')}</p><Link to="/product/20">{t('shopNow')}</Link></div></div>
        <div className="arrival-tile arrival-woman"><img src="/assets/woman.png" alt={t('womenCollection')} /><div><h3>{t('womenCollection')}</h3><p>{t('womenDesc')}</p><Link to="/products?category=fashion">{t('shopNow')}</Link></div></div>
        <div className="arrival-tile arrival-small"><img src="/assets/speakers.png" alt={t('speakers')} /><div><h3>{t('speakers')}</h3><p>{t('speakerDesc')}</p><Link to="/product/19">{t('shopNow')}</Link></div></div>
        <div className="arrival-tile arrival-small"><img src="/assets/perfume.png" alt={t('perfume')} /><div><h3>{t('perfume')}</h3><p>{t('perfumeDesc')}</p><Link to="/product/21">{t('shopNow')}</Link></div></div>
      </div>
    </section>
    <Benefits />
  </div>;
}
