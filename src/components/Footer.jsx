import {
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Partner logos
import blackrock from "../assets/partners/blackrock.png";
import vanguard from "../assets/partners/vanguard.png";
import goldman from "../assets/partners/goldman.png";
import Bitfinex from "../assets/partners/bifinex.webp";

const Footer = () => {
  const partners = [
    { name: "BlackRock", logo: blackrock },
    { name: "Vanguard", logo: vanguard },
    { name: "Goldman Sachs", logo: goldman },
    { name: "Bitfinex", logo: Bitfinex },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Capitex
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Capitex is a professional crypto investment platform offering
              strategy-driven portfolios, transparent reporting, and
              institutional-grade security.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/investment"
                  className="hover:text-emerald-400 transition"
                >
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-emerald-400 transition"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* PARTNERS */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Trusted Partners
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-slate-400 rounded-xl p-3
                             flex items-center justify-center
                             hover:bg-slate-700 transition"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 object-contain
                               grayscale hover:grayscale-0 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Connect With Us
            </h3>

            <div className="flex space-x-4">
              <Social icon={<FaFacebookF />} />
              <Social icon={<FaTwitter />} />
              <Social icon={<FaTelegramPlane />} />
              <Social icon={<FaLinkedinIn />} />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-700 my-12"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row
                        justify-between items-center
                        text-sm gap-4 text-gray-400">
          <p>
            © {new Date().getFullYear()} CAPITEX. All rights reserved.
          </p>
          <p>
            Cryptocurrency investments carry risk. Invest responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Social = ({ icon }) => (
  <div
    className="w-10 h-10 rounded-full
               bg-slate-800 hover:bg-emerald-600
               transition flex items-center justify-center
               cursor-pointer text-white"
  >
    {icon}
  </div>
);

export default Footer;
