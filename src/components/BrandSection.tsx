import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Heart, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const brandValues = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'All our products are made from pure, natural ingredients — no chemicals, no artificial additives.',
  },
  {
    icon: Heart,
    title: 'Sunnah-Inspired',
    description: 'Every product is rooted in the teachings of the Prophet (PBUH), bringing Sunnah into modern life.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorously tested for purity and potency. Every batch meets our strict quality standards.',
  },
  {
    icon: Sparkles,
    title: 'Handcrafted Care',
    description: 'Each product is carefully crafted with love and attention, from sourcing to packaging.',
  },
];

export const BrandSection: React.FC = () => {
  return (
    <section className="relative bg-[#F4F7F2] py-20 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1A382B]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4CAF50]/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-8"
          >
            <span className="text-[#4CAF50] uppercase tracking-[0.3em] text-xs font-bold block">
              Our Brand
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-serif text-[#1A382B] leading-[1.05] tracking-tight">
              What is<br />Leaf & Lore?
            </h2>
            <div className="space-y-4 text-[#1A382B]/80 text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                <strong className="text-[#1A382B]">Leaf & Lore</strong> is an everyday rituals brand founded by Dr. Pooja Dhingra. We craft restorative botanical teas, strictly zero palm oil snacks, and handcrafted stoneware to help you pause and nourish your everyday life.
              </p>
              <p>
                Guided by Nature, Nourishment, Ritual, and Intention — our products invite you to return to the calm, intentional moments that matter most.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#1A382B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-[#0a3106] transition-all group text-sm sm:text-base"
            >
              Learn Our Story
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Hadith Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#1A382B] rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#4CAF50]/10 rounded-full" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center mb-6">
                  <Leaf size={24} className="text-[#4CAF50]" />
                </div>
                <blockquote className="text-white text-xl sm:text-2xl md:text-3xl font-serif leading-snug mb-6 italic">
                  "Make use of the two cures: honey and the Quran."
                </blockquote>
                <cite className="text-white/50 font-medium not-italic text-sm md:text-base block">
                  — Prophet Muhammad (PBUH), Ibn Majah
                </cite>

                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl font-bold text-white block">4</span>
                    <span className="text-white/40 text-xs">Products</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl font-bold text-white block">10K+</span>
                    <span className="text-white/40 text-xs">Happy Customers</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl font-bold text-white block">4.8</span>
                    <span className="text-white/40 text-xs">Avg Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Brand Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {brandValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[#1A382B]/5 hover:border-[#4CAF50]/20 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF5E8] flex items-center justify-center mb-4 group-hover:bg-[#1A382B] transition-colors">
                <value.icon size={24} className="text-[#1A382B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#1A382B] font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-[#1A382B]/60 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
