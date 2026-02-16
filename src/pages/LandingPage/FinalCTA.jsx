import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-24">

      {/* ===== MOVING CHART BACKGROUND ===== */}
      <iframe
        src="https://s.tradingview.com/widgetembed/?symbol=BTCUSDT&interval=5&theme=dark&style=3&toolbarbg=transparent&hideideas=1"
        className="absolute inset-0 w-full h-full opacity-30"
        frameBorder="0"
        allowTransparency="true"
      />

      {/* ===== DARK OVERLAY FOR READABILITY ===== */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ===== CONTENT ===== */}
      <div
        data-aos="fade-up"
        className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white"
      >
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          A Smarter Approach to Crypto Wealth Management
        </h2>

        {/* Subtext */}
        <p className="max-w-3xl mx-auto text-lg text-green-100 mb-10">
          Capitex provides access to professionally managed crypto investment
          strategies, built on transparency, disciplined execution, and
          risk-conscious portfolio growth.
        </p>

        {/* CTA Button */}
        <div className="m-auto w-[300px]">
          <Link
            to="/auth?tab=signUp"
            className="flex items-center justify-center gap-2
                       bg-white text-green-700
                       px-8 py-4 rounded-full
                       font-semibold text-lg
                       hover:bg-gray-100 transition"
          >
            Create Free Account
            <ArrowRight size={20} />
          </Link>
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
