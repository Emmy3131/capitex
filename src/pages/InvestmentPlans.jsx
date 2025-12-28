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
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Investment Plans
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose a plan that matches your financial goals. All plans are
            professionally managed with full transparency.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 shadow-md border transition
              ${plan.highlight
                  ? "bg-green-600 text-white scale-105"
                  : "bg-white"
                }`}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm opacity-90">
                Duration: {plan.duration}
              </p>

              <div className="my-6">
                <p className="text-3xl font-bold">
                  {plan.roi}
                </p>
                <p className="text-sm opacity-90">Expected ROI</p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Minimum: {plan.min}
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Maximum: {plan.max}
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Capital Protection Strategy
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Daily Performance Tracking
                </li>
              </ul>

              <button
                className={`mt-8 w-full py-3 rounded-full font-semibold transition
                ${plan.highlight
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
        <p className="text-center text-xs text-gray-500 mt-10 max-w-3xl mx-auto">
          *Crypto investments involve risk. Returns are projected and not guaranteed.
          Please invest responsibly.
        </p>
      </div>
    </section>
  );
};

export default InvestmentPlans;
