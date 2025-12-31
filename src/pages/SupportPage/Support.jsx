import { FaEnvelope, FaPhoneAlt, FaHeadset } from "react-icons/fa";

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Support & Help Center</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Need assistance? Our support team is here to help you with any questions 
          regarding your crypto investments, account, or platform usage.
        </p>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How We Can Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaEnvelope className="text-green-600 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-2">Send us your questions and we'll respond promptly.</p>
            <a href="mailto:support@capitex.com" className="text-green-600 font-semibold hover:underline">
              support@capitex.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaPhoneAlt className="text-green-600 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-2">Call us during business hours for immediate assistance.</p>
            <a href="tel:+1234567890" className="text-green-600 font-semibold hover:underline">
              +1 234 567 890
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaHeadset className="text-green-600 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-2">Chat live with our support team for quick answers.</p>
            <a href="/chat" className="text-green-600 font-semibold hover:underline">
              Start Chat
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">How do I create an account?</h3>
            <p className="text-gray-600">Click on the Sign Up button and fill in your details to create an account with Capitex.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">How can I withdraw funds?</h3>
            <p className="text-gray-600">Navigate to your dashboard, select Withdraw, and follow the instructions to safely withdraw your funds.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Is my investment secure?</h3>
            <p className="text-gray-600">Yes, Capitex uses cold wallet storage, SSL encryption, and professional risk management strategies to secure your assets.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
        <p className="text-gray-700 mb-6">Contact our support team directly or start a live chat for assistance.</p>
        <a
          href="/auth?tab=signUp"
          className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow hover:bg-green-700 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default Support;
