import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sale() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/flashsale");
  }, []);

  return null;
}

export default Sale;
