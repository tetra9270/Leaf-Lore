/**
 * Custom Hook: useShopifyProducts
 * Provides an easy way to fetch and cache Shopify products in React components
 */

import { useState, useEffect, useCallback } from 'react';
import { ProductDetailsType } from '../data/products';
import {
  getShopifyProducts,
  getShopifyProductByHandle,
  searchShopifyProducts,
} from './getProducts';

export interface UseShopifyProductsReturn {
  products: ProductDetailsType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetch all products from Shopify
 */
export function useShopifyProducts(): UseShopifyProductsReturn {
  const [products, setProducts] = useState<ProductDetailsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getShopifyProducts();
      console.log('Fetched products from Shopify:', data.length, data);
      setProducts(data);
      
      if (data.length === 0) {
        console.warn('No products returned from Shopify API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      console.error('Error fetching Shopify products:', errorMessage, err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}

/**
 * Fetch a single product by handle
 */
export function useShopifyProductByHandle(
  handle: string
): UseShopifyProductsReturn & { product: ProductDetailsType | null } {
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!handle) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getShopifyProductByHandle(handle);
      setProduct(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [handle]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    products: product ? [product] : [],
    isLoading,
    error,
    refetch: fetchProduct,
  };
}

/**
 * Search products by query
 */
export function useSearchShopifyProducts(
  searchQuery: string
): UseShopifyProductsReturn {
  const [products, setProducts] = useState<ProductDetailsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async () => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await searchShopifyProducts(searchQuery);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search products';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts();
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(debounceTimer);
  }, [searchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: searchProducts,
  };
}
