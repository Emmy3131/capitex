import { FaChartLine, FaShieldAlt, FaLock, FaWallet, FaUsers, FaCogs } from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Strategy-based Crypto Investing",
    description: "Invest with professionally structured strategies for maximum returns.",
  },
  {
    icon: <FaUsers className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Professional Fund Managers",
    description: "Experienced managers handle your portfolio with care.",
  },
  {
    icon: <FaCogs className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Automated Risk Management",
    description: "Reduce exposure to volatile markets with smart automation.",
  },
  {
    icon: <FaLock className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "SSL Encryption",
    description: "All communications are encrypted to protect sensitive info.",
  },
  {
    icon: <FaWallet className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Cold Wallet Storage",
    description: "Your crypto assets are stored offline, safe from online attacks.",
  },
  {
    icon: <FaShieldAlt className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Two-Factor Authentication",
    description: "Extra layer of security to protect your account.",
  },
  {
    icon: <FaShieldAlt className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Transparent Performance Tracking",
    description: "Track your investments in real time with full visibility.",
  },
  {
    icon: <FaShieldAlt className="w-12 h-12 text-green-600 mx-auto mb-4" />,
    title: "Regulatory Compliance",
    description: "We follow legal frameworks and best practices in crypto.",
  },
];

const FeaturesAndSecurity = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Capitex & Security
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover why investors trust Capitex. Our unique approach combines strategy, transparency, professional management, and top-notch security.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndSecurity;
