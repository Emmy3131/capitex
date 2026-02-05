import {
  FaEdit,
  FaWallet,
  FaUsers,
  FaMoneyBillWave,
  FaUserShield,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/Loader/PageLoader";
import api from "../../../Library/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminProfile = () => {
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
    <div className="max-w-3xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Profile
          </h1>
          <p className="text-sm text-gray-500">
            Account overview and personal information
          </p>
        </div>

        <Link
          to="/profile"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition"
        >
          <FaEdit />
          Edit Profile
        </Link>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold">
          {activeUser.name?.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {activeUser.name}
          </h2>
          <p className="text-sm text-gray-500">
            {activeUser.email}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs px-4 py-1 rounded-full capitalize mx-auto">
          <FaUserShield />
          {activeUser.role}
        </span>
      </div>

      {/* INFORMATION SECTION */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Account Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <InfoItem label="Full Name" value={activeUser.name} />
          <InfoItem label="Email Address" value={activeUser.email} />
          <InfoItem label="Account ID" value={activeUser.accountId || "—"} />
          <InfoItem label="Status" value={activeUser.status || "Active"} />
          <InfoItem label="Joined" value={new Date(activeUser.createdAt).toLocaleDateString()} />
        </div>
      </div>

    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="font-medium text-gray-800 truncate">{value}</span>
  </div>
);

export default AdminProfile;
