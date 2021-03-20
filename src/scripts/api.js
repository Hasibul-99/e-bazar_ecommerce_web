//auth
export const CREATE_USER = "api/user";
export const LOGIN = "api/auth";
export const LOGIN_USER_INFO = "api/auth";
export const UPLOAD_PROFILE_IMAGE = "api/user/uploadProfilePhoto";
export const UPDATE_USER = "api/user";
export const GET_USERS = "api/user";
export const CREATE_MARCHANT_USER = "api/user/createMarchant";
export const VERIFY_USER = "api/user/verifyUser";
export const COUNT_USER = "api/user/count";

// Category
export const CREATE_CATEGORY = "api/category";
export const GET_CATEGORY_LIST = "api/category";
export const CREATE_CATEGORY_BRAND = "api/category/categoryBrand";
export const GET_CATEGORY_BRAND = "api/category/categoryBrand";
export const GET_CATEGORY_BRAND_SUB_CATEGORY = "api/category/categoryBrandSubCategory";
export const CREATE_SUB_CATEGORY = "api/category/categoryBrandSubCategory";
export const GET_CATEGORY_MENU_LIST = "api/category/menuList";
export const UPDATE_CATEGORY =  "api/category";
export const UPDATE_BRAND = "api/category/categoryBrand";
export const UPDATE_SUBCATEGORY = "api/category/categoryBrandSubCategory";
export const SEARCH_CATEGORY = "api/category/search?name=";
export const SEARCH_BRAND = "api/category/categoryBrand/search?name=";
export const SEARCH_CATEGORY_BRAND_SUBCATEGORY = "api/category/categoryBrandSubCategory/search?name=";

// product 
export const ADD_PRODUCT = "api/product";
export const UPLOAD_RPODUCT_IMAGE = "api/product/addProductPhoto";
export const GET_RPODUCT = "api/product";
export const UPDATE_PRODUCT = "api/product";
export const REMOVE_PRODUCT_PHOTO = "api/product/updateProductPhoto";
export const PRODUCT_SEARCH = "api/product/search?name="
 
// Order
export const GET_ORDER_LIST = "api/order";
export const CREATE_ORDER = "api/order";
export const UPDATE_ORDER = "api/order";

// Tips 
export const GET_TIPS = "api/tips";
export const CREATE_TIPS = "api/tips";
export const UPDATE_TIPS = "api/tips";
export const UPDATE_TIPS_PHOTO = "api/tips/updateTipsPhoto";
export const ADD_TIPS_PHOTO = "api/tips/addTipsPhoto";
