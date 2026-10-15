import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ComboBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1A382B] text-white shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 md:p-14">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70 block">
                The Spice Ritual Duo • Curated Pair
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                Spiced to Soothe.
              </h2>

              <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
                A warm and comforting duo designed to bring natural goodness to your everyday wellness rituals. High-curcumin golden turmeric and aromatic whole spices meet the gentle nectar of raw ginger-infused honey.
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/15 text-sm">
                <div>
                  <span className="font-semibold text-white block text-sm sm:text-base">Turmeric Milk Masala</span>
                  <span className="text-white/60 text-xs">150g • Traditional Immunity Blend</span>
                </div>
                <div>
                  <span className="font-semibold text-white block text-sm sm:text-base">Ginger Infused Honey</span>
                  <span className="text-white/60 text-xs">55g • Pure Wildflower Honey</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/product/spice-ritual-duo"
                  className="px-8 py-3.5 rounded-full bg-white text-[#1A382B] hover:bg-neutral-100 text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Shop Ritual Pair • ₹650</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <span className="text-xs text-white/60">
                  Save 18% compared to individual purchase
                </span>
              </div>
            </div>

            {/* Right Product Image */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5">
                <img 
                  src="/leafandlore/spice_ritual_combo.png" 
                  alt="Leaf & Lore Spice Ritual - Turmeric Milk Masala and Ginger Infused Honey" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComboBanner;
