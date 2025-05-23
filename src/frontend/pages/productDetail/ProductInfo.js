import React from "react";

const ProductInfo = () => {
  const specs = [
    {
      label: "Danh Mục",
      value:
        "Shopee > Nhà Cửa & Đời Sống > Trang trí nhà cửa > Trang trí tường",
      valueClass: "text-blue-600",
    },
    { label: "Số lượng hàng khuyến mãi", value: "417" },
    { label: "Số sản phẩm còn lại", value: "16607" },
    { label: "Thương hiệu", value: "VENTAS", valueClass: "text-blue-600" },
    { label: "Hạn bảo hành", value: "5 năm" },
    { label: "Bảo hành chính hãng clip", value: "Không" },
    { label: "Bộ sưu tầm đồ cổ", value: "Không" },
    { label: "Loại gương", value: "Gương treo tường" },
    { label: "Hình dạng gương", value: "Hình vuông" },
    { label: "Chất liệu", value: "Thủy tinh, Chất lượng cao Acrylic" },
    { label: "Chiều dài", value: "30m" },
    { label: "Chiều rộng", value: "30m" },
    { label: "Trọng lượng được hỗ trợ", value: "10kg" },
    { label: "Gửi từ", value: "TP. Hồ Chí Minh" },
  ];

  return (
    <div className="max-w-[1540px] mt-4 mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-items">
        <div className="w-1/2 p-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            CHI TIẾT SẢN PHẨM
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            {specs.map((spec, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{spec.label}</span>
                <span className={`font-semibold ${spec.valueClass || ""}`}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 p-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            MÔ TẢ SẢN PHẨM
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            thay bằng mô tả sản phẩm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
