import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  primaryLink: string;
  primaryLabel: string;
  secondaryLink?: string;
  secondaryLabel?: string;
  tabLabel: string;
}

const heroSlides: HeroSlide[] = [
  {
    tag: "Official 2026 Collection • Curated by Dr. Pooja Dhingra",
    title: "Rituals for Everyday Living.",
    subtitle: "A thoughtfully curated collection of whole-plant botanical teas, clean roasted snacks with zero palm oil, and handcrafted stoneware for quiet, intentional pauses.",
    image: "/leafandlore/catalogue_hero_cover.png",
    primaryLink: "/shop",
    primaryLabel: "Explore All Rituals",
    secondaryLink: "/Leaf and Lore catalogue .pdf",
    secondaryLabel: "Download 2026 Catalogue",
    tabLabel: "Catalogue"
  },
  {
    tag: "Her Balance • Midnight Petal • Daily Debloat",
    title: "Brewed for Your Daily Pause.",
    subtitle: "Formulated with 17 whole botanicals, gentle adaptogens, and shade-dried flower petals to nourish hormonal rhythm, digestion, and restful sleep.",
    image: "/leafandlore/tea_collection_hero.png",
    primaryLink: "/shop?cat=Teas",
    primaryLabel: "Shop Botanical Teas",
    secondaryLink: "/product/her-balance",
    secondaryLabel: "Discover Her Balance",
    tabLabel: "Botanical Teas"
  },
  {
    tag: "The Nourish Nook • Strictly Zero Palm Oil",
    title: "The Feel-Good Munch.",
    subtitle: "Crispy roasted makhana and nutrient-rich ragi chips with zero palm oil. Real ingredients, aromatic spices, and complete peace of mind.",
    image: "/leafandlore/masala_makhana.png",
    primaryLink: "/shop?cat=Snacks",
    primaryLabel: "Shop Clean Snacks",
    secondaryLink: "/product/masala-makhana",
    secondaryLabel: "Explore Makhana Jars",
    tabLabel: "Nourish Nook"
  },
  {
    tag: "The Spice Ritual • Turmeric Masala & Ginger Honey",
    title: "Spiced to Soothe.",
    subtitle: "An earthy, comforting pair uniting high-curcumin Lakadong turmeric and raw wildflower honey with warming ginger. Formulated for daily vitality.",
    image: "/leafandlore/spice_ritual_combo.png",
    primaryLink: "/product/spice-ritual-duo",
    primaryLabel: "Shop Ritual Pair",
    secondaryLink: "/shop?cat=Rituals",
    secondaryLabel: "Explore Spice Blends",
    tabLabel: "Spice Ritual"
  },
  {
    tag: "Artisan Drinkware • Handcrafted Ceramic Mugs",
    title: "Tea For Two Gift Set.",
    subtitle: "Because some conversations deserve real mugs, not just messages. Fluted matte stoneware handcrafted for slow, contemplative tea moments.",
    image: "/leafandlore/tea_for_two_mugs.png",
    primaryLink: "/product/tea-for-two",
    primaryLabel: "Shop Tea For Two",
    secondaryLink: "/shop?cat=Drinkware",
    secondaryLabel: "View All Stoneware",
    tabLabel: "Drinkware"
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-white text-[#1A382B] overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Main Grid: Asymmetrical Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[500px]">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left order-2 lg:order-1">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* Eyebrow / Tag */}
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#1A382B]/60">
                  {slide.tag}
                </p>

                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[58px] font-bold text-[#14221C] leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#2D3732] font-normal leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={slide.primaryLink}
                    className="px-8 py-3.5 rounded-full bg-[#1A382B] text-white hover:bg-[#12281E] text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2 group shadow-sm"
                  >
                    <span>{slide.primaryLabel}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {slide.secondaryLink && (
                    slide.secondaryLink.endsWith('.pdf') ? (
                      <a
                        href={slide.secondaryLink}
                        download
                        className="px-8 py-3.5 rounded-full border border-[#1A382B]/30 hover:border-[#1A382B] text-[#1A382B] hover:bg-[#1A382B] hover:text-white text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2"
                      >
                        <Download size={13} />
                        <span>{slide.secondaryLabel}</span>
                      </a>
                    ) : (
                      <Link
                        to={slide.secondaryLink}
                        className="px-8 py-3.5 rounded-full border border-[#1A382B]/30 hover:border-[#1A382B] text-[#1A382B] hover:bg-[#1A382B] hover:text-white text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2"
                      >
                        <span>{slide.secondaryLabel}</span>
                        <ArrowRight size={13} />
                      </Link>
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Slide Switcher Tabs */}
            <div className="flex items-center gap-2 pt-6 border-t border-neutral-100 overflow-x-auto hide-scrollbar">
              {heroSlides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`text-xs font-medium tracking-wider uppercase px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-[#1A382B] text-white'
                      : 'text-[#1A382B]/60 hover:text-[#1A382B] hover:bg-neutral-100'
                  }`}
                >
                  {s.tabLabel}
                </button>
              ))}

              <div className="flex items-center gap-1.5 ml-auto pl-4">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-[#1A382B] hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-[#1A382B] hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#FBFBFA] border border-neutral-200/90 shadow-sm p-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Minimalist Floating Brand Seal */}
              <div className="absolute bottom-4 right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-white shadow-md ring-1 ring-neutral-200 z-20">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#12281E]">
                  <img 
                    src="/leafandlore/leaf_and_lore_dp.png" 
                    alt="Leaf & Lore Emblem" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              {/* Subtle Catalogue Edition Label */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-200 text-[10px] font-medium tracking-widest uppercase text-[#1A382B]/80">
                Leaf &amp; Lore • 2026
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist 4-Pillar Trust Strip */}
        <div className="mt-16 pt-10 border-t border-neutral-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#1A382B] block">
              100% Botanicals
            </span>
            <span className="text-xs text-[#2D3732]/70 block leading-relaxed">
              Shade-dried pure whole leaves &amp; blossoms.
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#1A382B] block">
              Zero Palm Oil
            </span>
            <span className="text-xs text-[#2D3732]/70 block leading-relaxed">
              Clean roasted makhana &amp; ragi chips.
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#1A382B] block">
              Doctor-Formulated
            </span>
            <span className="text-xs text-[#2D3732]/70 block leading-relaxed">
              Guided by Dr. Pooja Dhingra's background.
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#1A382B] block">
              Artisan Stoneware
            </span>
            <span className="text-xs text-[#2D3732]/70 block leading-relaxed">
              Handcrafted ceramic fluted tea mugs.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
