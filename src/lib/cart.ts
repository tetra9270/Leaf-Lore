/**
 * Shopify Cart Management
 * Synced implementation using Shopify Cart API as source of truth
 */

import { shopifyFetch } from './shopify';

const CART_KEY = 'shopify_cart_id';

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity?: number;
  lines?: {
    nodes: ShopifyCartLine[];
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost?: {
    totalAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    availableForSale?: boolean;
    image?: { url: string };
    price?: {
      amount: string;
      currencyCode: string;
    };
    product?: {
      id: string;
      title: string;
      featuredImage?: { url: string };
    };
  };
}

/**
 * ðŸŸ¢ CREATE CART - First step
 */
export async function createCart(): Promise<ShopifyCart | null> {

  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch({ query });
    const cart = res.data?.cartCreate?.cart;

    if (cart) {
      localStorage.setItem(CART_KEY, cart.id);
      return cart;
    }
  } catch (error) {
  }
  
  return null;
}

/**
 * ðŸŸ¢ GET CART ID - Check localStorage
 */
function getCartId(): string | null {
  return localStorage.getItem(CART_KEY);
}

/**
 * ðŸŸ¢ GET OR CREATE CART ID
 */
async function getOrCreateCartId(): Promise<string | null> {
  let cartId = getCartId();
  if (!cartId) {
    const newCart = await createCart();
    if (!newCart) return null;
    cartId = newCart.id;
  }
  return cartId;
}

/**
 * ðŸŸ¢ FETCH CART
 */
export async function getCart(): Promise<ShopifyCart | null> {
  const cartId = getCartId();
  if (!cartId) return null;

  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          nodes {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                availableForSale
                image {
                  url
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  featuredImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch({ query, variables: { cartId } });
    
    if (res.errors) {
      console.error('GraphQL errors getting cart:', res.errors);
      return null;
    }
    
    const cart = res.data?.cart;
    if (!cart) {
      console.warn('No cart found for ID:', cartId);
      clearCartId();
      return null;
    }
    return cart as ShopifyCart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

/**
 * ðŸŸ¢ ADD TO CART
 */
export async function addToCart(variantId: string, quantity = 1): Promise<ShopifyCart | null> {
  let cartId = await getOrCreateCartId();
  if (!cartId) {
    console.error('Failed to get or create cart ID');
    return null;
  }

  const query = `
    mutation AddLine($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  };

  try {
    const res = await shopifyFetch({ query, variables });
    
    if (res.errors) {
      console.error('GraphQL errors:', res.errors);
      return null;
    }
    
    const payload = res.data?.cartLinesAdd;

    if (payload?.userErrors?.length) {
      console.error('Cart errors:', payload.userErrors);
      payload.userErrors.forEach((err: any) => {
        console.error(`  ${err.field}: ${err.message}`);
      });
      return null;
    }

    if (payload?.cart) {
      return payload.cart as ShopifyCart;
    }
    
    console.error('No cart data returned from cartLinesAdd');
    return null;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

/**
 * ðŸŸ¢ REMOVE LINES FROM CART
 */
export async function removeCartLines(lineIds: string[]): Promise<ShopifyCart | null> {
  if (!lineIds.length) return getCart();

  const cartId = getCartId();
  if (!cartId) return null;

  const query = `
    mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch({ query, variables: { cartId, lineIds } });
    const payload = res.data?.cartLinesRemove;
    if (payload?.userErrors?.length) {
      return null;
    }
    return (payload?.cart as ShopifyCart) || null;
  } catch (error) {
    return null;
  }
}

/**
 * ðŸŸ¢ UPDATE LINE QUANTITY
 */
export async function updateCartLine(lineId: string, quantity: number): Promise<ShopifyCart | null> {
  const cartId = getCartId();
  if (!cartId) return null;

  const query = `
    mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };

  try {
    const res = await shopifyFetch({ query, variables });
    const payload = res.data?.cartLinesUpdate;
    if (payload?.userErrors?.length) {
      return null;
    }
    return (payload?.cart as ShopifyCart) || null;
  } catch (error) {
    return null;
  }
}

/**
 * ðŸŸ¢ CLEAR CART
 */
export function clearCartId(): void {
  localStorage.removeItem(CART_KEY);
}

/**
 * ðŸŸ¢ GET CHECKOUT URL - Get fresh checkout URL for current cart
 */
export async function getCheckoutUrl(): Promise<string | null> {
  const cart = await getCart();
  return cart?.checkoutUrl || null;
}
