import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Founder Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-[#FBFBFA]">
              <img
                src="/leafandlore/founder_dr_pooja.png"
                alt="Dr. Pooja Dhingra - Founder of Leaf & Lore"
                className="w-full aspect-[4/5] object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Subtle Credentials Badge */}
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-[#1A382B] text-white p-4 sm:p-5 rounded-xl shadow-lg border border-white/10 max-w-[220px] text-left">
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/60 font-semibold block mb-0.5">Author of</span>
              <span className="font-serif text-sm font-semibold italic block">Dear Tired Women</span>
              <span className="text-[11px] text-white/70 mt-1 block">Reflections for modern women</span>
            </div>
          </motion.div>

          {/* Founder Text & Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block">
              About the Founder
            </span>

            <div className="space-y-1.5">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14221C] leading-tight tracking-tight">
                Dr. Pooja Dhingra
              </h2>
              <p className="text-xs font-semibold tracking-wider text-[#1A382B]/70 uppercase">
                Dental Surgeon • Public Health Professional • Women’s Wellness Coach • Author • Founder, Leaf &amp; Lore
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#2D3732] leading-relaxed font-normal">
              <p>
                Dr. Pooja Dhingra’s journey spans dental surgery, public health, women’s wellness, nutrition, and authorship—shaped by a conviction that well-being should be intentional, accessible, and grounded in everyday life.
              </p>
              <p>
                Her clinical work with women and deep understanding of preventative health led her to explore wellness beyond conventional remedies—towards pure nourishment, nature, self-care, and the mindful rituals that gently shape how we live.
              </p>
              <p>
                She is also the author of <em>Dear Tired Women</em>, a book of reflections for women carrying too much for too long. Leaf &amp; Lore is the natural expression of that vision: bringing together botanical teas, wholesome foods with strictly zero palm oil, and tactile objects for the home.
              </p>
            </div>

            {/* Core Philosophy Pull-quote */}
            <div className="p-6 rounded-xl bg-[#FBFBFA] border-l-2 border-[#1A382B] space-y-2">
              <p className="font-serif italic text-base sm:text-lg text-[#14221C] leading-relaxed">
                "We believe true well-being isn't about perfection or doing more. It is found in the small, intentional choices we return to each day—a warm cup, a nourishing bite, a quiet pause, or a moment to reconnect with ourselves."
              </p>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block pt-1">
                Nature • Nourishment • Ritual • Intention
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/product/dear-tired-women"
                className="px-7 py-3.5 rounded-full bg-[#1A382B] text-white hover:bg-[#12281E] text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2 group shadow-sm"
              >
                <BookOpen size={14} />
                <span>Explore Dear Tired Women</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-7 py-3.5 rounded-full border border-neutral-300 text-[#1A382B] hover:border-[#1A382B] text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300"
              >
                Read Full Brand Story
              </Link>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;
