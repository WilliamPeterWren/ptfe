import { useState, useEffect } from "react";

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

  const [flashsale, setFlashsale] = useState([]);
  const [size, setSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const getProductByFlashsaleIdPage = async () => {
    // console.log(currentFlashSale);
    if (currentFlashSale !== undefined) {
      await apiFlashSale
        .getProductByFlashsaleIdPageable(currentFlashSale, currentPage, size)
        .then((res) => {
          const data = res.data.result;
          console.log(data);
          setCurrentPage(data.number);
          setTotalPages(data.totalPages);
          setFlashsale(data.content);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getProductByFlashsaleIdPage();
  }, [currentFlashSale, currentPage]);

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
        <ProductGrid
          flashsale={flashsale}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default FlashSale;
