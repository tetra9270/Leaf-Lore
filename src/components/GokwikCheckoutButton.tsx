import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../types/kwikpass.d.ts';

interface GokwikCheckoutButtonProps {
  disabled?: boolean;
}

export const GokwikCheckoutButton: React.FC<GokwikCheckoutButtonProps> = ({ disabled }) => {
  const { cartItems, isLoading: isCartLoading, error: cartError } = useCart();
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use the function check as suggested for better reliability
  const isGokwikReady = typeof window.triggerGokwikCustomCheckout === 'function';

  useEffect(() => {
    if (isGokwikReady) {
      setIsSdkLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if (typeof window.triggerGokwikCustomCheckout === 'function') {
        setIsSdkLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isGokwikReady]);

  const handleCheckout = async () => {
    // 1. Safety Checks
    if (!isGokwikReady || isCartLoading || isProcessing) return;
    
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      // 2. Ensure Cart Exists (Requirement #1)
      const cartId = localStorage.getItem('shopify_cart_id');

      if (!cartId || cartItems.length === 0) {
        setErrorMessage("Your cart is empty. Please add items before checking out.");
        setIsProcessing(false);
        return;
      }

      // 3. Validate Cart Format (Requirement #2)
      // Expected format: gid://shopify/Cart/xxxxx
      if (!cartId.startsWith('gid://shopify/Cart/')) {
        console.error('GoKwik Integration: Invalid Cart ID format:', cartId);
        setErrorMessage("Invalid cart session. Please refresh and try again.");
        setIsProcessing(false);
        return;
      }

      // Strip query parameters from cartId if present
      const cleanCartId = cartId.split('?')[0];

      // 4. Assign cart to merchantInfo
      if (window.merchantInfo) {
        window.merchantInfo.cart = { id: cleanCartId };
      } else {
        throw new Error("window.merchantInfo is not initialized");
      }

      // 5. Error Handling around Trigger (Requirement #5)
      console.log('Initiating GoKwik Checkout for:', cleanCartId);
      window.triggerGokwikCustomCheckout();
      
    } catch (err) {
      console.error("GoKwik error", err);
      setErrorMessage("Checkout service is temporarily unavailable. Please try again.");
    } finally {
      // We don't set isProcessing to false immediately because GoKwik 
      // usually takes over the screen or redirects.
      // But we'll do it after a short delay for UI responsiveness if trigger fails quietly.
      setTimeout(() => setIsProcessing(false), 2000);
    }
  };

  const hasOutOfStockItems = cartItems.some((item) => item.inStock === false);
  
  // Disable button until ready (Requirement #4)
  const isButtonDisabled = 
    disabled || 
    !isGokwikReady || 
    isCartLoading || 
    isProcessing || 
    cartItems.length === 0 || 
    hasOutOfStockItems;

  return (
    <div className="w-full space-y-3">
      <button
        onClick={handleCheckout}
        disabled={isButtonDisabled}
        className="w-full bg-[#1A382B] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#0a3106] transition-all shadow-[0_10px_20px_rgba(13,64,8,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer group"
      >
        {isProcessing || isCartLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>
              {hasOutOfStockItems 
                ? 'Remove Out of Stock Items' 
                : !isGokwikReady 
                  ? 'Initializing Checkout...' 
                  : 'Proceed to Checkout'}
            </span>
            {!hasOutOfStockItems && isGokwikReady && (
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            )}
          </>
        )}
      </button>
      
      {(errorMessage || cartError) && (
        <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={16} />
          <p>{errorMessage || cartError}</p>
        </div>
      )}
      
      {!isGokwikReady && !isCartLoading && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            <p className="text-[#1A382B]/40 text-[10px] font-medium uppercase tracking-wider">
              Connecting to GoKwik Secure Checkout...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
