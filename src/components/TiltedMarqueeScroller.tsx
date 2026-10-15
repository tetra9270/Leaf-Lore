import React from 'react';

export interface MarqueeItem {
  text: string;
}

interface TiltedMarqueeScrollerProps {
  items?: MarqueeItem[];
  tiltAngle?: string;
  bgColor?: string;
  textColor?: string;
  speedSeconds?: number;
}

const defaultItems: MarqueeItem[] = [
  { text: '100% WHOLE PLANT BOTANICALS' },
  { text: 'STRICTLY ZERO PALM OIL' },
  { text: 'DOCTOR-FORMULATED BY DR. POOJA DHINGRA' },
  { text: 'AUTHENTIC SHADE-DRIED HERBAL INFUSIONS' },
  { text: 'HANDCRAFTED ARTISAN STONEWARE' },
  { text: 'COMPLIMENTARY SHIPPING ON PREPAID ORDERS' },
  { text: 'OFFICIAL 2026 CATALOGUE COLLECTION' },
  { text: 'RITUALS FOR EVERYDAY LIVING' },
];

export const TiltedMarqueeScroller: React.FC<TiltedMarqueeScrollerProps> = ({
  items = defaultItems,
  bgColor = 'bg-white',
  textColor = 'text-[#1A382B]',
  speedSeconds = 90,
}) => {
  const marqueeList = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden ${bgColor} ${textColor} py-4 border-y border-neutral-200/80 select-none relative z-10`}>
      <div className="flex overflow-hidden whitespace-nowrap">
        <div 
          className="flex items-center gap-10 sm:gap-14 shrink-0 animate-slow-marquee"
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {marqueeList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase">
              <span>{item.text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A382B]/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiltedMarqueeScroller;
