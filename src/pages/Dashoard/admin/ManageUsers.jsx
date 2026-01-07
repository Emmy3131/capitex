import { FaEye, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    balance: "₦250,000",
    status: "approved",
    phone: "+234 812 000 1111",
    country: "Nigeria",
    gender: "Male",
    address: "Lagos, Nigeria",
    photo: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    balance: "₦120,000",
    status: "pending",
    phone: "+234 803 111 2222",
    country: "Ghana",
    gender: "Female",
    address: "Accra, Ghana",
    photo: "https://i.pravatar.cc/100?img=2",
  },
];

const statusStyle = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  denied: "bg-red-100 text-red-700",
  deactivated: "bg-gray-200 text-gray-700",
};

const ManageUsers = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Users
        </h1>
        <p className="text-sm text-gray-500">
          View and manage platform users
        </p>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-5 py-3">User</th>
              <th>Email</th>
              <th>Wallet Balance</th>
              <th>Status</th>
              <th className="text-right px-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                {/* User info */}
                <td className="flex items-center gap-3 px-5 py-3">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="font-medium">
                    {user.name}
                  </span>
                </td>

                <td>{user.email}</td>
                <td>{user.balance}</td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </button>

                  <button className="text-green-600 hover:text-green-800">
                    {user.status === "approved" ? (
                      <FaToggleOn />
                    ) : (
                      <FaToggleOff />
                    )}
                  </button>

                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* USER DETAILS (Design Placeholder) */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">
          User Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><strong>Phone:</strong> +234 812 000 1111</div>
          <div><strong>Country:</strong> Nigeria</div>
          <div><strong>Gender:</strong> Male</div>
          <div><strong>Address:</strong> Lagos, Nigeria</div>
          <div><strong>Status:</strong> Approved</div>
          <div><strong>Wallet:</strong> ₦250,000</div>
        </div>

        {/* Detail actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
            Fund Wallet
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm">
            Toggle Status
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
