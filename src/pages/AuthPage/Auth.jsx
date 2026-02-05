import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgetPassword from "./ForgetPassword";
import CompleteProfile from "./CompletProfile";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroBg from '../../assets/bgImage/heroBg.webp';

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "signUp") setActiveTab("signup");
    else if (tab === "forgot") setActiveTab("forgot");
    else if (tab === "completeProfile") setActiveTab("completeProfile");
    else setActiveTab("login");
  }, [searchParams]);


  const handleToggle = (type) => {
    setActiveTab(type);

    if (type === "login") setSearchParams({});
    else setSearchParams({ tab: type });
  };


  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex relative min-h-screen">

        {/* LEFT SIDE – FIXED / BRAND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-slate-900/80 to-emerald-900/70" />


        <Link to="/" className="absolute z-20 top-5 left-5 text-white text-2xl hover:text-emerald-800">
          <FaTimes />
        </Link>

        <div className="relative z-10 flex flex-col justify-center px-14 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Invest Smarter with Capitex
          </h1>

          <p className="text-gray-100 mb-6 leading-relaxed max-w-lg">
            Professionally managed crypto investment strategies with transparency,
            automation, and institutional-grade security.
          </p>

          <ul className="space-y-4 text-gray-100">
            <li>✅ Strategy-based crypto investing</li>
            <li>✅ Transparent returns & timelines</li>
            <li>✅ Secure cold-wallet storage</li>
            <li>✅ Global fintech infrastructure</li>
          </ul>
        </div>

        <div className="mt-10 text-sm text-green-200">
          © {new Date().getFullYear()} Capitex. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE – SCROLLABLE */}
      <div className="relative h-screen flex items-center justify-center bg-gray-100 px-6">
        <Link to="/" className="absolute top-5 left-5 text-black lg:hidden text-2xl">
          <FaTimes />
        </Link>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col h-full">

          {/* TOP – Toggle */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === "login"
                ? "Login to manage your investments"
                : "Start investing with Capitex today"}
            </p>
          </div>

          <div className="flex rounded-lg overflow-hidden border">
            <button
              onClick={() => handleToggle("login")}
              className={`flex-1 py-2 font-medium transition ${activeTab === "login"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600"
                }`}
            >
              Login
            </button>

            <button
              onClick={() => handleToggle("signup")}
              className={`flex-1 py-2 font-medium transition ${activeTab === "signup"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600"
                }`}
            >
              Sign Up
            </button>
          </div>


      
          <div className="flex-1 overflow-y-auto">

            {activeTab === "login" && <Login />}
            {activeTab === "signup" && <SignUp />}
            {activeTab === "forgot" && <ForgetPassword />}
           

          </div>

        </div>
      </div>


    </div >
  );
};

export default Auth;
