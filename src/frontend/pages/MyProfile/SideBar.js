const Sidebar = (props) => {
  const menuItems = [
    {
      label: "Thông Báo",
      icon: "🔔",
      color: "text-red-500",
    },
    { label: "Tài Khoản Của Tôi", icon: "👤", color: "text-blue-500" },
    { label: "Hồ Sơ", icon: "📝", color: "text-blue-500", active: true },
    { label: "Ngân Hàng", icon: "🏦", color: "text-blue-500" },
    { label: "Địa Chỉ", icon: "📍", color: "text-blue-500" },
    { label: "Đổi Mật Khẩu", icon: "🔒", color: "text-blue-500" },
    { label: "Cài Đặt Thông Báo", icon: "⚙️", color: "text-blue-500" },
    { label: "Thư Viện Thành Lập Riêng", icon: "📚", color: "text-blue-500" },
    { label: "Đơn Mua", icon: "📦", color: "text-blue-500" },
    { label: "Kho Voucher", icon: "🎟️", color: "text-blue-500" },
    { label: "Shopee Xu", icon: "💰", color: "text-yellow-500" },
    {
      label: "25.5 Sale Cuối Tháng",
      icon: "🔥",
      color: "text-blue-500",
      badge: "New",
    },
  ];

  const { setShowProfile, setShowOrder } = props;

  const handleSection = () => {};

  return (
    <div className="max-h-[570px] w-64 bg-white shadow-md mt-6 rounded">
      <div className="p-4 flex items-center space-x-3 border-b">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">pykenhamster</p>
          <p className="text-sm text-orange-500 cursor-pointer hover:underline">
            SỬA HỒ SƠ
          </p>
        </div>
      </div>
      <ul className="mt-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
              item.active ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <button onClick={handleSection(item)}>
              <span className={`mr-3 ${item.color}`}>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {item.badge}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
