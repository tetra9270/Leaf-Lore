import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Gift, Sparkles, Star, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { productsList, ProductDetailsType } from '../data/products';
import { getShopifyProducts } from '../lib/getProducts';
import { useCart } from '../context/CartContext';

interface GiftClaimPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const normalizeName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

export const GiftClaimPopup: React.FC<GiftClaimPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openCartDrawer } = useCart();
  const [shopifyProducts, setShopifyProducts] = useState<ProductDetailsType[]>([]);

  // Fetch real Shopify products for images
  useEffect(() => {
    if (!isOpen) return;
    getShopifyProducts()
      .then((products) => setShopifyProducts(products))
      .catch(() => setShopifyProducts([]));
  }, [isOpen]);

  const giftProducts: ProductDetailsType[] = productsList
    .filter((p) => !p.name.toLowerCase().includes('combo'))
    .map((localProduct) => {
      const localNorm = normalizeName(localProduct.name);
      const shopifyMatch = shopifyProducts.find((sp) => {
        const spNorm = normalizeName(sp.name);
        return (
          spNorm === localNorm ||
          spNorm.includes(localNorm) ||
          localNorm.includes(spNorm)
        );
      });

      if (shopifyMatch) {
        return {
          ...localProduct,
          image: shopifyMatch.image || localProduct.image,
          price: shopifyMatch.price || localProduct.price,
          originalPrice: shopifyMatch.originalPrice || localProduct.originalPrice,
        };
      }
      return localProduct;
    });

  const handleProceedToCheckout = () => {
    onClose();
    if (location.pathname === '/cart') {
      // Trigger GoKwik checkout directly if ready
      if (typeof window.triggerGokwikCustomCheckout === 'function') {
        const cartId = localStorage.getItem('shopify_cart_id');
        if (cartId && window.merchantInfo) {
          window.merchantInfo.cart = { id: cartId.split('?')[0] };
          window.triggerGokwikCustomCheckout();
          return;
        }
      }
      // Otherwise scroll to summary
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else {
      openCartDrawer();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{
          maxHeight: '92vh',
          overflowY: 'auto',
          animation: 'gift-popup-in 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <style>{`
          @keyframes gift-popup-in {
            from { opacity: 0; transform: scale(0.88) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes gift-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-all"
        >
          <X size={16} className="text-white" />
        </button>

        {/* ── Header Banner ── */}
        <div className="relative bg-gradient-to-br from-[#082804] via-[#0f4208] to-[#082804] px-6 py-6 sm:px-8 sm:py-7 text-white overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Gift
                size={28}
                className="text-amber-300"
                style={{ animation: 'gift-bounce 1.5s ease-in-out infinite' }}
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-widest mb-1.5">
                <Sparkles size={9} /> Buy 2 Get 1 FREE Offer Unlocked!
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                 Congratulations! You Get a FREE Gift!
              </h2>
              <p className="text-white/70 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Proceed to Checkout to pick <strong className="text-amber-300">any 1 product below for ₹0 FREE</strong> on the GoKwik checkout page!
              </p>
            </div>
          </div>
        </div>

        {/* ── Products Preview Grid ── */}
        <div className="p-5 sm:p-6 bg-[#F8FAF7]">
          <p className="text-[#1A382B] font-bold text-xs sm:text-sm mb-3 flex items-center gap-2">
            <Gift size={15} className="text-amber-500" />
            Eligible ₹0 FREE Gifts (Pick on Checkout):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
            {giftProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                onClick={handleProceedToCheckout}
                className="group relative rounded-xl border border-[#1A382B]/15 bg-white p-2.5 overflow-hidden transition-all duration-200 hover:border-emerald-600 hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                {/* 100% FREE Badge */}
                <span className="absolute top-2 left-2 z-10 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                  100% FREE
                </span>

                <div className="w-full aspect-square bg-[#F4F7F2] rounded-lg flex items-center justify-center p-2 mb-2 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const localP = productsList.find((p) => p.id === product.id);
                      if (localP) (e.target as HTMLImageElement).src = localP.image;
                    }}
                  />
                </div>

                <div>
                  <h4 className="text-[10.5px] font-bold text-[#1A382B] line-clamp-1 mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-emerald-600 font-extrabold text-xs">₹0 FREE</span>
                    <span className="text-gray-400 text-[10px] line-through">
                      ₹{product.originalPrice || product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Main High-Converting Checkout Button ── */}
          <button
            onClick={handleProceedToCheckout}
            className="w-full py-4 bg-[#1A382B] hover:bg-[#0a3106] active:scale-[0.99] text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(13,64,8,0.25)] transition-all cursor-pointer group"
          >
            <span>Proceed to Checkout & Select Free Gift</span>
            <ArrowRight size={19} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[#1A382B]/60 text-[11px] mt-3">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>GoKwik 100% Safe & Instant ₹0 Freebie Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
