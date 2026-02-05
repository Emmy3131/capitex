const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase();

  const styles = {
    success: "bg-green-100 text-green-700",
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    rejected: "bg-red-100 text-red-700",
    declined: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[normalized] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};
export default StatusBadge