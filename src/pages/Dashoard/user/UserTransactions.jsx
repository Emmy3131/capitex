import TransQuickActions from "../../../components/TransQuickAction";
import TransactionTable from "../../../components/TransactionTable";


const UserTransactions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <TransQuickActions />
      <TransactionTable />
      
    </div>
  );
};

export default UserTransactions;
