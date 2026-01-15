import InvestmentStatus from "./InvestmentStatus";

const investments = [
  {
    id: 1,
    plan: "Gold Plan",
    amount: 100000,
    profit: 20000,
    start: "2026-01-01",
    end: "2026-02-01",
    status: "active",
  },
  {
    id: 2,
    plan: "Silver Plan",
    amount: 50000,
    profit: 10000,
    start: "2025-12-01",
    end: "2026-01-01",
    status: "completed",
  },
];

const InvestmentTable = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Plan</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Profit</th>
            <th className="px-6 py-3 text-left">Start Date</th>
            <th className="px-6 py-3 text-left">End Date</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id} className="border-t">
              <td className="px-6 py-4">{inv.plan}</td>
              <td className="px-6 py-4">
                ₦{inv.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-emerald-600">
                ₦{inv.profit.toLocaleString()}
              </td>
              <td className="px-6 py-4">{inv.start}</td>
              <td className="px-6 py-4">{inv.end}</td>
              <td className="px-6 py-4">
                <InvestmentStatus status={inv.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;
