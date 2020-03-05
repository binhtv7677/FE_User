import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Icon, Input } from "../../components";
const { width, height } = Dimensions.get("screen");
import { Header, Left } from "native-base";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons"; // 6.2.2
import { GET_AXIOS } from "../../enviroments/caller";
import { USER_GET_ORDER } from "../../enviroments/endpoint";
import { useNavigation } from "@react-navigation/native";
export default History = ({ props }) => {
  const navigation = useNavigation()
  const [data, setData] = useState([]);
  const [value, setValue] = useState(1);
  useEffect(() => {
    GET_AXIOS(USER_GET_ORDER).then(res => {
      setData(res.data.List)
    })
  }, [])

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
          data={data}
          keyExtractor={item => item.Id.toString()}
          renderItem={item => {
            return (
              <Block key={item.item.Id}>
                <Product
                  order={true}
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
              var index = tabsData.index;
              setTabsData({ ...tabsData, index: index + 1 })
            }}
          >
            Xem Thêm
          </Button>
        </Block>
      </Block>
    );
  }
  return (
    <View style={{ backgroundColor: "white" }}>
      <Block center s>
        {renderViewNewItem()}
      </Block>
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
});
