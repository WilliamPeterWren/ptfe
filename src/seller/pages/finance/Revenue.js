import React from "react";

import BarChart from "./BarChart";

const data = [
  { name: "2013", votes: 10 },
  { name: "2014", votes: 19 },
  { name: "2014", votes: 3 },
  { name: "2015", votes: 5 },
  { name: "2016", votes: 2 },
  { name: "2017", votes: 3 },
];

const pieData = [
  { name: "Closed", value: 77, color: "#007bff" },
  { name: "Lost", value: 23, color: "#fd7e14" },
];

const Revenue = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Doanh thu hàng tháng</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Đơn hàng tháng này</p>
          <p className="text-2xl font-bold text-yellow-500">58</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Đơn hàng đã hủy</p>
          <p className="text-2xl font-bold text-orange-500">32</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-blue-500">94,828.678</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Doanh thu tháng trước</p>
          <p className="text-2xl font-bold text-green-500">9,308.556</p>
        
        </div>
      </div>

      <BarChart />
    </div>
  );
};

export default Revenue;
