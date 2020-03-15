import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  View,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Icon, Input, Tabs, Product } from "../../components";
const { width, height } = Dimensions.get("screen");
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons"; // 6.2.2
import { Header, Left } from "native-base";
import Swiper from "react-native-swiper";
import { gobalStateContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { POST, GET, GET_AXIOS } from "../../enviroments/caller";
import { GET_PRODUCT_TAB_ID, GET_PRODUCT, GET_PRODUCT_IMG } from "../../enviroments/endpoint";

export default Home = ({ }) => {
  const gobalState = useContext(gobalStateContext);
  const navigation = useNavigation();
  const [totalProduct, setTotalProduct] = useState(gobalState.gobalState.totalProduct);
  const [tabsData, setTabsData] = useState([]);
  const [tabId, setTabId] = useState("back");
  const [index, setIndex] = useState(1);
  const [pageSize, setPage] = useState(5)
  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      setTotalProduct(gobalState.gobalState.totalProduct);
      getData()
    });
    return focus;
  }, [totalProduct]);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    setTabsData([])
    setTotalProduct(gobalState.gobalState.totalProduct);
    var urlId = GET_PRODUCT.toString() + "?index=" + index + "&pageSize=3";

    await GET(urlId, {}, {}).then(res => {
      var data = [];
      var url = "http://45.119.83.107:9002/api/Product/Images?fileName=";
      for (let i = 0; i < res.List.length; i++) {
        var img = url + res.List[i].MainImage;
        data.push({ ...res.List[i], img: img });
      }
      setTabsData(data)

    })
  }

  async function getItem() {
    if (tabId !== "back") {
      var urlId = GET_PRODUCT_TAB_ID + tabId + "/Products?index=1&pageSize=" + pageSize;
      await GET(urlId, {}, {}).then(res => {
        var data = [];
        for (let i = 0; i < res.List.length; i++) {
          data.push(res.List[i]);
        }
        setTabsData(data)
      })
    } else if (tabId === "back") {
      var urlId = GET_PRODUCT + "?index=1&pageSize=" + pageSize;
      await GET(urlId, {}, {}).then(res => {
        var data = [];
        for (let i = 0; i < res.List.length; i++) {
          data.push(res.List[i]);
        }
        setTabsData(data)
      })
    }
  }
  useEffect(() => {
    setPage(5);
    setTabsData([]);
    getItem()
  }, [tabId])

  useEffect(() => {
    getItem()
  }, [pageSize])

  function renderViewNewItem() {
    return (
      <Block
        style={{
          marginTop: 15,
          width: width
        }}
      >
        <Block center style={{ width: width, height: 50 }}>
          <Text size={30}>Danh Sách </Text>
        </Block>

        <FlatList
          data={tabsData}
          keyExtractor={item => item.Id.toString()}
          renderItem={item => {
            return (
              <Block key={item.item.Id}>
                <Product
                  horizontal
                  product={item.item}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
              </Block>
            );
          }}
        ></FlatList>
        <Block center>
          <Button
            style={{ ...styles.button }}
            color={argonTheme.COLORS.SUCCESS}
            textStyle={{ color: argonTheme.COLORS.WHITE }}
            onPress={() => {
              setPage(pre => pre + 5);
            }}
          >
            Xem Thêm
          </Button>
        </Block>
      </Block>
    );
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          style={[
            {
              backgroundColor: "white",
              height: 60,
              borderBottomColor: "#757575"
            },
            styles.androidHeader
          ]}
        >
          <Left style={{}}>
            <Block
              row
              center
              style={{
                width: width,
                height: 80
              }}
            >
              <TouchableOpacity>
                <Block
                  style={{
                    width: width * 0.12,
                    height: 35,
                    backgroundColor: "#e9ebee",
                    marginLeft: width * 0.015
                  }}
                >
                  <Ionicons
                    name="ios-search"
                    style={{ marginLeft: width * 0.04 }}
                    size={30}
                    color="#e8582d"
                  ></Ionicons>
                </Block>
              </TouchableOpacity>
              <Input
                placeholder={"Tên sản phẩm"}
                style={{
                  width: width * 0.7,
                  marginLeft: width * 0.005,
                  height: 30
                }}
                iconContent={<Block></Block>}
              ></Input>

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <Block
                    style={{
                      width: width * 0.12,
                      marginLeft: 15
                    }}
                  >
                    <Icon
                      name="shoppingcart"
                      size={30}
                      color="#e8582d"
                      family="AntDesign"
                      value={totalProduct}
                    ></Icon>
                  </Block>
                </TouchableOpacity>
              </TouchableOpacity>
            </Block>
          </Left>
        </Header>
        <ScrollView>
          <Block
            center
            style={{
              marginTop: 5,
              marginBottom: 5,
              width: width * 0.9,
              height: 100,
              borderWidth: 0.18
            }}
          >
            <Text style={{ top: -7, backgroundColor: "white" }}>Danh mục</Text>
            <Tabs
              data={[
                { id: "back", title: "Xem lại" },
                { id: "420e5124-e7e5-4af2-d45f-08d7bd988d47", title: "Quần dài", img: Images.QUAN_DAI },
                { id: "fa175d1c-f17d-4890-d460-08d7bd988d47", title: "Quần đùi", img: Images.QUAN_DUI },
                { id: "d1d964da-1923-43df-d461-08d7bd988d47", title: "Áo sơ mi", img: Images.AO_SO_MI },
                { id: "042edd2d-5ef9-43e7-d462-08d7bd988d47", title: "Áo thun", img: Images.AO_THUN },
              ]}
              onChange={id => {
                setTabId(id)
              }}
            ></Tabs>
          </Block>
          <Block
            style={{
              width: width
            }}
          >
            <Block
              center
              style={{
                width: width,
                height: 250
              }}
            >
              <Swiper autoplay={true} style={{ height: 250 }}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/3.jpg")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/1.jpg")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/2.png")}
                  />
                </View>
              </Swiper>
            </Block>

            {renderViewNewItem()}
          </Block>
        </ScrollView>
      </View>
    </>
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
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
});
