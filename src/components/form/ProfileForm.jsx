import { useState } from "react";
import api from "../../Library/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";

const ProfileForm = ({ user, onSuccess, allowRoleChange = false }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    role: user?.role || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      const res = await api.patch("/users/updateMe", payload);

      if (res.data.status === "success") {
        toast.success("Profile updated successfully");

        // Update parent state
        if (onSuccess) onSuccess(res.data.data.user);

        // Update local formData
        setFormData({
          name: res.data.data.user.name,
          email: res.data.data.user.email,
          phone: res.data.data.user.phone,
          gender: res.data.data.user.gender,
          role: res.data.data.user.role,
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 py-6">

      <Link
        to={"/settings"}
        className="
                fixed top-18 md:top-5 left-1 md:left-69
                flex items-center justify-center
                w-10 h-10 md:w-11 md:h-11
                rounded-full
                bg-white
                text-emerald-600
                shadow-md
                border border-emerald-100
                hover:bg-emerald-600
                hover:text-white
                hover:shadow-lg
                active:scale-95
                transition-all duration-200
                z-50
              "
      >
        <FaArrowLeftLong className="text-lg md:text-xl" />
      </Link>

      <form onSubmit={handleSubmit} className="md:w-4xl max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-lg font-semibold">Update Profile</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {allowRoleChange && (
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
