import { useState } from "react";
import api from "../../Library/api";
import { toast } from "react-toastify";

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Update Profile</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border p-2 rounded"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
