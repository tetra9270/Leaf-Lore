import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ShoppingBag, Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GokwikCheckoutButton } from '../components/GokwikCheckoutButton';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, refreshCart, isLoading, error } = useCart();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  useEffect(() => {
    refreshCart().catch((err) => {
    });

    const handlePageShow = () => {
      refreshCart().catch((err) => {
      });
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [refreshCart]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const total = subtotal;
  const hasOutOfStockItems = cartItems.some((item) => item.inStock === false);

  // Removed local updateQuantity and removeItem methods

  return (
    <div className="bg-white min-h-screen pt-28 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A382B] mb-2">Your Cart</h1>
          <p className="text-[#1A382B]/60 font-medium">You have {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in your cart.</p>
        </div>

        {isLoading && cartItems.length === 0 && (
          <div className="bg-white rounded-[32px] border border-[#1A382B]/5 shadow-sm py-20 flex flex-col items-center justify-center text-center px-4 mb-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1A382B] mb-4"></div>
            <p className="text-[#1A382B]/70 font-medium">Syncing your cart...</p>
          </div>
        )}

        {!isLoading && cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px] gap-8 md:gap-12 mb-16 md:mb-24">
            {/* Cart Items List */}
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div key={item.lineId || `${item.id}-${index}`} className="bg-white rounded-[20px] md:rounded-[24px] p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-[#1A382B]/5 shadow-sm relative">
                  {/* Remove Button */}
                  <button 
                    onClick={() => item.lineId && removeFromCart(item.lineId)}
                    disabled={isLoading || !item.lineId}
                    className="absolute top-4 right-4 text-[#1A382B]/40 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Image */}
                  <div className="w-20 h-24 sm:w-28 sm:h-32 bg-[#F4F7F2] rounded-xl p-3 sm:p-4 flex items-center justify-center shrink-0 border border-[#1A382B]/5 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                    {item.image && !imageErrors[item.lineId || item.id] ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
                        onError={() => handleImageError(item.lineId || item.id)}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <Link to={`/product/${item.id}`} className="text-xl font-bold text-[#1A382B] hover:text-[#1A382B]/70 transition-colors leading-tight">
                      {item.name}
                    </Link>
                    <p className="text-sm font-medium text-[#1A382B]/60 uppercase tracking-wider">{item.plan}</p>
                    {item.inStock === false && (
                      <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Out of stock</p>
                    )}
                    <div className="text-lg font-bold text-[#1A382B]">₹{item.finalPrice.toFixed(0)}</div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 bg-[#F4F7F2] rounded-full px-2 py-1 border border-[#1A382B]/10 mt-4 sm:mt-0">
                    <button
                      onClick={() => item.lineId && updateQuantity(item.lineId, -1)}
                      disabled={isLoading || !item.lineId}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#1A382B] hover:bg-white hover:shadow-sm transition-all disabled:opacity-50"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center font-bold text-[#1A382B]">{item.quantity}</span>
                    <button
                      onClick={() => item.lineId && updateQuantity(item.lineId, 1)}
                      disabled={isLoading || !item.lineId}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#1A382B] hover:bg-white hover:shadow-sm transition-all disabled:opacity-50"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                  
                  {/* Item Total */}
                  <div className="w-24 text-right font-serif text-2xl text-[#1A382B] hidden sm:block">
                    ₹{(item.finalPrice * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-[#1A382B]/5 shadow-sm h-fit lg:sticky top-28">
              <h2 className="text-2xl font-serif text-[#1A382B] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#1A382B]/80 font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[#1A382B]/80 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="text-[#1A382B] font-semibold">Free (Prepaid)</span>
                </div>
              </div>

              <div className="h-px w-full bg-[#1A382B]/10 mb-6"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-[#1A382B]">Total</span>
                <span className="text-3xl md:text-4xl font-serif text-[#1A382B]">₹{total.toFixed(0)}</span>
              </div>

              <GokwikCheckoutButton disabled={isLoading || hasOutOfStockItems} />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex items-center justify-center gap-2 text-[#1A382B]/60 text-xs font-medium">
                <Lock size={12} />
                Secure Encrypted Checkout
              </div>
            </div>
          </div>
        ) : !isLoading ? (
          <div className="bg-white rounded-[32px] border border-[#1A382B]/5 shadow-sm py-32 flex flex-col items-center justify-center text-center px-4 mb-24">
            <div className="w-24 h-24 bg-[#F4F7F2] rounded-full flex items-center justify-center mb-6 text-[#1A382B]/20">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-3xl font-serif text-[#1A382B] mb-4">Your cart is currently empty</h2>
            <p className="text-[#1A382B]/60 font-medium mb-8 max-w-md">
              Before proceeding to checkout you must add some products to your shopping cart.
              You will find a lot of interesting products on our shop page.
            </p>
            <Link to="/shop" className="bg-[#1A382B] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0a3106] transition-colors shadow-lg">
              Return to Shop
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
