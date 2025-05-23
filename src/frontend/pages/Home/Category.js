import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { imageUrl } from "../../../api/config";

const CategoriesSection = () => {
  
  const categories = [
    {
      src: "thoi-trang-nam.webp",
      label: "Thời Trang Nam",
    },
    {
      src: "dienthoai-phukien.webp",
      label: "Điện Thoại & Phụ Kiện",
    },
    {
      src: "thiet-bi-dien-tu.webp",
      label: "Thiết Bị Điện Tử",
    },
    {
      src: "may-tinh.webp",
      label: "Máy Tính & Laptop",
    },
    {
      src: "may-anh.webp",
      label: "Máy Ảnh & Máy Quay Phim",
    },
    {
      src: "dong-ho.webp",
      label: "Đồng Hồ",
    },
    {
      src: "giay-dep-nam.webp",
      label: "Giày Dép Nam",
    },
    {
      src: "thiet-bi-gia-dung.webp",
      label: "Thiết Bị Điện Gia Dụng",
    },
    {
      src: "the-thao.webp",
      label: "Thể Thao & Du Lịch",
    },
    {
      src: "oto-xemay.webp",
      label: "Ô Tô & Xe Máy & Xe Đạp",
    },
    {
      src: "thoi-trang-nu.webp",
      label: "Thời Trang Nữ",
    },
    {
      src: "mebe.webp",
      label: "Mẹ & Bé",
    },
    {
      src: "nha-cua-doi-song.webp",
      label: "Nhà Cửa & Đời Sống",
    },
    {
      src: "sac-dep.webp",
      label: "Sắc Đẹp",
    },
    {
      src: "suc-khoe.webp",
      label: "Sức Khỏe",
    },
    {
      src: "giay-dep-nu.webp",
      label: "Giày Dép Nữ",
    },
    {
      src: "tui-vi-nu.webp",
      label: "Túi Ví Nữ",
    },
    {
      src: "phu-kien.webp",
      label: "Phụ Kiện & Trang Sức Nữ",
    },
    {
      src: "bachhoa.webp",
      label: "Bách Hóa Online",
    },
    {
      src: "nha-sach-online.webp",
      label: "Nhà Sách Online",
    },
    {
      src: "balo.webp",
      label: "Ba lô & Túi sách",
    },
    {
      src: "chamsoc-thucung.webp",
      label: "Chăm sóc thú cưng",
    },
    {
      src: "dichvu.webp",
      label: "Voucher & dịch vụ",
    },
    {
      src: "giat-giu.webp",
      label: "Giặt giũ & chăm sóc nhà cửa",
    },
    {
      src: "dung-cu.webp",
      label: "Dụng cụ & thiết bị tiện ích",
    },
    {
      src: "thoi-trang-tre-em.webp",
      label: "Thời trang trẻ em",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold uppercase mb-4">Danh Mục</h2>

      <div className="w-full">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="px-2">
              <div className="flex flex-col items-center">
                <img
                  src={imageUrl+"category/"+category.src}
                  alt={category.label}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm text-gray-600 text-center">
                  {category.label}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoriesSection;
