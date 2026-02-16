import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Brand from "./Brand";



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          {/* LOGO / BRAND */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <Brand size="lg" />
          </Link>


          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                }
              >
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/investment"
                className={({ isActive }) =>
                  isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                }
              >
                Investment
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                }
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                }
              >
                Support
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                }
              >
                FAQ
              </NavLink>
            </li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth" className=" text-gray-700">
              Login
            </Link>
            <Link to="/auth?tab=signUp" className="bg-green-600 text-white px-2 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Get Started
            </Link>
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
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/investmentPlans"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Investment
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </NavLink>
              </li>
            </ul>


            <div className="pt-4 border-t flex flex-col gap-3">
              <Link to="/auth" className="w-full text-gray-700">
                Login
              </Link>
              <Link to="/auth?tab=signUp" className="bg-green-600 text-white px-2 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header >
  );
};

export default Header;
