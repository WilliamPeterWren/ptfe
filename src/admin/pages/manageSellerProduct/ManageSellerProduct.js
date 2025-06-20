import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

import BarChart from "./components/BarChart";
import RatingSection from "./components/RatingSection";
import SalesCard from "./components/SaleCard";
import SellerProduct from "./components/SellerProduct";
import apiProduct from "../../../api/apiProduct";

import Pagination from "./components/Pagination";
import SellerInfo from "./components/SellerInfo";

import apiOrder from "../../../api/apiOrder";
import apiUser from "../../../api/apiUser";
import apiAddress from "../../../api/apiAddress";

function ManageSellerProduct() {
  const accessToken = Cookies.get("accessToken");

  const { sellerid } = useParams();

  const [sellerToken, setSellerToken] = useState("");
  const [sellerRating, setSellerRating] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);

  const [address, setAddress] = useState(null);

  const adminGetSellerToken = async () => {
    try {
      const res = await apiUser.adminGetSellerToken(sellerid, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data;
      console.log(data);
      setSellerInfo(data);

      setSellerToken(data.accessToken);

      setSellerRating(
        Object.entries(data.rating)
          .map(([star, count]) => ({
            stars: Number(star),
            count,
          }))
          .sort((a, b) => b.stars - a.stars)
      );

      const resAddress = await apiAddress.getAddress({
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      const dataAddress = resAddress.data.result;
      console.log(dataAddress);
      setAddress(dataAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sellerid && accessToken) {
      adminGetSellerToken();
    }
  }, [accessToken, sellerid]);

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

  const [sellerProducts, setSellerProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);

  const sellerCountOrderThisMonth = async () => {
    try {
      const res = await apiOrder.sellerCountOrderThisMonth({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) sellerCountOrderThisMonth();
  }, [sellerToken]);

  const sellerCountOrderThisMonthCancelled = async () => {
    try {
      const res = await apiOrder.sellerCountOrderThisMonthCancelled({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) sellerCountOrderThisMonthCancelled();
  }, [sellerToken]);

  const getRevenueThisMonth = async () => {
    try {
      const res = await apiOrder.revenueThisMonth({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) getRevenueThisMonth();
  }, [sellerToken]);

  const getRevenueLastMonth = async () => {
    try {
      const res = await apiOrder.revenueLastMonth({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) {
      getRevenueLastMonth();
    }
  }, [sellerToken]);

  const getYearlyRevenuePerMonth = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getYearlyRevenuePerMonth({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) {
      getYearlyRevenuePerMonth();
    }
  }, [sellerToken]);

  const getTodayRevenue = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getTodayRevenue({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) {
      getTodayRevenue();
    }
  }, [sellerToken]);

  const getThisWeek = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getThisWeek({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) {
      getThisWeek();
    }
  }, [sellerToken]);

  const getLastWeek = async () => {
    setLoadingMonthly(true);
    setErrorMonthly(null);
    try {
      const res = await apiOrder.getLastWeek({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
    if (sellerToken) {
      getLastWeek();
    }
  }, [sellerToken]);

  const getProductBySellerId = async () => {
    setLoading(false);
    try {
      const res = await apiProduct.adminGetProductBySellerId(
        sellerid,
        currentPage,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = res.data.result;

      const sorted1 = [...data.content].sort(
        (a, b) => new Date(b.sold) - new Date(a.sold)
      );

      // console.log(sorted1);
      // console.log(data);

      setCurrentPage(data.number);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);

      setSellerProducts(sorted1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sellerToken && currentPage >= 0 && loading) {
      getProductBySellerId();
    }
  }, [sellerToken, currentPage, loading]);

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
      percentage:
        thisweekRevenue > 0
          ? (
              ((thisweekRevenue - lastweekRevenue) / thisweekRevenue) *
              100
            ).toFixed(1)
          : 100,
      type: thisweekRevenue - lastweekRevenue > 0 ? "increase" : "decrease",
    },
    {
      title: "Doanh thu tuần trước",
      value: lastweekRevenue,
      percentage:
        thisweekRevenue > 0
          ? (
              ((lastweekRevenue - thisweekRevenue) / thisweekRevenue) *
              100
            ).toFixed(1)
          : 100,
      type: lastweekRevenue - thisweekRevenue > 0 ? "increase" : "decrease",
    },
    {
      title: "Doanh thu năm nay",
      value: thisYearRevenue,
      percentage: 100,
      type: "increase",
    },

    {
      title: "Doanh thu tháng này",
      value: revenueThisMonth,
      percentage:
        revenueThisMonth > 0
          ? (
              ((revenueThisMonth - revenueLastMonth) / revenueThisMonth) *
              100
            ).toFixed(1)
          : 100,
      type: revenueThisMonth - revenueLastMonth > 0 ? "increase" : "decrease",
    },
    {
      title: "Doanh thu tháng trước",
      value: revenueLastMonth,
      percentage:
        revenueLastMonth > 0
          ? (
              ((revenueLastMonth - revenueThisMonth) / revenueLastMonth) *
              100
            ).toFixed(1)
          : 100,
      type: revenueLastMonth - revenueThisMonth > 0 ? "increase" : "decrease",
    },
    {
      title: "Tổng đơn hàng tháng này",
      value: countOrderThisMonth,
      percentage: 100,
      type: "increase",
    },
    {
      title: "Số đơn đã hủy",
      value: countOrderThisMonthCancelled,
      percentage: 100,
      type: "increase",
    },
  ];

  const [exportTrigger, setExportTrigger] = useState(null);

  const fetchExportData = async (apiCall) => {
    try {
      const res = await apiCall({
        headers: {
          Authorization: `Bearer ${sellerToken}`,
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
          dataToExport = await fetchExportData(apiOrder.getExportLastWeek);
          name = "-tuan-truoc";
          break;
        case 3:
          dataToExport = await fetchExportData(apiOrder.getExportThisYear);
          name = "-nam-nay";
          break;
        case 4:
          dataToExport = await fetchExportData(apiOrder.getExportThisMonth);
          name = "-thang-nay";
          break;
        case 5:
          dataToExport = await fetchExportData(apiOrder.getExportLastMonth);
          name = "-thang-truoc";
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

  if (sellerInfo === null || address === null) {
    return null;
  }

  return (
    <div>
      <SellerInfo sellerInfo={sellerInfo} address={address} />

      <div className="bg-white p-8 font-sans antialiased">
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
        </div>
      </div>

      <div className="border-y border-indigo-800 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <div className="w-[1000px] h-[600px]">
            <BarChart
              yearlyRevenue={yearlyRevenue}
              loadingMonthly={loadingMonthly}
              errorMonthly={errorMonthly}
              sellerToken={sellerToken}
            />
          </div>
        </div>

        {sellerRating !== null && <RatingSection ratings={sellerRating} />}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
        <h3 className="text-xl font-bold text-yellow-700 mb-4 border-b border-blue-700 pb-2 mb-2">
          Danh sách sản phẩm / {totalElements}
        </h3>
        <div className="space-y-2">
          {sellerProducts.map((product, index) => (
            <SellerProduct
              key={index}
              product={product}
              accessToken={accessToken}
              setLoading={setLoading}
            />
          ))}
        </div>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default ManageSellerProduct;
