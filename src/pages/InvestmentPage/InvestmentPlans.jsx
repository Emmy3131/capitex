import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    duration: "14 Days",
    roi: "5 – 8%",
    min: "$100",
    max: "$999",
    highlight: false,
  },
  {
    name: "Growth Plan",
    duration: "30 Days",
    roi: "10 – 15%",
    min: "$1,000",
    max: "$4,999",
    highlight: true,
  },
  {
    name: "Premium Plan",
    duration: "60 Days",
    roi: "18 – 25%",
    min: "$5,000",
    max: "$20,000",
    highlight: false,
  },
];

const InvestmentPlans = () => {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen">

        {/* Header */}
        <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Plans</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose a plan that matches your financial goals. All plans are professionally managed with transparency and security.
          </p>
        </section>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5 mt-5">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 shadow-lg border transition-transform duration-300 hover:scale-105 ${plan.highlight
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-900 border-gray-200"
                }`}
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm opacity-90">Duration: {plan.duration}</p>

              <div className="my-6">
                <p className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-green-600"}`}>
                  {plan.roi}
                </p>
                <p className={`text-sm opacity-90 ${plan.highlight ? "text-green-100" : "text-gray-500"}`}>
                  Expected ROI
                </p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={18} className={plan.highlight ? "text-white" : "text-green-600"} />
                  Minimum: {plan.min}
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className={plan.highlight ? "text-white" : "text-green-600"} />
                  Maximum: {plan.max}
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className={plan.highlight ? "text-white" : "text-green-600"} />
                  Capital Protection Strategy
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className={plan.highlight ? "text-white" : "text-green-600"} />
                  Daily Performance Tracking
                </li>
              </ul>

              <button
                className={`mt-8 w-full py-3 rounded-full font-semibold transition-colors ${plan.highlight
                    ? "bg-white text-green-600 hover:bg-gray-100"
                    : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                Invest Now
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-10 max-w-3xl mx-auto pb-3">
          *Crypto investments involve risk. Returns are projected and not guaranteed. Please invest responsibly.
        </p>
      </div>
    </div>
  );
};

export default InvestmentPlans;
