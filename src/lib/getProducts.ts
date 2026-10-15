/**
 * Fetch products from Shopify Storefront API
 * Transforms Shopify product data to match the local ProductDetailsType interface
 * Merges with Leaf & Lore Catalogue data for high-res images, rituals, and details.
 */

import { shopifyFetch, formatPrice, getImageUrl } from './shopify';
import { ProductDetailsType, ProductVariant, ProductMediaItem, productsList } from '../data/products';

function stripHtml(htmlOrText?: string): string {
  if (!htmlOrText) return '';
  return htmlOrText
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findLocalCatalogueProduct(title: string): ProductDetailsType | undefined {
  const cleanTitle = (title || '').toLowerCase();
  return productsList.find((p) => {
    const pName = p.name.toLowerCase();
    const pId = p.id.toLowerCase();
    return (
      cleanTitle.includes(pId) ||
      pName.includes(cleanTitle) ||
      cleanTitle.includes(pName.split('–')[0].trim().toLowerCase())
    );
  });
}

/**
 * Fetch all products from Shopify & merge with Leaf & Lore Catalogue
 */
export async function getShopifyProducts(): Promise<ProductDetailsType[]> {
  const query = `
    query {
      products(first: 50) {
        nodes {
          id
          title
          handle
          description
          descriptionHtml
          featuredImage {
            url
          }
          images(first: 10) {
            nodes {
              url
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 20) {
            nodes {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              image {
                url
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });
    const nodes = response.data?.products?.nodes;

    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
      return productsList;
    }

    const shopifyProducts: ProductDetailsType[] = nodes.map((product: any) => {
      const basePrice = formatPrice(product.priceRange.minVariantPrice);
      const localMatch = findLocalCatalogueProduct(product.title);

      const variants: ProductVariant[] = (product.variants?.nodes || []).map((variant: any) => ({
        label: variant.title === 'Default Title' ? 'Standard' : variant.title,
        price: formatPrice(variant.price),
        compareAtPrice: variant.compareAtPrice ? formatPrice(variant.compareAtPrice) : undefined,
        shopifyVariantId: variant.id,
        image: variant.image?.url || localMatch?.image,
        inStock: variant.availableForSale !== false,
      }));

      const rawImages = (product.images?.nodes || []).map((img: any) => img.url).filter(Boolean);
      const gallery = rawImages.length > 0 ? rawImages : (localMatch?.gallery || [localMatch?.image || '/leafandlore/catalogue_hero_cover.png']);
      const featuredImage = getImageUrl(product.featuredImage) || gallery[0] || localMatch?.image || '/leafandlore/catalogue_hero_cover.png';

      return {
        id: product.handle || product.id.replace(/.*\//, ''),
        name: product.title,
        category: localMatch?.category || 'Teas',
        price: basePrice > 0 ? basePrice : (localMatch?.price || 499),
        originalPrice: localMatch?.originalPrice || Math.round((basePrice > 0 ? basePrice : 499) * 1.25),
        image: featuredImage,
        gallery: gallery,
        rating: localMatch?.rating || 4.9,
        reviews: localMatch?.reviews || 120,
        description: localMatch?.description || [stripHtml(product.description) || 'Handcrafted botanical wellness from Leaf & Lore.'],
        descriptionHtml: product.descriptionHtml,
        benefits: localMatch?.benefits,
        ingredients: localMatch?.ingredients,
        howToUse: localMatch?.howToUse,
        variants: variants.length > 0 && variants[0].price > 0 ? variants : localMatch?.variants,
        shopifyVariantId: variants[0]?.shopifyVariantId,
        tag: localMatch?.tag
      };
    });

    // Merge any products from catalogue that aren't on Shopify yet so customer has full experience
    const existingHandles = new Set(shopifyProducts.map(p => p.id));
    const unlistedCatalogueProducts = productsList.filter(p => !existingHandles.has(p.id));

    return [...shopifyProducts, ...unlistedCatalogueProducts];
  } catch (error) {
    console.warn('Falling back to local Leaf & Lore catalogue:', error);
    return productsList;
  }
}

/**
 * Fetch product by handle or ID
 */
export async function getShopifyProductByHandle(handleOrId: string): Promise<ProductDetailsType | null> {
  const localMatch = productsList.find(p => p.id === handleOrId);
  try {
    const all = await getShopifyProducts();
    const found = all.find(p => p.id === handleOrId || p.name.toLowerCase().includes(handleOrId.toLowerCase()));
    return found || localMatch || productsList[0];
  } catch (error) {
    return localMatch || productsList[0];
  }
}

/**
 * Search products
 */
export async function searchShopifyProducts(searchQuery: string): Promise<ProductDetailsType[]> {
  const q = (searchQuery || '').toLowerCase();
  const all = await getShopifyProducts();
  return all.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.description || []).some(d => d.toLowerCase().includes(q))
  );
}
