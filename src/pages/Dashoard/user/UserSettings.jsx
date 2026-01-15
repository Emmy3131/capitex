import ProfileCard from "../../../components/settings/ProfileCard";
import AccountStats from "../../../components/settings/AccountStat";
import ActiveInvestmentCard from "../../../components/settings/ActiveInvestmentCard";
import { Link } from "react-router-dom";

const UserSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Account & Settings</h1>
        <Link
          to="/settings/edit-profile"
          className="px-4 py-2 lg:hidden bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Edit Profile
        </Link>
      </div>

      {/* Profile Info */}
      <ProfileCard />

      {/* Account Stats */}
      <AccountStats />

      {/* Active Investments */}
      <ActiveInvestmentCard />
    </div>
  );
};

export default UserSettings;
