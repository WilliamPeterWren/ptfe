import React, { useState, useEffect } from "react";
import CountDown from "./CountDown";
import Banner from "./Banner";
import ProductGrid from "./ProductGrid";

import apiFlashSale from "../../../api/apiFlashSale";

function FlashSale() {
  const pageTitle = "Flashsale";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [flashsales, setFlashsales] = useState([]);
  const [currentFlashSale, setCurrentFlashsale] = useState();
  const [countDownFlashsale, setCountDownFlashsale] = useState(null);

  const getFlashsales = async () => {
    await apiFlashSale
      .getAll()
      .then((res) => {
        const data = res.data.result;
        const sorted = [...data].sort(
          (a, b) => new Date(a.startedAt) - new Date(b.startedAt)
        );

        console.log(sorted);
        setFlashsales(sorted);
        setCurrentFlashsale(sorted[0].id);
        setCountDownFlashsale(sorted[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFlashsales();
  }, []);

  return (
    <div className="py-4 bg-gray-200">
      {countDownFlashsale !== null && (
        <CountDown countDownFlashsale={countDownFlashsale} />
      )}
      <Banner
        flashsales={flashsales}
        setCurrentFlashsale={setCurrentFlashsale}
      />

      <div className="mx-auto">
        <ProductGrid currentFlashSale={currentFlashSale} />
      </div>
    </div>
  );
}

export default FlashSale;
