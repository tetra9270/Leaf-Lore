import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { SHOPIFY_AUTH_URLS } from '../lib/auth';
import '../types/kwikpass.d.ts';

// ─── Types ───────────────────────────────────────────────────────────────────

interface KwikPassUser {
  phone: string | null;
  email: string | null;
  shopifyCustomerId: string | null;
}

interface AuthContextType {
  // KwikPass Auth State
  isLoggedIn: boolean;
  user: KwikPassUser;
  isKwikPassReady: boolean;

  // KwikPass Actions
  loginWithKwikPass: () => void;
  logoutKwikPass: () => void;

  // Legacy Shopify Redirects (fallback)
  redirectToAccount: () => void;
  redirectToLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── LocalStorage Keys ──────────────────────────────────────────────────────
const KP_LOGGED_IN_KEY = 'kp_logged_in';
const KP_USER_PHONE_KEY = 'kp_user_phone';
const KP_USER_EMAIL_KEY = 'kp_user_email';
const KP_CUSTOMER_ID_KEY = 'kp_customer_id';
const KP_TOKEN_KEY = 'kp_token';

// ─── Provider ────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isKwikPassReady, setIsKwikPassReady] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => 
    localStorage.getItem(KP_LOGGED_IN_KEY) === 'true'
  );

  const [user, setUser] = useState<KwikPassUser>(() => ({
    phone: localStorage.getItem(KP_USER_PHONE_KEY),
    email: localStorage.getItem(KP_USER_EMAIL_KEY),
    shopifyCustomerId: localStorage.getItem(KP_CUSTOMER_ID_KEY),
  }));

  // ─── Detect KwikPass SDK Loading ───────────────────────────────────────
  useEffect(() => {
    const checkKwikPass = () => {
      if (window.__KP_LOGIN_SDK_INSTANCE__) {
        setIsKwikPassReady(true);
        return true;
      }
      return false;
    };

    if (checkKwikPass()) return;

    // Poll until it's defined
    const interval = setInterval(() => {
      if (checkKwikPass()) {
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.warn('[KwikPass Auth] SDK failed to initialize after 15 seconds');
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // ─── Listen for KwikPass Auth Events ───────────────────────────────────
  useEffect(() => {
    const handleKpData = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log('[KwikPass Auth] kp_data_sent:', detail);

      // Handle forced logout by KwikPass
      if (detail?.kpLogout) {
        clearAuthState();
        window.location.reload();
        return;
      }

      // Handle successful login
      if (detail?.success && detail?.kpToken) {
        localStorage.setItem(KP_TOKEN_KEY, detail.kpToken);
        localStorage.setItem(KP_LOGGED_IN_KEY, 'true');
        setIsLoggedIn(true);

        const newUser: KwikPassUser = {
          phone: detail.phone || user.phone,
          email: detail.email || user.email,
          shopifyCustomerId: detail.shopifyCustomerId || user.shopifyCustomerId,
        };

        if (newUser.phone) localStorage.setItem(KP_USER_PHONE_KEY, newUser.phone);
        if (newUser.email) localStorage.setItem(KP_USER_EMAIL_KEY, newUser.email);
        if (newUser.shopifyCustomerId) localStorage.setItem(KP_CUSTOMER_ID_KEY, newUser.shopifyCustomerId);

        setUser(newUser);
        console.log('[KwikPass Auth] User logged in:', newUser.phone || newUser.email);
      }

      if (detail?.error) {
        console.error('[KwikPass Auth] Error:', detail.error);
      }
    };

    window.addEventListener('kp_data_sent', handleKpData);
    return () => window.removeEventListener('kp_data_sent', handleKpData);
  }, [user]);

  // ─── Clear Auth State Helper ───────────────────────────────────────────
  const clearAuthState = useCallback(() => {
    setIsLoggedIn(false);
    setUser({ phone: null, email: null, shopifyCustomerId: null });
    localStorage.removeItem(KP_LOGGED_IN_KEY);
    localStorage.removeItem(KP_USER_PHONE_KEY);
    localStorage.removeItem(KP_USER_EMAIL_KEY);
    localStorage.removeItem(KP_CUSTOMER_ID_KEY);
    localStorage.removeItem(KP_TOKEN_KEY);
  }, []);

  // ─── KwikPass Login ────────────────────────────────────────────────────
  const loginWithKwikPass = useCallback(() => {
    if (window.__KP_LOGIN_SDK_INSTANCE__ && typeof window.__KP_LOGIN_SDK_INSTANCE__.handleKpLogin === 'function') {
      try {
        window.__KP_LOGIN_SDK_INSTANCE__.handleKpLogin();
      } catch (err) {
        console.warn('[KwikPass Auth] Login error, redirecting to Shopify login', err);
        window.location.href = SHOPIFY_AUTH_URLS.LOGIN;
      }
    } else {
      console.warn('[KwikPass Auth] SDK not ready, redirecting to Shopify login');
      window.location.href = SHOPIFY_AUTH_URLS.LOGIN;
    }
  }, []);

  // ─── KwikPass Logout ───────────────────────────────────────────────────
  const logoutKwikPass = useCallback(() => {
    clearAuthState();
    if (typeof window.handleLogout === 'function') {
      window.handleLogout(window.location.origin);
    } else {
      window.location.reload();
    }
  }, [clearAuthState]);

  // ─── Legacy Shopify Redirects ──────────────────────────────────────────
  const redirectToAccount = () => {
    window.location.href = SHOPIFY_AUTH_URLS.ACCOUNT;
  };

  const redirectToLogin = () => {
    loginWithKwikPass(); // Use KwikPass instead of redirect
  };

  const logout = () => {
    logoutKwikPass();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isKwikPassReady,
        loginWithKwikPass,
        logoutKwikPass,
        redirectToAccount,
        redirectToLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
