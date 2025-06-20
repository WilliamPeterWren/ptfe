import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaypalSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    if (paymentId && payerId) {
      fetch(
        `http://localhost:8089/api/paypal/success?paymentId=${paymentId}&payerID=${payerId}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Payment executed", data);
          // hereeeeeeeeeeeeeee
        })
        .catch((err) => {
          console.error("Payment error", err);
        });
    }
  }, [searchParams]);

  return <h2> Payment Successful!</h2>;
};

export default PaypalSuccess;
