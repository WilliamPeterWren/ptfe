import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import apiUser from "../../../../api/apiUser";
import { imageUrl } from "../../../../api/config";

function Profile() {
  const accessToken = Cookies.get("accessToken") || "";
  const initialUsername = Cookies.get("username") || "Tên hiển thị";
  const initialEmail = Cookies.get("email") || "Email@example.com";
  const avatar =
    imageUrl + "avatar/" + Cookies.get("avatar") ||
    "https://placehold.co/150x150/e0e0e0/ffffff?text=Ảnh";

  const [isEditing, setIsEditing] = useState(false);

  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreviewUrl(avatar);
    }
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [selectedImage]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1 * 512 * 1024) {
        setUploadStatus("Kích thước tệp tối đa 0.5MB.");
        setSelectedImage(null);
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setUploadStatus("Định dạng tệp không hợp lệ. Chỉ chấp nhận JPEG, PNG.");
        setSelectedImage(null);
        return;
      }

      setSelectedImage(file);
      setUploadStatus("");
    } else {
      setSelectedImage(null);
      setUploadStatus("");
    }
  };

  const handleSaveProfile = async () => {
    setUploading(true);
    setUploadStatus("Đang lưu...");

    if (selectedImage) {
      const formData = new FormData();
      let uuidFileName = uuidv4() + "_" + selectedImage.name;
      formData.append("files", selectedImage, uuidFileName);

      try {
        await fetch("http://localhost:8889/api/files/upload/avatar", {
          method: "POST",
          body: formData,
        });

        const profileData = {
          username,
          password,
          avatar: uuidFileName,
        };

        await apiUser
          .updateUser(profileData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            const data = res.data.result;
            console.log(data);
            Cookies.set("avatar", data.avatar, { expires: 1 });
          })
          .catch((err) => {
            console.log(err);
          });

        Swal.fire({
          title: "Cập nhật thành công",
          text: "Thông tin của bạn đã được cập nhật",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        setIsEditing(!isEditing);
      } catch (error) {
        console.error("Error uploading image for avatar:", error);
      }
    } else {
      const profileData = {
        username,
        password,
      };
      if (
        initialUsername !== username ||
        (password !== null && password.length > 8)
      ) {
        await apiUser
          .updateUser(profileData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            const data = res.data.result;
            console.log(data);
            Swal.fire({
              title: "Cập nhật thành công",
              text: "Thông tin của bạn đã được cập nhật",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            });
            setIsEditing(!isEditing);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setUploadStatus("Thông tin đã được lưu.");
    }

    setUploading(false);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 p-6 min-w-[1000px]  w-full">
      <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Hồ Sơ Của Tôi</h2>
          <button
            className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-orange-600 transition duration-300 ease-in-out rounded-lg"
            onClick={() => {
              setIsEditing(!isEditing);
              setUploadStatus("");
              if (isEditing) {
                setSelectedImage(null);
              }
            }}
          >
            {isEditing ? "Hủy" : "Cập nhật thông tin"}
          </button>
        </div>
        <p className="text-left text-gray-600 mb-6">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="space-y-6 flex-1 w-full md:w-auto">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên hiển thị
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={!isEditing || uploading}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={true}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                defaultValue={null}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={!isEditing || uploading}
              />
            </div>

            <div className="flex justify-start pt-4">
              <button
                onClick={handleSaveProfile}
                className={`px-6 py-3 rounded-md font-semibold transition duration-300 ease-in-out
                  ${
                    isEditing && !uploading
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                disabled={!isEditing || uploading}
              >
                {uploading ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center mt-4 md:mt-0">
            <img
              src={imagePreviewUrl}
              alt="Profile Avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-sm mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/e0e0e0/ffffff?text=Lỗi+Ảnh";
              }}
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                  disabled={uploading}
                />
                <label
                  htmlFor="imageUpload"
                  className={`cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out rounded-md mb-2
                    ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Chọn Ảnh
                </label>
                <p className="text-sm text-gray-500 text-center">
                  Dung lượng tệp tối đa 0.5MB
                  <br />
                  Định dạng: JPEG, PNG
                  <br />
                  <span className="text-red-500">
                    Hình không hiển thị là vì
                    <br />
                    sai định dạng hoặc dung lượng
                  </span>
                </p>
              </>
            )}
            {uploadStatus && (
              <p
                className={`mt-4 text-sm font-medium ${
                  uploadStatus.startsWith("Lỗi")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
