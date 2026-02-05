import { FaFacebookF, FaTwitter, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP SECTION */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Capitex</h2>
            <p className="text-sm leading-relaxed">
              Capitex is a secure crypto investment platform providing
              strategy-based investment opportunities with transparent
              performance tracking.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-400 cursor-pointer">About Us</li>
              <li className="hover:text-green-400 cursor-pointer">Investment Plans</li>
              <li className="hover:text-green-400 cursor-pointer">FAQs</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-green-400 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-green-400 cursor-pointer">Risk Disclosure</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Social icon={<FaFacebookF />} />
              <Social icon={<FaTwitter />} />
              <Social icon={<FaTelegramPlane />} />
              <Social icon={<FaLinkedinIn />} />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>© {new Date().getFullYear()} Capitex. All rights reserved.</p>
          <p className="text-gray-400">
            Crypto investments involve risk. Trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Social = ({ icon }) => (
  <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 transition flex items-center justify-center cursor-pointer text-white">
    {icon}
  </div>
);

export default Footer;
