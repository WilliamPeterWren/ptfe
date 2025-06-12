const statusPriority = [
  "PENDING",
  "SELLER_CANCELLED",
  "SELLER_CHECKING",
  "SELLER_PREPAIRING",
  "SELLER_PREPAIRED",
  "SHIPPER_TAKING",
  "SHIPPER_TAKEN",
  "DISPATCHED",
  "DELIVERING",
  "DELIVERD",
  "CANCELLED",
  "RETURN",
  "REFUND",
];

export const statusTranslations = {
  PENDING: "Chờ thanh toán",
  SELLER_CANCELLED: "Người bán đã hủy",
  SELLER_CHECKING: "Người bán đang kiểm tra",
  SELLER_PREPAIRING: "Người bán đang chuẩn bị hàng",
  SELLER_PREPAIRED: "Người bán đã chuẩn bị xong",
  SHIPPER_TAKING: "Shipper đang lấy hàng",
  SHIPPER_TAKEN: "Shipper đã lấy hàng",
  DISPATCHED: "Đang vận chuyển",
  DELIVERING: "Đang giao hàng",
  DELIVERD: "Đã giao hàng",
  CANCELLED: "Đã hủy",
  RETURN: "Trả hàng",
  REFUND: "Hoàn tiền",
};

export const getLatestStatus = (orderStatusList) => {
  if (!orderStatusList || orderStatusList.length === 0)
    return {
      status: "PENDING",
      createdAt: new Date(),
      translatedStatus: statusTranslations["PENDING"],
    };

  const sortedByTime = [...orderStatusList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const latestStatusObject = sortedByTime.reduce((latest, current) => {
    const currentPriority = statusPriority.indexOf(current.status);
    const latestPriority = statusPriority.indexOf(latest.status);
    return currentPriority > latestPriority ? current : latest;
  });

  return {
    ...latestStatusObject,
    translatedStatus:
      statusTranslations[latestStatusObject.status] ||
      latestStatusObject.status,
  };
};

export const getNextStatus = (currentStatus) => {
  const currentIndex = statusPriority.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === statusPriority.length - 1) {
    return null;
  }

  const nextStatus =
    statusPriority[currentIndex + (currentIndex === 0 ? 2 : 1)];
  return {
    status: nextStatus,
    translatedStatus: statusTranslations[nextStatus] || nextStatus,
  };
};
