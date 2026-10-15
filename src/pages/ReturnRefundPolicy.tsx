import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Contact } from '../components/Contact';

export const ReturnRefundPolicy: React.FC = () => {
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
          <h1 className="text-5xl font-serif text-[#1A382B] mb-4">Return & Refund Policy</h1>
          <p className="text-[#1A382B]/60 text-lg">We Stand Behind Our Products</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-[#1A382B]/5 space-y-10">
          {/* Intro */}
          <section>
            <p className="text-[#1A382B]/80 text-lg">
              We aim to deliver the highest quality products. We understand that sometimes returns are necessary, and we make the process simple and hassle-free.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Return Eligibility</h2>
                <p className="text-[#1A382B]/80 mb-3">
                  To be eligible for a return, your order must meet the following conditions:
                </p>
                <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
                  <li>Return request must be raised <strong>within 3 days of delivery</strong></li>
                  <li>Product must be <strong>unused and unopened</strong></li>
                  <li>Product must be in <strong>original packaging</strong></li>
                  <li>All accessories and documentation must be included</li>
                  <li>Product must not show signs of wear or damage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Non-Returnable Items</h2>
                <p className="text-[#1A382B]/80 mb-3">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
                  <li><strong>Opened or used personal care products</strong> (for hygiene reasons)</li>
                  <li>Items damaged due to misuse or mishandling</li>
                  <li>Products returned after 3 days</li>
                  <li>Items without original packaging</li>
                  <li>Custom or personalized items</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <div className="flex items-start gap-4 mb-4">
              <RotateCcw className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Return Process</h2>
                <div className="space-y-4">
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Step 1: Request Return</p>
                    <p className="text-[#1A382B]/80">
                      Email Hello.leafandlore@gmail.com or WhatsApp +91 99715 33077 with your order number and reason for return within 3 days of delivery.
                    </p>
                  </div>
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Step 2: Return Authorization</p>
                    <p className="text-[#1A382B]/80">
                      We'll verify your request and provide a return shipping address.
                    </p>
                  </div>
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Step 3: Ship Product</p>
                    <p className="text-[#1A382B]/80">
                      Pack the product securely and ship it to our address. (Return shipping is free for defective items)
                    </p>
                  </div>
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Step 4: Receive Refund</p>
                    <p className="text-[#1A382B]/80">
                      Once received and verified, refund will be processed within 5–7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Damaged or Wrong Product</h2>
            <p className="text-[#1A382B]/80 mb-4">
              If you receive a damaged or incorrect product:
            </p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Contact us <strong>within 24 hours</strong> of delivery</li>
              <li>Provide photos/videos of the damage or wrong item</li>
              <li>We will send a replacement immediately or process a full refund</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Refund Processing</h2>
            <div className="bg-[#F4F7F2] rounded-lg p-6 space-y-3">
              <p className="text-[#1A382B]/80">
                <strong>Processing Time:</strong> 5–7 business days after verification
              </p>
              <p className="text-[#1A382B]/80">
                <strong>Refund Method:</strong> Amount credited to original payment method (card/wallet/UPI)
              </p>
              <p className="text-[#1A382B]/80">
                <strong>Note:</strong> Shipping charges are non-refundable unless it's a defective product
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Replacements</h2>
            <p className="text-[#1A382B]/80 mb-3">
              For defective items, we offer a free replacement option:
            </p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Free replacement shipped to your address</li>
              <li>Pickup of defective item arranged by us</li>
              <li>Replacement sent with prepaid return label</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Contact Us</h2>
            <div className="bg-[#F4F7F2] rounded-lg p-6 space-y-2">
              <p className="text-[#1A382B]/80 mb-2">
                For return or refund assistance:
              </p>
              <p className="text-[#1A382B]/80"><strong>Brand:</strong> LEAF & LORE</p>
              <p className="text-[#1A382B]/80"><strong>Studio & Return Address:</strong> Sector 62, Noida, Uttar Pradesh - 201301, India</p>
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

export default ReturnRefundPolicy;
