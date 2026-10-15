import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Calendar, ArrowRight, BookOpen, Search } from 'lucide-react';
import { BLOG_POSTS, BlogPostData } from '../data/blogPosts';
import { SEOHead } from '../components/SEOHead';

export const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Herbal Teas & Rituals', 'Mindful Living', 'The Nourish Nook'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FBFBFA] min-h-screen pt-20 sm:pt-24 pb-20">
      {/* SEO Head for Blog Listing */}
      <SEOHead
        title="Journal — Rituals for Everyday Living | Leaf & Lore"
        description="Explore thoughtful essays on botanical tea rituals, hormonal harmony, zero palm oil snacking, and the art of slowing down."
        canonicalUrl="https://leafandlore.in/blog"
      />

      {/* Hero Header Section */}
      <section className="bg-[#1A382B] text-white py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4A052_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#C4A052] uppercase tracking-[0.4em] text-xs sm:text-sm font-semibold mb-3 block"
          >
            Leaf & Lore Journal
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FBFBFA] leading-[1.1] mb-6"
          >
            Rituals & Nourishment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            Thoughtful reflections on botanical wellness, hormonal harmony, slow living practices, and wholesome, honest snacking.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              placeholder="Search essays (e.g. Her Balance, slow living, zero palm oil)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/50 pl-12 pr-4 py-3.5 rounded-full border border-white/20 focus:outline-none focus:border-[#C4A052] text-sm sm:text-base transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A382B] text-[#C4A052] shadow-md'
                  : 'bg-white text-[#1A382B]/80 hover:bg-[#FBFBFA] border border-[#1A382B]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#1A382B]/10 p-8">
            <BookOpen size={48} className="mx-auto text-[#1A382B]/40 mb-4" />
            <h3 className="text-2xl font-serif font-bold text-[#1A382B] mb-2">No Posts Found</h3>
            <p className="text-sm text-[#1A382B]/70">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPostData, idx: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden border border-[#1A382B]/10 shadow-[0_4px_25px_rgba(26,56,43,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col ${
                  idx === 0 ? 'lg:col-span-3 lg:flex-row' : ''
                }`}
              >
                {/* Image Spec Container */}
                <div className={`relative bg-[#F4F7F2] overflow-hidden ${idx === 0 ? 'lg:w-1/2 min-h-[300px]' : 'h-60'}`}>
                  {post.heroImage.previewUrl ? (
                    <img
                      src={post.heroImage.previewUrl}
                      alt={post.heroImage.altText}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1A382B]/5 to-[#1A382B]/15">
                      <BookOpen size={40} className="text-[#1A382B]/40 mb-2" />
                      <span className="text-xs font-mono text-[#1A382B]/70">{post.heroImage.placeholderLabel}</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-[#1A382B] text-[#C4A052] text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className={`p-6 sm:p-8 flex flex-col justify-between ${idx === 0 ? 'lg:w-1/2' : 'flex-1'}`}>
                  <div>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#1A382B]/60 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.datePublished}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className={`font-serif font-bold text-[#1A382B] leading-tight mb-3 hover:text-[#C4A052] transition-colors ${
                      idx === 0 ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'
                    }`}>
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-[#1A382B]/80 line-clamp-3 mb-6 leading-relaxed">
                      {post.metaDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1A382B]/10 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      {post.author.avatar ? (
                        <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover border border-[#1A382B]" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#1A382B] text-white flex items-center justify-center font-bold text-xs">
                          PD
                        </div>
                      )}
                      <span className="text-xs font-medium text-[#1A382B]">{post.author.name}</span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A382B] hover:text-[#C4A052] transition-colors group cursor-pointer"
                    >
                      <span>Read Essay</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogList;
