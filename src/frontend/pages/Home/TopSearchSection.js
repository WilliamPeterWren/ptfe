import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopSearchesSection = () => {
  const topSearches = [
    {
      src: "https://via.placeholder.com/150x150.png?text=QuanDui",
      label: "Quần Dùi Thể Thao",
      sales: "Bán 52K+ /tháng",
    },
    {
      src: "https://via.placeholder.com/150x150.png?text=AoKhoac",
      label: "Áo Khoác Chống Nắng Nữ",
      sales: "Bán 41K+ /tháng",
    },
    {
      src: "https://via.placeholder.com/150x150.png?text=OpIphone",
      label: "Ốp IPhone 5",
      sales: "Bán 59K+ /tháng",
    },
    {
      src: "https://via.placeholder.com/150x150.png?text=BoChan",
      label: "Bộ Chăn Ga Gối Cotton",
      sales: "Bán 53K+ /tháng",
    },
    {
      src: "https://via.placeholder.com/150x150.png?text=DauGoi",
      label: "Dầu Gội L'Oréal",
      sales: "Bán 48K+ /tháng",
    },
    {
      src: "https://via.placeholder.com/150x150.png?text=BaoCaoSu",
      label: "Bao Cao Su",
      sales: "Bán 67K+ /tháng",
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
        <h2 className="text-xl font-bold uppercase">Tìm Kiếm Hàng Đầu</h2>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          Xem Tất Cả
        </a>
      </div>

      <div className="w-full">
        <Slider {...settings}>
          {topSearches.map((item, index) => (
            <div key={index} className="px-2">
              <div className="relative border rounded-lg p-2">
                {/* Top Badge */}
                <span className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-tl-lg rounded-br-lg">
                  TOP
                </span>
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-32 object-contain mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    // e.target.src = defaultImage(item);
                  }}
                  loading="lazy"
                />
                <p className="text-xs text-gray-600">{item.sales}</p>
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopSearchesSection;
