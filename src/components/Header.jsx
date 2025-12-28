import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"   // put Capitex logo in public/logo.png
              alt="Capitex"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-green-600">
              Capitex
            </span>
          </div>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="hover:text-green-600 cursor-pointer">About</li>
            <li className="hover:text-green-600 cursor-pointer">Investment</li>
            <li className="hover:text-green-600 cursor-pointer">Services</li>
            <li className="hover:text-green-600 cursor-pointer">Support</li>
            <li className="hover:text-green-600 cursor-pointer">FAQ</li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-700 hover:text-green-600">
              Login
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Get Started
            </button>
          </div>

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 text-xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4 space-y-4">
            <ul className="space-y-3 text-gray-700 font-medium">
              <li className="hover:text-green-600">Home</li>
              <li className="hover:text-green-600">About</li>
              <li className="hover:text-green-600">Investment</li>
              <li className="hover:text-green-600">Services</li>
              <li className="hover:text-green-600">Support</li>
              <li className="hover:text-green-600">FAQ</li>
            </ul>

            <div className="pt-4 border-t flex flex-col gap-3">
              <button className="w-full text-gray-700">
                Login
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
