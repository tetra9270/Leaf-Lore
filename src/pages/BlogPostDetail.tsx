import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Clock,
  Calendar,
  Heart,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Copy,
  Check,
  Leaf
} from 'lucide-react';

import { getBlogPostBySlug, BLOG_POSTS, HealthBenefit } from '../data/blogPosts';
import { SEOHead } from '../components/SEOHead';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const currentPath = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/').pop() || '';
  const targetSlug = slug || currentPath || '17-botanicals-womens-wellness-her-balance';
  const post = getBlogPostBySlug(targetSlug) || BLOG_POSTS[0];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleShareCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-5 h-5 text-[#C4A052]" />;
      case 'Shield':
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#C4A052]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#C4A052]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#C4A052]" />;
      default: return <Leaf className="w-5 h-5 text-[#C4A052]" />;
    }
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-[#FBFBFA] min-h-screen pt-20 sm:pt-24 pb-20">
      {/* Dynamic SEO Head */}
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonicalUrl={post.canonicalUrl}
        ogImage={post.ogImage}
        ogType="article"
        articleSchema={post.articleSchema}
        faqSchema={post.faqSchema}
      />

      {/* Hero Header */}
      <section className="bg-[#1A382B] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4A052_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/70 mb-6 flex-wrap font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#C4A052]" />
            <Link to="/blog" className="hover:text-white transition-colors">Journal</Link>
            <ChevronRight size={14} className="text-[#C4A052]" />
            <span className="text-[#E2D4B7] truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#C4A052] text-[#1A382B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-white/60 text-xs font-mono flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#FBFBFA] leading-[1.15] mb-4">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-lg sm:text-xl text-white/80 font-light italic mb-6">
              "{post.subtitle}"
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#C4A052]" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#1A382B] border border-[#C4A052] flex items-center justify-center text-[#C4A052] font-bold">
                  PD
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-white/60 text-xs">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white/70">
              <Calendar size={16} className="text-[#C4A052]" />
              <span>Published {post.datePublished}</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleShareCopy}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Link' : 'Share Essay'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-12">
        <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_4px_30px_rgba(26,56,43,0.05)] border border-[#1A382B]/10 leading-relaxed text-[#1A382B]">

          {/* Featured Image */}
          {post.heroImage.previewUrl && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-md max-h-[460px]">
              <img
                src={post.heroImage.previewUrl}
                alt={post.heroImage.altText}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Table of Contents */}
          {post.toc && post.toc.length > 0 && (
            <nav className="mb-12 p-6 sm:p-8 bg-[#FBFBFA] rounded-2xl border border-[#1A382B]/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-[#1A382B] border-b border-[#1A382B]/10 pb-3">
                <BookOpen size={20} className="text-[#C4A052]" />
                <h2 className="text-base font-serif font-bold text-[#1A382B] uppercase tracking-wider">In This Essay</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm">
                {post.toc.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-start gap-2 text-[#1A382B]/85 hover:text-[#1A382B] hover:font-medium transition-all group"
                    >
                      <span className="text-[#C4A052] font-mono text-xs mt-0.5 group-hover:translate-x-0.5 transition-transform">
                        0{idx + 1}.
                      </span>
                      <span className="underline decoration-transparent group-hover:decoration-[#1A382B] transition-colors">
                        {item.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Content Sections */}
          <div className="space-y-10">
            {post.contentSections && post.contentSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A382B] mb-4 pb-2 border-b border-[#1A382B]/10">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg text-[#1A382B]/80 mb-4 leading-relaxed font-light">
                    {p}
                  </p>
                ))}
                {section.callout && (
                  <div className="my-6 p-6 bg-[#FBFBFA] border-l-4 border-[#C4A052] rounded-r-xl italic text-base sm:text-lg text-[#1A382B]">
                    "{section.callout}"
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Benefits Grid */}
          {post.benefits && post.benefits.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[#1A382B]/10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A382B] mb-6">
                Key Intentions & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {post.benefits.map((b: HealthBenefit) => (
                  <div key={b.id} className="p-5 rounded-2xl bg-[#FBFBFA] border border-[#1A382B]/10">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                      {getBenefitIcon(b.iconName)}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#1A382B] mb-1">{b.title}</h3>
                    <p className="text-xs font-semibold text-[#C4A052] mb-2">{b.shortDesc}</p>
                    <p className="text-xs text-[#1A382B]/75 leading-relaxed">{b.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nutrition Table */}
          {post.nutritionTable && post.nutritionTable.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[#1A382B]/10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A382B] mb-6">
                Clean Formulation Highlights
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#1A382B]/20 text-[#1A382B] font-serif text-base">
                      <th className="py-3 px-4">Standard</th>
                      <th className="py-3 px-4">Level</th>
                      <th className="py-3 px-4">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.nutritionTable.map((item, idx) => (
                      <tr key={idx} className="border-b border-[#1A382B]/10 hover:bg-[#FBFBFA]">
                        <td className="py-3 px-4 font-semibold text-[#1A382B]">{item.nutrient}</td>
                        <td className="py-3 px-4 text-[#C4A052] font-bold">{item.amount}</td>
                        <td className="py-3 px-4 text-[#1A382B]/80">{item.whyItMatters}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* FAQs Accordion */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[#1A382B]/10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A382B] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-[#1A382B]/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-serif font-semibold text-base sm:text-lg text-[#1A382B] hover:bg-[#FBFBFA] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-[#C4A052] transition-transform duration-300 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-5 pb-5 text-sm sm:text-base text-[#1A382B]/80 leading-relaxed font-light"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Box */}
          <div className="mt-12 p-6 sm:p-8 bg-[#FBFBFA] rounded-3xl border border-[#1A382B]/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#C4A052] flex-shrink-0" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#1A382B] text-[#C4A052] flex items-center justify-center font-serif text-2xl font-bold flex-shrink-0">
                PD
              </div>
            )}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C4A052] block mb-1">About the Author</span>
              <h3 className="font-serif font-bold text-xl text-[#1A382B] mb-1">{post.author.name}</h3>
              <p className="text-xs text-[#1A382B]/70 mb-3">{post.author.role}</p>
              <p className="text-sm text-[#1A382B]/80 leading-relaxed font-light">
                {post.author.bio || 'Dental Surgeon, Public Health Professional, and author of Dear Tired Women. Dedicated to restoring gentle, mindful rituals to modern living.'}
              </p>
            </div>
          </div>

          {/* Action Callout */}
          <div className="mt-10 p-6 sm:p-8 bg-[#1A382B] text-white rounded-3xl text-center">
            <h3 className="font-serif text-2xl sm:text-3xl mb-2 text-[#FBFBFA]">Embrace Everyday Rituals</h3>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-6 font-light">
              Explore our full collection of hand-blended teas, slow-crafted stone drinkware, and zero palm oil snacks.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#C4A052] text-[#1A382B] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#d6b464] transition-all shadow-md"
            >
              <span>Explore The Catalogue</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-[#1A382B] mb-6">Further Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="bg-white rounded-2xl p-6 border border-[#1A382B]/10 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C4A052] font-semibold block mb-2">{related.category}</span>
                    <h3 className="font-serif font-bold text-lg text-[#1A382B] group-hover:text-[#C4A052] transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-[#1A382B]/70 line-clamp-2 leading-relaxed">
                      {related.metaDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A382B] mt-4 pt-4 border-t border-[#1A382B]/5">
                    <span>Read Essay</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C4A052]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPostDetail;
