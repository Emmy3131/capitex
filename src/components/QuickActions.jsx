const QuickAction = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      {label}
    </button>
  );
};

export default QuickAction;
