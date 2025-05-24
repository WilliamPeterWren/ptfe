import React from "react";

function Chat() {
  const [isOpen, setIsOpen] = React.useState(false);

  const chats = [
    {
      name: "Đỗ Dung Mớt Lạ...",
      date: "24/02",
      message: "vô là do bên vần chuý...",
    },
    { name: "evahome", date: "17/02", message: "Đã vắng à , đơn h..." },
    {
      name: "shopthanden_01",
      date: "14/02",
      message: "a súra làj 5sao giup bé...",
    },
    { name: "anhpham35871", date: "12/02", message: "đã dc a" },
    { name: "Phú kiện PaPa [Đàn nhắn]", date: "06/02", message: "" },
    {
      name: "jettingbuy.vn",
      date: "06/02",
      message: "Quý khách thản mên, ...",
    },
    { name: "Roki Company", date: "12/01", message: "Đã a! Cảm ơn bạn!" },
    { name: "Thietbivesinh...", date: "27/10/24", message: "Ko e" },
  ];
  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <span>Chat</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md h-[80vh] flex flex-col">
            <div className="bg-orange-500 text-white p-2 flex justify-between items-center">
              <h2 className="text-lg font-bold">Chat</h2>
              <div>
                <button onClick={() => setIsOpen(false)} className="mr-2">
                  ☐
                </button>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>
            </div>
            <div className="flex p-2 border-b">
              <input
                type="text"
                placeholder="Tìm theo tên"
                className="w-1/2 p-1 border rounded"
              />
              <select className="w-1/2 p-1 border rounded ml-2">
                <option>Tất cả</option>
                <option>Đã đọc</option>
              </select>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold">{chat.name}</span>
                      <span className="text-sm text-gray-500">{chat.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-100 text-center text-blue-600">
              Chào mừng bạn đến với Shopee Chat
              <br />
              Bắt đầu trả lời người mua!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
