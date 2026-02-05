import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../Library/api";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";

const ProfileCard = () => {
  const [loginUser, setLoginUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/me");
      if (res.data.status === "success") {
        setLoginUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Failed to fetch current user", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!loginUser) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full space-y-6">

      {/* AVATAR */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-semibold">
          {loginUser.name?.charAt(0)}
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {loginUser.name}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {loginUser.email}
        </p>
      </div>

      {/* ROLE */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs px-4 py-1 rounded-full capitalize">
          <FaUserShield />
          {loginUser.role}
        </span>
      </div>

      {/* DETAILS */}
      <div className="border-t border-gray-100 pt-4 space-y-4 text-sm">
        <InfoRow
          icon={<FaUser />}
          label="Full Name"
          value={loginUser.name}
        />

        <InfoRow
          icon={<FaEnvelope />}
          label="Email Address"
          value={loginUser.email}
        />

        <InfoRow
          label="Account ID"
          value={loginUser.accountId || "—"}
        />

        <InfoRow
          label="Joined"
          value={new Date(loginUser.createdAt).toLocaleDateString()}
        />
      </div>

      {/* ACTION */}
      {/* <Link
        to="/profile"
        className="block text-center bg-emerald-600 text-white py-2 rounded-lg text-sm hover:bg-emerald-700 transition"
      >
        Edit Profile
      </Link> */}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon && <span className="text-gray-400 mt-0.5">{icon}</span>}
    <div className="flex flex-col">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 truncate max-w-[220px]">
        {value}
      </span>
    </div>
  </div>
);

export default ProfileCard;
