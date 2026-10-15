import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Contact } from '../components/Contact';

const testimonials = [
  {
    id: 1,
    product: 'Her Balance Botanical Tea',
    rating: 5,
    quote: "I drink Her Balance every evening. The 17 botanicals have genuinely smoothed out my hormonal cycle and I wake up deeply rested. It has become my non-negotiable mindful pause after a long day.",
    author: 'Ananya S.',
    image: '/leafandlore/her_balance.png'
  },
  {
    id: 2,
    product: 'The Nourish Nook Roasted Makhana',
    rating: 5,
    quote: "Zero palm oil was what drew me in, and the crisp airy crunch kept me hooked. It is honest, light, and the only snack my family reaches for during afternoon study and work hours.",
    author: 'Priyanka K.',
    image: '/leafandlore/masala_makhana.png'
  },
  {
    id: 3,
    product: 'The Spice Ritual Duo',
    rating: 5,
    quote: "Golden milk with this turmeric blend and pure ginger-infused honey has completely replaced my evening caffeine. Rich, aromatic, soothing, and deeply grounding before sleep.",
    author: 'Dr. Radhika M.',
    image: '/leafandlore/turmeric_masala.png'
  },
  {
    id: 4,
    product: 'Tea For Two Fluted Ceramic Mugs',
    rating: 5,
    quote: "The tactile stoneware finish feels wonderful in hands. Drinking our morning loose-leaf brew together from these fluted mugs has become our favourite quiet ritual.",
    author: 'Sameer & Tina',
    image: '/leafandlore/tea_for_two_fluted_mugs.png'
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="bg-[#FBFBFA] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000"
            alt="Leaf & Lore Rituals Background"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1A382B]/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-[#C4A052] uppercase tracking-[0.4em] text-xs sm:text-sm font-semibold mb-3 block">
            Community Reflections
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-[#FBFBFA] tracking-tight">
            Voices of Mindful Living
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Real stories from our community embracing intentional pauses, restorative teas, and clean nourishment.
          </p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-3xl p-8 border border-[#1A382B]/10 shadow-[0_4px_30px_rgba(26,56,43,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#C4A052]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#C4A052" stroke="#C4A052" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-[#1A382B]/85 font-light leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-[#1A382B]/10">
                <img
                  src={item.image}
                  alt={item.product}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#1A382B]/10 bg-[#FBFBFA]"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A382B]">{item.author}</h3>
                  <p className="text-xs text-[#C4A052] font-semibold">{item.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default Testimonials;
