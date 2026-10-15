/**
 * useKwikPass – Custom React Hook for KwikPass Integration
 * 
 * Handles:
 * - KwikPass script loading state
 * - DOM updates on route changes
 * - Page view event dispatching for KwikEngage retargeting
 * - kpToken capture and auth state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../types/kwikpass.d.ts';

// ─── LocalStorage Keys ──────────────────────────────────────────────────────
const KP_LOGGED_IN_KEY = 'kp_logged_in';
const KP_USER_PHONE_KEY = 'kp_user_phone';
const KP_USER_EMAIL_KEY = 'kp_user_email';
const KP_TOKEN_KEY = 'kp_token';

// ─── Types ───────────────────────────────────────────────────────────────────
interface KwikPassUser {
  isLoggedIn: boolean;
  phone: string | null;
  email: string | null;
}

interface PageViewProductData {
  type: 'product';
  data: {
    cart_id?: string;
    product_id: string;
    variant_id?: string;
    image_url: string;
    name: string;
    price: number;
    handle?: string;
  };
}

interface PageViewCollectionData {
  type: 'collection';
  data: {
    cart_id?: string;
    collection_id: string;
    name: string;
    image_url?: string;
    handle?: string;
  };
}

interface PageViewOtherData {
  type: 'other';
  data: {
    cart_id?: string;
  };
}

type PageViewData = PageViewProductData | PageViewCollectionData | PageViewOtherData;

interface UseKwikPassReturn {
  isScriptLoaded: boolean;
  user: KwikPassUser;
  login: () => void;
  logout: (redirectTo?: string) => void;
  dispatchPageView: (data: PageViewData) => void;
}

// ─── Helper: Get cart ID from localStorage ────────────────────────────────────
function getCartId(): string {
  return localStorage.getItem('shopify_cart_id') || '';
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useKwikPass(): UseKwikPassReturn {
  const location = useLocation();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const hasInitialized = useRef(false);

  // Restore user state from localStorage
  const [user, setUser] = useState<KwikPassUser>(() => ({
    isLoggedIn: localStorage.getItem(KP_LOGGED_IN_KEY) === 'true',
    phone: localStorage.getItem(KP_USER_PHONE_KEY),
    email: localStorage.getItem(KP_USER_EMAIL_KEY),
  }));

  // ─── 1. Script Loading Detection ──────────────────────────────────────────
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Check if already loaded
    if (window.__KP_LOGIN_SDK_INSTANCE__) {
      setIsScriptLoaded(true);
      return;
    }

    // Listen for the script loaded event (from onload in index.html)
    const handleScriptLoaded = () => {
      console.log('[KwikPass] Scripts loaded');
      setIsScriptLoaded(true);
    };

    window.addEventListener('kp-script-loaded', handleScriptLoaded);

    // Also poll for a short time in case event was missed
    const interval = setInterval(() => {
      if (window.__KP_LOGIN_SDK_INSTANCE__) {
        setIsScriptLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      window.removeEventListener('kp-script-loaded', handleScriptLoaded);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // ─── 2. DOM Updates on Route Change ───────────────────────────────────────
  useEffect(() => {
    if (!isScriptLoaded) return;

    if (typeof window.handleDOMUpdate === 'function') {
      window.handleDOMUpdate();
    }
  }, [isScriptLoaded, location.pathname]);

  // ─── 3. Listen for kp_data_sent (token/auth events) ──────────────────────
  useEffect(() => {
    const handleKpData = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log('[KwikPass] kp_data_sent event:', detail);

      if (detail?.kpLogout) {
        // KwikPass invalidated the session
        setUser({ isLoggedIn: false, phone: null, email: null });
        localStorage.removeItem(KP_LOGGED_IN_KEY);
        localStorage.removeItem(KP_USER_PHONE_KEY);
        localStorage.removeItem(KP_USER_EMAIL_KEY);
        localStorage.removeItem(KP_TOKEN_KEY);
        window.location.reload();
        return;
      }

      if (detail?.success && detail?.kpToken) {
        // Store token for potential backend decryption
        localStorage.setItem(KP_TOKEN_KEY, detail.kpToken);
        localStorage.setItem(KP_LOGGED_IN_KEY, 'true');

        // Extract basic info if available in the event detail
        if (detail.phone) {
          localStorage.setItem(KP_USER_PHONE_KEY, detail.phone);
        }
        if (detail.email) {
          localStorage.setItem(KP_USER_EMAIL_KEY, detail.email);
        }

        setUser({
          isLoggedIn: true,
          phone: detail.phone || localStorage.getItem(KP_USER_PHONE_KEY),
          email: detail.email || localStorage.getItem(KP_USER_EMAIL_KEY),
        });

        console.log('[KwikPass] User authenticated successfully');
      }

      if (detail?.error) {
        console.error('[KwikPass] Auth error:', detail.error);
      }
    };

    window.addEventListener('kp_data_sent', handleKpData);
    return () => window.removeEventListener('kp_data_sent', handleKpData);
  }, []);

  // ─── 4. Listen for 'message' event (JWE token) ────────────────────────────
  useEffect(() => {
    const handleMessage = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.jweToken) {
        console.log('[KwikPass] JWE token received (store for backend decryption)');
        localStorage.setItem(KP_TOKEN_KEY, detail.jweToken);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // ─── 5. Login Function ────────────────────────────────────────────────────
  const login = useCallback(() => {
    if (window.__KP_LOGIN_SDK_INSTANCE__) {
      window.__KP_LOGIN_SDK_INSTANCE__.handleKpLogin();
    } else {
      console.warn('[KwikPass] SDK not loaded yet, cannot trigger login');
    }
  }, []);

  // ─── 6. Logout Function ───────────────────────────────────────────────────
  const logout = useCallback((redirectTo?: string) => {
    // Clear local state
    setUser({ isLoggedIn: false, phone: null, email: null });
    localStorage.removeItem(KP_LOGGED_IN_KEY);
    localStorage.removeItem(KP_USER_PHONE_KEY);
    localStorage.removeItem(KP_USER_EMAIL_KEY);
    localStorage.removeItem(KP_TOKEN_KEY);

    // Call KwikPass logout
    if (typeof window.handleLogout === 'function') {
      window.handleLogout(redirectTo || window.location.origin);
    } else {
      // Fallback: just reload
      window.location.reload();
    }
  }, []);

  // ─── 7. Page View Event Dispatcher ────────────────────────────────────────
  const dispatchPageView = useCallback((data: PageViewData) => {
    if (!isScriptLoaded) return;

    // Inject cart_id if available
    const cart_id = getCartId();
    const eventData = {
      ...data,
      data: {
        ...data.data,
        cart_id: cart_id || data.data.cart_id || '',
      },
    };

    const event = new CustomEvent('page_view_kp', {
      detail: eventData,
    });

    window.dispatchEvent(event);
    console.log('[KwikPass] page_view_kp dispatched:', eventData);
  }, [isScriptLoaded]);

  return {
    isScriptLoaded,
    user,
    login,
    logout,
    dispatchPageView,
  };
}
