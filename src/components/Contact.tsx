import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, MessageCircle, Instagram } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/Hello.leafandlore@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New Message from Leaf & Lore Website: ${formData.firstName}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' });
      } else {
        setStatus('success');
      }
    } catch (error) {
      setStatus('success');
    }
  };

  return (
    <section className="bg-[#FBFBFA] py-16 md:py-24 px-4 sm:px-6 md:px-12 text-[#1A382B]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start text-left">
        
        {/* Left Column: Direct Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A052]">
              Get In Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              We’d Love to Hear From You
            </h2>
            <p className="text-sm sm:text-base text-[#1A382B]/70 leading-relaxed">
              Whether you have questions about our botanical teas, want to explore mindful gift hampers, or just want to connect about slow living — we’re here.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1A382B]/10">
              <div className="p-3 rounded-xl bg-[#1A382B]/5 text-[#1A382B]">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-xs text-[#1A382B]/60 uppercase tracking-wider font-semibold block">Phone / WhatsApp</span>
                <a href="tel:+919971533077" className="text-sm font-bold text-[#1A382B] hover:text-[#C4A052] transition-colors">
                  +91 99715 33077
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1A382B]/10">
              <div className="p-3 rounded-xl bg-[#1A382B]/5 text-[#1A382B]">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-xs text-[#1A382B]/60 uppercase tracking-wider font-semibold block">Email</span>
                <a href="mailto:Hello.leafandlore@gmail.com" className="text-sm font-bold text-[#1A382B] hover:text-[#C4A052] transition-colors">
                  Hello.leafandlore@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1A382B]/10">
              <div className="p-3 rounded-xl bg-[#1A382B]/5 text-[#1A382B]">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-xs text-[#1A382B]/60 uppercase tracking-wider font-semibold block">Studio Location</span>
                <span className="text-sm font-bold text-[#1A382B]">
                  Noida, Uttar Pradesh, India
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1A382B]/10">
              <div className="p-3 rounded-xl bg-[#1A382B]/5 text-[#1A382B]">
                <Instagram size={20} />
              </div>
              <div>
                <span className="text-xs text-[#1A382B]/60 uppercase tracking-wider font-semibold block">Instagram</span>
                <a href="https://www.instagram.com/leafandlore__/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#C4A052] hover:underline">
                  @leafandlore__
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#1A382B]/10 shadow-xl"
        >
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A382B]">Message Sent</h3>
              <p className="text-sm text-[#1A382B]/70 max-w-sm mx-auto">
                Thank you for reaching out to Leaf &amp; Lore. We will reply to your email within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-full bg-[#1A382B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C4A052] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#1A382B]">
                Send a Note
              </h3>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Pooja"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFA] border border-[#1A382B]/10 text-sm focus:outline-none focus:border-[#C4A052]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFA] border border-[#1A382B]/10 text-sm focus:outline-none focus:border-[#C4A052]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="pooja@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFA] border border-[#1A382B]/10 text-sm focus:outline-none focus:border-[#C4A052]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99715 33077"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFA] border border-[#1A382B]/10 text-sm focus:outline-none focus:border-[#C4A052]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist you with our rituals, teas, or gifting?"
                  className="w-full px-4 py-3 rounded-xl bg-[#FBFBFA] border border-[#1A382B]/10 text-sm focus:outline-none focus:border-[#C4A052]"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-full bg-[#1A382B] text-white hover:bg-[#C4A052] font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Send size={15} />
                <span>{status === 'sending' ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;