export const API_BASE_URL = "http://localhost:3000";
export const LOGIN_URL = `${API_BASE_URL}/api/admin/auth/sign-in`;
export const GET_PERMISSIONS_URL = `${API_BASE_URL}/api/admin/admins/get-permissions}`;
export const DASHBOARD_DATA_URL = `${API_BASE_URL}/api/admin/dashboard/all`;

// Product
export const PRODUCT_LIST_URL = `${API_BASE_URL}/api/admin/products/all`;
export const PRODUCT_CREATE_URL = `${API_BASE_URL}/api/admin/products/create`;
export const PRODUCT_UPDATE_URL = `${API_BASE_URL}/api/admin/products/update`;
export const PRODUCT_DELETE_URL = `${API_BASE_URL}/api/admin/products/delete`;

// Category
export const CATEGORY_LIST_URL = `${API_BASE_URL}/api/admin/categories/all`;
export const CATEGORY_CREATE_URL = `${API_BASE_URL}/api/admin/categories/create`;
export const CATEGORY_UPDATE_URL = `${API_BASE_URL}/api/admin/categories/update`;
export const CATEGORY_DELETE_URL = `${API_BASE_URL}/api/admin/categories/delete`;

// User
export const USER_LIST_URL = `${API_BASE_URL}/api/admin/users/all`;

// Admins
export const ADMINS_LIST_URL = `${API_BASE_URL}/api/admin/admins`;

// Permission
export const PERMISSION_LIST_URL = `${API_BASE_URL}/api/admin/roles//permissions`;
