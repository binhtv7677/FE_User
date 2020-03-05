import { POST_AXIOS, POST, GET_AXIOS } from "../enviroments/caller";
import { POST_CART, CHECK_LOGIN_ENDPOINT, GET_CART } from "../enviroments/endpoint";
import { Alert } from "react-native";

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      state.cart = action.cart;
      var total = 0;
      state.cart.map(item => {
        total += item.Quantity;
      });
      state.totalProduct = total;
      return state;
    case "ADD_TO_CART":
      if (action.product.Quantity === 0) return state;
      callApi();
      async function callApi() {
        await postCart(action.product)
      }
      var check = true;
      state.cart.forEach(element => {
        if (element.Id === action.product.Id) {
          element.Quantity += 1;
          check = false;
          return;
        }
      });
      if (check) {
        GET_AXIOS(GET_CART).then(res => {
          state.cart = [];
          res.data.map(item => {
            state.cart.push({ ...item, productPrice: item.Price / item.Quantity, isChecked: true })
          });
        })
      }
      state.totalProduct += 1;
      Alert.alert(
        "Thông Báo",
        "Thêm mới thành công",
        [
          {
            text: "Xác nhận",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return state;
    case "CACU_TOTAL":
      if (state.cart.length === 0) return state;
      var total = 0;
      state.cart.map(item => {
        total += item.Quantity;
      });
      state.totalProduct = total;
      return state;
    case "UNSELECT":
      state.cart.map(item => {
        if (item.id === action.id) {
          item.isChecked = false;
          state.totalProduct -= item.Quantity;
        }
      });
      return state;
    case "SELECT":
      state.cart.map(item => {
        if (item.id === action.id) {
          item.isChecked = true;
          state.totalProduct += item.Quantity;
        }
      });
      return state;
    case "SELECT_ALL":
      state.cart.map(item => {
        if (!item.isChecked) {
          item.isChecked = true;
          state.totalProduct += item.Quantity;
        }
      });
      return state;
    case "SET_DEVICE_ID":
      state.device_id = action.device_id
      return state;
    case "SET_DEFAULT_CART":
      var price = action.product.Price / action.product.Quantity;
      state.cart.push({ ...action.product, productPrice: price });
      if (state.cart.length > 0) {
        var total = 0;
        state.cart.map(item => {
          total += item.Quantity;
        });
        state.totalProduct = total;
      }
      return state;
    case "INFO_USER":
      state.user = action.user;
      return state;
    case "UPDATE_PHONE":
      state.phone = action.phone;
      return state;
    default:
      return state;
  }
};

function addProduct(arr, product) {
  var check = true;
  if (arr.length > 0) {
    arr.map(item => {
      if (item.Id === product.Id) {
        item.Quantity += 1;
        check = false;
      }
    });
  }
  if (check) {
    arr.push(product);
  }
  postCart(product)
  return arr;
}
async function postCart(product) {
  await POST_AXIOS(POST_CART, { productId: product.Id, quantity: product.Quantity }).then(res => {
  })
}
async function getCart(product) {
  GET_AXIOS(GET_CART).then(res => {
    return res.data;
  })
}
function filterProduct(arr, id) {
  return arr.filter(function (ele) {
    return ele.id != id;
  });
}
