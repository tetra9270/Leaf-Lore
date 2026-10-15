import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutUs: React.FC = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 text-[#1A382B] overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Left Column: Brand Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-left"
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block">
            About The Brand
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14221C] leading-tight tracking-tight">
            The Quiet Power of Everyday Rituals
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#2D3732] font-normal leading-relaxed">
            <p>
              Leaf &amp; Lore is a wellness studio built around the quiet power of everyday rituals. Rooted in nature, guided by wisdom, and crafted with intention, we create thoughtful products and experiences that bring presence, comfort, and meaning into daily life.
            </p>
            <p>
              Inspired by the wisdom found in nature, traditions, and the rituals passed down through generations, every creation is designed to make mindful living feel simple, beautiful, and approachable.
            </p>
            <p>
              We believe true well-being isn't about perfection or doing more. It is found in the small, intentional choices we return to each day — a warm cup, a nourishing bite, a quiet pause, or a moment to reconnect with ourselves.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link to="/about" className="px-7 py-3.5 rounded-full bg-[#1A382B] text-white hover:bg-[#12281E] text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2 group shadow-sm">
              <span>Read Full Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/Leaf and Lore catalogue .pdf"
              download
              className="text-xs font-medium text-[#1A382B] hover:text-[#12281E] underline underline-offset-4"
            >
              Download Catalogue (PDF)
            </a>
          </div>

          <div className="pt-6 border-t border-neutral-100">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1A382B]/60 block mb-1">
              Our Guiding Compass
            </span>
            <p className="font-serif text-base sm:text-lg font-bold text-[#14221C]">
              Nature • Nourishment • Ritual • Intention
            </p>
          </div>
        </motion.div>

        {/* Right Column: Visual Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-neutral-200/90 bg-[#FBFBFA]">
              <img src="/leafandlore/catalogue_hero_cover.png" alt="Leaf & Lore Catalogue" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm border border-neutral-200/90 bg-[#1A382B] p-4 flex flex-col justify-center text-white text-center">
              <span className="font-serif text-2xl font-bold text-white">100%</span>
              <span className="text-xs font-medium mt-1 text-white/80">Whole Plant Botanicals &amp; Zero Palm Oil</span>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm border border-neutral-200/90 bg-[#FBFBFA] p-3">
              <img src="/leafandlore/leaf_and_lore_dp.png" alt="Leaf & Lore Emblem" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-neutral-200/90 bg-[#FBFBFA]">
              <img src="/leafandlore/tea_collection_hero.png" alt="Leaf & Lore Teas" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
