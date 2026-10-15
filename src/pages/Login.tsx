import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2, ShieldCheck, CheckCircle, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { loginWithKwikPass, isLoggedIn, user, isKwikPassReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (isLoggedIn) return;

    // Wait for KwikPass to be ready, then trigger login popup
    if (isKwikPassReady) {
      loginWithKwikPass();
    }
  }, [isKwikPassReady, isLoggedIn, loginWithKwikPass]);

  // If user is already logged in, show success state
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F4F7F2] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-10 text-center border border-[#1A382B]/5"
        >
          <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={36} />
          </div>

          <h1 className="text-2xl font-serif text-[#1A382B] mb-2">Welcome Back!</h1>
          
          {user.phone && (
            <div className="flex items-center justify-center gap-2 text-[#1A382B]/60 text-sm mb-6">
              <Phone size={14} />
              <span>{user.phone}</span>
            </div>
          )}
          {user.email && (
            <p className="text-[#1A382B]/60 text-sm mb-6">{user.email}</p>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#1A382B] text-white py-3 rounded-xl font-bold hover:bg-[#0a3106] transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="w-full bg-[#F4F7F2] text-[#1A382B] py-3 rounded-xl font-medium hover:bg-[#E8EDE5] transition-colors"
            >
              Browse Products
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#1A382B]/30 font-medium bg-[#F4F7F2] py-3 rounded-xl mt-6">
            <ShieldCheck size={14} />
            <span>Secured by KwikPass</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading / waiting for KwikPass popup
  return (
    <div className="min-h-screen bg-[#F4F7F2] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-10 text-center border border-[#1A382B]/5"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 bg-[#1A382B]/5 rounded-3xl flex items-center justify-center mx-auto mb-8"
        >
          <Loader2 className="text-[#1A382B]" size={32} />
        </motion.div>

        <h1 className="text-2xl font-serif text-[#1A382B] mb-3">Login / Sign Up</h1>
        <p className="text-[#1A382B]/60 text-sm mb-6 leading-relaxed">
          {isKwikPassReady 
            ? 'Opening secure login...' 
            : 'Initializing login service...'}
        </p>

        {/* Manual trigger button as fallback */}
        <button
          onClick={loginWithKwikPass}
          className="w-full bg-[#1A382B] text-white py-3 rounded-xl font-bold hover:bg-[#0a3106] transition-colors mb-4"
        >
          Open Login
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#F4F7F2] text-[#1A382B] py-2.5 rounded-xl font-medium hover:bg-[#E8EDE5] transition-colors text-sm"
        >
          Back to Home
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-[#1A382B]/30 font-medium bg-[#F4F7F2] py-3 rounded-xl mt-6">
          <ShieldCheck size={14} />
          <span>Secured by KwikPass</span>
        </div>
      </motion.div>

      {/* Background Micro-animation */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        style={{
          background: 'radial-gradient(circle at center, #1A382B 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />
    </div>
  );
};

export default Login;
