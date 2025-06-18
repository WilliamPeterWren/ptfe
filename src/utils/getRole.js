const roles = [
  "ROLE_USER",
  "ROLE_ADMIN",
  "ROLE_STAFF",
  "ROLE_SHIPPER",
  "ROLE_SELLER",
];

const rolesTranslation = {
  ROLE_USER: "KHÁCH HÀNG",
  ROLE_ADMIN: "QUẢN TRỊ VIÊN",
  ROLE_STAFF: "NHÂN VIÊN",
  ROLE_SHIPPER: "GIAO HÀNG",
  ROLE_SELLER: "NGƯỜI BÁN HÀNG",
};

export const getRole = (role) => {
  return rolesTranslation[role];
};
