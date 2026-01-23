import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const baseURL =
    "https://capitex-api.vercel.app/api/v1/users/forgotPassword";

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        baseURL,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === "success") {
        setSuccess("Password reset link sent to your email.");
      }
    } catch (err) {
      console.error("Forget Password error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm text-center">
            {success}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleForgetPassword}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg
            font-medium hover:bg-green-700 transition shadow-md
            disabled:opacity-50"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/auth"
            className="text-sm text-green-600 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
