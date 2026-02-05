import { FaChartLine, FaWallet, FaShieldAlt, FaHandsHelping } from "react-icons/fa";

const Service = () => {
  return (
    <div  className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Capitex provides comprehensive crypto investment services tailored to your needs.
          Explore our offerings below.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section data-aos="fade-up" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaChartLine className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Strategy-based Investments</h3>
            <p className="text-gray-600">Custom investment plans designed to maximize returns with clear timelines and transparency.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaWallet className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Asset Management</h3>
            <p className="text-gray-600">Professional management of your crypto assets with cold-wallet storage and safety-first approach.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaShieldAlt className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
            <p className="text-gray-600">Automated risk strategies and monitoring to protect your investments and minimize exposure.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaHandsHelping className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">Dedicated support team available to assist you with account setup, withdrawals, or any inquiries.</p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-gray-700 mb-6">Sign up today and start your crypto investment journey with Capitex.</p>
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

export default Service;
