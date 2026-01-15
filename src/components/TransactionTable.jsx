import StatusBadge from "./StatusBadge";

const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 50000,
    status: "success",
    date: "2026-01-12",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: 20000,
    status: "pending",
    date: "2026-01-13",
  },
];

const TransactionTable = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t">
              <td className="px-6 py-4">{tx.type}</td>
              <td className="px-6 py-4">₦{tx.amount.toLocaleString()}</td>
              <td className="px-6 py-4">
                <StatusBadge status={tx.status} />
              </td>
              <td className="px-6 py-4">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
