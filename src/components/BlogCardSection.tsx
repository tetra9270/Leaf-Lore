import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export const BlogCardSection: React.FC = () => {
  const latestPost = BLOG_POSTS[0];

  if (!latestPost) return null;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white border-t border-neutral-100 text-[#1A382B]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1A382B]/60 block">
              Mindful Living &amp; Wellness Guides
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#14221C] leading-tight tracking-tight">
              The Leaf &amp; Lore Journal
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#1A382B] hover:text-[#12281E] underline underline-offset-4 transition-colors group cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 text-left"
        >
          <div className="lg:col-span-6 bg-[#FBFBFA] relative min-h-[260px] sm:min-h-[320px] overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-100">
            {latestPost.heroImage.previewUrl ? (
              <img
                src={latestPost.heroImage.previewUrl}
                alt={latestPost.heroImage.altText}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-50">
                <BookOpen size={40} className="text-[#1A382B]/30 mb-2" />
                <span className="text-xs font-mono text-[#1A382B]/60">{latestPost.heroImage.placeholderLabel}</span>
              </div>
            )}
            <span className="absolute top-4 left-4 bg-[#1A382B] text-white text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {latestPost.category}
            </span>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-[#2D3732]/60 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {latestPost.datePublished}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {latestPost.readTime}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#14221C] leading-snug mb-3 hover:text-[#1A382B] transition-colors">
                <Link to={`/blog/${latestPost.slug}`}>
                  {latestPost.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-[#2D3732]/80 line-clamp-3 mb-6 leading-relaxed">
                {latestPost.metaDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {latestPost.author.avatar ? (
                  <img src={latestPost.author.avatar} alt={latestPost.author.name} className="w-8 h-8 rounded-full object-cover border border-neutral-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1A382B] text-white flex items-center justify-center font-bold text-xs">
                    PD
                  </div>
                )}
                <span className="text-xs font-medium text-[#1A382B]">{latestPost.author.name}</span>
              </div>

              <Link
                to={`/blog/${latestPost.slug}`}
                className="inline-flex items-center gap-2 bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-medium tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
              >
                <span>Read Story</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogCardSection;
