import { useState } from "react";

const Investments = () => {
  const investments = [
    {
      id: 1,
      user: "John Doe",
      plan: "Gold Plan",
      amount: "₦300,000",
      profit: "₦45,000",
      startDate: "2025-01-01 10:30 AM",
      endDate: "2025-03-01 10:30 AM",
      status: "active",
    },
    {
      id: 2,
      user: "Mary Jane",
      plan: "Silver Plan",
      amount: "₦150,000",
      profit: "₦30,000",
      startDate: "2024-10-01 09:00 AM",
      endDate: "2024-12-01 09:00 AM",
      status: "completed",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Investments
        </h1>
        <p className="text-sm text-gray-500">
          Track all user investments
        </p>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                User
              </th>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                Plan
              </th>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                Amount Invested
              </th>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                Profit
              </th>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                Start Date / Time
              </th>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                End Date / Time
              </th>
              <th className="px-5 py-3 text-left whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {investments.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 whitespace-nowrap font-medium text-gray-800">
                  {inv.user}
                </td>

                <td className="px-5 py-3 whitespace-nowrap">
                  {inv.plan}
                </td>

                <td className="px-5 py-3 whitespace-nowrap font-semibold">
                  {inv.amount}
                </td>

                <td className="px-5 py-3 whitespace-nowrap text-emerald-600 font-semibold">
                  {inv.profit}
                </td>

                <td className="px-5 py-3 whitespace-nowrap">
                  {inv.startDate}
                </td>

                <td className="px-5 py-3 whitespace-nowrap">
                  {inv.endDate}
                </td>

                <td className="px-5 py-3 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                      inv.status
                    )}`}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Investments;
