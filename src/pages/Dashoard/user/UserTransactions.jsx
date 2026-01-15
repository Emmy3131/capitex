import TransQuickActions from "../../../components/TransQuickAction";
import TransactionTable from "../../../components/TransactionTable";
import { getCurrentUser } from "../../../utilities/auth";

const UserTransactions = () => {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Transactions</h1>

      {/* Quick Actions */}
      <TransQuickActions />

      {/* Transactions Table */}
      <TransactionTable />
    </div>
  );
};

export default UserTransactions;
