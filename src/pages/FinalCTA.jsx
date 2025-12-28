import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-700 to-green-600 py-24">
      <div className="max-w-6xl mx-auto px-6 text-center text-white">

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Start Building Wealth with Crypto — The Smart Way
        </h2>

        {/* Subtext */}
        <p className="max-w-3xl mx-auto text-lg text-green-100 mb-10">
          Join Capitex today and gain access to professionally managed crypto
          investment strategies with full transparency, structured timelines,
          and risk-aware returns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition">
            Create Free Account
            <ArrowRight size={20} />
          </button>

          <button className="border border-white/50 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition">
            View Investment Plans
          </button>
        </div>

        {/* Trust Line */}
        <p className="text-sm text-green-100 mt-10">
          🔒 Secure infrastructure • 📊 Transparent reporting • 🌍 Global access
        </p>

      </div>
    </section>
  );
};

export default FinalCTA;
