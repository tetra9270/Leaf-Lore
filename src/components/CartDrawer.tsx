import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Lock,
  ShieldCheck,
  Star,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GokwikCheckoutButton } from './GokwikCheckoutButton';
import { useShopifyProducts } from '../lib/useShopifyProducts';
import { productsList } from '../data/products';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    isLoading,
    error,
  } = useCart();

  const { products: shopifyProducts } = useShopifyProducts();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [addingId, setAddingId] = useState<string | null>(null);
  const upsellScrollRef = useRef<HTMLDivElement>(null);

  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  // Combine live Shopify products and fallback productsList
  const allProducts = React.useMemo(() => {
    const base = shopifyProducts.length > 0 ? shopifyProducts : productsList;
    return base.map((sp) => {
      const local = productsList.find((lp) => {
        if (sp.id === lp.id) return true;
        const s = sp.name.toLowerCase();
        const l = lp.name.toLowerCase();
        return s === l || s.includes(l) || l.includes(s);
      });
      const price = sp.price || local?.price || 399;
      const originalPrice =
        sp.originalPrice || local?.originalPrice || Math.round(price * 1.25);
      return {
        ...local,
        ...sp,
        price,
        originalPrice,
        image: sp.image || local?.image || '',
        rating: sp.rating || local?.rating || 4.9,
      };
    });
  }, [shopifyProducts]);

  // Filter out products currently in cart (Adil Qadri style recommendations)
  const recommendedProducts = React.useMemo(() => {
    const inCartNames = new Set(cartItems.map((ci) => ci.name.toLowerCase().trim()));
    const inCartIds = new Set(cartItems.map((ci) => String(ci.id)));

    return allProducts
      .filter((p) => {
        const name = p.name.toLowerCase().trim();
        const id = String(p.id);
        return !inCartIds.has(id) && !inCartNames.has(name);
      })
      .slice(0, 8);
  }, [allProducts, cartItems]);

  const handleAddRecommended = async (product: any) => {
    setAddingId(product.id);
    try {
      const variantId =
        product.shopifyVariantId ||
        (product.variants && product.variants[0]?.shopifyVariantId) ||
        product.id;
      const price = product.price || 399;

      await addToCart({
        ...product,
        quantity: 1,
        plan: product.variants?.[0]?.label || 'One Time Purchase',
        finalPrice: price,
        shopifyVariantId: variantId,
        inStock: product.inStock !== false,
      });
    } catch (err) {
      console.error('Failed to add recommended product:', err);
    } finally {
      setAddingId(null);
    }
  };

  const scrollUpsell = (direction: 'left' | 'right') => {
    if (upsellScrollRef.current) {
      upsellScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );
  const total = subtotal;
  const hasOutOfStockItems = cartItems.some((item) => item.inStock === false);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-[300] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-label="Close cart drawer backdrop"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[480px] h-full bg-[#F4F7F2] shadow-2xl flex flex-col z-[301] border-l border-[#1A382B]/10 select-none overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white px-5 py-4 sm:px-6 sm:py-5 border-b border-[#1A382B]/10 flex items-center justify-between shrink-0 shadow-sm">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-serif font-bold text-[#1A382B]">
                    Your Cart
                  </h2>
                  {cartCount > 0 && (
                    <span className="bg-[#1A382B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#1A382B]/60 font-medium">
                  {cartCount === 1
                    ? '1 item selected'
                    : `${cartCount} items selected`}
                </p>
              </div>

              <button
                onClick={closeCartDrawer}
                className="w-9 h-9 rounded-full bg-[#F4F7F2] hover:bg-[#1A382B]/10 text-[#1A382B] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content: Items list or Empty state */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3.5 scrollbar-thin scrollbar-thumb-[#1A382B]/20">
              {isLoading && cartItems.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A382B] mb-3"></div>
                  <p className="text-sm text-[#1A382B]/70 font-medium">
                    Syncing your cart...
                  </p>
                </div>
              )}

              {cartItems.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <h3 className="text-xl font-serif text-[#1A382B] mb-2 font-bold">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#1A382B]/60 max-w-xs mb-6 font-medium leading-relaxed">
                    Explore our pure, Sunnah-inspired organic superfoods and wellness essentials.
                  </p>
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/shop');
                    }}
                    className="bg-[#1A382B] text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-[#1A382B] transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    Start Shopping
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div
                    key={item.lineId || `${item.id}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#1A382B]/5 shadow-sm flex gap-3.5 relative group"
                  >
                    {/* Item Thumbnail */}
                    <div
                      onClick={() => {
                        closeCartDrawer();
                        navigate(`/product/${item.id}`);
                      }}
                      className="w-20 h-20 sm:w-22 sm:h-22 bg-[#F4F7F2] rounded-xl p-2 flex items-center justify-center shrink-0 border border-[#1A382B]/5 cursor-pointer overflow-hidden"
                    >
                      {item.image && !imageErrors[item.lineId || item.id] ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform"
                          onError={() => handleImageError(item.lineId || item.id)}
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <span className="text-[10px]">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              closeCartDrawer();
                              navigate(`/product/${item.id}`);
                            }}
                            className="text-sm sm:text-base font-bold text-[#1A382B] hover:text-[#1A382B] transition-colors leading-tight cursor-pointer line-clamp-2"
                          >
                            {item.name}
                          </h4>

                          {/* Delete Item */}
                          <button
                            onClick={() => item.lineId && removeFromCart(item.lineId)}
                            disabled={isLoading || !item.lineId}
                            className="text-[#1A382B]/30 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1 cursor-pointer disabled:opacity-50"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {item.plan && (
                          <p className="text-[11px] font-semibold text-[#1A382B]/60 uppercase tracking-wider mt-0.5 truncate">
                            {item.plan}
                          </p>
                        )}

                        {item.inStock === false && (
                          <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mt-0.5">
                            Out of stock
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="flex items-center bg-[#F4F7F2] rounded-full p-0.5 border border-[#1A382B]/10">
                          <button
                            onClick={() =>
                              item.lineId && updateQuantity(item.lineId, -1)
                            }
                            disabled={
                              isLoading || !item.lineId || item.quantity <= 1
                            }
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A382B] hover:bg-white transition-colors disabled:opacity-30 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={2.5} />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-[#1A382B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              item.lineId && updateQuantity(item.lineId, 1)
                            }
                            disabled={isLoading || !item.lineId}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A382B] hover:bg-white transition-colors disabled:opacity-30 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={2.5} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm sm:text-base font-bold text-[#1A382B]">
                            ₹{(item.finalPrice * item.quantity).toFixed(0)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-[#1A382B]/50">
                              (₹{item.finalPrice.toFixed(0)} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* ── More Products / You May Also Like (Adil Qadri Style) ────── */}
              {cartItems.length > 0 && recommendedProducts.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#1A382B]/10">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A382B]">
                      You May Also Like
                    </h3>

                    {/* Left & Right Scroll Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => scrollUpsell('left')}
                        className="w-7 h-7 rounded-full bg-white hover:bg-[#1A382B] text-[#1A382B] hover:text-white border border-[#1A382B]/10 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Scroll left recommendations"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollUpsell('right')}
                        className="w-7 h-7 rounded-full bg-white hover:bg-[#1A382B] text-[#1A382B] hover:text-white border border-[#1A382B]/10 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Scroll right recommendations"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Track */}
                  <div
                    ref={upsellScrollRef}
                    className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {recommendedProducts.map((rec) => {
                      const isAdding = addingId === rec.id;
                      const discount =
                        rec.originalPrice && rec.originalPrice > rec.price
                          ? Math.round(
                              ((rec.originalPrice - rec.price) /
                                rec.originalPrice) *
                                100
                            )
                          : null;

                      return (
                        <div
                          key={rec.id}
                          className="w-[185px] sm:w-[205px] shrink-0 bg-white rounded-2xl p-3 border border-[#1A382B]/8 shadow-xs flex flex-col justify-between snap-start hover:shadow-md hover:border-[#1A382B]/30 transition-all group"
                        >
                          {/* Image Box */}
                          <div
                            onClick={() => {
                              closeCartDrawer();
                              navigate(`/product/${rec.id}`);
                            }}
                            className="w-full aspect-square bg-[#F4F7F2] rounded-xl p-2 mb-2 flex items-center justify-center relative cursor-pointer overflow-hidden border border-[#1A382B]/5"
                          >
                            {discount && (
                              <span className="absolute top-1.5 left-1.5 z-10 bg-[#1A382B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                                {discount}% OFF
                              </span>
                            )}
                            {rec.image && !imageErrors[`rec-${rec.id}`] ? (
                              <img
                                src={rec.image}
                                alt={rec.name}
                                className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform"
                                onError={() => handleImageError(`rec-${rec.id}`)}
                                crossOrigin="anonymous"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <span className="text-[10px]">No image</span>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="mb-2">
                              <div className="flex items-center gap-1 mb-1">
                                <div className="flex text-amber-500">
                                  <Star size={11} fill="currentColor" />
                                </div>
                                <span className="text-[10px] font-semibold text-[#1A382B]/70">
                                  {rec.rating || 4.9}
                                </span>
                              </div>
                              <h4
                                onClick={() => {
                                  closeCartDrawer();
                                  navigate(`/product/${rec.id}`);
                                }}
                                className="text-xs font-bold text-[#1A382B] hover:text-[#1A382B] line-clamp-2 leading-tight cursor-pointer"
                                title={rec.name}
                              >
                                {rec.name}
                              </h4>
                            </div>

                            <div className="space-y-2 pt-1 border-t border-[#1A382B]/5">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-bold text-[#1A382B]">
                                  ₹{rec.price.toFixed(0)}
                                </span>
                                {rec.originalPrice > rec.price && (
                                  <span className="text-[11px] text-[#1A382B]/40 line-through">
                                    ₹{rec.originalPrice.toFixed(0)}
                                  </span>
                                )}
                              </div>

                              {/* Quick Add Button */}
                              <button
                                type="button"
                                onClick={() => handleAddRecommended(rec)}
                                disabled={isLoading || isAdding}
                                className="w-full bg-[#1A382B] hover:bg-[#1A382B] text-white font-bold text-xs py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer disabled:opacity-50"
                              >
                                {isAdding ? (
                                  <>
                                    <Loader2 size={13} className="animate-spin" />
                                    <span>Adding...</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus size={13} strokeWidth={2.5} />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Drawer Checkout */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-[#1A382B]/10 p-4 sm:p-5 shrink-0 shadow-[0_-8px_24px_rgba(13,64,8,0.06)] space-y-3.5">
                {/* Cost Breakdown */}
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#1A382B]/70 font-medium">
                    <span>Subtotal</span>
                    <span className="text-[#1A382B] font-bold">
                      ₹{subtotal.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#1A382B]/70 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="h-px w-full bg-[#1A382B]/10 my-1" />
                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="text-base font-bold text-[#1A382B]">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-serif font-bold text-[#1A382B]">
                        ₹{total.toFixed(0)}
                      </span>
                      <span className="block text-[10px] text-[#1A382B]/50">
                        Taxes included
                      </span>
                    </div>
                  </div>
                </div>

                {/* GoKwik Drawer Checkout Button */}
                <div className="w-full">
                  <GokwikCheckoutButton
                    disabled={isLoading || hasOutOfStockItems}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs text-center font-medium">
                    {error}
                  </p>
                )}

                {/* Secondary Actions: Full Cart link */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/cart');
                    }}
                    className="text-[#1A382B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View full cart page
                    <ArrowRight size={12} />
                  </button>

                  <div className="flex items-center gap-1.5 text-[#1A382B]/60 font-medium text-[11px]">
                    <ShieldCheck size={13} className="text-green-600" />
                    <span>100% Safe & Secure</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-[#1A382B]/50 pt-0.5 border-t border-[#1A382B]/5">
                  <div className="flex items-center gap-1">
                    <Lock size={10} />
                    <span>256-Bit SSL</span>
                  </div>
                  <span>•</span>
                  <span>UPI / COD / Cards</span>
                  <span>•</span>
                  <span>Verified Checkout</span>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
