import { FaWallet } from "react-icons/fa";

const FundUser = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Fund User
        </h1>
        <p className="text-sm text-gray-500">
          Credit a user wallet manually
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6">

          {/* USER CARD */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
            <img
              src={user.photo}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
            />

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>

              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold
                  ${user.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* WALLET SUMMARY */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h4 className="font-semibold text-gray-700 mb-4">
              Wallet Summary
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Wallet Balance
                </span>
                <span className="font-semibold">
                  {user.balance}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Total Profit
                </span>
                <span className="font-semibold text-green-600">
                  {user.profit || "₦0"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Referral Balance
                </span>
                <span className="font-semibold text-blue-600">
                  {user.referralBalance || "₦0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[360px]">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
            <h4 className="font-semibold text-gray-700 mb-4">
              Fund Wallet
            </h4>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">
                  Wallet to Fund
                </label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none">
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
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2
                bg-green-600 text-white py-2 rounded-lg
                hover:bg-green-700 transition font-medium"
              >
                <FaWallet />
                Fund Wallet
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FundUser;
