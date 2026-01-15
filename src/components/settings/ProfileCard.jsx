import { Link } from "react-router-dom";

const ProfileCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
      <img
        src={user?.photo || "/avatar.png"}
        alt="User"
        className="w-20 h-20 rounded-full object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <Link
        to="/settings/edit-profile"
        className="px-4 py-2 hidden lg:block bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
