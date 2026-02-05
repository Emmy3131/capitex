import ProfileCard from "../../../components/settings/ProfileCard";
import AccountStats from "../../../components/settings/AccountStat";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
const navigate = useNavigate();

  return (

    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Account & Settings</h1>
        <Link
          to="/profile"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Edit Profile
        </Link>
      </div>

      {/* Profile Info */}
      <ProfileCard />

      {/* Account Stats */}
      <AccountStats />
    </div>
  );
};

export default UserSettings;
