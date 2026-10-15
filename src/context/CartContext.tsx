import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { ProductDetailsType } from '../data/products';
import {
  addToCart as addToShopifyCart,
  getCheckoutUrl as fetchCheckoutUrl,
  getCart as getShopifyCart,
  removeCartLines,
  updateCartLine,
} from '../lib/cart';

export interface CartItem extends ProductDetailsType {
  lineId?: string;
  merchandiseId?: string;
  inStock?: boolean;
  quantity: number;
  plan: string;
  finalPrice: number;
}

interface CartMeta {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string[];
  category?: ProductDetailsType['category'];
  benefits?: string[];
  ingredients?: string;
  howToUse?: string[];
  inStock?: boolean;
  plan: string;
  finalPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, delta: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  cartCount: number;
  isLoading: boolean;
  error: string | null;
  checkoutUrl: string | null;
  redirectToCheckout: () => void;
  clearCart: () => Promise<void>;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CHECKOUT_URL_KEY = 'leafandlore_checkout_url';
const CART_META_KEY = 'leafandlore_cart_meta';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);

  const loadMeta = (): Record<string, CartMeta> => {
    try {
      const raw = localStorage.getItem(CART_META_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const saveMeta = (meta: Record<string, CartMeta>) => {
    localStorage.setItem(CART_META_KEY, JSON.stringify(meta));
  };

  const syncCartFromShopify = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const cart = await getShopifyCart();
      if (!cart) {
        setCartItems([]);
        setCheckoutUrl(null);
        localStorage.removeItem(CHECKOUT_URL_KEY);
        return;
      }

      setCheckoutUrl(cart.checkoutUrl || null);

      const metaMap = loadMeta();
      const mapped: CartItem[] = (cart.lines?.nodes || []).map((line: any) => {
        const merchandiseId = line?.merchandise?.id || '';
        const productId = (line?.merchandise?.product?.id || '').replace(/.*\//, '') || merchandiseId;
        const saved = metaMap[merchandiseId];
        const unitPrice = parseFloat(line?.merchandise?.price?.amount || '0') || 0;
        const fallbackImage =
          line?.merchandise?.image?.url || line?.merchandise?.product?.featuredImage?.url || '';

        return {
          id: saved?.id || productId,
          name: saved?.name || line?.merchandise?.product?.title || 'Product',
          image: saved?.image || line?.merchandise?.image?.url || fallbackImage,
          gallery: saved?.gallery || (saved?.image ? [saved.image] : (line?.merchandise?.image?.url ? [line.merchandise.image.url] : (fallbackImage ? [fallbackImage] : []))),
          originalPrice: saved?.originalPrice || Math.round(unitPrice * 1.2),
          rating: saved?.rating || 4.8,
          reviews: saved?.reviews || 120,
          category: saved?.category || 'Rituals',
          description: saved?.description || ['Thoughtfully crafted ritual from Leaf & Lore'],
          benefits: saved?.benefits,
          ingredients: saved?.ingredients,
          howToUse: saved?.howToUse,
          price: unitPrice,
          quantity: line.quantity,
          inStock: line?.merchandise?.availableForSale !== false,
          plan: saved?.plan || line?.merchandise?.title || 'One Time Purchase',
          finalPrice: saved?.finalPrice || unitPrice,
          lineId: line.id,
          merchandiseId,
          shopifyVariantId: merchandiseId,
        };
      });

      setCartItems(mapped);
    } catch (err) {
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }, []);

  // Load checkout URL and sync cart from Shopify on mount + when user returns to tab/page.
  useEffect(() => {
    const savedCheckoutUrl = localStorage.getItem(CHECKOUT_URL_KEY);

    if (savedCheckoutUrl) {
      setCheckoutUrl(savedCheckoutUrl);
    }

    syncCartFromShopify(true);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncCartFromShopify(true);
      }
    };

    const handleFocus = () => {
      syncCartFromShopify(true);
    };

    const handlePageShow = () => {
      syncCartFromShopify(true);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [syncCartFromShopify]);

  const refreshCart = useCallback(async () => {
    await syncCartFromShopify(true);
  }, [syncCartFromShopify]);

  // Save checkout URL whenever it changes
  useEffect(() => {
    if (checkoutUrl) {
      localStorage.setItem(CHECKOUT_URL_KEY, checkoutUrl);
    }
  }, [checkoutUrl]);

  const addToCart = async (item: CartItem) => {
    setIsLoading(true);
    setError(null);
    try {

      if (item.inStock === false) {
        throw new Error('This product is out of stock and cannot be added to cart.');
      }

      // Use the variant ID if available, otherwise use product ID as fallback
      const variantId = item.shopifyVariantId || item.id;

      if (!variantId) {
        throw new Error('No variant ID available');
      }


      // Persist metadata for UI hydration from Shopify cart lines
      const metaMap = loadMeta();
      metaMap[variantId] = {
        id: item.id,
        name: item.name,
        image: item.image,
        gallery: item.gallery,
        originalPrice: item.originalPrice,
        rating: item.rating,
        reviews: item.reviews,
        description: item.description,
        benefits: item.benefits,
        ingredients: item.ingredients,
        howToUse: item.howToUse,
        inStock: item.inStock,
        plan: item.plan,
        finalPrice: item.finalPrice,
      };
      saveMeta(metaMap);

      const cart = await addToShopifyCart(variantId, item.quantity || 1);

      if (cart) {
        setCheckoutUrl(cart.checkoutUrl);
        await syncCartFromShopify();
        setIsCartDrawerOpen(true);
      } else {
        throw new Error('Failed to add item to Shopify cart');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add item to cart';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const cart = await removeCartLines([lineId]);
      if (!cart) {
        throw new Error('Failed to remove item from Shopify cart');
      }
      setCheckoutUrl(cart.checkoutUrl || null);
      await syncCartFromShopify();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove item from cart';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, delta: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const current = cartItems.find((item) => item.lineId === lineId);
      if (!current) return;

      const newQuantity = Math.max(1, current.quantity + delta);
      const cart = await updateCartLine(lineId, newQuantity);

      if (!cart) {
        throw new Error('Failed to update quantity');
      }

      setCheckoutUrl(cart.checkoutUrl || null);
      await syncCartFromShopify();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update quantity';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const lineIds = cartItems.map((item) => item.lineId).filter(Boolean) as string[];
      await removeCartLines(lineIds);
      await syncCartFromShopify();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear cart';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToCheckout = async () => {
    try {
      const hasOutOfStockItems = cartItems.some((item) => item.inStock === false);
      if (hasOutOfStockItems) {
        setError('Some items in your cart are out of stock. Remove them before checkout.');
        return;
      }

      let url = checkoutUrl;

      // If checkout URL is null/stale, fetch a fresh one
      if (!url) {
        url = await fetchCheckoutUrl();
      }

      if (url) {
        window.location.href = url;
      } else {
        setError('Unable to get checkout URL. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to proceed to checkout';
      setError(errorMessage);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart,
        cartCount,
        isLoading,
        error,
        checkoutUrl,
        redirectToCheckout,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
