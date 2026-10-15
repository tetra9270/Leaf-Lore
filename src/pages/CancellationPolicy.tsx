import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Contact } from '../components/Contact';

export const CancellationPolicy: React.FC = () => {
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
          <h1 className="text-5xl font-serif text-[#1A382B] mb-4">Cancellation Policy</h1>
          <p className="text-[#1A382B]/60 text-lg">Easy Order Cancellations</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-[#1A382B]/5 space-y-10">
          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <Clock className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Cancellation Window</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-[#1A382B] font-bold text-lg mb-2">
                    Orders can be cancelled within <strong>12 hours</strong> of placement
                  </p>
                  <p className="text-[#1A382B]/80">
                    After 12 hours, if your order has been dispatched, cancellation is not possible. However, you can request a return after delivery.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Cannot Be Cancelled</h2>
                <p className="text-[#1A382B]/80 mb-3">
                  The following orders cannot be cancelled:
                </p>
                <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
                  <li>Orders already dispatched/shipped</li>
                  <li>Orders out for delivery</li>
                  <li>Orders already delivered</li>
                  <li>Orders beyond the 12-hour cancellation window</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">How to Cancel</h2>
                <div className="space-y-4">
                  <div className="bg-[#FBFBFA] border border-neutral-200/80 rounded-xl p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Option 1: Self-Cancellation</p>
                    <p className="text-[#1A382B]/80">
                      Log in to your account and cancel the order directly from your order history (if within 12 hours).
                    </p>
                  </div>
                  <div className="bg-[#FBFBFA] border border-neutral-200/80 rounded-xl p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Option 2: Contact Support</p>
                    <p className="text-[#1A382B]/80">
                      Email Hello.leafandlore@gmail.com or WhatsApp +91 99715 33077 with your order number and cancellation request.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Refund on Cancellation</h2>
            <div className="bg-[#F4F7F2] rounded-lg p-6 space-y-3">
              <p className="text-[#1A382B]/80">
                <strong>Processing Time:</strong> 3–5 business days
              </p>
              <p className="text-[#1A382B]/80">
                <strong>Refund Amount:</strong> Full payment amount (including taxes)
              </p>
              <p className="text-[#1A382B]/80">
                <strong>Refunded To:</strong> Original payment method
              </p>
              <p className="text-[#1A382B]/80 text-sm mt-4">
                <strong>Note:</strong> Shipping charges are non-refundable as the order is cancelled.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">What Happens After Cancellation?</h2>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>Order status changes to "Cancelled"</li>
              <li>You'll receive a cancellation confirmation email</li>
              <li>Refund initiated to your account</li>
              <li>Stock becomes available for other customers</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Already Dispatched?</h2>
            <p className="text-[#1A382B]/80 mb-4">
              If your order has already been dispatched or shipped, you cannot cancel it. However, you have two options:
            </p>
            <div className="space-y-3">
              <div className="bg-[#F4F7F2] rounded-lg p-4">
                <p className="text-[#1A382B] font-semibold mb-2">Option 1: Return After Delivery</p>
                <p className="text-[#1A382B]/80">
                  Reject the delivery and return the product for a full refund (See Return & Refund Policy)
                </p>
              </div>
              <div className="bg-[#F4F7F2] rounded-lg p-4">
                <p className="text-[#1A382B] font-semibold mb-2">Option 2: Contact Support</p>
                <p className="text-[#1A382B]/80">
                  Reach out to Hello.leafandlore@gmail.com or WhatsApp +91 99715 33077 immediately for special assistance
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Contact Us</h2>
            <div className="bg-[#F4F7F2] rounded-lg p-6 space-y-2">
              <p className="text-[#1A382B]/80 mb-2">
                For cancellation requests or assistance:
              </p>
              <p className="text-[#1A382B]/80"><strong>Brand:</strong> LEAF & LORE</p>
              <p className="text-[#1A382B]/80"><strong>Studio Address:</strong> Sector 62, Noida, Uttar Pradesh - 201301, India</p>
              <p className="text-[#1A382B]/80"><strong>Email:</strong> Hello.leafandlore@gmail.com</p>
              <p className="text-[#1A382B]/80"><strong>Phone / WhatsApp:</strong> +91 99715 33077</p>
              <p className="text-[#1A382B]/80 mt-4 text-sm">
                Response within 24 hours during business days
              </p>
            </div>
          </section>
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default CancellationPolicy;
