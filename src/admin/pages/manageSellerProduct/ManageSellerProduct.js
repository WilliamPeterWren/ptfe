import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import apiOrder from "../../../api/apiOrder";

import BarChart from "./components/BarChart";
import RatingSection from "./components/RatingSection";
import SalesCard from "./components/SaleCard";
import SellerProduct from "./components/SellerProduct";
import apiProduct from "../../../api/apiProduct";

import { Link, useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import apiAddress from "../../../api/apiAddress";
import Pagination from "./components/Pagination";
import EmbeddedGoogleMap from "./components/EmbeddedGoogleMap";
import { calculateDuration } from "../../../utils/CountDate";

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
      percentage: (
        ((thisweekRevenue - lastweekRevenue) / thisweekRevenue) *
        100
      ).toFixed(1),
      type: thisweekRevenue - lastweekRevenue > 0 ? "increase" : "decrease",
    },
    {
      title: "Doanh thu tuần trước",
      value: lastweekRevenue,
      percentage: (
        ((lastweekRevenue - thisweekRevenue) / thisweekRevenue) *
        100
      ).toFixed(1),
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
      percentage: (
        ((revenueThisMonth - revenueLastMonth) / revenueThisMonth) *
        100
      ).toFixed(1),
      type: revenueThisMonth - revenueLastMonth > 0 ? "increase" : "decrease",
    },
    {
      title: "Doanh thu tháng trước",
      value: revenueLastMonth,
      percentage: (
        ((revenueLastMonth - revenueThisMonth) / revenueLastMonth) *
        100
      ).toFixed(1),
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

  if (sellerInfo === null || address === null) {
    return null;
  }

  return (
    <div>
      <div className="p-8">
        <div className="flex justify-items">
          <Link
            to={`/admin/manageseller`}
            className="text-gray-500 hover:text-gray-700 mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <p className="font-bold text-orange-600 text-xl mb-2 underline">
            Thông tin về shop
          </p>
        </div>

        <div className="flex justify-items">
          <div className="mr-4">
            <p>
              <span className="font-semibold text-lg mr-4">Tên shop:</span>
              <span className="font-semibold text-yellow-600 text-lg">
                {sellerInfo.username}
              </span>
            </p>
            <p>
              <span className="font-semibold text-lg mr-4">Email:</span>
              <span className="font-semibold text-yellow-600 text-lg">
                {sellerInfo.email}
              </span>
            </p>
            <p>
              <span className="font-semibold text-lg mr-4">Tham gia từ:</span>
              <span className="font-semibold text-yellow-600 text-lg">
                {calculateDuration(sellerInfo.createdAt)} trước
              </span>
            </p>
          </div>
          <div className="ml-4">
            <p>
              <span className="font-semibold text-lg mr-4">Họ:</span>
              <span className="font-semibold text-yellow-600 text-lg">
                {address.firstName}
              </span>
            </p>
            <p>
              <span className="font-semibold text-lg mr-4">Tên:</span>
              <span className="font-semibold text-yellow-600 text-lg">
                {address.lastName}
              </span>
            </p>
            <p>
              <span className="font-semibold text-lg mr-4">Số điện thoại:</span>
              <span className="font-semibold text-yellow-600 text-lg">
                {address.phone}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p className="font-semibold text-purple-800 text-lg">
            Địa chỉ: {address.address}
          </p>
          {address.length !== 0 && address?.address !== undefined ? (
            <div className="text-gray-800 text-sm">
              <EmbeddedGoogleMap userAddress={address.address} />
            </div>
          ) : (
            <div className="text-red-500 font-semibold">
              Chưa có địa chỉ lấy hàng!
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-8 font-sans antialiased">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesData.map((data, index) => (
              <SalesCard
                key={index}
                title={data.title}
                value={data.value}
                percentage={data.percentage}
                type={data.type}
              />
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
