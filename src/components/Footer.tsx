import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin, Download, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A382B] pt-16 md:pt-24 pb-12 px-4 sm:px-6 md:px-12 text-white border-t border-neutral-800 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/30 shadow-sm flex-shrink-0 bg-[#12281E]">
              <img 
                src="/leafandlore/leaf_and_lore_dp.png" 
                alt="Leaf & Lore" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] text-white">
                LEAF &amp; LORE
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-white/60 font-semibold -mt-0.5">
                Rituals for Everyday Living
              </span>
            </div>
          </Link>

          <p className="text-sm font-light text-white/75 leading-relaxed max-w-sm">
            Leaf &amp; Lore is a wellness studio built around the quiet power of everyday rituals. Rooted in nature, guided by wisdom, and crafted with intention.
          </p>

          <div className="pt-1">
            <a
              href="/Leaf and Lore catalogue .pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1A382B] hover:bg-neutral-100 text-xs font-medium tracking-wider uppercase transition-all shadow-sm"
            >
              <Download size={13} />
              <span>Download 2026 Catalogue (PDF)</span>
            </a>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://www.instagram.com/leafandlore__/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#1A382B] transition-colors"
              aria-label="Instagram @leafandlore__"
            >
              <Instagram size={16} />
            </a>
            <span className="text-xs text-white/60">Follow @leafandlore__</span>
          </div>
        </div>

        {/* Collections */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">Collections</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li><Link to="/shop?cat=Teas" className="hover:text-white transition-colors">Botanical Teas (Her Balance)</Link></li>
            <li><Link to="/shop?cat=Snacks" className="hover:text-white transition-colors">The Nourish Nook (Makhana)</Link></li>
            <li><Link to="/shop?cat=Rituals" className="hover:text-white transition-colors">The Spice Ritual (Turmeric Duo)</Link></li>
            <li><Link to="/shop?cat=Skincare" className="hover:text-white transition-colors">The Earthy Edit (Botanicals)</Link></li>
            <li><Link to="/shop?cat=Drinkware" className="hover:text-white transition-colors">Artisan Ceramic Mugs</Link></li>
            <li><Link to="/product/dear-tired-women" className="hover:text-white transition-colors">Dear Tired Women (Book)</Link></li>
          </ul>
        </div>

        {/* Brand & Rituals */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">About</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li><Link to="/about" className="hover:text-white transition-colors">The Brand Story</Link></li>
            <li><Link to="/about#founder" className="hover:text-white transition-colors">Dr. Pooja Dhingra</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Journal &amp; Guides</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">Studio &amp; Contact</h4>
          <ul className="space-y-3 text-xs text-white/70">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-white/60 flex-shrink-0" />
              <a href="tel:+919971533077" className="hover:text-white transition-colors">+91 99715 33077</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-white/60 flex-shrink-0" />
              <a href="mailto:Hello.leafandlore@gmail.com" className="hover:text-white transition-colors truncate">Hello.leafandlore@gmail.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={14} className="text-white/60 flex-shrink-0" />
              <span>Noida, Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center gap-2.5">
              <ExternalLink size={14} className="text-white/60 flex-shrink-0" />
              <a href="https://leafandlore.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">leafandlore.in</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Policies & Copyright */}
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
          <Link to="/return-refund-policy" className="hover:text-white transition-colors">Return &amp; Refund</Link>
          <Link to="/cancellation-policy" className="hover:text-white transition-colors">Cancellation Policy</Link>
        </div>

        <p className="text-center md:text-right">
          © {new Date().getFullYear()} Leaf &amp; Lore. All rights reserved. Nature • Nourishment • Ritual • Intention.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
