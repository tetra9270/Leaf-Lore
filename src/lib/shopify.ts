/**
 * Shopify Storefront API Client
 * Handles all GraphQL requests to Shopify
 */

const domainFromEnv =
  import.meta.env.VITE_SHOPIFY_DOMAIN || import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const domain = domainFromEnv
  ? domainFromEnv.replace(/^https?:\/\//, '').replace(/\/$/, '')
  : '';

// Debug environment

export async function shopifyFetch({ query, variables }: any) {
  if (!domain) {
    throw new Error(
      'Shopify domain missing. Set VITE_SHOPIFY_DOMAIN (or VITE_SHOPIFY_STORE_DOMAIN) in environment variables.'
    );
  }

  if (!token) {
    throw new Error('Shopify Storefront token missing. Set VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
  }

  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
      'Shopify-Storefront-Buyer-IP': '127.0.0.1', // Recommended for customer mutations
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error('Shopify API error');
  }

  return json;
}

export function formatPrice(price: { amount: string; currencyCode: string }): number {
  return parseFloat(price.amount);
}

export function getImageUrl(image: any): string {
  if (!image) return '';
  return image.url || '';
}
