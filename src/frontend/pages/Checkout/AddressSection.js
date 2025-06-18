import { FaMapMarkerAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import apiAddress from "../../../api/apiAddress";
import EmbeddedGoogleMap from "./EmbeddedGoogleMap";

const AddressSection = () => {
  const accessToken = Cookies.get("accessToken");

  const navigate = useNavigate();

  const [address, setAddress] = useState({});
  const getAddress = async () => {
    await apiAddress
      .getAddress({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const data = res.data.result;
        // console.log(data);
        setAddress(data);
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          title: "Cập nhật địa chỉ!",
          text: "Bạn hãy vào trang cá nhân để cập nhật địa chỉ và số điện thoại nhận hàng!",
          icon: "warning",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  useEffect(() => {
    if (accessToken) {
      getAddress();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-white p-6 mt-4 shadow-sm border-t-2 border-orange-500">
      <div className="flex items-center text-orange-500 text-lg font-semibold mb-4">
        <FaMapMarkerAlt className="mr-2" />
        Địa Chỉ Nhận Hàng
      </div>
      {address.length !== 0 && address?.address !== undefined ? (
        <div className="text-gray-800 text-sm">
          <p>
            <span className="font-semibold">
              {" "}
              {address?.firstName + " " + address?.lastName}{" "}
            </span>{" "}
            {address?.phone}
          </p>
          <p> {address?.address} </p>
          <EmbeddedGoogleMap userAddress={address.address} />
        </div>
      ) : (
        <div className="text-red-500 font-semibold">
          Hãy cập nhật địa chỉ nhận hàng!
        </div>
      )}
    </div>
  );
};

export default AddressSection;
