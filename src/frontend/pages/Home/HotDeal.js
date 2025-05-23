import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotDealsSection = () => {

  const deals = [
    {
      src: "https://via.placeholder.com/100x100.png?text=Cocoon",
      brand: "Cocoon",
      offer: "Mua 1 tặng 1",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Unilever1",
      brand: "Unilever",
      offer: "Mua 1 tặng 1",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Unilever2",
      brand: "W",
      offer: "Mua là có quà",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Unilever3",
      brand: "Garnier",
      offer: "Mua là có quà",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Loreal",
      brand: "L'Oréal Paris",
      offer: "Ưu đãi đến 50%",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Unilever4",
      brand: "Unilever",
      offer: "Mua 1 tặng 1",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Unilever5",
      brand: "Unilever",
      offer: "Mua 1 được 2",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=CoolMate",
      brand: "Cool Mate",
      offer: "Mua 1 tặng 1",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Brand1",
      brand: "Brand 1",
      offer: "Mua 1 tặng 1",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Brand2",
      brand: "Brand 2",
      offer: "Mua là có quà",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Brand3",
      brand: "Brand 3",
      offer: "Ưu đãi đến 30%",
    },
    {
      src: "https://via.placeholder.com/100x100.png?text=Brand4",
      brand: "Brand 4",
      offer: "Mua 1 tặng 2",
    },
   
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase">Peter Mall</h2>
        <div className="flex space-x-2 text-sm text-gray-600">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18M3 9h18M3 15h18M3 21h18"
              />
            </svg>
            Trả Hàng Miễn Phí 15 Ngày
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Hàng Chính Hãng 100%
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            Miễn Phí Vận Chuyển
          </span>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          Xem Tất Cả 
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 text-center">
            <h3 className="text-2xl font-bold uppercase mb-2">
              Săn Deal Siêu Hot
            </h3>
            <p className="text-sm mb-4">Ưu đãi đến 50%</p>
            <div className="flex justify-center space-x-2">
              <span className="text-xs bg-white text-red-500 px-2 py-1 rounded">
                Voucher Shopee
              </span>
              <span className="text-xs bg-white text-red-500 px-2 py-1 rounded">
                Giảm đến 50%
              </span>
            </div>
          </div>
        </div>

        {/* Right Deals Slider */}
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            {deals.map((deal, index) => (
              <div key={index} className="px-2">
                <div className="flex flex-col items-center border rounded-lg p-2">
                  <img
                    src={deal.src}
                    alt={deal.brand}
                    className="w-24 h-24 object-contain mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-800">
                    {deal.brand}
                  </p>
                  <p className="text-xs text-red-500">{deal.offer}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HotDealsSection;
