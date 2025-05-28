// components/BarChart.jsx
import React, { useState } from "react";
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

const generateDailyData = (monthIndex, year) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  const data = labels.map(() => Math.floor(Math.random() * 20) + 1);

  return { labels, data };
};

export default function BarChart() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  const currentYear = new Date().getFullYear();

  const monthlyData = {
    labels: [
      "Tháng giêng",
      "Tháng hai",
      "Tháng ba",
      "Tháng tư",
      "Tháng năm",
      "Tháng sáu",
      "Tháng bảy",
      "Tháng tám",
      "Tháng chín",
      "Tháng mười",
      "Tháng mười một",
      "Tháng chạp",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: [10, 19, 3, 5, 2, 3, 15, 8, 12, 7, 18, 9],
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

  const chartData =
    selectedMonthIndex !== null
      ? (() => {
          const { labels, data } = generateDailyData(
            selectedMonthIndex,
            currentYear
          );
          return {
            labels: labels,
            datasets: [
              {
                label: `${monthlyData.labels[selectedMonthIndex]} Doanh thu (hàng ngày)`,
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          };
        })()
      : monthlyData;

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
            ? `Doanh thu hàng ngày ${monthlyData.labels[selectedMonthIndex]}`
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
              return `Day ${context[0].label}`;
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-8">
      <div>
        <span>Doanh thu tháng này</span>
        <span>{}</span>
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
