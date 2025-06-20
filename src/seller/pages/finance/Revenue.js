import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";

import apiOrder from "../../../api/apiOrder";
import apiProduct from "../../../api/apiProduct";

import BarChart from "./BarChart";
import RatingSection from "./RatingSection";
import SalesCard from "./SaleCard";
import BestSoldItem from "./BestSoldItem";

const Revenue = () => {
  const accessToken = Cookies.get("accessToken");

  const [countOrderThisMonth, setCountOrderThisMonth] = useState(0);
  const [countOrderThisMonthCancelled, setCountOrderThisMonthCancelled] =
    useState(0);

  const [revenueThisMonth, setRevenueThisMonth] = useState(0);
  const [revenueLastMonth, setRevenueLastMonth] = useState(0);

  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [errorMonthly, setErrorMonthly] = useState(null);
  const [thisYearRevenue, setThisYearRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [thisweekRevenue, setThisweekRevenue] = useState(0);
  const [lastweekRevenue, setLastweekRevenue] = useState(0);

  const [bestSold, setBestSold] = useState([]);

  const sellerCountOrderThisMonth = async () => {
    try {
      const res = await apiOrder.sellerCountOrderThisMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      // console.log(data);
      setCountOrderThisMonth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sellerCountOrderThisMonth();
  }, []);

  const sellerCountOrderThisMonthCancelled = async () => {
    try {
      const res = await apiOrder.sellerCountOrderThisMonthCancelled({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      // console.log(data);
      setCountOrderThisMonthCancelled(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sellerCountOrderThisMonthCancelled();
  }, []);

  const getRevenueThisMonth = async () => {
    try {
      const res = await apiOrder.revenueThisMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      // console.log(data);
      setRevenueThisMonth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRevenueThisMonth();
  }, []);

  const getRevenueLastMonth = async () => {
    try {
      const res = await apiOrder.revenueLastMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      // console.log(data);
      setRevenueLastMonth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRevenueLastMonth();
  }, []);

  const getYearlyRevenuePerMonth = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getYearlyRevenuePerMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      // console.log("Yearly Revenue Data:", data);
      const sum = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setThisYearRevenue(sum);

      setYearlyRevenue(data);
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
      setErrorMonthly(error);
    } finally {
      setLoadingMonthly(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getYearlyRevenuePerMonth();
    }
  }, [accessToken]);

  const getTodayRevenue = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getTodayRevenue({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;

      setTodayRevenue(data);
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
      setErrorMonthly(error);
    } finally {
      setLoadingMonthly(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getTodayRevenue();
    }
  }, [accessToken]);

  const getThisWeek = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getThisWeek({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;

      setThisweekRevenue(data);
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
      setErrorMonthly(error);
    } finally {
      setLoadingMonthly(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getThisWeek();
    }
  }, [accessToken]);

  const getLastWeek = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getLastWeek({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;

      setLastweekRevenue(data);
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
      setErrorMonthly(error);
    } finally {
      setLoadingMonthly(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getLastWeek();
    }
  }, [accessToken]);

  const salesData = [
    {
      title: "Doanh thu hôm nay",
      value: todayRevenue,
      percentage: 67,
      type: "increase",
    },
    {
      title: "Doanh thu tuần này",
      value: thisweekRevenue,
      percentage: (
        ((thisweekRevenue - lastweekRevenue) / thisweekRevenue) *
        100
      ).toFixed(1),
      type: thisweekRevenue - lastweekRevenue > 0 ? "increase" : "decrease",
    },
    {
      title: "Doanh thu năm nay",
      value: thisYearRevenue,
      percentage: 100,
      type: "increase",
    },
  ];

  const rating =
    Cookies.get("rating") !== undefined
      ? JSON.parse(Cookies.get("rating"))
      : null;
  // console.log(rating);

  const getbestSoldProduct = async () => {
    try {
      const res = await apiProduct.getBestSoldProduct(5, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;

      const sorted1 = [...data].sort(
        (a, b) => new Date(b.sold) - new Date(a.sold)
      );

      console.log(sorted1);

      setBestSold(sorted1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getbestSoldProduct();
    }
  }, [accessToken]);

  // const [reportData, setReportData] = useState([]);
  const [exportTrigger, setExportTrigger] = useState(null);

  const fetchExportData = async (apiCall) => {
    try {
      const res = await apiCall({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching export data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataAndExport = async () => {
      let dataToExport = null;
      let name = "";
      switch (exportTrigger) {
        case 0:
          dataToExport = await fetchExportData(apiOrder.getExportToday);
          name = "-hom-nay";
          break;
        case 1:
          dataToExport = await fetchExportData(apiOrder.getExportThisWeek);
          name = "-tuan-nay";
          break;
        case 2:
          dataToExport = await fetchExportData(apiOrder.getExportThisYear);
          name = "-nam-nay";
          break;
        default:
          return;
      }

      if (dataToExport) {
        // setReportData(dataToExport);
        console.log(dataToExport);

        const exportData = dataToExport.map((item) => ({
          // "Mã sản phẩm": item.id,
          "Tên sản phẩm": item.name,
          "Đã bán": item.sold,
          "Doanh thu": item.revenue,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DoanhThu");
        XLSX.writeFile(workbook, `bao-cao-doanh-thu${name}.xlsx`);

        setExportTrigger(null);
      }
    };

    if (exportTrigger !== null) {
      fetchDataAndExport();
    }
  }, [exportTrigger, accessToken]);

  const handleExport = (triggerIndex) => {
    setExportTrigger(triggerIndex);
  };

  const handleExportThisMonth = async () => {
    try {
      const res = await apiOrder.getExportThisMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const currentMonth = new Date().getMonth() + 1;

      const exportData = res.data.map((item) => ({
        // "Mã sản phẩm": item.id,
        "Tên sản phẩm": item.name,
        "Đã bán": item.sold,
        "Doanh thu": item.revenue,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "DoanhThu");
      XLSX.writeFile(workbook, `bao-cao-doanh-thu-thang-${currentMonth}.xlsx`);
    } catch (error) {
      console.error("Error fetching export data:", error);
      return null;
    }
  };

  const handleExportLastMonth = async () => {
    try {
      const res = await apiOrder.getExportLastMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const currentMonth =
        new Date().getMonth() === 0 ? 12 : new Date().getMonth();

      console.log(res.data);

      const exportData = res.data.map((item) => ({
        // "Mã sản phẩm": item.id,
        "Tên sản phẩm": item.name,
        "Đã bán": item.sold,
        "Doanh thu": item.revenue,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "DoanhThu");
      XLSX.writeFile(workbook, `bao-cao-doanh-thu-thang-${currentMonth}.xlsx`);
    } catch (error) {
      console.error("Error fetching export data:", error);
      return null;
    }
  };

  return (
    <div className=" min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Doanh thu hàng tháng</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Đơn hàng tháng này</p>
          <p className="text-2xl font-bold text-yellow-500">
            {countOrderThisMonth.toLocaleString()}{" "}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Đơn hàng đã hủy</p>
          <p className="text-2xl font-bold text-orange-500">
            {countOrderThisMonthCancelled.toLocaleString()}{" "}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Doanh thu tháng này</p>
            <p className="text-2xl font-bold text-blue-500">
              {revenueThisMonth.toLocaleString()}{" "}
            </p>
          </div>
          <button
            onClick={handleExportThisMonth}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Xuất Excel
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Doanh thu tháng trước</p>
            <p className="text-2xl font-bold text-green-500">
              {revenueLastMonth.toLocaleString()}{" "}
            </p>
          </div>
          <button
            onClick={handleExportLastMonth}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Xuất Excel
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-8 font-sans antialiased">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesData.map((data, index) => (
              <div key={index}>
                <SalesCard
                  title={data.title}
                  value={data.value}
                  percentage={data.percentage}
                  type={data.type}
                  handleExport={handleExport}
                  index={index}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RatingSection ratings={rating} />
            <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Sản phẩm bán chạy
              </h3>
              <div className="space-y-2">
                {bestSold.map((product, index) => (
                  <BestSoldItem key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <BarChart
          yearlyRevenue={yearlyRevenue}
          loadingMonthly={loadingMonthly}
          errorMonthly={errorMonthly}
        />
      </div>
    </div>
  );
};

export default Revenue;
