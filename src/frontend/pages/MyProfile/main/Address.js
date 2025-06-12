import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import apiAddress from "../../../../api/apiAddress";
import apiUser from "../../../../api/apiUser";

function Address() {
  const addressId = Cookies.get("addressId");
  const accessToken = Cookies.get("accessToken");

  const [update, setUpdate] = useState(true);
  const [address, setAddress] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [gender, setGender] = useState(true);
  const [dob, setDob] = useState("");

  const getAddress = async () => {
    try {
      const res = await apiAddress.getAddress({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;

      setAddress(data);

      setFirstName(data.firstName ?? "");
      setLastName(data.lastName ?? "");
      setPhone(data.phone ?? "");
      setFullAddress(data.address ?? "");
      setGender(data.gender ?? "");
      setDob(data.dob ?? "");
    } catch (err) {
      console.error("Error fetching address:", err);
      setAddress(null);
      setFirstName("");
      setLastName("");
      setPhone("");
      setFullAddress("");
      setGender("");
      setDob("");
    }
  };

  useEffect(() => {
    if (addressId != null || addressId !== undefined) {
      console.log(addressId);
      getAddress();
    } else {
      setUpdate(false);
    }
  }, [addressId]);

  const handleUpdateAddress = async () => {
    const updatedData = {
      firstName,
      lastName,
      phone,
      address: fullAddress,
      gender,
      dob,
    };

    if (addressId === undefined || addressId === null) {
      try {
        const res = await apiAddress.create(updatedData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(res.data.result);
        Cookies.set("addressId", res.data.result.id, { expires: 1 });

        Swal.fire({
          title: "Tạo địa chỉ thành công",
          text: "Địa chỉ đã được tạo",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } catch (err) {}
    } else {
      if (
        address?.firstName !== firstName ||
        address?.lastName !== lastName ||
        address?.phone !== phone ||
        address?.address !== fullAddress ||
        address?.gender !== gender ||
        address?.dob !== dob
      ) {
        await apiAddress
          .update(address.id, updatedData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            // console.log(res.data);
            setAddress(res.data.result);
            Swal.fire({
              title: "Cập nhật địa chỉ thành công",
              text: "Địa chỉ đã được cập nhật",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            });
            setUpdate(!update);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex items-start p-4 font-sans pt-6">
      <div className="w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Địa chỉ của tôi
          </h2>
          <button
            className="px-2 py-1 bg-blue-500 rounded-lg text-white font-bold hover:bg-orange-500"
            onClick={() => setUpdate(!update)}
          >
            Cập nhật địa chỉ
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-700">Địa chỉ</h3>

        <div className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-white shadow-sm w-full">
          <div className="flex-1">
            <div className="max-w-full font-semibold text-lg flex flex-wrap justify-between items-center">
              <div className=" flex items-center flex-grow w-full md:w-1/3 mb-4 md:mb-0">
                <label
                  htmlFor="firstName"
                  className="mr-4 whitespace-nowrap font-normal text-base"
                >
                  Họ:
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Họ"
                  className="font-semibold text-lg focus:outline-none focus:border-blue-500 mr-2 flex-grow bg-white"
                  disabled={update}
                />
              </div>

              <div className="flex items-center flex-grow w-full md:w-1/3 mb-4 md:mb-0">
                <label
                  htmlFor="lastname"
                  className="mr-4 whitespace-nowrap font-normal text-base"
                >
                  Tên:
                </label>
                <input
                  name="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tên"
                  className="font-semibold text-lg bg-white focus:outline-none focus:border-blue-500 mr-2 flex-grow"
                  disabled={update}
                />
              </div>

              <div className="flex items-center flex-grow w-full md:w-1/3">
                <label
                  htmlFor="phone"
                  className="mr-4 whitespace-nowrap font-normal text-base"
                >
                  Số điện thoại:
                </label>
                <input
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  className="font-semibold text-lg bg-white focus:outline-none focus:border-blue-500 flex-grow"
                  disabled={update}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="mr-4">
                Địa chỉ nhận hàng:
              </label>
              <input
                name="address"
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Địa chỉ nhận hàng"
                className="mt-1 font-semibold block w-full bg-white p-2 focus:border-blue-500"
                disabled={update}
              />
            </div>
            <hr className="border border-b border-red-500 w-full mt-4" />

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Giới tính
              </label>
              <div className="mt-1 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={gender === true}
                    onChange={() => setGender(true)}
                    className="mr-2"
                    disabled={update}
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={gender === false}
                    onChange={() => setGender(false)}
                    className="mr-2"
                    disabled={update}
                  />
                  Nữ
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Ngày sinh
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 block w-full bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={update}
              />
            </div>
          </div>

          {!update && (
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 mt-4 md:mt-0">
              <button
                onClick={handleUpdateAddress}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Cập nhật
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Address;
