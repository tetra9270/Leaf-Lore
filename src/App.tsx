import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BestSellers } from './components/BestSellers';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { KwikPassProvider } from './components/KwikPassProvider';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Chatbot } from './components/Chatbot';
import { CartDrawer } from './components/CartDrawer';

import { ComboBanner } from './components/ComboBanner';

// Lazy load below-fold home sections
import CatalogSection from './components/CatalogSection';
import FounderSection from './components/FounderSection';
import { BlogCardSection } from './components/BlogCardSection';
import SmoothSocialSection from './components/SmoothSocialSection';
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));

// Lazy load route pages
const Shop = lazy(() => import('./pages/Shop'));
const Learn = lazy(() => import('./pages/Learn'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Videos = lazy(() => import('./pages/Videos'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const Cart = lazy(() => import('./pages/Cart'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const ReturnRefundPolicy = lazy(() => import('./pages/ReturnRefundPolicy'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));

// Blog Pages
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));

// Auth Redirect Bridge
const Login = lazy(() => import('./pages/Login'));

import { TiltedMarqueeScroller } from './components/TiltedMarqueeScroller';

function Home() {
  return (
    <main>
      <Hero />
      <TiltedMarqueeScroller bgColor="bg-white" textColor="text-[#1A382B]" speedSeconds={90} />
      <BestSellers />
      <ComboBanner />
      <CatalogSection />
      <SmoothSocialSection />
      <FounderSection />
      <BlogCardSection />
      <Suspense fallback={null}>
        <Features />
      </Suspense>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <KwikPassProvider>
          <div className="min-h-screen bg-surface selection:bg-accent selection:text-white">
          <Header />
          <CartDrawer />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/about" element={<Learn />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/collections/all" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Blog Routes */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />

              {/* All Auth routes now lead to the Redirect Bridge */}
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />

              
              {/* Fallback for legacy routes */}
              <Route path="/callback" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
          <Footer />
          <Chatbot />
        </div>
          </KwikPassProvider>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
