import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Star, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { productsList, ProductDetailsType } from '../data/products';
import { useShopifyProducts } from '../lib/useShopifyProducts';
import { useCart } from '../context/CartContext';

export const ProductCard: React.FC<{ product: ProductDetailsType; index: number }> = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [imageSrc, setImageSrc] = useState<string>(product.image || '');
  const [isAdded, setIsAdded] = useState(false);

  const rating = product.rating || 4.9;
  const reviews = product.reviews || 120;
  const originalPrice = product.compareAtPrice || product.originalPrice || Math.round(product.price * 1.25);
  const discount = Math.round((1 - product.price / originalPrice) * 100);

  useEffect(() => {
    setImageSrc(product.image || '');
  }, [product.image]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const variantId = product.variants?.[0]?.shopifyVariantId || product.shopifyVariantId || product.id;
    await addToCart({
      ...product,
      image: imageSrc || product.image,
      quantity: 1,
      plan: product.variants?.[0]?.label || 'Standard',
      finalPrice: product.price,
      shopifyVariantId: variantId,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-xl overflow-hidden group cursor-pointer border border-neutral-200/90 hover:border-[#1A382B]/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#FBFBFA] p-6 flex items-center justify-center overflow-hidden border-b border-neutral-100">
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 text-[9px] uppercase font-semibold tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/95 border border-neutral-200 text-[#1A382B]">
            {product.tag}
          </span>
        )}

        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick Add overlay button */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-sm transition-all duration-300 ${
            isAdded ? 'bg-green-700 text-white' : 'bg-white text-[#1A382B] border border-neutral-200 hover:bg-[#1A382B] hover:text-white'
          }`}
          aria-label="Add to Bag"
        >
          {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
        </button>
      </div>

      {/* Product Details Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[#1A382B]/60 text-[10px] tracking-[0.2em] font-semibold uppercase">
              {product.category || 'Ritual'}
            </span>
            <div className="flex items-center gap-1 text-[#1A382B]/70">
              <Star className="w-3 h-3 fill-[#1A382B] text-[#1A382B]" />
              <span className="text-xs font-semibold text-[#1A382B]">{rating}</span>
              <span className="text-[10px] text-neutral-400">({reviews})</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-semibold text-[#14221C] leading-snug line-clamp-2 min-h-[44px] group-hover:text-[#1A382B] transition-colors mb-2">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-[#14221C]">₹{product.price}</span>
            {originalPrice > product.price && (
              <>
                <span className="text-xs text-neutral-400 line-through">₹{originalPrice}</span>
                <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {discount}% off
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-full text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 ${
            isAdded 
              ? 'bg-green-800 text-white' 
              : 'border border-[#1A382B] text-[#1A382B] hover:bg-[#1A382B] hover:text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={13} /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag size={13} /> Add to Bag
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export const BestSellers: React.FC = () => {
  const { products: shopifyProducts } = useShopifyProducts();
  const [activeTab, setActiveTab] = useState<'All' | 'Teas' | 'Snacks' | 'Rituals' | 'Skincare' | 'Drinkware'>('All');

  const allProducts = shopifyProducts.length > 0 ? shopifyProducts : productsList;

  const filteredProducts = React.useMemo(() => {
    if (activeTab === 'All') return allProducts;
    return allProducts.filter(p => p.category === activeTab);
  }, [allProducts, activeTab]);

  const tabs = [
    { key: 'All', label: 'All Rituals' },
    { key: 'Teas', label: 'Botanical Teas' },
    { key: 'Snacks', label: 'The Nourish Nook' },
    { key: 'Rituals', label: 'The Spice Ritual' },
    { key: 'Skincare', label: 'The Earthy Edit' },
    { key: 'Drinkware', label: 'Artisan Drinkware' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white text-[#1A382B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 text-left gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block">
              Curated Daily Rituals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14221C] tracking-tight">
              Crafted for Your Everyday
            </h2>
            <p className="text-sm sm:text-base text-[#2D3732]/70 max-w-xl">
              From comforting teas and wholesome snacks to traditional spice rituals and ceramic mugs made for slow conversations.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#1A382B] hover:text-[#12281E] underline underline-offset-4 transition-colors group"
          >
            <span>View Full Collection</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#1A382B] text-white'
                  : 'bg-white text-[#1A382B]/70 hover:text-[#1A382B] border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BestSellers;
