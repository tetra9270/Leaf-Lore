import React from 'react';
import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import ProductVideos from '../components/ProductVideos';
import { Play } from 'lucide-react';

const videos = [
  {
    id: 'ig-1',
    url: 'https://www.instagram.com/reel/DdTXCGxSzIB/embed',
    title: 'Leaf & Lore Botanical Ritual'
  },
  {
    id: 'ig-2',
    url: 'https://www.instagram.com/reel/DdGhKUkSbaD/embed',
    title: 'Her Balance Tea - Hormonal Harmony'
  },
  {
    id: 'ig-3',
    url: 'https://www.instagram.com/reel/DdDrhm5y_eh/embed',
    title: 'The Nourish Nook - Zero Palm Oil Makhana'
  },
  {
    id: 'ig-4',
    url: 'https://www.instagram.com/reel/Dcv8WScNUPM/embed',
    title: 'The Spice Ritual - Golden Turmeric Masala'
  },
  {
    id: 1,
    url: 'https://www.youtube.com/embed/8uMJ3udSFWQ',
    title: 'Leaf & Lore Moments 1'
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/XyL0XCtb-mg',
    title: 'Leaf & Lore Moments 2'
  },
  {
    id: 3,
    url: 'https://www.youtube.com/embed/MlE_gocKF58',
    title: 'Leaf & Lore Moments 3'
  },
  {
    id: 4,
    url: 'https://www.youtube.com/embed/Cv2onSs7kC8',
    title: 'Leaf & Lore Moments 4'
  },
  {
    id: 5,
    url: 'https://www.youtube.com/embed/10bGSnWWAJQ',
    title: 'Leaf & Lore Moments 5'
  }
];

export const Videos: React.FC = () => {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542838686-37ed7a9ef387?auto=format&fit=crop&q=80&w=2000"
            alt="Videos Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]/80" />
        </div>
        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/50 uppercase tracking-[0.4em] text-xs font-medium mb-4 block"
          >
            Our Media
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-serif text-white tracking-tight leading-none px-4"
          >
            Videos
          </motion.h1>
        </div>
      </section>

      {/* Intro Text Section */}
      {/* <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-center max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-[36px] md:text-[54px] font-serif text-[#1a1a1a] leading-tight"
        >
          Trusted by thousands of happy customers
          <br className="hidden md:block" />
          <span className="inline-block mt-2 text-[#1a1a1a]/60">— earned through our dedication to</span>
          <br className="hidden md:block" />
          <span className="inline-block mt-2 text-[#1a1a1a]/60">transparency and quality.</span>
        </motion.h2>
      </section> */}

      {/* Watch & Shop Section */}
      <ProductVideos />

      {/* Shorts Section Header */}
      <section className="pt-16 md:pt-24 pb-4 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#1a1a1a]/40 uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Short Reels
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
            Quick Glimpses
          </h2>
          <p className="text-[#1a1a1a]/50 text-sm md:text-base max-w-xl mx-auto">
            Watch our short product reels for quick insights into what makes Leaf & Lore rituals special
          </p>
        </motion.div>
      </section>

      {/* Videos Grid */}
      <section className="px-4 sm:px-6 md:px-12 pb-16 md:pb-24 pt-8 md:pt-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden bg-[#111] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              style={{ aspectRatio: '9/16' }}
            >
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <Contact />
    </div>
  );
};

export default Videos;
