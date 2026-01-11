import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (true) {
      navigate("/admin/dashboard"); // ✅ manual redirect
    }
  };


  return (
    <div className="flex items-center justify-center">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
        
        {/* Logo / Title */}
        {/* <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Login to your Capitex account
          </p>
        </div> */}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/auth?tab=signUp" className="text-green-600 font-medium hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
