export const BASE_URL = "http://45.119.83.107:9002/api";
// Product
export const CREATE_PRODUCT_ENDPOINT = `${BASE_URL}/Product`;
export const UPDATE_PRODUCT_ENDPOINT = `${BASE_URL}/Product`;
export const DELETE_PRODUCT_ENDPOINT = `${BASE_URL}/Product`;
//Auth
export const CHECK_LOGIN_ENDPOINT = `${BASE_URL}/Auth`;
//ACCOUNT
export const GET_TOKEN_ENDPOINT = `${BASE_URL}/Auth/token`;
export const CREATE_ACCOUNT_ID = `${BASE_URL}/Auth/Register`;
export const GET_PRODUCT = `${BASE_URL}/Product`;
export const LIKE_PRODUCT = `${BASE_URL}/Product/`;
export const UPDATE_ACCOUNT = `${BASE_URL}/Account`;
//
//Prodcut - Category
export const GET_PRODUCT_TAB_ID = `${BASE_URL}/Category/`;
export const GET_PRODUCT_IMG = `${BASE_URL}/Product/Images?fileName=`;
export const GET_PRODUCT_ID = `${BASE_URL}/Product/`;
export const GET_PRODUCT_LIKE = `${BASE_URL}/Product/LikeByMyself`;

//Cart
export const POST_LIST_CART = `${BASE_URL}/Cart/LIST`;
export const GET_CART = `${BASE_URL}/Cart`;
export const POST_CART = `${BASE_URL}/Cart`;
export const UPDATE_CART = `${BASE_URL}/Cart`;
export const ORDER_CART = `${BASE_URL}/Cart/Order`;
export const DELETE_CART = `${BASE_URL}/Cart/`;

//user
export const USER_GET_ORDER = `${BASE_URL}/Order/MySelf?index=1&pageSize=`;
export const GET_ORDER_DETAIL = `${BASE_URL}/Order/`;
//http://45.119.83.107:9002/api/Order/MySelf?index=1&pageSize=5
