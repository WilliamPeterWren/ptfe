import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";

import apiOrder from "../../../api/apiOrder";
import apiUser from "../../../api/apiUser";
import apiAddress from "../../../api/apiAddress";
import UserInfo from "./components/UserInfo";
import SalesCard from "./components/SaleCard";
import OrderData from "./OrderData";

function ManageUserProfile() {
  const accessToken = Cookies.get("accessToken");

  const { userid } = useParams();

  const [userAccessToken, setUserAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);

  const adminGetUserToken = async () => {
    try {
      const res = await apiUser.adminGetSellerToken(userid, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data;
      // console.log(data);
      setUserInfo(data);
      setUserAccessToken(data.accessToken);

      Cookies.set("userAccessToken", data.accessToken, { expires: 1 });

      const resAddress = await apiAddress.getAddress({
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      const dataAddress = resAddress.data.result;
      // console.log(dataAddress);
      setAddress(dataAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userid && accessToken) {
      adminGetUserToken();
    }
  }, [accessToken, userid]);

  // from here

  const [countOrderThisMonth, setCountOrderThisMonth] = useState(0);
  const [countOrderThisMonthCancelled, setCountOrderThisMonthCancelled] =
    useState(0);

  const [spendingThisMonth, setSpendingThisMonth] = useState(0);
  const [spendingLastMonth, setSpendingLastMonth] = useState(0);

  const [thisYearSpending, setThisYearSpending] = useState(0);
  const [todaySpending, setTodaySpending] = useState(0);
  const [thisweekSpending, setThisweekSpending] = useState(0);
  const [lastweekSpending, setLastweekSpending] = useState(0);

  const userCountOrderThisMonth = async () => {
    try {
      const res = await apiOrder.adminGetUserCountOrderThisMonth({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
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
    if (userAccessToken) userCountOrderThisMonth();
  }, [userAccessToken]);

  const userCountOrderThisMonthCancelled = async () => {
    try {
      const res = await apiOrder.adminGetUserCountOrderThisMonthCancelled({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
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
    if (userAccessToken) userCountOrderThisMonthCancelled();
  }, [userAccessToken]);

  const adminGetUserSpendingThisMonth = async () => {
    try {
      const res = await apiOrder.adminGetUserSpendingThisMonth({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      const data = res.data;
      // console.log(data);
      setSpendingThisMonth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userAccessToken) adminGetUserSpendingThisMonth();
  }, [userAccessToken]);

  const adminGetUserSpendingLastMonth = async () => {
    try {
      const res = await apiOrder.adminGetUserSpendingLastMonth({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      const data = res.data;
      // console.log(data);
      setSpendingLastMonth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userAccessToken) {
      adminGetUserSpendingLastMonth();
    }
  }, [userAccessToken]);

  const adminGetUserSpendingPerMonth = async () => {
    try {
      const res = await apiOrder.adminGetUserSpendingPerMonth({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      const data = res.data;
      // console.log("Yearly Spending Data:", data);
      const sum = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setThisYearSpending(sum);

    } catch (error) {
      console.error("Error fetching yearly spending:", error);
    } finally {
      
    }
  };

  useEffect(() => {
    if (userAccessToken) {
      adminGetUserSpendingPerMonth();
    }
  }, [userAccessToken]);

  const adminGetUserSpendingToday = async () => {
    
    try {
      const res = await apiOrder.adminGetUserSpendingToday({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      const data = res.data;

      setTodaySpending(data);
    } catch (error) {
      console.error("Error fetching yearly spending:", error);
    } finally {
      
    }
  };

  useEffect(() => {
    if (userAccessToken) {
      adminGetUserSpendingToday();
    }
  }, [userAccessToken]);

  const adminGetUserSpendingThisWeek = async () => {
    
    try {
      const res = await apiOrder.adminGetUserSpendingThisWeek({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      const data = res.data;

      setThisweekSpending(data);
    } catch (error) {
      console.error("Error fetching yearly spending:", error);
    } finally {
      
    }
  };

  useEffect(() => {
    if (userAccessToken) {
      adminGetUserSpendingThisWeek();
    }
  }, [userAccessToken]);

  const adminGetUserSpendingLastWeek = async () => {
    
    try {
      const res = await apiOrder.adminGetUserSpendingLastWeek({
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      const data = res.data;

      setLastweekSpending(data);
    } catch (error) {
      console.error("Error fetching yearly spending:", error);
    } finally {
      
    }
  };

  useEffect(() => {
    if (userAccessToken) {
      adminGetUserSpendingLastWeek();
    }
  }, [userAccessToken]);
  // to here

  const salesData = [
    {
      title: "Chi tiêu hôm nay",
      value: todaySpending,
      percentage: 67,
      type: "increase",
    },
    {
      title: "Chi tiêu tuần này",
      value: thisweekSpending,
      percentage: (
        ((thisweekSpending - lastweekSpending) / thisweekSpending) *
        100
      ).toFixed(1),
      type: thisweekSpending - lastweekSpending > 0 ? "increase" : "decrease",
    },
    {
      title: "Chi tiêu tuần trước",
      value: lastweekSpending,
      percentage: (
        ((lastweekSpending - thisweekSpending) / thisweekSpending) *
        100
      ).toFixed(1),
      type: lastweekSpending - thisweekSpending > 0 ? "increase" : "decrease",
    },
    {
      title: "Chi tiêu năm nay",
      value: thisYearSpending,
      percentage: 100,
      type: "increase",
    },

    {
      title: "Chi tiêu tháng này",
      value: spendingThisMonth,
      percentage: (
        ((spendingThisMonth - spendingLastMonth) / spendingThisMonth) *
        100
      ).toFixed(1),
      type: spendingThisMonth - spendingLastMonth > 0 ? "increase" : "decrease",
    },
    {
      title: "Chi tiêu tháng trước",
      value: spendingLastMonth,
      percentage: (
        ((spendingLastMonth - spendingThisMonth) / spendingLastMonth) *
        100
      ).toFixed(1),
      type: spendingLastMonth - spendingThisMonth > 0 ? "increase" : "decrease",
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

  if (userInfo === null || address === null || userAccessToken === null) {
    return null;
  }

  return (
    <div>
      <UserInfo userInfo={userInfo} address={address} />

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

      <OrderData userid={userid} />
    </div>
  );
}

export default ManageUserProfile;
