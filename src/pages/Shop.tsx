import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/BestSellers';
import { useShopifyProducts } from '../lib/useShopifyProducts';
import { productsList } from '../data/products';
import { Download } from 'lucide-react';

const Shop: React.FC = () => {
  const { products: shopifyProducts } = useShopifyProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat') || 'All';
  const [activeTab, setActiveTab] = useState<string>(categoryParam);

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const allProducts = shopifyProducts.length > 0 ? shopifyProducts : productsList;

  const categories = [
    { key: 'All', label: 'All Rituals' },
    { key: 'Teas', label: 'Botanical Teas' },
    { key: 'Snacks', label: 'The Nourish Nook' },
    { key: 'Rituals', label: 'The Spice Ritual' },
    { key: 'Skincare', label: 'The Earthy Edit' },
    { key: 'Drinkware', label: 'Artisan Drinkware' },
    { key: 'Reading', label: 'Reading & Books' },
  ];

  const filteredProducts = React.useMemo(() => {
    if (activeTab === 'All') return allProducts;
    return allProducts.filter(p => p.category === activeTab);
  }, [allProducts, activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === 'All') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: key });
    }
  };

  return (
    <div className="bg-white pt-20 sm:pt-24 min-h-screen text-[#1A382B]">
      
      {/* Shop Hero */}
      <section className="relative py-16 sm:py-20 bg-[#1A382B] text-white text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/70 block">
            Official 2026 Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Shop the Rituals
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Whole-plant botanical teas, roasted snacks with strictly zero palm oil, traditional spice blends, and handcrafted stoneware.
          </p>

          <div className="pt-2">
            <a
              href="/Leaf and Lore catalogue .pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1A382B] hover:bg-neutral-100 text-xs font-medium tracking-wider uppercase transition-all shadow-sm"
            >
              <Download size={13} />
              <span>Download 2026 Catalogue (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar border-b border-neutral-100">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleTabChange(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === cat.key
                  ? 'bg-[#1A382B] text-white'
                  : 'bg-white text-[#1A382B]/70 hover:text-[#1A382B] border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between mb-8 text-xs text-[#2D3732]/70 font-medium">
          <span>Showing {filteredProducts.length} rituals in {categories.find(c => c.key === activeTab)?.label}</span>
          <span>Free shipping on all prepaid orders across India</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

      </section>

    </div>
  );
};

export default Shop;
