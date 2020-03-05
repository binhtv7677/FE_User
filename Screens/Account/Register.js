import React, { Component, useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Header } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; // 6.2.2
import { gobalStateContext } from '../../App'
import { POST } from "../../enviroments/caller";
import { CREATE_ACCOUNT_ID } from "../../enviroments/endpoint";
export default Register = ({ route, navigation }) => {
  const state = useContext(gobalStateContext);

  const [user, setUser] = useState({ username: "", password: "", fullname: "", email: "", device_id: state.gobalState.device_id })
  const [tempPwr, setTempPass] = useState("");
  function handleLeftPress() {
    return navigation.goBack();
  };
  function create() {
    if (user.password === tempPwr) {
      POST(CREATE_ACCOUNT_ID, {}, {}, user).then(res => {
      })
    } else {

    }
  }
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
    headerTitle: props => <Text
      style={{
        marginLeft: 25,
        fontSize: 20,
        color: "#00c4cc"
      }}
    >
      TẠO TÀI KHOẢN
    </Text>
  });

  return (
    <Block flex center style={{ ...styles.registerContainer }}>
      <ScrollView style={{ width: width }}>
        <Block style={{ ...styles.tempBlock }}>
          <Text
            style={{
              marginLeft: 25,
              marginTop: 5,
              fontSize: 18,
              color: argonTheme.COLORS.BLACK
            }}
          >
            Thông tin cơ bản
            </Text>
          <Text
            style={{
              marginLeft: 35,
              marginTop: 5,
              fontSize: 12,
              color: argonTheme.COLORS.BLACK
            }}
          >
            *Vui lòng không để trống
            </Text>
          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              width: width * 0.8,
              marginLeft: 10,
              marginTop: 15
            }}
          >
            <Text style={{ fontWeight: "normal", color: "#999da1" }}>
              Username
              </Text>
            <TextInput
              style={{
                width: width * 0.8,
                borderBottomColor: "#999da1",
                borderBottomWidth: 1,
                height: 25
              }}
              onChangeText={content => {
                setUser({ ...user, username: content })
              }
              }
              placeholder=""
            ></TextInput>
          </Block>
          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              width: width * 0.8,
              marginLeft: 10,
              marginTop: 15
            }}
          >
            <Text style={{ fontWeight: "normal", color: "#999da1" }}>
              Mật khẩu
              </Text>
            <TextInput
              secureTextEntry={true}
              style={{
                width: width * 0.8,
                borderBottomColor: "#999da1",
                borderBottomWidth: 1,
                height: 30
              }}
              onChangeText={content => {
                setUser({ ...user, password: content })
              }}
              placeholder=""
            ></TextInput>
          </Block>
          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              width: width * 0.8,
              marginLeft: 10,
              marginTop: 15
            }}
          >
            <Text style={{ fontWeight: "normal", color: "#999da1" }}>
              Xác nhận mật khẩu
              </Text>
            <TextInput
              secureTextEntry={true}
              style={{
                width: width * 0.8,
                borderBottomColor: "#999da1",
                borderBottomWidth: 1,
                height: 30
              }}
              onChangeText={content => setTempPass(content)}
              placeholder=""
            ></TextInput>
          </Block>

          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              width: width * 0.8,
              marginLeft: 10,
              marginTop: 15
            }}
          >
            <Text style={{ fontWeight: "normal", color: "#999da1" }}>
              Tên của bạn
              </Text>
            <TextInput
              style={{
                width: width * 0.8,
                borderBottomColor: "#999da1",
                borderBottomWidth: 1,
                height: 30
              }}
              onChangeText={content => setUser({ ...user, fullname: content })}
              placeholder=""
            ></TextInput>
          </Block>

          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              width: width * 0.8,
              marginLeft: 10,
              marginTop: 15
            }}
          >
            <Text style={{ fontWeight: "normal", color: "#999da1" }}>
              Email
              </Text>
            <TextInput
              style={{
                width: width * 0.8,
                borderBottomColor: "#999da1",
                borderBottomWidth: 1,
                height: 25
              }}
              // keyboardType="numeric"
              onChangeText={content => setUser({ ...user, email: content })}
              placeholder=""
            ></TextInput>
          </Block>
        </Block>
        <Block
          center
          style={{
            ...styles.tempBlock,
            height: (height * 1) / 10,
            marginTop: height / 12
          }}
        >
          <Button
            center
            style={{ marginTop: 20, backgroundColor: "#00c4cc" }}
            onPress={() => {
              create()
            }}
          >
            Xác nhận
            </Button>
        </Block>
      </ScrollView>
    </Block>


  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1
  },
  registerContainer: {
    width: width,
    height: height * 1.5,
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    width: 50,
    height: 50
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
    backgroundColor: "white"
  },
  title: {
    width: "100%",
    fontSize: 20,
    marginLeft: width / 3
  },
  tempBlock: {
    marginTop: 8,
    backgroundColor: "white",
    width: width,
    justifyContent: "flex-start"
  },
  containerShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1
  },
  blockActive: {
    borderColor: "blue"
  },
  blockNonActive: {
    borderColor: "#f6f6f6"
  }
});
