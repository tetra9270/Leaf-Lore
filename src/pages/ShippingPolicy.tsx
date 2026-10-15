import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Clock, MapPin } from 'lucide-react';
import { Contact } from '../components/Contact';

export const ShippingPolicy: React.FC = () => {
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
          <h1 className="text-5xl font-serif text-[#1A382B] mb-4">Shipping Policy</h1>
          <p className="text-[#1A382B]/60 text-lg">Fast, Safe & Reliable Delivery</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-[#1A382B]/5 space-y-10">
          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <Clock className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-2">Order Processing</h2>
                <p className="text-[#1A382B]/80">
                  All orders are processed within <strong>1–2 business days</strong> after payment confirmation. Orders placed on weekends or holidays will be processed on the next working day.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <div className="flex items-start gap-4 mb-4">
              <Truck className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Delivery Timeframe</h2>
                <div className="space-y-3">
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Metro Cities (Delhi, Mumbai, Bangalore, Hyderabad, Pune)</p>
                    <p className="text-[#1A382B]/80"><strong>2–4 business days</strong> from dispatch</p>
                  </div>
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Other Locations</p>
                    <p className="text-[#1A382B]/80"><strong>3–7 business days</strong> from dispatch</p>
                  </div>
                  <div className="bg-[#F4F7F2] rounded-lg p-4">
                    <p className="text-[#1A382B] font-semibold mb-2">Remote Areas</p>
                    <p className="text-[#1A382B]/80"><strong>7–14 business days</strong> from dispatch</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Shipping Charges</h2>
            <div className="space-y-3">
              <p className="text-[#1A382B]/80">
                <strong>Free Shipping:</strong> On orders above ₹500 (Prepaid only)
              </p>
              <p className="text-[#1A382B]/80">
                <strong>Standard Shipping:</strong> ₹50–150 depending on location (Prepaid)
              </p>
              <p className="text-[#1A382B]/80">
                <strong>COD (Cash on Delivery):</strong> Additional ₹30–50 charges apply
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="w-6 h-6 text-[#1A382B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Tracking Your Order</h2>
                <p className="text-[#1A382B]/80 mb-3">
                  Once your order is dispatched, you will receive:
                </p>
                <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
                  <li>SMS and WhatsApp with tracking number and courier details</li>
                  <li>Email with shipping updates & real-time delivery status</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Potential Delays</h2>
            <p className="text-[#1A382B]/80 mb-4">
              Occasionally, deliveries may be delayed due to:
            </p>
            <ul className="list-disc list-inside text-[#1A382B]/80 space-y-2 ml-4">
              <li>High order volume during festivals/sales</li>
              <li>Courier partner issues or truck delays</li>
              <li>Natural disruptions (weather, emergencies)</li>
              <li>Address issues or incomplete details</li>
            </ul>
            <p className="text-[#1A382B]/80 mt-4">
              In such cases, you will be notified immediately via SMS/email.
            </p>
          </section>

          {/* Section 6 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Undelivered Orders</h2>
            <p className="text-[#1A382B]/80 mb-3">
              If your delivery fails 3 times, we will initiate a return and process a refund.
            </p>
            <p className="text-[#1A382B]/80">
              Please ensure your address is correct and accessible.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-t border-[#1A382B]/10 pt-8">
            <h2 className="text-2xl font-serif text-[#1A382B] mb-4">Contact Us</h2>
            <div className="bg-[#F4F7F2] rounded-lg p-6 space-y-2">
              <p className="text-[#1A382B]/80 mb-2">
                For shipping inquiries or order fulfillment queries:
              </p>
              <p className="text-[#1A382B]/80"><strong>Brand:</strong> LEAF & LORE</p>
              <p className="text-[#1A382B]/80"><strong>Studio & Dispatch Office:</strong> Sector 62, Noida, Uttar Pradesh - 201301, India</p>
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

export default ShippingPolicy;
