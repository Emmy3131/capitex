const QuickAction = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 transition"
    >
      {label}
    </button>
  );
};

export default QuickAction;
