import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

import apiUser from "../../../api/apiUser";
import OrderData from "./OrderData";

function ManageShipperOrder() {
  const accessToken = Cookies.get("accessToken");

  const { shipperid } = useParams();

  const [shipperToken, setShipperToken] = useState("");
  // const [shipperInfo, setShipperInfo] = useState(null);

  const adminGetShipperToken = async () => {
    try {
      const res = await apiUser.adminGetSellerToken(shipperid, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data;
      console.log(data);
      // setShipperInfo(data);

      setShipperToken(data.accessToken);
      Cookies.set("shipperAccessToken", data.accessToken, { expires: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shipperid && accessToken) {
      adminGetShipperToken();
    }
  }, [accessToken, shipperid]);

  if (shipperToken === null || shipperid === null) {
    return null;
  }

  return (
    <div>
      <OrderData accessToken={shipperToken} shipperid={shipperid} />
    </div>
  );
}

export default ManageShipperOrder;
