import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { FounderSection } from '../components/FounderSection';
import { Features } from '../components/Features';
import { Link } from 'react-router-dom';

const Learn: React.FC = () => {
  return (
    <div className="bg-white pt-20 sm:pt-24 text-[#1A382B]">
      
      {/* Hero Banner */}
      <section className="relative w-full py-20 sm:py-28 flex items-center justify-center overflow-hidden bg-[#1A382B] text-white text-center">
        <div className="relative z-10 max-w-4xl px-4 space-y-4">
          <span className="text-white/70 uppercase tracking-[0.25em] text-[11px] font-semibold block">
            The Philosophy of Leaf &amp; Lore
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white">
            Rituals for Everyday Living
          </h1>
          <p className="text-white/80 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Rooted in nature, guided by wisdom, and crafted with intention.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a
              href="/Leaf and Lore catalogue .pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1A382B] text-xs font-medium uppercase tracking-wider hover:bg-neutral-100 transition-all shadow-sm"
            >
              <Download size={13} />
              <span>Download 2026 Catalogue (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Brand Story In-Depth */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto text-left">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1A382B]/60 block">The Genesis</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14221C] leading-tight tracking-tight">
              Reconnecting with the Moments That Gently Shape How We Live
            </h2>
          </div>

          <div className="prose prose-lg text-[#2D3732] space-y-6 leading-relaxed font-normal">
            <p className="text-lg sm:text-xl text-[#14221C] font-medium leading-relaxed">
              Leaf &amp; Lore is a wellness studio bringing nature-inspired rituals and mindful living to modern homes.
            </p>
            <p>
              In a world that constantly demands more speed, multi-tasking, and relentless productivity, we often lose touch with the simple sensory pleasures that nourish our bodies and quiet our minds.
            </p>
            <p>
              Every offering in our catalogue — from our signature <strong>Her Balance</strong> 17-botanical tea to our zero palm oil roasted makhana, single-origin ginger-infused honey, and tactile ceramic loop mugs — is crafted to transform an ordinary pause into an intentional ritual.
            </p>
          </div>

          {/* 4 Pillars Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-6 rounded-xl bg-[#FBFBFA] border border-neutral-200/90 text-center space-y-2">
              <span className="text-[10px] font-semibold text-[#1A382B]/60 uppercase tracking-widest block">Pillar 01</span>
              <h3 className="font-serif text-xl font-bold text-[#14221C]">Nature</h3>
              <p className="text-xs text-[#2D3732]/70 leading-relaxed">Pure botanicals and whole ingredients with zero artificial shortcuts.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FBFBFA] border border-neutral-200/90 text-center space-y-2">
              <span className="text-[10px] font-semibold text-[#1A382B]/60 uppercase tracking-widest block">Pillar 02</span>
              <h3 className="font-serif text-xl font-bold text-[#14221C]">Nourishment</h3>
              <p className="text-xs text-[#2D3732]/70 leading-relaxed">Mindful snacking with strictly zero palm oil for clean everyday wellness.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FBFBFA] border border-neutral-200/90 text-center space-y-2">
              <span className="text-[10px] font-semibold text-[#1A382B]/60 uppercase tracking-widest block">Pillar 03</span>
              <h3 className="font-serif text-xl font-bold text-[#14221C]">Ritual</h3>
              <p className="text-xs text-[#2D3732]/70 leading-relaxed">Turning simple pauses into daily grounding habits of quiet reflection.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FBFBFA] border border-neutral-200/90 text-center space-y-2">
              <span className="text-[10px] font-semibold text-[#1A382B]/60 uppercase tracking-widest block">Pillar 04</span>
              <h3 className="font-serif text-xl font-bold text-[#14221C]">Intention</h3>
              <p className="text-xs text-[#2D3732]/70 leading-relaxed">Every recipe formulated with doctor-guided clinical insight.</p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A382B] text-white hover:bg-[#12281E] text-xs font-medium tracking-[0.16em] uppercase transition-all shadow-sm"
            >
              <span>Explore The Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Founder Section */}
      <FounderSection />

      {/* Embedded Features Section */}
      <Features />

    </div>
  );
};

export default Learn;
