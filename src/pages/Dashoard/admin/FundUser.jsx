import { FaUserCircle, FaWallet } from "react-icons/fa";

const FundUser = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Fund User
        </h1>
        <p className="text-sm text-gray-500">
          Credit a user wallet manually
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* USER INFO */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4 mb-5">
            <img
              src="https://i.pravatar.cc/100?img=8"
              alt="User"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                John Doe
              </h3>
              <p className="text-sm text-gray-500">
                john@example.com
              </p>
              <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                Approved
              </span>
            </div>
          </div>

          {/* BANK INFO */}
          <div className="text-sm space-y-2">
            <h4 className="font-semibold text-gray-700">
              Bank Information
            </h4>
            <p><strong>Bank:</strong> Access Bank</p>
            <p><strong>Account Name:</strong> John Doe</p>
            <p><strong>Account Number:</strong> 0123456789</p>
          </div>
        </div>

        {/* BALANCES */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="font-semibold text-gray-700 mb-4">
            Wallet Summary
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Wallet Balance</span>
              <span className="font-semibold">₦250,000</span>
            </div>
            <div className="flex justify-between">
              <span>Total Profit</span>
              <span className="font-semibold text-green-600">
                ₦85,000
              </span>
            </div>
            <div className="flex justify-between">
              <span>Referral Balance</span>
              <span className="font-semibold text-blue-600">
                ₦15,000
              </span>
            </div>
          </div>
        </div>

        {/* FUND FORM */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="font-semibold text-gray-700 mb-4">
            Fund Wallet
          </h4>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">
                Wallet to Fund
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm">
                <option>Main Wallet</option>
                <option>Profit Wallet</option>
                <option>Referral Wallet</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2
              bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              <FaWallet />
              Fund Wallet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundUser;
