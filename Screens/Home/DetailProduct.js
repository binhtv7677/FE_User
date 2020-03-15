import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Dimensions, View, TextInput } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Icon, Input, Tabs, Product } from "../../components";
const { width, height } = Dimensions.get("screen");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons"; // 6.2.2
import ImageSlider from "react-native-image-slider";
import { gobalStateContext } from "../../App";
import Modal from "react-native-modal";
import { GET_AXIOS, PUT_AXIOS } from "../../enviroments/caller";
import { GET_CART, GET_PRODUCT_ID, LIKE_PRODUCT } from "../../enviroments/endpoint";

export default DetailProduct = ({ route, navigation }) => {
  const url = "http://45.119.83.107:9002/api/Product/Images?fileName=";

  const detailContext = useContext(gobalStateContext);
  const [like, setLike] = useState(false);
  const [img, setIMG] = useState([]);
  const [initProduct, setInintProduct] = useState({});
  useEffect(() => {
    GET_AXIOS(GET_PRODUCT_ID + route.params.product.Id).then(res => {
      setInintProduct(res.data);
      var arr = [];
      res.data.Images.map(i => {
        arr.push(url + i);
      })
      setIMG(arr);
    })
  }, [])
  const [total, setTotal] = useState(detailContext.gobalState.totalProduct);
  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      setTotal(detailContext.gobalState.totalProduct);
    });
    return focus;
  }, [total]);

  navigation.setOptions({
    headerLeft: () => (
      <>
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
      </>
    ),
    headerTitle: props => <Text size={20}>Thông tin sản phẩm</Text>,

    headerRight: () => (
      <>
        <TouchableOpacity
          onPress={() => {
            handleRightPress();
          }}
        >
          <Block
            style={{
              width: width * 0.12
            }}
          >
            <Icon
              name="shoppingcart"
              size={30}
              color="#e8582d"
              family="AntDesign"
              value={total}
            ></Icon>
          </Block>
        </TouchableOpacity>
      </>
    )
  });
  function isLike() {
    var like = initProduct.IsLiked;
    PUT_AXIOS(LIKE_PRODUCT + initProduct.Id + "/Like").then(res => {
      setInintProduct({ ...initProduct, IsLiked: !like });
      GET_AXIOS(GET_PRODUCT_ID + route.params.product.Id).then(res => {
        setInintProduct(res.data);
      })
    })
  }
  function handleLeftPress() {
    return navigation.goBack();
  }
  function handleRightPress() {
    return navigation.navigate("Cart");
  }

  async function sendNotifi() {
    var listDevice_Admin = [];
    await GET_AXIOS("http://45.119.83.107:9002/api/Account/Device_idOfAdmin").then(res => {
      res.data.Device_Ids.map(i => {
        if (i !== null) {
          listDevice_Admin.push(i);
        }
      })
    })
    if (listDevice_Admin.length > 0) {
      listDevice_Admin.map(divice_idAdmin => {
        let response = fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }, body: JSON.stringify({
            to: divice_idAdmin,
            sound: 'default',
            title: 'Demo',
            body: 'Demo notificaiton'
          })
        })
      })
    }
  }
  async function addToCart() {
    var a = await detailContext.dispatch({
      type: "ADD_TO_CART",
      product: { ...initProduct, Quantity: 1, isChecked: true }
    });
    setTotal(detailContext.gobalState.totalProduct);
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <ScrollView>
        <Block
          style={{
            width: width
          }}
        >
          <Block
            style={{
              width: width,
              height: 250
            }}
          >
            <ImageSlider images={img} />
          </Block>
          <Block
            row
            style={{
              width: width,
              marginTop: 5,
              height: 50
            }}
          >
            <Block style={{ width: width * 0.65, height: 50, marginLeft: 20 }}>
              <Text size={17} style={styles.productTitle}>
                {initProduct.Name}
              </Text>
            </Block>
            <Block
              row
              middle
              center
              style={{
                width: width * 0.25,
                marginRight: 5,
                height: 35
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isLike(like);
                }}
              >
                {initProduct.IsLiked === false ? (
                  <>
                    <AntDesign
                      name="hearto"
                      size={24}
                      style={{ marginRight: 5 }}
                    ></AntDesign>
                  </>
                ) : (
                    <>
                      <AntDesign
                        name="heart"
                        size={24}
                        color={"red"}
                        style={{ marginRight: 5 }}
                      ></AntDesign>
                    </>
                  )}
              </TouchableOpacity>
              <Text size={19}>{initProduct.NumberOfLike}</Text>
            </Block>
          </Block>
          <Block center style={{ width: width * 0.9, height: 30 }}>
            <Text size={17} color="red">
              Số sản phẩm còn lại :  {initProduct.Quantity}
            </Text>
          </Block>
          <Block center style={{ width: width * 0.9, height: 30 }}>
            <Text size={17} color="red">
              $  {initProduct.Price}
            </Text>
          </Block>
          <Block center style={{ width: width * 0.9, height: 30 }}>
            <Text size={17} color="red">
              Mô tả :  {initProduct.Description}
            </Text>
          </Block>
          <Block center>
            <Button
              style={{ ...styles.button }}
              color={argonTheme.COLORS.SUCCESS}
              onPress={() => {
                addToCart();
              }}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 15,
    opacity: 1,
    marginBottom: 15
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6
  }
});
