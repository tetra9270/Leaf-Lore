import React from 'react';
import { motion } from 'motion/react';
import { Play, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { productsList } from '../data/products';
import { useCart } from '../context/CartContext';
import { getYouTubeEmbedUrl } from '../lib/utils';

// Get products that have videos
const productsWithVideos = productsList.filter(p => p.videoUrls && p.videoUrls.length > 0);

export const ProductVideos: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <section className="bg-transparent py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#1a1a1a]/40 uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Watch & Shop
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-4 leading-tight">
            See Our Products<br className="hidden sm:block" /> In Action
          </h2>
          <p className="text-[#1a1a1a]/60 text-sm md:text-base max-w-2xl mx-auto">
            Watch real product videos and short reels — then add your favorites to cart instantly
          </p>
        </motion.div>

        {/* Video + Product Cards */}
        <div className="space-y-8 md:space-y-12">
          {productsWithVideos.map((product, pIndex) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: pIndex * 0.1 }}
            >
              {/* Product Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <Play size={16} className="text-[#1A382B] ml-0.5" fill="#1A382B" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] font-semibold text-lg">{product.name}</h3>
                  <p className="text-[#1a1a1a]/50 text-sm">{product.videoUrls!.length} video{product.videoUrls!.length > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Videos Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {product.videoUrls!.map((videoUrl, vIndex) => (
                  <div
                    key={vIndex}
                    className="bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/10 shadow-sm hover:shadow-md transition-all group"
                  >
                    {/* Video Embed */}
                    <div className="aspect-[9/16] bg-[#000] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 origin-bottom">
                      <iframe
                        src={getYouTubeEmbedUrl(videoUrl)}
                        title={`${product.name} Video ${vIndex + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading={pIndex === 0 && vIndex === 0 ? 'eager' : 'lazy'}
                        className="w-full h-full border-0"
                      />
                    </div>

                    {/* Product Info + Buy */}
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded-lg bg-[#fafafa] p-1 border border-black/5"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#1a1a1a] text-sm font-semibold truncate">{product.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[#1a1a1a] font-bold text-lg">₹{product.price}</span>
                            <span className="text-[#1a1a1a]/40 text-sm line-through">₹{product.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await addToCart({
                              ...product,
                              quantity: 1,
                              plan: 'One Time Purchase',
                              finalPrice: product.price
                            });
                          } catch (err) {
                          }
                        }}
                        className="w-full bg-gradient-to-r from-[#1A382B] to-[#163016] text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                      >
                        <ShoppingCart size={15} />
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}

                {/* "View Product" Card for the last slot */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-[#1A382B]/20 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center justify-center p-6 sm:p-10 h-full min-h-[400px] group relative"
                >
                  <div className="absolute inset-0 bg-[#FAFCF9] z-0" />
                  <div className="absolute w-full h-[150%] bg-[#4CAF50]/5 rounded-full blur-3xl -top-1/4 translate-x-1/4 group-hover:bg-[#4CAF50]/10 transition-colors duration-500" />
                  
                  <div className="relative z-10 w-full max-w-[240px] md:max-w-[280px] aspect-square mb-8 rounded-[32px] bg-white p-6 md:p-8 shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center border border-black/5">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all" />
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <h4 className="text-lg md:text-xl font-serif text-[#1a1a1a] mb-2">{product.name}</h4>
                    <span className="text-[#1a1a1a]/50 text-xs md:text-sm mb-6 block">View full product details & reviews</span>
                    <span className="inline-flex items-center gap-2 bg-[#1A382B] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md group-hover:bg-[#0a3106] group-hover:shadow-lg transition-all group-hover:-translate-y-0.5">
                      Explore Product <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductVideos;
