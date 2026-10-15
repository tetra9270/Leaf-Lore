/**
 * SHOPIFY INTEGRATION SETUP GUIDE
 * 
 * This file provides documentation and checklists for the Shopify integration.
 * See the actual integration files: shopify.ts, getProducts.ts, cart.ts, useShopifyProducts.ts
 */

// ============================================
// ENVIRONMENT SETUP
// ============================================

/**
 * Create .env.local in your project root with these variables:
 * 
 * VITE_SHOPIFY_STORE_DOMAIN=ruhanisouq.myshopify.com
 * VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx_your_token_xxx
 * 
 * How to get the token:
 * 1. Go to Shopify Admin
 * 2. Settings -> API and apps
 * 3. Storefront API -> Configuration
 * 4. Copy the "Public access token"
 * 5. Paste it into .env.local above
 */

// ============================================
// AVAILABLE HOOKS FOR COMPONENTS
// ============================================

/**
 * useShopifyProducts()
 *   Fetches all products from Shopify
 *   Returns: { products, isLoading, error, refetch }
 *   Usage: const { products } = useShopifyProducts();
 * 
 * useShopifyProductByHandle(handle)
 *   Fetches a single product by handle
 *   Returns: { product, isLoading, error }
 *   Usage: const { product } = useShopifyProductByHandle('my-product');
 * 
 * useSearchShopifyProducts(query)
 *   Searches products (debounced 300ms)
 *   Returns: { products, isLoading, error }
 *   Usage: const { products } = useSearchShopifyProducts(searchTerm);
 */

// ============================================
// SHOPIFY FUNCTIONS IN cart.ts
// ============================================

/**
 * createCart()
 *   Creates a new shopping cart
 *   Returns: Promise<ShopifyCart>
 * 
 * addToCart(cartId, lines)
 *   Adds items to cart
 *   Returns: Promise<ShopifyCart>
 * 
 * getCart(cartId)
 *   Retrieves current cart
 *   Returns: Promise<ShopifyCart>
 * 
 * updateCartQuantity(cartId, lines)
 *   Updates item quantities
 *   Returns: Promise<ShopifyCart>
 * 
 * removeFromCart(cartId, lineIds)
 *   Removes items from cart
 *   Returns: Promise<ShopifyCart>
 * 
 * redirectToCheckout(checkoutUrl)
 *   Redirects to Shopify hosted checkout
 *   No return value
 */

// ============================================
// SETUP CHECKLIST
// ============================================

/**
 * [DONE] Pre-Integration
 *   - [ ] Get Shopify store domain
 *   - [ ] Generate Storefront API token
 *   - [ ] Create .env.local file
 *   - [ ] Add credentials to .env.local
 * 
 * [DONE] Files Created
 *   - [ ] /src/lib/shopify.ts (GraphQL client)
 *   - [ ] /src/lib/getProducts.ts (product queries)
 *   - [ ] /src/lib/cart.ts (cart operations)
 *   - [ ] /src/lib/useShopifyProducts.ts (React hooks)
 *   - [ ] /src/vite-env.d.ts (TypeScript definitions)
 * 
 * [DONE] Files Updated
 *   - [ ] /src/context/CartContext.tsx (Shopify integration)
 *   - [ ] /src/pages/Shop.tsx (useShopifyProducts hook)
 *   - [ ] /src/components/BestSellers.tsx (useShopifyProducts hook)
 * 
 * [DONE] Configuration
 *   - [ ] .env.local created with credentials
 *   - [ ] .env.example updated
 *   - [ ] npm install (if new deps were added)
 * 
 * [DONE] Testing
 *   - [ ] Run npm run dev
 *   - [ ] Visit http://localhost:3000/shop
 *   - [ ] Products load and display
 *   - [ ] Add items to cart
 *   - [ ] Checkout flow works
 *   - [ ] Cart persists on refresh (localStorage)
 *   - [ ] All styling preserved
 *   - [ ] Animations work (GSAP, Framer Motion)
 *   - [ ] Mobile responsive
 * 
 * [DONE] Troubleshooting
 *   - [ ] Check browser console for errors
 *   - [ ] Verify .env.local has correct credentials
 *   - [ ] Ensure Shopify token has product read scope
 *   - [ ] Check network tab for API responses
 *   - [ ] Verify store domain matches Shopify admin
 */

// ============================================
// QUICK REFERENCE
// ============================================

/**
 * Files in /src/lib/:
 * 
 * shopify.ts
 *   Core GraphQL API client
 *   Handles authentication and requests
 *   Used by: getProducts.ts, cart.ts
 * 
 * getProducts.ts
 *   Product querying functions
 *   getShopifyProducts() - fetch all
 *   getShopifyProductByHandle(handle) - fetch one
 *   searchShopifyProducts(query) - search
 *   Used by: useShopifyProducts.ts
 * 
 * cart.ts
 *   Cart management functions
 *   All cart operations (CRUD)
 *   localStorage integration
 *   Used by: CartContext.tsx
 * 
 * useShopifyProducts.ts
 *   React hooks for product fetching
 *   Used in: Shop.tsx, BestSellers.tsx, custom components
 * 
 * Context:
 * /src/context/CartContext.tsx
 *   Updated to use Shopify cart functions
 *   Manages cart state, loading, errors
 *   Provides useCart() hook to all components
 */

export const setupGuidePresent = true;
