const OrderList = () => {
  const invoices = [
    {
      id: "#746F5K2",
      date: "23 Jan 2019, 10:45pm",
      amount: 2300.0,
      status: "Complete",
    },
    {
      id: "#546H74W",
      date: "12 Jan 2020, 10:45pm",
      amount: 120.0,
      status: "Pending",
    },
    {
      id: "#87X6A44",
      date: "26 Dec 2019, 12:15pm",
      amount: 560.0,
      status: "Complete",
    },
    {
      id: "#986G531",
      date: "21 Jan 2019, 6:12am",
      amount: 3654.0,
      status: "Cancelled",
    },
    {
      id: "#326T4M9",
      date: "21 Jan 2019, 6:12am",
      amount: 200.0,
      status: "Complete",
    },
    {
      id: "#746F5K2",
      date: "23 Jan 2019, 10:45pm",
      amount: 2300.0,
      status: "Complete",
    },
    {
      id: "#546H74W",
      date: "12 Jan 2020, 10:45pm",
      amount: 120.0,
      status: "Pending",
    },
    {
      id: "#87X6A44",
      date: "26 Dec 2019, 12:15pm",
      amount: 560.0,
      status: "Complete",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "text-green-600";
      case "Pending":
        return "text-yellow-500";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">All Invoice</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="border rounded px-2 py-1"
          />
          <button className="p-1">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button className="p-1">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ORDER ID</th>
              <th className="py-2 px-4 border-b text-left">DATE</th>
              <th className="py-2 px-4 border-b text-left">AMOUNT</th>
              <th className="py-2 px-4 border-b text-left">STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{invoice.id}</td>
                <td className="py-2 px-4">{invoice.date}</td>
                <td className="py-2 px-4">${invoice.amount.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <span className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button className="px-2 py-1 border rounded">Prev</button>
          <button className="px-2 py-1 border rounded">1</button>
          <button className="px-2 py-1 border rounded">2</button>
          <span className="px-2 py-1">...</span>
          <button className="px-2 py-1 border rounded">6</button>
          <button className="px-2 py-1 border rounded">7</button>
          <button className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
