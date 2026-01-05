import logo from "../assets/logo/logo.png";

const Brand = ({
  showText = true,
  size = "md",
  textColor = "text-green-600",
}) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-11 h-11",
  };

  return (
    <div className="flex items-center gap-2 select-none">
      {/* Logo */}
      <div
        className={`${sizes[size]} rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 flex items-center justify-center`}
      >
        <img
          src={logo}
          alt="Capitex Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* App Name */}
      {showText && (
        <span
          className={`text-xl font-bold tracking-wide ${textColor}`}
        >
          Capitex
        </span>
      )}
    </div>
  );
};

export default Brand;
