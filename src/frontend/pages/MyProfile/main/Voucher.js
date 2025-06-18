import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import apiPeterVoucher from "../../../../api/apiPeterVoucher";
import apiShippingVoucher from "../../../../api/apiShippingVoucher";
import VoucherCard from "../components/VoucherCard";
// import formatDate from "../../../../utils/FormatDate";

const Voucher = () => {
  const [peterVoucher, setPeterVoucher] = useState([]);
  const [shippingVoucher, setShippingVoucher] = useState([]);

  const userPeterVoucher = JSON.parse(Cookies.get("peterVoucher"));
  // console.log(userPeterVoucher);

  const userShippingVoucher = JSON.parse(Cookies.get("shippingVoucher"));
  // console.log(userShippingVoucher);

  const getPeterVoucher = async () => {
    await apiPeterVoucher
      .getAll()
      .then((res) => {
        const data = res.data.result;
        setPeterVoucher(data);
      })
      .catch((err) => console.log(err));
  };
  const getShippingVoucher = async () => {
    await apiShippingVoucher
      .userGetAll()
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setShippingVoucher(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPeterVoucher();
    getShippingVoucher();
  }, []);

  return (
    <div className="min-h-screen bg-white ml-4 px-4 rounded-lg mt-6">
      <div className="py-4 flex justify-center">
        <p className="text-lg rounded-lg border border-blue-500 p-4">
          Peter voucher
        </p>
      </div>

      <div className="flex justify-center">
        <hr className="border-b border-red-500 w-96 mb-4" />
      </div>

      {userPeterVoucher?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {userPeterVoucher.map((voucher, index) => {
            console.log(voucher);
            return (
              <VoucherCard
                key={index}
                index={index}
                voucher={voucher}
                data={peterVoucher}
              />
            );
          })}{" "}
        </div>
      ) : (
        <div className="text-center">
          <p>Bạn không có voucher nào!</p>
          <hr className="mt-4" />
        </div>
      )}

      <div className="py-4 flex justify-center mt-8">
        <p className="text-lg rounded-lg border border-blue-500 p-4">
          Shipping voucher
        </p>
      </div>

      <div className="flex justify-center">
        <hr className="border-b border-red-500 w-96 mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {userShippingVoucher.map((voucher, index) => {
          console.log(voucher);
          return (
            <VoucherCard
              key={index}
              index={index}
              voucher={voucher}
              data={shippingVoucher}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Voucher;
