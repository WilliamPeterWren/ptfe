import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import { imageUrl } from "../../../api/config";
// import userContext from "../../../context/userContext";
import apiCart from "../../../api/apiCart";
import { SET_CART_FROM_API } from "../../../redux/action/cartAction";

function DownNav() {
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("searchData updated:", searchData);
  }, [searchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("Search button clicked, searchData:", searchData);
    navigate(`/search/products/${searchData}`);
  };
  // const { user } = useContext(userContext);
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");

  const getCartFromApi = async () => {
    if (accessToken) {
      await apiCart
        .getCart({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = res.data.result;

          const sorted1 = [...data].sort(
            (a, b) =>
              new Date(b.itemResponses.updatedAt) -
              new Date(a.itemResponses.updatedAt)
          );

          const sorted2 = [...sorted1].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          // console.log(sorted2);
          dispatch(SET_CART_FROM_API(sorted2));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCartFromApi();
    }
  }, [accessToken]);

  const countCart = useSelector((state) => state.cart.countCart);


  return (
    <div className="flex justify-between items-center py-5 pr-10">
      <a href="/home">
        <div className="flex items-center p-2 mr-20">
          <div>
            <img
              alt="logo"
              src={imageUrl + "logo/logo.png"}
              width={40}
              onError={(e) => {
                const target = e.target;
                target.onerror = null;
                const retryInterval = 2000;
                let retryCount = 0;
                const maxRetries = 5;

                const retryLoad = () => {
                  if (retryCount < maxRetries) {
                    retryCount++;
                    target.src = imageUrl + "product/" + `?retry=${retryCount}`;
                    target.onerror = () => {
                      setTimeout(retryLoad, retryInterval);
                    };
                  } else {
                    target.src =
                      "https://placehold.co/32x32/cccccc/333333?text=N/A";
                  }
                };

                setTimeout(retryLoad, retryInterval);
              }}
              loading="lazy"
            />
          </div>
          <div className="ml-4">
            <img
              alt="peter"
              src={imageUrl + "logo/peter 2.png"}
              width={130}
              onError={(e) => {
                const target = e.target;
                target.onerror = null;
                const retryInterval = 2000;
                let retryCount = 0;
                const maxRetries = 5;

                const retryLoad = () => {
                  if (retryCount < maxRetries) {
                    retryCount++;
                    target.src = imageUrl + "product/" + `?retry=${retryCount}`;
                    target.onerror = () => {
                      setTimeout(retryLoad, retryInterval);
                    };
                  } else {
                    target.src =
                      "https://placehold.co/32x32/cccccc/333333?text=N/A";
                  }
                };

                setTimeout(retryLoad, retryInterval);
              }}
              loading="lazy"
            />
          </div>
        </div>
      </a>
      <div className="mx-4 p-2 flex-1 mr-20 border bg-white rounded-lg">
        <div className="relative flex items-center w-full ">
          <form
            className="flex items-center space-x-2 w-full "
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-white text-gray-900 rounded-md px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#fad550] w-full"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              type="submit"
              className="min-w-[100px] bg-blue-600 text-white font-bold rounded-md px-4 py-2 text-sm hover:bg-orange-600 transition"
              disabled={searchData.length === 0}
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
      <div className="">
        <Link to={`/cart`}>
          <div className="relative">
            <div className="absolute">
              <img
                alt="cart"
                src={imageUrl + "icons/cart-white.png"}
                width={40}
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  const retryInterval = 2000;
                  let retryCount = 0;
                  const maxRetries = 5;
                  const retryLoad = () => {
                    if (retryCount < maxRetries) {
                      retryCount++;
                      target.src =
                        imageUrl + "product/" + `?retry=${retryCount}`;
                      target.onerror = () => {
                        setTimeout(retryLoad, retryInterval);
                      };
                    } else {
                      target.src =
                        "https://placehold.co/32x32/cccccc/333333?text=N/A";
                    }
                  };
                  setTimeout(retryLoad, retryInterval);
                }}
                loading="lazy"
              />
            </div>
            <span className="ml-10 p-0.5 bg-blue-100 rounded-lg">
              {countCart}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DownNav;
