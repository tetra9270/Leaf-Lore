import React from 'react';
import { motion } from 'motion/react';
import talbina from '../talbina.webp';
import shampoo from '../shampoo.webp';
import soap from '../soap.webp';
import kalonji from '../kalonji.webp';
import talbina2 from '../talb2.jpeg';
import talbina3 from '../talb3.jpeg';
import talbina4 from '../talb4.jpeg';
import talbina5 from '../talb5.jpeg';
import talbina6 from '../talb6.jpeg';
import shampoo2 from '../shampoo2.jpeg';
import soap2 from '../soap2.jpeg';

const galleryImages = [
  talbina,
  shampoo,
  soap,
  kalonji,
  talbina2,
  talbina3,
  talbina4,
  talbina5,
  talbina6,
  shampoo2,
  soap2,
];

export const Gallery: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 md:mt-32 text-center bg-[#FAFCF9] py-16 md:py-24 -mx-0 px-4 rounded-3xl"
    >
      <span className="text-primary/60 uppercase tracking-widest text-sm font-medium mb-4 block">Gallery</span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif mb-8 md:mb-16 tracking-tight">Crafted With Care</h2>

      <div className="overflow-hidden w-full">
        <div className="flex gap-4 animate-scroll">
          {[...galleryImages, ...galleryImages].map((img, index) => (
            <div key={index} className="flex-shrink-0 w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 overflow-hidden group rounded-2xl bg-[#e8efe6]">
              <img
                src={img}
                alt={`Leaf & Lore Ritual ${(index % galleryImages.length) + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
