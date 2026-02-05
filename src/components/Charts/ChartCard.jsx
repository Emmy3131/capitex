const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 h-72">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-full">{children}</div>
    </div>
  );
};

export default ChartCard;
