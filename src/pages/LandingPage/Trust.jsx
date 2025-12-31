import { ShieldCheck, Users, TrendingUp, Lock } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Trusted by Investors Worldwide
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Capitex is built on transparency, security, and professional crypto
            investment strategies designed for long-term growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Users */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <Users className="w-8 h-8 mx-auto text-green-600" />
            <h3 className="text-2xl font-bold mt-4">50K+</h3>
            <p className="text-gray-600 text-sm">Active Investors</p>
          </div>

          {/* Assets */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <TrendingUp className="w-8 h-8 mx-auto text-green-600" />
            <h3 className="text-2xl font-bold mt-4">$120M+</h3>
            <p className="text-gray-600 text-sm">Assets Managed</p>
          </div>

          {/* Security */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <Lock className="w-8 h-8 mx-auto text-green-600" />
            <h3 className="text-2xl font-bold mt-4">Bank-Grade</h3>
            <p className="text-gray-600 text-sm">Security Infrastructure</p>
          </div>

          {/* Compliance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <ShieldCheck className="w-8 h-8 mx-auto text-green-600" />
            <h3 className="text-2xl font-bold mt-4">100%</h3>
            <p className="text-gray-600 text-sm">Transparent Operations</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;
