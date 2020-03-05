import React, { Component, useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Icon, Input, Product } from "../../components";
const { width, height } = Dimensions.get("screen");
import { gobalStateContext } from "../../App";
import { GET_AXIOS } from "../../enviroments/caller";
import { GET_PRODUCT_LIKE } from "../../enviroments/endpoint";
import { useNavigation } from "@react-navigation/native";

export default Account = ({ }) => {
  const navigation = useNavigation();
  const state = useContext(gobalStateContext);
  const [user, setUser] = useState(state.gobalState.user);
  const [data, setData] = useState();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    GET_AXIOS(GET_PRODUCT_LIKE).then(res => {
      setData(res.data.List);
    })
  }, [number])
  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      setNumber(pre => pre + 1)
    });
    return focus;
  }, []);
  function renderViewNewItem() {
    return (
      <Block
        style={{
          marginTop: 15,
          width: width
        }}
      >
        <Block center style={{ width: width, height: 50 }}>
          <Text size={30}>Danh Sách Sản Phẩm Ưa Thích</Text>
        </Block>
        <FlatList
          data={data}
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
        <Block center style={{ height: height / 6 }}>
        </Block>
      </Block>
    );
  }
  return (
    <Block style={{ backgroundColor: "white", width: width, height: height }}>
      <Block row center middle style={{ width: width, height: 120 }}>
        <Text size={30}>{user.name}</Text>
        <Text color={"#ffc107"}> {user.rank} </Text>
      </Block>
      <ScrollView>

        <Block
          center
          style={{ width: width, height: 40, borderBottomWidth: 0.17 }}
        >
          <Text size={30} color={"red"}>
            1145 <Text size={18}>điểm</Text>
          </Text>
        </Block>
        <Block center style={{ width: width, height: 40 }}>
          <Text size={16}>Bảng thông tin</Text>
        </Block>
        <Block
          row
          center
          style={{ width: width * 0.9, height: 20, marginTop: 5 }}
        >
          <Block center style={{ height: 30, width: width * 0.3 }}>
            <Text>Siver</Text>
          </Block>
          <Block center style={{ height: 30, width: width * 0.3 }}>
            <Text>Gold</Text>
          </Block>
          <Block
            center
            style={{
              height: 30,
              width: width * 0.3
            }}
          >
            <Text>Platinum</Text>
          </Block>
        </Block>
        <Block row center style={{ width: width * 0.9, height: 20 }}>
          <Block
            style={{
              height: 20,
              backgroundColor: "#c1c1c1",
              width: width * 0.3
            }}
          ></Block>
          <Block
            style={{
              height: 20,
              backgroundColor: "#ffc107",
              width: width * 0.3
            }}
          ></Block>
          <Block
            style={{
              height: 20,
              backgroundColor: "#2d07ffb0",
              width: width * 0.3
            }}
          ></Block>
        </Block>
        <Block
          row
          center
          style={{ width: width * 0.9, height: 20, marginTop: 5 }}
        >
          <Block center style={{ height: 30, width: width * 0.3 }}>
            <Text>1 > 1000</Text>
          </Block>
          <Block center style={{ height: 30, width: width * 0.3 }}>
            <Text>1000 > 2000</Text>
          </Block>
          <Block
            center
            style={{
              height: 30,
              width: width * 0.3
            }}
          >
            <Text>2000 > 3000</Text>
          </Block>
        </Block>
        <Block
          center
          style={{ width: width, height: 1, borderBottomWidth: 0.17 }}
        >
        </Block>
        <Block center>
          <Block
            style={{
              width: width
            }}
          >
            {renderViewNewItem()}
          </Block>
        </Block>
      </ScrollView>
    </Block>
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
});
