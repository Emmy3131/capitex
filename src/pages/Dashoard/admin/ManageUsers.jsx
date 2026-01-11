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
    <div className="space-y-6 px-4 md:px-0">
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
      <div className="bg-white rounded-xl shadow">
        {/* SCROLL CONTAINER */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-5 py-3 whitespace-nowrap">
                  User
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Email
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Wallet Balance
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 whitespace-nowrap text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="shadow-sm hover:bg-gray-50"
                >
                  {/* User */}
                  <td className="px-5 py-3 flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <span className="font-medium">
                      {user.name}
                    </span>
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    {user.email}
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap font-semibold">
                    {user.balance}
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap text-right space-x-3">
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
      </div>

      {/* USER DETAILS */}
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

        <div className="mt-6 flex flex-wrap gap-3">
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
