import {
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaChevronDown,
  FaStore,
} from "react-icons/fa";

const AddressSection = () => (
  <div className="bg-white p-6 mt-4 shadow-sm border-t-2 border-orange-500">
    <div className="flex items-center text-orange-500 text-lg font-semibold mb-4">
      <FaMapMarkerAlt className="mr-2" />
      Địa Chỉ Nhận Hàng
    </div>
    <div className="text-gray-800 text-sm">
      <p>
        <span className="font-semibold">Nguyễn Thịnh</span> (+84) 939023190
      </p>
      <p>Khu phố 1, Phường An Lạc A, Quận Bình Tân, Hồ Chí Minh</p>
      <button className="text-blue-500 hover:underline mt-2">Thay đổi</button>
    </div>
  </div>
);

export default AddressSection;
