import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, CheckCircle, Gift, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BecomeSeller({ 
  className, 
  onOpen,
  isOpen: controlledOpen,
  onClose,
  showButton = true 
}: { 
  className?: string; 
  onOpen?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  showButton?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (val: boolean) => {
    if (isControlled) {
      if (!val && onClose) onClose();
      if (val && onOpen) onOpen();
    } else {
      setInternalOpen(val);
      if (val && onOpen) onOpen();
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={() => setOpen(true)}
          className={className || "font-semibold hover:text-[#C4A052] focus:outline-none transition-all text-left text-sm"}
          type="button"
        >
          B2B &amp; Corporate Gifting
        </button>
      )}

      <AnimatePresence>
        {open && mounted && <Modal setOpen={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function Modal({ setOpen }: { setOpen: (val: boolean) => void }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'Corporate Gifting',
    quantity: '25-50 hampers',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formsubmit.co/ajax/Hello.leafandlore@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          quantity: formData.quantity,
          message: formData.notes,
          _subject: `New B2B / Gifting Inquiry from ${formData.name} (${formData.company})`,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('success'); // Soft-fallback
      }
    } catch (err) {
      setStatus('success'); // Soft-fallback
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-[#FBFBFA] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#1A382B]/10 z-10 text-left my-8"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-[#1A382B]/60 hover:text-[#1A382B] p-2 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A382B]">Inquiry Received</h3>
            <p className="text-sm text-[#1A382B]/70 max-w-sm mx-auto">
              Thank you for considering Leaf &amp; Lore for your gifting and partnership needs. Dr. Pooja and our team will get in touch within 24 hours.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#1A382B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C4A052] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C4A052]">
                <Gift size={14} />
                <span>For Business. For Gifting. For Good.</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A382B]">
                B2B &amp; Corporate Gifting
              </h3>
              <p className="text-xs text-[#1A382B]/70">
                Explore custom hampers, employee appreciation gift sets, and mindful brand partnerships.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Company / Brand</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Studio Bloom"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="radhika@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Phone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Interest Type</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
                >
                  <option value="Corporate Gifting">Corporate Gifting</option>
                  <option value="Wedding / Festive Hampers">Wedding / Festive Hampers</option>
                  <option value="Retail / Distribution">Retail / Distribution</option>
                  <option value="Brand Collaboration">Brand Collaboration</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Estimated Units</label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
                >
                  <option value="10-25 units">10–25 units</option>
                  <option value="25-50 units">25–50 units</option>
                  <option value="50-200 units">50–200 units</option>
                  <option value="200+ units">200+ units</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#1A382B] uppercase tracking-wider block mb-1">Notes / Custom Requirements</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tell us about the occasion, timeline, or preferred teas/snacks..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#1A382B]/15 focus:outline-none focus:border-[#C4A052]"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-full bg-[#1A382B] text-white hover:bg-[#C4A052] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={15} /> Submit Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default BecomeSeller;
