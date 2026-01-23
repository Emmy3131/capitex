import { FaEye, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import FundUser from "../../../components/modals/FundUser";
import PageLoader from "../../../components/Loader/PageLoader";
import api from "../../../Library/api";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // ✅ must be array
  const [loading, setLoading] = useState(false);
  const [selectUser, setSelectUser] = useState(null);

  const closeModal = () => setSelectUser(null);


  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");

      // adjust this if backend structure differs
      if (res.data.status === "success") {
        console.log("Fetched users:", res.data.data.users);
        setUsers(res.data.data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Approved" ? "Blocked" : "Approved";

    // ✅ Optimistic UI update
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );

    try {
      const res = await api.patch(`/users/${userId}/status`, {
        status: newStatus,
      });

      if (res.data.status === "success") {
        toast.success("User status updated");
      }
    } catch (err) {
      console.error("Error updating user status:", err);
      toast.error("Failed to update user status");

      // ❌ Rollback on failure
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: currentStatus } : user
        )
      );
    }
  };


  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
    try {
      const res = await api.delete(`/users/${userId}`);
      if (res.data.status === "success") {
        toast.success("User deleted successfully");
        getUsers(); // ✅ Refresh user list
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  // ✅ Call API on mount
  useEffect(() => {
    getUsers();
  }, []);

  // ✅ Loading state
  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <p className="text-sm text-gray-500">
          View and manage platform users
        </p>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-xl shadow">
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Wallet Balance</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 flex items-center gap-3">
                      <img
                        src={user.photo || "/avatar.png"}
                        alt={user.name}
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="font-medium">{user.name}</span>
                    </td>

                    <td className="px-5 py-3">{user.email}</td>

                    <td className="px-5 py-3 font-semibold">
                      ₦{user.balance?.toLocaleString() || "0"}
                    </td>

                    <td className="px-5 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-3 text-right space-x-3">
                      <button
                        onClick={() => setSelectUser(user)}
                        className="text-blue-600"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleUserStatusToggle(user._id, user.status)}
                        className="text-green-600 text-xl"
                      >
                        {user.status === "Approved" ? <FaToggleOn /> : <FaToggleOff />}
                      </button>


                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FUND USER MODAL */}
      {selectUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
            >
              ✕
            </button>

            <div className="p-6">
              <FundUser user={selectUser} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
