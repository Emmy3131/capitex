import { FaShieldAlt, FaChartLine, FaGlobe } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-7 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-green-600/20 text-green-400">
            Trusted Crypto Investment Platform
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Invest In Crypto <span className="text-green-500">With Confidence</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-8">
            Capitex provides access to professionally structured crypto investment
            opportunities with clear timelines, projected returns, and full visibility
            into how your assets are managed.
          </p>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Feature icon={<FaChartLine />} text="Strategy-based crypto investments" />
            <Feature icon={<FaShieldAlt />} text="Transparent performance tracking" />
            <Feature icon={<FaGlobe />} text="Secure global fintech infrastructure" />
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <button className="px-7 py-3 rounded-full bg-green-600 hover:bg-green-700 transition font-medium shadow-lg">
              Get Started
            </button>
            <button className="px-7 py-3 rounded-full border border-gray-500 hover:border-white transition">
              View Investment Plans
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hidden lg:flex justify-center">
          <div className="relative w-[420px] h-[420px] rounded-full bg-green-600/20 blur-3xl" />
          <img
            src="/assets/crypto-hero.png"
            alt="Crypto investment"
            className="absolute w-[380px] z-10"
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-green-600/20 text-green-500 flex items-center justify-center">
      {icon}
    </div>
    <p className="text-gray-300">{text}</p>
  </div>
);

export default Hero;
