import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utilities/auth.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve(null);

      if (file.size > 500 * 1024) {
        reject(new Error("Image too large (max 500KB)"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });


  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    address: "",
    role: "user", // default role
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const photoBase64 = await fileToBase64(form.photo);

    const user = registerUser({
      id: crypto.randomUUID(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      gender: form.gender,
      country: form.country,
      address: form.address,
      role: form.role,
      photo: photoBase64, // ✅ persists
    });

    navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
          {/* Phone */}
          <input
            name="phone"
            type="tel"
            placeholder="07011000000"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Gender */}
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {/* Country */}
          <input
            name="country"
            type="text"
            placeholder="Country"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          {/* image */}
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          {/* Address */}
          <input
            name="address"
            type="text"
            placeholder="Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth" className="text-green-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
