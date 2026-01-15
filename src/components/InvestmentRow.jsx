const InvestmentRow = () => (
  <div className="border rounded-lg p-4 mb-4">
    <div className="flex justify-between mb-2">
      <p className="font-medium">Crypto Investment</p>
      <span className="text-sm text-green-600">Active</span>
    </div>

    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
      <p>Start: 12 Jun 2025</p>
      <p>End: 12 Jul 2025</p>
      <p>Duration: 30 days</p>
      <p>Remaining: 10 days</p>
    </div>

    <div className="mt-3">
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-2 bg-green-600 rounded w-2/3"></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">65% completed</p>
    </div>
  </div>
);
export default InvestmentRow;