import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Download, ChevronDown, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, openCartDrawer } = useCart();

  const isSolidHeader = location.pathname.startsWith('/product') || location.pathname === '/cart';

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 60], ['rgba(255, 255, 255, 0.96)', 'rgba(255, 255, 255, 0.98)']);
  const backdropBlur = useTransform(scrollY, [0, 60], ['blur(8px)', 'blur(16px)']);
  const borderBottomColor = useTransform(scrollY, [0, 60], ['rgba(26, 56, 43, 0.06)', 'rgba(26, 56, 43, 0.12)']);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    {
      name: 'Botanicals',
      path: '/shop?cat=Teas',
      dropdown: [
        { name: 'Her Balance (Hormonal Health)', path: '/product/her-balance' },
        { name: 'Midnight Petal (Sleep & Rest)', path: '/product/midnight-petal' },
        { name: 'Daily Debloat (Digestive Rhythm)', path: '/product/daily-debloat' },
        { name: 'Lavender Chamomile (Serenity)', path: '/product/lavender-chamomile' },
        { name: 'View All Botanicals →', path: '/shop?cat=Teas', highlight: true }
      ]
    },
    {
      name: 'Pantry',
      path: '/shop?cat=Snacks',
      dropdown: [
        { name: 'Zero Palm Oil Masala Makhana', path: '/product/masala-makhana' },
        { name: 'Zero Palm Oil Mint Makhana', path: '/product/mint-makhana' },
        { name: 'Peri Peri Ragi Crisps', path: '/product/peri-peri-ragi' },
        { name: 'View Full Pantry →', path: '/shop?cat=Snacks', highlight: true }
      ]
    },
    {
      name: 'Rituals',
      path: '/shop?cat=Rituals',
      dropdown: [
        { name: 'The Spice Ritual Duo (Turmeric & Honey)', path: '/product/spice-ritual-duo' },
        { name: 'Artisan Raw Wildflower Honey', path: '/product/artisan-honey' },
        { name: 'Botanical Cold-Pressed Body Oil', path: '/product/botanical-body-oil' },
        { name: 'View All Rituals →', path: '/shop?cat=Rituals', highlight: true }
      ]
    },
    {
      name: 'Stoneware',
      path: '/shop?cat=Drinkware',
      dropdown: [
        { name: 'Tea For Two (Twin Mug Set)', path: '/product/tea-for-two' },
        { name: 'Modern Loop Ceramic Mugs', path: '/product/loop-ceramic-mug' },
        { name: 'View All Drinkware →', path: '/shop?cat=Drinkware', highlight: true }
      ]
    },
    {
      name: 'The Studio',
      path: '/about',
      dropdown: [
        { name: 'Our Ethos & Philosophy', path: '/about' },
        { name: 'Curated by Dr. Pooja Dhingra', path: '/about#founder' },
        { name: 'Official 2026 Catalogue', path: '/Leaf and Lore catalogue .pdf', isDownload: true }
      ]
    },
    {
      name: 'Journal',
      path: '/blog'
    },
    {
      name: 'Concierge',
      path: '/contact'
    }
  ];

  return (
    <>
      {/* Main Header */}
      <motion.header
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          borderBottom: '1px solid',
          borderBottomColor
        }}
        className="fixed top-0 left-0 right-0 z-[200] px-4 sm:px-8 md:px-12 flex items-center justify-between h-20 transition-all duration-200"
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3.5 group cursor-pointer select-none">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-1 ring-[#1A382B]/20 shadow-sm flex-shrink-0 bg-[#12281E] group-hover:ring-[#1A382B] transition-all duration-300">
            <img 
              src="/leafandlore/leaf_and_lore_dp.png" 
              alt="Leaf & Lore" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-[#1A382B] leading-tight">
              LEAF &amp; LORE
            </span>
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#1A382B]/60 font-medium -mt-0.5">
              Rituals for Everyday Living
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Minimalist, Bespoke & Original */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[13px] font-medium text-[#1A382B] tracking-wide">
          {navLinks.map((item) => (
            <div
              key={item.name}
              className="relative py-6"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className="flex items-center gap-1 hover:text-[#1A382B]/60 transition-colors py-1 relative"
              >
                <span>{item.name}</span>
                {item.dropdown && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 opacity-60 ${
                      activeDropdown === item.name ? 'rotate-180 opacity-100' : ''
                    }`}
                  />
                )}
              </Link>

              {/* Minimalist Floating Dropdown */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white border border-[#1A382B]/10 rounded-xl shadow-lg p-3 z-50 text-left pointer-events-auto"
                  >
                    <div className="space-y-1">
                      {item.dropdown.map((sub) =>
                        sub.isDownload ? (
                          <a
                            key={sub.name}
                            href={sub.path}
                            download
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A382B] hover:bg-[#1A382B]/5 rounded-lg transition-colors"
                          >
                            <Download size={13} className="text-[#1A382B]/70" />
                            <span>{sub.name}</span>
                          </a>
                        ) : (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={`block px-3 py-2 text-xs rounded-lg transition-colors ${
                              sub.highlight
                                ? 'text-[#1A382B] font-semibold border-t border-[#1A382B]/10 mt-1 pt-2.5 hover:bg-[#1A382B]/5'
                                : 'text-[#1A382B]/80 hover:text-[#1A382B] hover:bg-[#1A382B]/5'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right Nav: Catalogue Link + Bag */}
        <div className="flex items-center gap-5 sm:gap-6 text-[#1A382B]">
          {/* Subtle Catalogue Download Link */}
          <a
            href="/Leaf and Lore catalogue .pdf"
            download
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border border-[#1A382B]/20 text-[#1A382B] hover:bg-[#1A382B] hover:text-white transition-all"
            title="Download Official 2026 Catalogue PDF"
          >
            <Download size={13} />
            <span>Catalogue</span>
          </a>

          {/* Cart Button */}
          <button
            type="button"
            onClick={openCartDrawer}
            className="flex items-center gap-2 cursor-pointer hover:text-[#1A382B]/60 transition-colors text-sm font-medium bg-transparent border-0 relative p-1"
            aria-label="Open cart drawer"
          >
            <div className="relative">
              <ShoppingCart size={20} className="text-[#1A382B]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1A382B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs tracking-wider uppercase font-medium">Bag</span>
          </button>

          {/* Hamburger Menu - Mobile only */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-[#1A382B] rounded-lg hover:bg-black/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[290] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[300] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto lg:hidden border-l border-neutral-200"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#1A382B]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#1A382B]/20 shadow-sm flex-shrink-0 bg-[#12281E]">
                      <img src="/leafandlore/leaf_and_lore_dp.png" alt="Leaf & Lore" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-base text-[#1A382B] tracking-wider leading-tight">LEAF &amp; LORE</span>
                      <span className="text-[8px] uppercase tracking-widest text-[#1A382B]/60">Rituals</span>
                    </div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A382B] p-1.5 hover:bg-neutral-100 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="py-6 space-y-4">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-medium tracking-wide text-[#1A382B] hover:text-[#1A382B]/60"
                  >
                    Home
                  </Link>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#1A382B]/50 block mb-2">Creations</span>
                    <Link
                      to="/shop?cat=Teas"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] py-1 pl-2 border-l border-[#1A382B]/20 hover:border-[#1A382B]"
                    >
                      Botanicals
                    </Link>
                    <Link
                      to="/shop?cat=Snacks"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] py-1 pl-2 border-l border-[#1A382B]/20 hover:border-[#1A382B]"
                    >
                      Pantry (Clean Munch)
                    </Link>
                    <Link
                      to="/shop?cat=Rituals"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] py-1 pl-2 border-l border-[#1A382B]/20 hover:border-[#1A382B]"
                    >
                      Rituals (Spice &amp; Honey)
                    </Link>
                    <Link
                      to="/shop?cat=Drinkware"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] py-1 pl-2 border-l border-[#1A382B]/20 hover:border-[#1A382B]"
                    >
                      Stoneware &amp; Ceramics
                    </Link>
                    <Link
                      to="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-[#1A382B] py-1 pl-2 border-l border-[#1A382B]/40 hover:text-[#1A382B]/70"
                    >
                      Explore All Creations →
                    </Link>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#1A382B]/10">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#1A382B]/50 block">The House</span>
                    <Link
                      to="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] hover:text-[#1A382B]/60"
                    >
                      The Studio &amp; Founder
                    </Link>
                    <Link
                      to="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] hover:text-[#1A382B]/60"
                    >
                      Journal &amp; Notes
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#1A382B] hover:text-[#1A382B]/60"
                    >
                      Concierge
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="space-y-3 pt-5 border-t border-[#1A382B]/10">
                <a
                  href="/Leaf and Lore catalogue .pdf"
                  download
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A382B] text-white rounded-full text-xs font-medium hover:bg-[#12281E] transition-colors"
                >
                  <Download size={13} /> Download 2026 Catalogue
                </a>
                <div className="text-center pt-1">
                  <a
                    href="https://www.instagram.com/leafandlore__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#1A382B]/70 hover:text-[#1A382B]"
                  >
                    @leafandlore__ on Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
