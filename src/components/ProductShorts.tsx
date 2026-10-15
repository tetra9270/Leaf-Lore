import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../lib/utils';

interface ProductShortsProps {
  shorts: string[];
}

function getThumbnailUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      let id = '';
      if (parsed.pathname.includes('/embed/')) {
        id = parsed.pathname.split('/embed/')[1]?.split('?')[0];
      } else if (parsed.pathname.includes('/shorts/')) {
        id = parsed.pathname.split('/shorts/')[1]?.split('?')[0];
      } else if (parsed.searchParams.has('v')) {
        id = parsed.searchParams.get('v') || '';
      } else {
        id = parsed.pathname.replace('/', '');
      }
      if (id) {
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    }
  } catch {}
  return null;
}

const ProductShortCard: React.FC<{
  url: string;
  index: number;
  isSingle?: boolean;
}> = ({ url, index, isSingle = false }) => {
  const [active, setActive] = useState(false);
  const isInstagram = /instagram\.com/i.test(url);
  const embedUrl = getYouTubeEmbedUrl(url, { autoplay: active });
  const thumbUrl = getThumbnailUrl(url);

  return (
    <div
      className={`${isSingle ? 'w-full max-w-[280px] sm:max-w-[320px] mx-auto' : 'w-[210px] flex-shrink-0'} rounded-[20px] md:rounded-[26px] overflow-hidden bg-[#1A382B] shadow-lg hover:shadow-2xl transition-all cursor-pointer relative group`}
      style={{ aspectRatio: '9/16' }}
      onClick={() => setActive(true)}
    >
      {active ? (
        <iframe
          src={isInstagram ? embedUrl : `${embedUrl}&autoplay=1`}
          title={`Product Video ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : isInstagram ? (
        <iframe
          src={embedUrl}
          title={`Instagram Reel ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="eager"
          className="w-full h-full border-0"
        />
      ) : (
        <div className="w-full h-full relative overflow-hidden bg-[#072404]">
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={`Video preview ${index + 1}`}
              loading="eager"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#0a3106] flex items-center justify-center">
              <Play size={26} className="text-white" fill="white" />
            </div>
          )}

          {/* Instant Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center group-hover:scale-115 transition-transform shadow-2xl">
              <Play size={22} className="text-white ml-0.5" fill="white" />
            </div>
          </div>

          {/* Bottom subtle gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  );
};

export const ProductShorts: React.FC<ProductShortsProps> = ({ shorts }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!shorts || shorts.length === 0) return null;

  // Single video (e.g. Combo product with only 1 Instagram reel)
  const isSingle = shorts.length === 1;

  // Repeat enough times to create a seamless infinite loop across all screen sizes
  let baseList = shorts;
  while (baseList.length < 6) {
    baseList = [...baseList, ...shorts];
  }
  const doubledShorts = [...baseList, ...baseList];

  return (
    <section
      className="bg-[#E4F0E2] py-16 md:py-24 overflow-hidden border-t border-[#1A382B]/5"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto text-center mb-10 md:mb-14 px-4 sm:px-6 md:px-12"
      >
        <span className="text-[#1A382B]/50 uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
          Real Results · Customer Stories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A382B] leading-tight max-w-3xl mx-auto">
          See the difference for yourself
        </h2>
        <p className="text-[#1A382B]/60 text-sm md:text-base mt-3 max-w-xl mx-auto">
          {isSingle
            ? 'Watch this special transformation & demonstration reel.'
            : 'Watch real customer transformations, reviews, and how-to-use videos.'}
        </p>
      </motion.div>

      {/* Video Display */}
      {isSingle ? (
        <div className="flex justify-center px-4">
          <ProductShortCard url={shorts[0]} index={0} isSingle={true} />
        </div>
      ) : (
        <div
          className="w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
        >
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-4 md:gap-6 w-max py-2"
              style={{
                animation: 'smoothScrollLeft 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {doubledShorts.map((url, i) => (
                <ProductShortCard
                  key={`${url}-${i}`}
                  url={url}
                  index={i}
                  isSingle={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductShorts;
