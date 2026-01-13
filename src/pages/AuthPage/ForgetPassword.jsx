import { Link } from "react-router-dom";
const ForgetPassword = () => {
  return (
    <div>
      <h1>Forget Password</h1>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <Link to = "/auth?tab=reset">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-md"
          >
            Reset Password
          </button>
        </Link>
        </form>
      </div>
    </div>
  )
};
export default ForgetPassword;