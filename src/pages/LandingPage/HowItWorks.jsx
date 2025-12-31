import { UserPlus, Wallet, BarChart3, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            How Capitex Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Start investing in crypto in four simple steps. No complexity,
            no hidden processes — just structured investments.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Step 1 */}
          <div className="text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100">
              <UserPlus className="text-green-600" />
            </div>
            <h3 className="mt-5 font-semibold text-lg">Create an Account</h3>
            <p className="text-gray-600 text-sm mt-2">
              Sign up in minutes and verify your identity to access investment plans.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100">
              <Wallet className="text-green-600" />
            </div>
            <h3 className="mt-5 font-semibold text-lg">Fund Your Wallet</h3>
            <p className="text-gray-600 text-sm mt-2">
              Deposit crypto or fiat securely using supported payment methods.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100">
              <BarChart3 className="text-green-600" />
            </div>
            <h3 className="mt-5 font-semibold text-lg">Choose a Plan</h3>
            <p className="text-gray-600 text-sm mt-2">
              Select a professionally managed investment strategy with clear returns.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="text-green-600" />
            </div>
            <h3 className="mt-5 font-semibold text-lg">Track & Withdraw</h3>
            <p className="text-gray-600 text-sm mt-2">
              Monitor performance in real-time and withdraw profits when available.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
