import {
  FaUsers,
  FaWallet,
  FaChartLine,
  FaUserFriends,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: <FaUsers />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Total Balance",
    value: "₦48,500,000",
    icon: <FaWallet />,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Total Profits",
    value: "₦12,300,000",
    icon: <FaChartLine />,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Referral Balance",
    value: "₦2,150,000",
    icon: <FaUserFriends />,
    color: "from-orange-500 to-amber-600",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of platform activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-xl font-bold text-gray-800">
                {item.value}
              </h3>
            </div>

            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color}
              text-white flex items-center justify-center text-xl`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            "Manage Plans",
            "Payment Options",
            "View Investments",
            "Manage FAQ",
          ].map((action, i) => (
            <button
              key={i}
              className="border rounded-lg py-3 text-sm font-medium
              hover:bg-gray-100 transition"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {["Daily Deposits", "Withdrawals", "Investments"].map(
          (chart, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 h-64"
            >
              <h3 className="font-semibold mb-3">{chart}</h3>
              <div className="h-full flex items-center justify-center text-gray-400">
                Chart Placeholder
              </div>
            </div>
          )
        )}
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">
            Recent Transactions
          </h3>

          {/* Scroll wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead className="text-gray-500 shadow-sm text-left">
                <tr>
                  <th className="px-2">User</th>
                  <th className="px-2">Type</th>
                  <th className="px-2">Amount</th>
                  <th className="px-2">Status</th>
                  <th className="px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="shadow-sm">
                  <td className="py-2 px-2">John Doe</td>
                  <td className="px-2">Deposit</td>
                  <td className="px-2">₦150,000</td>
                  <td className="px-2 text-green-600">Success</td>
                  <td className="px-2">12 Aug</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Jane Smith</td>
                  <td className="px-2">Withdrawal</td>
                  <td className="px-2">₦80,000</td>
                  <td className="px-2 text-yellow-500">Pending</td>
                  <td className="px-2">11 Aug</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Investments */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">
            Recent Investments
          </h3>

          {/* Scroll wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead className="text-gray-500 shadow-sm text-left">
                <tr>
                  <th className=" py-2 px-2">User</th>
                  <th className="px-2">Plan</th>
                  <th className="px-2">Amount</th>
                  <th className="px-2">Profit</th>
                  <th className="px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="shadow-sm">
                  <td className="py-2 px-2">Michael</td>
                  <td className="px-2">Gold Plan</td>
                  <td className="px-2">₦500,000</td>
                  <td className="px-2">₦75,000</td>
                  <td className="px-2 text-blue-600">Active</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Sarah</td>
                  <td className="px-2">Silver Plan</td>
                  <td className="px-2">₦300,000</td>
                  <td className="px-2">₦45,000</td>
                  <td className="px-2 text-green-600">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
