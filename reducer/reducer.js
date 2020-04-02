import { POST_AXIOS, POST, GET_AXIOS } from "../enviroments/caller";
import { POST_CART, CHECK_LOGIN_ENDPOINT, GET_CART } from "../enviroments/endpoint";
import { Alert } from "react-native";

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      if (action.status === "INSERT") {
        state.cart = [];
        action.cart.map(item => {
          state.cart.push({
            ...item, isChecked: true,
            productPrice: item.Price / item.Quantity
          })
        });
        reducer(state, "CACU_TOTAL");

      }
      return state;
    case "ADD_TO_CART":
      if (action.product.Quantity === 0) return state;
      postCart(action.product).then(res => {
        if (res.status === 200) {
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
          state.totalProduct += 1;
          GET_AXIOS(GET_CART).then(resp => {
            if (resp.status === 200) {
              reducer(state, {
                type: "GET_CART",
                cart: resp.data,
                status: "INSERT"
              })
            }
          })
        }
      })
      return state;
    case "CACU_TOTAL":
      if (state.cart.length === 0) return state;
      var total = 0;
      state.cart.map(item => {
        total += item.Quantity;
      });
      state.totalProduct = total;
      console.log(total);
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
    case "REMOVE_CART":
      state.cart = [];
      state.totalProduct = 0;
      return state;
    default:
      return state;
  }
};


async function postCart(product) {
  let res = await POST_AXIOS(POST_CART, { productId: product.Id, quantity: product.Quantity })
  return res;
}

function filterProduct(arr, id) {
  return arr.filter(function (ele) {
    return ele.id != id;
  });
}
