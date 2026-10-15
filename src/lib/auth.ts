/**
 * Simplified Shopify Auth Configuration
 * Focuses on direct redirection to hosted Shopify account pages.
 */

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN || 'shhgcv-1q.myshopify.com';
const shopUrl = `https://${domain.replace(/^https?:\/\//, '')}`;

export const SHOPIFY_AUTH_URLS = {
  // Direct link to Account page (Shopify handles login/OTP automatically)
  ACCOUNT: `${shopUrl}/account`,
  
  // Specific Login link
  LOGIN: `${shopUrl}/account/login`,
  
  // Specific Logout link
  LOGOUT: `${shopUrl}/account/logout`,
};

/**
 * Helper to get the canonical Shopify domain.
 */
export function getShopifyDomain(): string {
  return domain;
}
