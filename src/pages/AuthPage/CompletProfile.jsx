import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Library/api";
import { toast } from "react-toastify";
import PageLoader from "../../components/Loader/PageLoader";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    country: "Nigeria",
    gender: "",
    address: "",
  });

  /* =========================
     HANDLE CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     VALIDATION
  ========================== */
  const validate = () => {
    if (!formData.phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select gender");
      return false;
    }
    if (!formData.address) {
      toast.error("Address is required");
      return false;
    }
    return true;
  };

  /* =========================
     SUBMIT PROFILE
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.patch("/users/complete-profile", formData);

      if (res.data.status === "success") {
        toast.success("Profile completed successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to complete profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Complete Your Profile</h1>
          <p className="text-sm text-gray-500">
            Please provide the following information to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08144098649"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              disabled
              className="w-full bg-gray-100 border rounded-lg px-4 py-2"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nekede"
              rows="3"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            disabled={loading}
          >
            Complete Profile
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center">
          You can edit this information later from your profile settings.
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;
