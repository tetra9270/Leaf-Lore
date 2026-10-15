import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Contact } from '../components/Contact';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16 text-[#1A382B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#1A382B] hover:opacity-70 mb-8 transition-opacity">
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Return to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-serif text-[#1A382B] mb-4">Privacy Policy</h1>
          <p className="text-[#1A382B]/60 text-lg">Last Updated: April 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-[#1A382B]/5 space-y-10">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">1. Personal Information We Collect</h2>
            <p className="text-[#1A382B]/80 mb-4">
              Leaf & Lore ("we", "our", "us") operates the website leafandlore.in. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
            </p>
            <p className="text-[#1A382B]/80 mb-4">
              When you visit the website, we automatically collect certain information about your device, including your web browser, IP address, time zone, and cookies.
            </p>
            <p className="text-[#1A382B]/80">
              When you make a purchase, we collect:
            </p>
            <ul className="list-disc list-inside text-[#1A382B]/80 mt-3 space-y-2 ml-4">
              <li>Name</li>
              <li>Billing and shipping address</li>
              <li>Payment information</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">2. How We Use Your Information</h2>
            <p className="text-[#1A382B]/80 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Process and fulfill orders</li>
              <li>Communicate with you</li>
              <li>Screen orders for fraud or risk</li>
              <li>Improve customer experience</li>
              <li>Send marketing updates (only with consent)</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">3. Sharing Your Information</h2>
            <p className="text-[#1A382B]/80 mb-4">We share your personal data with trusted third parties such as:</p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Payment gateways</li>
              <li>Shipping partners</li>
              <li>Analytics providers</li>
            </ul>
            <p className="text-[#1A382B]/80 mt-4">
              <strong>We do not sell your personal data.</strong>
            </p>
          </section>

          {/* Section 4 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">4. Data Retention</h2>
            <p className="text-[#1A382B]/80">
              We retain your data for our records unless you request deletion.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">5. Your Rights</h2>
            <p className="text-[#1A382B]/80 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Access your data</li>
              <li>Correct your data</li>
              <li>Request deletion</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">6. Security</h2>
            <p className="text-[#1A382B]/80">
              We use industry-standard security measures to protect your data.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">7. Changes to Policy</h2>
            <p className="text-[#1A382B]/80">
              We may update this policy periodically. Your continued use of our website signifies your acceptance of these changes.
            </p>
          </section>

          {/* Section 8 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">8. Contact Information</h2>
            <div className="bg-[#F4F7F2] rounded-lg p-6 space-y-2">
              <p className="text-[#1A382B]/80"><strong>Brand:</strong> LEAF & LORE</p>
              <p className="text-[#1A382B]/80"><strong>Studio Address:</strong> Sector 62, Noida, Uttar Pradesh - 201301, India</p>
              <p className="text-[#1A382B]/80"><strong>Email:</strong> Hello.leafandlore@gmail.com</p>
              <p className="text-[#1A382B]/80"><strong>Phone / WhatsApp:</strong> +91 99715 33077</p>
            </div>
          </section>
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default PrivacyPolicy;
