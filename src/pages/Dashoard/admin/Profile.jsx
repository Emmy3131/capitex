import { FaEdit, FaWallet, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const Profile = () => {
  const admin = {
    name: "Emmanuel Nnaemeka",
    email: "admin@capitex.com",
    role: "Super Admin",
    avatar: "https://i.pravatar.cc/150?img=12",
    balance: "₦2,450,000",
    referralBalance: "₦320,000",
    totalReferrals: 128,
    totalWithdrawals: "₦1,200,000",
  };

  return (
    <div className="space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Profile
          </h1>
          <p className="text-sm text-gray-500">
            Manage your personal information and account stats
          </p>
        </div>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition">
          <FaEdit />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={admin.avatar}
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500"
        />

        <div className="text-center md:text-left space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {admin.name}
          </h2>
          <p className="text-sm text-gray-500">
            {admin.email}
          </p>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">
            {admin.role}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-full">
            <FaWallet className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Account Balance
            </p>
            <p className="font-bold text-gray-800">
              {admin.balance}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaMoneyBillWave className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Referral Balance
            </p>
            <p className="font-bold text-gray-800">
              {admin.referralBalance}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <FaUsers className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Total Referrals
            </p>
            <p className="font-bold text-gray-800">
              {admin.totalReferrals}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <FaMoneyBillWave className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Total Withdrawals
            </p>
            <p className="font-bold text-gray-800">
              {admin.totalWithdrawals}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
