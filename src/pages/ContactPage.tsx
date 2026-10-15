import React from 'react';
import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { Sparkles, Phone, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#FBFBFA] pt-20 sm:pt-24 min-h-screen">
      
      {/* Contact Hero */}
      <section className="relative py-16 sm:py-24 bg-[#1A382B] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C4A052_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C4A052]">
            Concierge &amp; Studio Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Contact Leaf &amp; Lore
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
            We are here to help with brewing rituals, orders, and custom care inquiries.
          </p>
        </div>
      </section>

      {/* Main Contact Component */}
      <Contact />

    </div>
  );
};

export default ContactPage;
