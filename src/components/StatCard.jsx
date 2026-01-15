const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-xl font-semibold mt-2">{value}</h3>
  </div>
);
export default StatCard;