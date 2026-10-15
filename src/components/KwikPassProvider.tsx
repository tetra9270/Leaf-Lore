/**
 * KwikPassProvider – Handles KwikPass DOM updates and page view events
 * 
 * Must be placed inside <Router> to access useLocation()
 * Fires page_view_kp events on every route change for KwikEngage retargeting
 */

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../types/kwikpass.d.ts';

export const KwikPassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const hasInitialized = useRef(false);

  // ─── Detect Script Loading ─────────────────────────────────────────────
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (window.__KP_LOGIN_SDK_INSTANCE__) {
      setIsScriptLoaded(true);
      return;
    }

    const handleLoaded = () => {
      console.log('[KwikPass] Scripts loaded');
      setIsScriptLoaded(true);
    };

    window.addEventListener('kp-script-loaded', handleLoaded);

    const interval = setInterval(() => {
      if (window.__KP_LOGIN_SDK_INSTANCE__) {
        setIsScriptLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      window.removeEventListener('kp-script-loaded', handleLoaded);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // ─── DOM Updates on Route Change ───────────────────────────────────────
  useEffect(() => {
    if (!isScriptLoaded) return;

    if (typeof window.handleDOMUpdate === 'function') {
      window.handleDOMUpdate();
    }
  }, [isScriptLoaded, location.pathname]);

  // ─── Dispatch Page View Events for Generic Pages ───────────────────────
  useEffect(() => {
    if (!isScriptLoaded) return;

    const path = location.pathname;
    
    // Skip product and shop pages – they handle their own events
    if (path.startsWith('/product/') || path === '/shop' || path === '/collections/all') {
      return;
    }

    // Fire 'other' page view for home, contact, about, cart, etc.
    const cartId = localStorage.getItem('shopify_cart_id') || '';

    const event = new CustomEvent('page_view_kp', {
      detail: {
        type: 'other',
        data: {
          cart_id: cartId,
        },
      },
    });

    window.dispatchEvent(event);
    console.log('[KwikPass] page_view_kp (other) dispatched for:', path);
  }, [isScriptLoaded, location.pathname]);

  return <>{children}</>;
};
