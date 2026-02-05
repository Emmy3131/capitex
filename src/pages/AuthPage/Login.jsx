import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Library/api.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/users/login", form);
      if (res.data.status === "success") {
        // 🔐 Save auth data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("Login successful!");
        console.log("Login successful", res.data);

        if(res.data.data.user.role === 'user'){
           navigate("/dashboard");
        }else if(res.data.data.user.role === 'admin'){
           navigate("/admin/dashboard");
        }
       
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="password@123456"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              to="/auth?tab=forgot"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg
            font-medium hover:bg-green-700 transition shadow-md
            disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/auth?tab=signUp"
            className="text-green-600 font-medium hover:underline"
          >
            Sign up
          </Link>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
