import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  tag: string;
  likes: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: 'post-1',
    image: '/leafandlore/her_balance.png',
    caption: 'For the woman who pours into everyone else. Steep. Pause. Pour back into yourself.',
    tag: '#HerBalance',
    likes: '1.2k'
  },
  {
    id: 'post-2',
    image: '/leafandlore/masala_makhana.png',
    caption: 'Crispy roasted makhana with zero palm oil. Real crunch without shortcuts.',
    tag: '#TheNourishNook',
    likes: '840'
  },
  {
    id: 'post-3',
    image: '/leafandlore/tea_for_two_mugs.png',
    caption: 'Because some conversations deserve real mugs, not just messages.',
    tag: '#TeaForTwo',
    likes: '1.5k'
  },
  {
    id: 'post-4',
    image: '/leafandlore/spice_ritual_combo.png',
    caption: 'The Spice Ritual: Earthy turmeric meets warming ginger-infused raw honey.',
    tag: '#SpiceRitual',
    likes: '960'
  },
  {
    id: 'post-5',
    image: '/leafandlore/dear_tired_women_book.png',
    caption: 'Words to Sit With: Dr. Pooja Dhingra on making space for stillness.',
    tag: '#DearTiredWomen',
    likes: '2.1k'
  },
  {
    id: 'post-6',
    image: '/leafandlore/citrus_glow.png',
    caption: 'The Earthy Edit: Pure botanical powders for gentle self-care rituals.',
    tag: '#TheEarthyEdit',
    likes: '720'
  }
];

export const SmoothSocialSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 text-left gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block">
              @leafandlore__ • Instagram
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14221C] tracking-tight">
              Moments of Mindful Living
            </h2>
            <p className="text-[#2D3732]/70 text-sm sm:text-base max-w-xl">
              Join our community of women, tea lovers, and slow-living enthusiasts for daily brewing notes, wellness rituals, and author reflections.
            </p>
          </div>

          <a
            href="https://www.instagram.com/leafandlore__/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1A382B] text-[#1A382B] hover:bg-[#1A382B] hover:text-white text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 group self-start sm:self-end"
          >
            <Instagram size={14} />
            <span>Follow @leafandlore__</span>
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Instagram Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/leafandlore__/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.45 }}
              whileHover={{ y: -3 }}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-[#FBFBFA] border border-neutral-200/80 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Minimalist Hover Overlay */}
              <div className="absolute inset-0 bg-[#1A382B]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white text-left">
                <div className="flex items-center justify-between text-white/80">
                  <Instagram size={16} />
                  <div className="flex items-center gap-1 text-[11px]">
                    <Heart size={11} className="fill-white text-white" />
                    <span>{post.likes}</span>
                  </div>
                </div>
                <p className="text-[11px] leading-tight line-clamp-3 text-white/90 font-normal">
                  {post.caption}
                </p>
                <span className="text-[9px] font-semibold text-white/70 uppercase tracking-widest">
                  {post.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SmoothSocialSection;
