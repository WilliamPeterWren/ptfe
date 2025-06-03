import Cookies from "js-cookie";

const Sidebar = (props) => {
  const menuItems = [
    {
      label: "Thông Báo",
      icon: "🔔",
      color: "text-red-500",
      section: "notification",
    },
    {
      label: "Tài Khoản Của Tôi",
      icon: "👤",
      color: "text-blue-500",
      section: "account",
    },
    {
      label: "Hồ Sơ",
      icon: "📝",
      color: "text-blue-500",
      active: true,
      section: "profile",
    },
    { label: "Ngân Hàng", icon: "🏦", color: "text-blue-500", section: "bank" },
    {
      label: "Địa Chỉ",
      icon: "📍",
      color: "text-blue-500",
      section: "address",
    },
    {
      label: "Đổi Mật Khẩu",
      icon: "🔒",
      color: "text-blue-500",
      section: "changePassword",
    },
    // {
    //   label: "Cài Đặt Thông Báo",
    //   icon: "⚙️",
    //   color: "text-blue-500",
    //   section: "notificationSettings",
    // },
    {
      label: "Thư Viện Thành Lập Riêng",
      icon: "📚",
      color: "text-blue-500",
      section: "library",
    },
    {
      label: "Đơn Mua",
      icon: "📦",
      color: "text-blue-500",
      section: "order",
    },
    {
      label: "Kho Voucher",
      icon: "🎟️",
      color: "text-blue-500",
      section: "voucher",
    },
    {
      label: "Peter Xu",
      icon: "💰",
      color: "text-yellow-500",
      section: "peterXu",
    },
    {
      label: "30.6 Sale Cuối Tháng",
      icon: "🔥",
      color: "text-blue-500",
      badge: "New",
      section: "sale",
    },
  ];

  const { setActiveSection } = props;

  const handleSectionClick = (item) => {
    setActiveSection(item.section);
  };

  const username = Cookies.get("username");

  return (
    <div className="max-h-[530px] w-64 bg-white shadow-md mt-6 rounded">
      <div className="p-4 flex items-center space-x-3 border-b">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{username}</p>
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
              props.activeSection === item.section
                ? "bg-gray-100 font-semibold"
                : ""
            }`}
            onClick={() => handleSectionClick(item)}
          >
            <span className={`mr-3 ${item.color}`}>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {item.badge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
