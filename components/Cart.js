import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Image, Alert, AsyncStorage } from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; // 6.2.2
import { CheckBox, ButtonGroup } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import firebase from 'firebase';
import { gobalStateContext } from "../App";
import { TextInput } from "react-native-paper";
import Applogin from '../Screens/LoginSms/AppLogin'
import AppLogin from "../Screens/LoginSms/AppLogin";
import { GET, POST, GET_AXIOS, POST_AXIOS, PUT_AXIOS } from "../enviroments/caller";
import { CHECK_LOGIN_ENDPOINT, GET_CART, UPDATE_CART } from "../enviroments/endpoint";
export default Cart = ({ props, navigation }) => {
  const gobalState = useContext(gobalStateContext);
  const [data, setData] = useState(gobalState.gobalState.cart);
  console.log(data)
  const [totalPrice, setTotal] = useState(0);
  const [checkSelectAll, setSelectAll] = useState(true);
  const [user, setUser] = useState(gobalState.gobalState.user);
  const [discount, setDiscount] = useState(0);
  const [loaded, setLoad] = useState(false);

  navigation.setOptions({
    headerLeft: () => (
      <>
        <Block
          row
          center
          style={{
            width: width,
            height: 80
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleLeftPress();
            }}
          >
            <Block
              style={{
                width: width * 0.12
              }}
            >
              <AntDesign
                name="left"
                style={{ marginLeft: width * 0.004 }}
                size={27}
                color="#e8582d"
              ></AntDesign>
            </Block>
          </TouchableOpacity>
        </Block>
      </>
    ),
    headerTitle: props => <Text size={20}>Giỏ Hàng</Text>
  });
  function handleLeftPress() {
    return navigation.goBack();
  }
  useEffect(() => {
    var total = 0;
    data.map(item => {
      if (item.isChecked) total += item.productPrice * item.Quantity;
    });
    setTotal(total);
  }, [data]);
  useEffect(() => {
    if (user.rank === "Member") {
      setDiscount(0)
    } else if (user.rank === "Gold") {
      setDiscount(5)
    } else {
      setDiscount(10)
    }
  }, [])
  async function isCheck(Id) {
    let newArr = [...data];
    newArr.map(item => {
      if (item.Id === Id) {
        if (item.isChecked) {
          item.isChecked = false;
          gobalState.dispatch({
            type: "UNSELECT",
            id: item.Id
          });
          setSelectAll(false);
        } else {
          item.isChecked = true;
          gobalState.dispatch({
            type: "SELECT",
            id: item.Id
          });
        }
      }
    });
    setData(newArr);
  }
  async function increaseMountItems(Id) {
    let newArr = [...data];
    var quantity = 0;
    newArr.map(item => {
      if (item.Id === Id) {
        item.Quantity += 1;
        quantity = item.Quantity
      }
    });
    setData(newArr);
    gobalState.dispatch({
      type: "CACU_TOTAL"
    });
    await PUT_AXIOS(UPDATE_CART, { id: Id, quantity: quantity }).then(res => {
    })
  }
  async function decreaseMountItems(Id) {
    let newArr = [...data];
    var quantity = 0;
    newArr.map(item => {
      if (item.Id === Id) {
        if (item.Quantity > 1) {
          item.Quantity -= 1;
          quantity = item.Quantity
          setData(newArr);
          PUT_AXIOS(UPDATE_CART, { id: Id, quantity: quantity }).then(res => {
          })
        } else {
          Alert.alert(
            "Thông Báo",
            "Bạn chắc chán muốn bỏ sản phẩm này chứ ?",
            [
              {
                text: "Xác nhận",
                onPress: () => reloadData(Id),
                style: "cancel"
              },
              {
                text: "Huỷ",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ],
            { cancelable: false }
          );
        }
      }
    });
    gobalState.dispatch({
      type: "CACU_TOTAL"
    });

  }
  function filterProduct(arr, id) {
    return arr.filter(function (ele) {
      return ele.Id != id;
    });
  }
  async function reloadData(id) {
    var arr = [...data];
    var newArr = filterProduct(arr, id)
    setData(newArr);
    await PUT_AXIOS(UPDATE_CART, { id: id, quantity: quantity }).then(res => {
    })
  }
  function numberWithCommas(item) {
    var x = item.Quantity * item.productPrice;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function renderItem(item) {
    const url = "http://45.119.83.107:9002/api/Product/Images?fileName=" + item.ProductMainImage;
    return (
      <Block
        row
        key={item.Id}
        style={{
          width: width,
          height: 150,
          backgroundColor: "white",
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Block center style={{ width: width * 0.15 }}>
          <CheckBox
            checkedColor="#8E44AD"
            onPress={() => isCheck(item.Id)}
            checked={item.isChecked}
          />
        </Block>
        <Block row style={{ width: width * 0.85 }}>
          <Block center style={{ width: width * 0.35 }}>
            {loaded ? <>
              <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
            </> :
              <>
                <Image source={{ uri: url }} style={{ width: 150, height: 150 }}
                  onLoad={() => { setLoad(true) }} />
              </>
            }
          </Block>
          <Block
            style={{
              marginLeft: 10
            }}
          >
            <Text
              style={{
                marginTop: 10,
                height: 40,
                width: width * 0.45
              }}
              size={14}
            >
              {item.ProductName}
            </Text>
            <Text
              style={{
                marginTop: 10,
                width: width * 0.5,
                color: "red"
              }}
              size={17}
            >
              <Text size={15}>đ</Text> {numberWithCommas(item)}
            </Text>
            <Block
              row
              style={{
                width: 120,
                height: 30,
                marginTop: 15,
                borderWidth: 0.2
              }}
            >
              <Block center style={{ width: 40 }}>
                <TouchableOpacity
                  onPress={() => {
                    decreaseMountItems(item.Id);
                  }}
                >
                  <AntDesign
                    name="minus"
                    style={{ marginLeft: width * 0.004 }}
                    size={15}
                  ></AntDesign>
                </TouchableOpacity>
              </Block>
              <Block center style={{ width: 40 }}>
                <Text size={20}>{item.Quantity}</Text>
              </Block>
              <Block center style={{ width: 40 }}>
                <TouchableOpacity
                  onPress={() => {
                    increaseMountItems(item.Id);
                  }}
                >
                  <AntDesign
                    name="plus"
                    style={{ marginLeft: width * 0.004 }}
                    size={15}
                  ></AntDesign>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
  function selectAll() {
    if (checkSelectAll) {
      return setSelectAll(false);
    }
    var tempData = [...data];
    tempData.map(item => {
      if (!item.isChecked) {
        item.isChecked = true;
      }
    });
    setSelectAll(true);
    setData(tempData);
  }
  async function submit() {
    if (data.length === 0) {
      Alert.alert(
        "Thông Báo",
        "Bạn chưa có sản phẩm đơn hàng nào",
        [
          {
            text: "Xác nhận",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      var check = false;
      data.map(item => {
        if (item.isChecked) {
          check = true;
          return;
        }
      })
      if (check) {
        navigation.navigate("Order", {
          totalPrice: totalPrice
        })
      } else {
        Alert.alert(
          "Thông Báo",
          "Bạn chưa chọn sản phẩm đơn hàng nào",
          [
            {
              text: "Xác nhận",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#eef0f2" }}>
      <FlatList
        data={data}
        keyExtractor={item => item.Id}
        renderItem={item => {
          return renderItem(item.item);
        }}
      />
      <Block
        style={{ width: width, height: 10, backgroundColor: "#eef0f2" }}
      ></Block>
      <Block
        style={{
          width: width,
          height: 150,
          backgroundColor: "white",
          borderBottomWidth: 0.2
        }}
      >
        <Block row style={{ height: 50, width: width, borderBottomWidth: 0.2 }}>
          <Block row middle style={{ height: 50, width: width * 0.4 }}>
            <MaterialCommunityIcons name={"crown"} size={40} color="#3858a5" />
            <Text size={17}>Rank :</Text>
          </Block>
          <Block
            row
            style={{
              height: 50,
              width: width * 0.6
            }}
          >
            <Block
              row
              center
              middle
              style={{
                width: width * 0.4,
                height: 30
              }}
            >
              <Text size={20}>{user.rank}</Text>
              <Text> (Sell Off {discount}%)</Text>
            </Block>
          </Block>
        </Block>
        <Block row>
          <Block
            center
            style={{
              width: width * 0.3,
              height: 70
            }}
          >
            <CheckBox
              checkedColor="#8E44AD"
              onPress={() => {
                selectAll();
              }}
              checked={checkSelectAll}
            />
            <Text size={15}>Chọn tất cả</Text>
          </Block>
          <Block
            row
            center
            style={{
              width: width * 0.4,
              height: 70
            }}
          >
            <Text size={15}>Tổng tiền:</Text>
            <Text
              style={{
                color: "red"
              }}
              size={15}
            >
              <Text size={15}>đ </Text>
              {(totalPrice * (100 - discount) / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {

              }
            </Text>
          </Block>
          <Block>
            <Button
              style={{ ...styles.button }}
              color={"#e8866c"}
              onPress={() => {
                Alert.alert(
                  "Thông Báo",
                  "Bạn muốn đặt hàng chứ",
                  [
                    {
                      text: "Xác nhận",
                      onPress: () => { submit() }
                      ,
                      style: "cancel"
                    },
                    {
                      text: "Huỷ",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    }
                  ],
                  { cancelable: false }
                );
              }}
            >
              MUA HÀNG
            </Button>
          </Block>
        </Block>
      </Block>
    </View >
  );
};
const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 19,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 15,
    opacity: 1,
    marginBottom: 15,
    color: "#e8866c"
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16
  },
  horizontalImage: {
    height: 122,
    width: "auto"
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3
  }
});
