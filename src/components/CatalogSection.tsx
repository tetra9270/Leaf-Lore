import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronLeft, ChevronRight, BookOpen, ExternalLink, Sparkles, Check } from 'lucide-react';

interface CatalogPagePreview {
  pageNumber: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const catalogPages: CatalogPagePreview[] = [
  {
    pageNumber: 1,
    title: "Official Brand Catalogue",
    category: "Cover",
    image: "/leafandlore/catalogue_hero_cover.png",
    description: "Leaf & Lore 2026 Product Catalogue — Rituals for Everyday Living."
  },
  {
    pageNumber: 2,
    title: "About the Brand",
    category: "Philosophy",
    image: "/rendered_pages/page_2.png",
    description: "Rooted in nature, guided by wisdom, and crafted with intention. Our belief that well-being lives in everyday rituals."
  },
  {
    pageNumber: 3,
    title: "About the Founder",
    category: "Founder",
    image: "/rendered_pages/page_3.png",
    description: "Dr. Pooja Dhingra: Dental Surgeon, Public Health Professional, Author of Dear Tired Women & Founder of Leaf & Lore."
  },
  {
    pageNumber: 6,
    title: "Botanical Mini Trial Packs",
    category: "Teas",
    image: "/rendered_pages/page_6.png",
    description: "Her Balance, Midnight Petal, and Daily Debloat — crafted for women's wellness, slow evenings, and post-meal freshness."
  },
  {
    pageNumber: 7,
    title: "New Arrival Flower Teas",
    category: "Teas",
    image: "/rendered_pages/page_7.png",
    description: "Jasmine Tea Flower, Lemon Balm Herbal Infusion, and Hibiscus Tea Flower pouches."
  },
  {
    pageNumber: 9,
    title: "The Nourish Nook Snacks",
    category: "Snacks",
    image: "/rendered_pages/page_9.png",
    description: "Zero palm oil roasted makhana: Masala, Smoky BBQ, and Fresh Pudina Mint."
  },
  {
    pageNumber: 10,
    title: "Millet Crunch & Peri Peri",
    category: "Snacks",
    image: "/rendered_pages/page_10.png",
    description: "Peri Peri Makhana, Savoury Masala Ragi Chips, and Cream & Onion Ragi Chips."
  },
  {
    pageNumber: 11,
    title: "The Spice Ritual",
    category: "Rituals",
    image: "/rendered_pages/page_11.png",
    description: "Spiced to Soothe: Turmeric Milk Masala immunity blend and pure Ginger Infused Honey."
  },
  {
    pageNumber: 13,
    title: "The Earthy Edit Skincare",
    category: "Skincare",
    image: "/rendered_pages/page_13.png",
    description: "Botanical powders: Citrus Glow Orange Peel, Green Purity Neem, Pure Multani Mitti, and Rose Veil."
  },
  {
    pageNumber: 14,
    title: "Reading: Words to Sit With",
    category: "Reading",
    image: "/rendered_pages/page_14.png",
    description: "Dear Tired Women by Dr. Pooja Dhingra — thoughtful reflections for women carrying too much for too long."
  },
  {
    pageNumber: 15,
    title: "Drinkware: Sip in Style",
    category: "Drinkware",
    image: "/rendered_pages/page_15.png",
    description: "Tea For Two handcrafted fluted ceramic mugs presented in the signature keepsake box."
  },
  {
    pageNumber: 16,
    title: "Modern Loop Ceramic Mugs",
    category: "Drinkware",
    image: "/rendered_pages/page_16.png",
    description: "Matte-finish ceramic loop mugs in soft pink, warm beige, and olive green."
  },
  {
    pageNumber: 17,
    title: "Curated Hampers & Gifting",
    category: "Care Sets",
    image: "/rendered_pages/page_17.png",
    description: "Thoughtfully curated wellness hampers, artisanal blends, and keepsake sets crafted for memorable occasions."
  }
];

export const CatalogSection: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const activePage = catalogPages[currentPageIndex];

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev + 1) % catalogPages.length);
  };

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev - 1 + catalogPages.length) % catalogPages.length);
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#1A382B] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/70 block">
            Official 2026 Collection
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Explore the Leaf &amp; Lore Catalogue
          </h2>

          <p className="text-white/80 text-base sm:text-lg font-normal leading-relaxed">
            Flip through our official brand catalogue to explore our whole botanicals, mindful snack formulations with zero palm oil, and handcrafted stoneware.
          </p>

          <div className="pt-2">
            <a
              href="/Leaf and Lore catalogue .pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#1A382B] hover:bg-neutral-100 font-medium text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md group cursor-pointer"
            >
              <Download size={14} />
              <span>Download Official Catalogue (PDF)</span>
            </a>
          </div>
        </div>

        {/* Interactive Catalogue Flip Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-black/20 p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Left: Page Display Image */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[480px] aspect-[1/1.414] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-[#0F261D] group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePage.pageNumber}
                  src={activePage.image}
                  alt={activePage.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>

              {/* Navigation overlays on image */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C4A052] hover:text-[#1A382B] transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C4A052] hover:text-[#1A382B] transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white/90">
                Page {activePage.pageNumber} of 18
              </div>
            </div>
          </div>

          {/* Right: Page Context & Thumbnails */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C4A052]">
                {activePage.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {activePage.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {activePage.description}
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider block">Quick Jump</span>
              <div className="grid grid-cols-4 gap-2">
                {catalogPages.map((pg, idx) => (
                  <button
                    key={pg.pageNumber}
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`relative aspect-[1/1.4] rounded-lg overflow-hidden border-2 transition-all p-0.5 bg-black/40 ${
                      currentPageIndex === idx
                        ? 'border-[#C4A052] scale-105 shadow-md'
                        : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                    }`}
                  >
                    <img src={pg.image} alt={pg.title} className="w-full h-full object-cover rounded" />
                    <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-black/80 px-1 rounded text-white">
                      P.{pg.pageNumber}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct PDF Link */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>Have a Custom Order or Gifting Inquiry?</span>
              <a
                href="mailto:Hello.leafandlore@gmail.com?subject=Leaf%20and%20Lore%20Inquiry"
                className="text-[#C4A052] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Email Dr. Pooja &amp; Team</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CatalogSection;
