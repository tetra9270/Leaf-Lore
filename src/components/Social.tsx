import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Sparkles, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    product: "Her Balance – Women's Wellness Tea",
    text: "As someone struggling with hormonal fatigue and endless daily stress, Her Balance has become my non-negotiable 4 PM pause. The 17 botanicals are gentle, deeply soothing, and naturally caffeine-free.",
    author: "Ananya S., New Delhi",
    rating: 5.0,
    reviewsCount: "340+",
    image: "/leafandlore/her_balance.png",
    link: "/product/her-balance"
  },
  {
    id: 2,
    product: "The Nourish Nook – Masala Makhana",
    text: "Finding clean snacks with genuinely ZERO palm oil was nearly impossible until Leaf & Lore. The masala seasoning has the perfect savoury kick and the crunch is unreal. Our whole family is obsessed.",
    author: "Radhika M., Mumbai",
    rating: 4.9,
    reviewsCount: "280+",
    image: "/leafandlore/masala_makhana.png",
    link: "/product/masala-makhana"
  },
  {
    id: 3,
    product: "Tea For Two Ceramic Mug Set",
    text: "The fluted tactile feel of these mugs is pure craftsmanship. My partner and I use them every single morning for our quiet tea ritual. Beautiful packaging for gifting too!",
    author: "Priyanka & Rahul, Bengaluru",
    rating: 5.0,
    reviewsCount: "140+",
    image: "/leafandlore/tea_for_two_mugs.png",
    link: "/product/tea-for-two"
  },
  {
    id: 4,
    product: "The Spice Ritual Duo",
    text: "The golden turmeric masala whisked into warm oat milk with the ginger honey completely replaced my evening junk cravings. Warm, comforting, and nurturing for my immune system.",
    author: "Meera D., Gurgaon",
    rating: 5.0,
    reviewsCount: "310+",
    image: "/leafandlore/spice_ritual_combo.png",
    link: "/product/spice-ritual-duo"
  }
];

interface SocialProps {
  showGallery?: boolean;
}

export const Social: React.FC<SocialProps> = ({ showGallery = true }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const item = testimonials[currentIdx];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white border-t border-[#1A382B]/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[#C4A052] text-xs font-semibold tracking-widest uppercase block">
            Words From Our Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A382B] tracking-tight">
            Loved Across India
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="bg-[#FBFBFA] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#1A382B]/10 shadow-lg relative">
          <Quote className="absolute top-6 right-6 text-[#C4A052]/20 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Product image */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-white p-4 border border-[#1A382B]/10 shadow-sm flex items-center justify-center">
                <img src={item.image} alt={item.product} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Quote and Author */}
            <div className="md:col-span-8 text-left space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#C4A052] text-[#C4A052]" />
                ))}
                <span className="text-xs font-bold text-[#1A382B] ml-2">{item.rating} • {item.reviewsCount} Reviews</span>
              </div>

              <blockquote className="font-serif text-lg sm:text-2xl text-[#1A382B] leading-relaxed italic">
                "{item.text}"
              </blockquote>

              <div className="pt-2">
                <p className="font-bold text-sm text-[#1A382B]">{item.author}</p>
                <Link to={item.link} className="text-xs font-semibold text-[#C4A052] hover:underline">
                  Verified Buyer • {item.product}
                </Link>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1A382B]/10">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-[#1A382B]/20 flex items-center justify-center hover:bg-[#1A382B] hover:text-white transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-[#1A382B]/20 flex items-center justify-center hover:bg-[#1A382B] hover:text-white transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} />
                </button>
                <span className="text-xs text-[#1A382B]/50 ml-2">
                  {currentIdx + 1} of {testimonials.length}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Social;
