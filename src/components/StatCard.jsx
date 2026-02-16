const StatCard = ({ title, value, icon }) => {
  return (
    <div className="
      relative
      bg-white
      rounded-2xl
      p-6
      shadow-sm
      border border-gray-100
      hover:shadow-lg
      transition-all duration-300
      group
    ">
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-t-2xl"></div>

      <div className="flex items-center justify-between">

        {/* Text Section */}
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div className="
          w-12 h-12
          flex items-center justify-center
          rounded-xl
          bg-emerald-50
          text-emerald-600
          text-xl
          group-hover:scale-110
          transition-transform
        ">
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;
