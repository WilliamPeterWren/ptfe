// 
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import apiOrder from "../../../api/apiOrder";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const useDailyRevenueData = (monthIndex, year, accessToken) => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [errorDaily, setErrorDaily] = useState(null);

  useEffect(() => {
    const getDailyRevenueForMonth = async () => {
      if (monthIndex === null || !accessToken) {
        setDailyRevenue([]);
        setLoadingDaily(false);
        return;
      }

      setLoadingDaily(true);
      setErrorDaily(null);
      try {
        const res = await apiOrder.getDailyRevenueForMonth(
          year,
          monthIndex + 1,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = res.data;
        // console.log("Daily Revenue Data:", data);
        setDailyRevenue(data);
      } catch (error) {
        console.error("Error fetching daily revenue:", error);
        setErrorDaily(error);
      } finally {
        setLoadingDaily(false);
      }
    };

    getDailyRevenueForMonth();
  }, [monthIndex, year, accessToken]);

  const daysInMonth =
    monthIndex !== null ? new Date(year, monthIndex + 1, 0).getDate() : 0;
  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

  return { labels, dailyRevenue, loadingDaily, errorDaily };
};

export default function BarChart({
  yearlyRevenue,
  loadingMonthly,
  errorMonthly,
}) {
  const accessToken = Cookies.get("accessToken");

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  const currentYear = new Date().getFullYear();

  const {
    labels: dailyLabels,
    dailyRevenue,
    loadingDaily,
    errorDaily,
  } = useDailyRevenueData(selectedMonthIndex, currentYear, accessToken);

  const monthNames = [
    "Tháng giêng",
    "Tháng hai",
    "Tháng ba",
    "Tháng tư",
    "Tháng năm",
    "Tháng sáu",
    // "Tháng bảy",
    // "Tháng tám",
    // "Tháng chín",
    // "Tháng mười",
    // "Tháng mười một",
    // "Tháng chạp",
  ];

  const monthlyData = {
    labels: monthNames.slice(0, yearlyRevenue.length),
    datasets: [
      {
        label: "Doanh thu",
        data: yearlyRevenue,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dailyChartData = {
    labels: dailyLabels,
    datasets: [
      {
        label: `${
          selectedMonthIndex !== null ? monthNames[selectedMonthIndex] : ""
        } Doanh thu (hàng ngày)`,
        data: dailyRevenue,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartData = selectedMonthIndex !== null ? dailyChartData : monthlyData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text:
          selectedMonthIndex !== null
            ? `Doanh thu hàng ngày ${monthNames[selectedMonthIndex]}`
            : "Doanh thu hàng tháng",
        color: "#1f2937",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            if (selectedMonthIndex !== null) {
              return `Ngày ${context[0].label}`;
            }
            return context[0].label;
          },
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && selectedMonthIndex === null) {
        const clickedMonthIndex = elements[0].index;
        setSelectedMonthIndex(clickedMonthIndex);
      } else if (selectedMonthIndex !== null) {
        setSelectedMonthIndex(null);
      }
    },
  };

  if (!accessToken) {
    return (
      <div className="text-red-500">
        Vui lòng đăng nhập để xem dữ liệu doanh thu.
      </div>
    );
  }

  if (loadingMonthly) {
    return (
      <div className="text-center mt-8">Đang tải doanh thu hàng tháng...</div>
    );
  }

  if (errorMonthly) {
    return (
      <div className="text-red-500 text-center mt-8">
        Lỗi tải doanh thu hàng tháng: {errorMonthly.message}
      </div>
    );
  }

  if (selectedMonthIndex !== null && loadingDaily) {
    return (
      <div className="text-center mt-8">Đang tải doanh thu hàng ngày...</div>
    );
  }

  if (selectedMonthIndex !== null && errorDaily) {
    return (
      <div className="text-red-500 text-center mt-8">
        Lỗi tải doanh thu hàng ngày: {errorDaily.message}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-8">
      <div>
        <span className="text-lg font-semibold">
          {selectedMonthIndex !== null
            ? `Doanh thu ngày của ${monthNames[selectedMonthIndex]}`
            : `Doanh thu hàng tháng trong năm ${currentYear}`}
        </span>
      </div>
      <Bar data={chartData} options={options} />
      {selectedMonthIndex !== null && (
        <button
          onClick={() => setSelectedMonthIndex(null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trở lại doanh thu hàng tháng
        </button>
      )}
    </div>
  );
}
