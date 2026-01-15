import { getCurrentUser } from "../../../utilities/auth";
import StatCard from "../../../components/StatCard.jsx";
import QuickAction from "../../../components/QuickActions.jsx";
import TransactionRow from "../../../components/TransactionRow.jsx";
import InvestmentRow from "../../../components/InvestmentRow.jsx";

const UserDashboard = () => {
  const user = getCurrentUser();

  return (
    <div className="space-y-8">

      {/* ===== Welcome ===== */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Here’s what’s happening with your account today
        </p>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Account Balance" value="₦120,000" />
        <StatCard title="Referral Balance" value="₦15,500" />
        <StatCard title="Total Deposit" value="₦300,000" />
        <StatCard title="Accrued Profit" value="₦45,200" />
      </div>

      {/* ===== Quick Actions ===== */}
      <div className="flex flex-wrap gap-4">
        <QuickAction label="New Investment" />
        <QuickAction label="View Transactions" />
      </div>

      {/* ===== Main Content ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== Active Investments ===== */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Active Investments</h2>

          <InvestmentRow />
        </div>

        {/* ===== User Info ===== */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">User Info</h2>

          <div className="flex items-center gap-4">
            <img
              src={user?.photo || "/avatar.png"}
              alt="User"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">Referral Link</p>
            <input
              readOnly
              value={`https://capitex.com/ref/${user?.id}`}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* ===== Recent Transactions ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Recent Transactions</h2>

        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="shadow-sm">
            <TransactionRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
