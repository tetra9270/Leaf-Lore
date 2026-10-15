/**
 * SHOPIFY INTEGRATION EXAMPLES
 * 
 * This file contains code examples showing how to integrate Shopify data into your components.
 * These are NOT executed - they're examples to copy and paste into your components.
 * 
 * For actual integration, see:
 * - Shop.tsx (already updated)
 * - BestSellers.tsx (already updated)
 * 
 * ---
 * EXAMPLE 1: Using useShopifyProducts in Shop.tsx
 * 
 * Import statement:
 *   import { useShopifyProducts } from '@/lib/useShopifyProducts';
 * 
 * In your component:
 *   const { products, isLoading, error } = useShopifyProducts();
 * 
 *   return (
 *     <section>
 *       {isLoading && <p>Loading products...</p>}
 *       {error && <p>Error: {error}</p>}
 *       <div className="grid">
 *         {products.map((product, index) => (
 *           <ProductCard key={product.id} product={product} index={index} />
 *         ))}
 *       </div>
 *     </section>
 *   );
 */

// ============================================
// EXAMPLE 2: Using useCart in Components
// ============================================

/**
 * To use cart in any component:
 * 
 *   import { useCart } from '@/context/CartContext';
 * 
 *   const {
 *     cartItems,        // CartItem[]
 *     addToCart,        // (item: CartItem) => Promise<void>
 *     removeFromCart,   // (index: number) => Promise<void>
 *     updateQuantity,   // (index: number, delta: number) => Promise<void>
 *     cartCount,        // number
 *     isLoading,        // boolean
 *     error,            // string | null
 *     redirectToCheckout // () => void
 *   } = useCart();
 */

// ============================================
// EXAMPLE 3: Add to Cart Handler
// ============================================

/**
 * Basic add to cart function:
 * 
 *   const handleAddToCart = async (product: ProductDetailsType) => {
 *     await addToCart({
 *       ...product,
 *       quantity: 1,
 *       plan: 'Default',
 *       finalPrice: product.price
 *     });
 *   };
 */

// ============================================
// EXAMPLE 4: Checkout Button
// ============================================

/**
 * Simple checkout button:
 * 
 *   <button
 *     onClick={() => redirectToCheckout()}
 *     disabled={!checkoutUrl || cartCount === 0}
 *   >
 *     Proceed to Checkout ({cartCount} items)
 *   </button>
 */

// ============================================
// COMMON IMPORTS
// ============================================

/**
 * For products:
 *   import { useShopifyProducts } from '@/lib/useShopifyProducts';
 *   import { getShopifyProducts } from '@/lib/getProducts';
 * 
 * For cart:
 *   import { useCart } from '@/context/CartContext';
 *   import { cartUtils } from '@/lib/cart';
 * 
 * For data types:
 *   import { ProductDetailsType } from '@/data/products';
 *   import { CartItem } from '@/context/CartContext';
 */

// ============================================
// API REFERENCE
// ============================================

/**
 * Hook: useShopifyProducts()
 * Returns: { products, isLoading, error, refetch }
 * 
 * Fetches all products from Shopify on component mount.
 * Perfect for Shop page and BestSellers component.
 */

/**
 * Hook: useCart()
 * Returns: { cartItems, addToCart, removeFromCart, updateQuantity, cartCount, ... }
 * 
 * Provides cart state and operations.
 * Automatically syncs with Shopify and localStorage.
 */

/**
 * Function: shopifyFetch(options)
 * For custom GraphQL queries not covered by helper functions.
 * 
 * Example:
 *   const response = await shopifyFetch({
 *     query: `query { ... }`,
 *     variables: { id: '123' }
 *   });
 */

// ============================================
// TROUBLESHOOTING CHECKLIST
// ============================================

/**
 * Products not loading?
 * - Check .env.local has VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
 * - Check token is valid in Shopify Admin
 * - Check API version matches (currently 2024-01)
 * 
 * Cart not syncing?
 * - Check cartId is saved in localStorage
 * - Check network tab for GraphQL errors
 * - Clear localStorage if needed, new cart will be created
 * 
 * Checkout not working?
 * - Check checkoutUrl is present in cart state
 * - Verify cart.checkoutUrl is valid
 * - Check if Shopify checkout is enabled
 */

export {};

