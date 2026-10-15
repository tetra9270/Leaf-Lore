import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Contact } from '../components/Contact';

export const TermsConditions: React.FC = () => {
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
          <h1 className="text-5xl font-serif text-[#1A382B] mb-4">Terms & Conditions</h1>
          <p className="text-[#1A382B]/60 text-lg">Last Updated: April 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-[#1A382B]/5 space-y-10">
          {/* Intro */}
          <section>
            <p className="text-[#1A382B]/80 text-lg">
              By accessing or using leafandlore.in, you agree to be bound by these Terms & Conditions.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">1. General Conditions</h2>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>You must be at least 18 years old</li>
              <li>You agree to provide accurate information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">2. Products & Pricing</h2>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>All prices are in INR (Indian Rupees)</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to limit quantities</li>
              <li>All product information is subject to verification</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">3. Order Acceptance</h2>
            <p className="text-[#1A382B]/80 mb-4">
              We reserve the right to refuse or cancel any order due to:
            </p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Fraud suspicion</li>
              <li>Incorrect pricing</li>
              <li>Stock unavailability</li>
              <li>Violation of these terms</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">4. Intellectual Property</h2>
            <p className="text-[#1A382B]/80">
              All content on this website (text, images, logos, designs) is owned by LEAF & LORE and cannot be reproduced, copied, or used without prior written permission.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">5. Limitation of Liability</h2>
            <p className="text-[#1A382B]/80">
              We are not liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or website, including loss of profits, loss of data, or business interruption.
            </p>
          </section>

          {/* Section 6 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">6. Governing Law & Jurisdiction</h2>
            <p className="text-[#1A382B]/80 mb-3">
              These Terms & Conditions are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            <p className="text-[#1A382B]/80">
              The exclusive jurisdiction and venue for any legal action arising from these terms shall be in the courts located in Uttar Pradesh / Delhi, India.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">7. Changes to Terms</h2>
            <p className="text-[#1A382B]/80">
              We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to the website.
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

export default TermsConditions;
