import React from "react";
import { imageUrl } from "../../../api/config";

const sliderItems = [
  {
    alt: "promotion-code",
    src: `${imageUrl}/downslider/promotion-code.png`,
    label: "Mã giảm giá",
  },
  {
    alt: "customer-service",
    src: `${imageUrl}/downslider/customer-service.png`,
    label: ["Khách hàng", "thân thiết"],
  },
  {
    alt: "choice",
    src: `${imageUrl}/downslider/choice.png`,
    label: ["Hàng chọn", "giá hời"],
  },
  {
    alt: "voucher",
    src: `${imageUrl}/downslider/voucher.png`,
    label: ["Peter style", "voucher 30%"],
  },
  {
    alt: "online-shopping",
    src: `${imageUrl}/downslider/online-shopping.png`,
    label: "Peter mall",
  },
  {
    alt: "giftbox",
    src: `${imageUrl}/downslider/giftbox.png`,
    label: ["Săn ngay", "100k"],
  },
];

function DownSlider() {
  return (
    <div className="mx-20 mt-10 flex justify-between">
      {sliderItems.map((item, index) => (
        <div key={item.alt} className="mx-4 flex flex-col items-center">
          <img alt={item.alt} src={item.src} width={50} className="mb-2" />
          {Array.isArray(item.label) ? (
            item.label.map((text, i) => (
              <span key={i} className="capitalize">
                {text}
              </span>
            ))
          ) : (
            <span className="capitalize">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default DownSlider;
