import {
  FaEdit,
  FaWallet,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/Loader/PageLoader";
import api from "../../../Library/api";
import { toast } from "react-toastify";

const Profile = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAdminProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me");
      if (res.data.status === "success") {
        setActiveUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Error fetching admin profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  if (loading) return <PageLoader />;
  if (!activeUser) return null;

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
          src={activeUser.photo || "/avatar.png"}
          alt={activeUser.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500"
        />

        <div className="text-center md:text-left space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeUser.name}
          </h2>
          <p className="text-sm text-gray-500">
            {activeUser.email}
          </p>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full capitalize">
            {activeUser.role}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaWallet className="text-emerald-600" />}
          title="Account Balance"
          value={`₦${activeUser.balance?.toLocaleString() || 0}`}
          bg="bg-emerald-100"
        />

        <StatCard
          icon={<FaMoneyBillWave className="text-blue-600" />}
          title="Referral Balance"
          value={`₦${activeUser.referralBalance?.toLocaleString() || 0}`}
          bg="bg-blue-100"
        />

        <StatCard
          icon={<FaUsers className="text-purple-600" />}
          title="Total Referrals"
          value={activeUser.totalReferrals || 0}
          bg="bg-purple-100"
        />

        <StatCard
          icon={<FaMoneyBillWave className="text-red-600" />}
          title="Total Withdrawals"
          value={`₦${activeUser.totalWithdrawals?.toLocaleString() || 0}`}
          bg="bg-red-100"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, bg }) => (
  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
    <div className={`p-3 rounded-full ${bg}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Profile;
