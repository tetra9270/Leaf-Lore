import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Leaf, ShieldCheck, Heart, Coffee } from 'lucide-react';

const featureList = [
  {
    title: "100% Whole Botanicals",
    description: "Every blend begins with whole, sun-dried flowers, leaves, and spices. Zero synthetic aromas, artificial colours, or dust-grade tea fillers.",
    icon: <Leaf className="text-[#1A382B]" size={28} />,
  },
  {
    title: "Strictly Zero Palm Oil",
    description: "Our roasted makhana and ragi chips are crafted with 0% palm oil. We never compromise on cardiovascular wellness for cheaper manufacturing shortcuts.",
    icon: <ShieldCheck className="text-[#1A382B]" size={28} />,
  },
  {
    title: "Doctor-Formulated Wisdom",
    description: "Guided by Dr. Pooja Dhingra's medical and public health background to support hormonal rhythm, gut debloating, and calm nervous systems.",
    icon: <Heart className="text-[#1A382B]" size={28} />,
  },
  {
    title: "Tactile Artisan Stoneware",
    description: "Designed for mindful rituals. Our handcrafted ceramic loop mugs and fluted Tea For Two sets bring warmth and personality to every cup.",
    icon: <Coffee className="text-[#1A382B]" size={28} />,
  },
];

export const Features: React.FC = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-28 px-4 sm:px-6 md:px-12 text-[#1A382B] overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col h-full text-left"
          >
            <div className="space-y-3 mb-8">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block">
                The Leaf &amp; Lore Standard
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#14221C] leading-[1.12] tracking-tight">
                Pure rituals crafted with ingredients you can trust.
              </h2>
              <p className="text-[#2D3732]/70 text-sm sm:text-base leading-relaxed">
                Rooted in nature, guided by wisdom, and crafted with intention. Every formulation is made to become part of the moments that gently shape how you live.
              </p>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-sm border border-neutral-200/90 bg-[#FBFBFA] p-4 flex items-center justify-center">
              <img
                src="/leafandlore/tea_collection_hero.png"
                alt="Leaf & Lore Pure Botanicals"
                loading="lazy"
                className="w-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right Column Features */}
          <div className="space-y-0 text-left">
            {featureList.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className={`flex gap-5 sm:gap-6 py-6 ${index !== featureList.length - 1 ? 'border-b border-neutral-100' : ''} group`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FBFBFA] flex items-center justify-center border border-neutral-200/80">
                  {feature.icon}
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#14221C]">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-sans text-[#2D3732]/75 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
