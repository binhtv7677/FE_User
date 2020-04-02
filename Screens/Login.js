import React, { Component, useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Input, Icon } from "../components";
const { width, height } = Dimensions.get("screen");
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationService from "../service/navigation";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { GET, POST, GET_AXIOS, PUT_AXIOS, POST_AXIOS } from '../enviroments/caller'
import { GET_TOKEN_ENDPOINT, CREATE_ACCOUNT_ID, GET_CART, UPDATE_ACCOUNT } from "../enviroments/endpoint";
import { gobalStateContext } from "../App";

export default Login = ({ route, navigation }) => {
  const gobalState = useContext(gobalStateContext);
  const [state, setState] = useState({
    uername: null,
    password: null,
    account_Id: null,
    fullname: null,
    device_Id: null,
    email: null
  })
  const [device_id, setDeviceId] = useState("");
  useEffect(() => {
    getDevice_id();
  }, [])
  async function getDevice_id() {
    var device_id = await AsyncStorage.getItem("device_id");
    setDeviceId(device_id);
  }


  async function logInFb() {
    try {
      await Facebook.initializeAsync("1033592917026481");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`
        );
        const info = await response.json();
        try {
          await POST_AXIOS(GET_TOKEN_ENDPOINT, { account_Id: info.id }).then(res => {
            if (res.status === 200) {
              var data = res.data;
              AsyncStorage.setItem("jwt", data.access_token);
              gobalState.dispatch({
                type: "INFO_USER",
                user: { name: info.name, rank: data.rank }
              })
              if (device_id === data.Device_Id) {
                getDefaltCart();
              }
              else {
                PUT_AXIOS(UPDATE_ACCOUNT, { fullName: info.name, email: info.email, device_Id: device_id, phoneNumber: null }).then(resq => {
                  if (resq.status === 200)
                    getDefaltCart();
                })
              }
            }

          })
        } catch (error) {
          POST_AXIOS(CREATE_ACCOUNT_ID, { account_Id: info.id, fullname: info.name, email: info.email }).then(response => {
            if (response.status === 200) {
              var data = response.data;
              gobalState.dispatch({
                type: "INFO_USER",
                user: { name: info.name, rank: data.rank }
              })
              AsyncStorage.setItem("jwt", data.access_token);
              if (data.Device_Id !== device_id) {
                PUT_AXIOS(UPDATE_ACCOUNT, { fullName: info.name, email: info.email, device_Id: device_id, phoneNumber: null }).then(res => {
                  if (res.status === 200) {
                    navigation.navigate("RouterTab");
                  }
                })
              } else {
                navigation.navigate("RouterTab");
              }
            }
          })
        }

      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "695639847094-359ubbkieveljk1mkodouj4s0m2mldd8.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        const user = result.user;
        console.log(result.accessToken);
        try {
          await POST_AXIOS(GET_TOKEN_ENDPOINT, { account_Id: user.id }).then(res => {
            var data = res.data;
            if (res.status === 200) {
              AsyncStorage.setItem("jwt", data.access_token);
              gobalState.dispatch({
                type: "INFO_USER",
                user: { name: data.fullname, rank: data.rank }
              })
              if (device_id === data.Device_Id) {
                getDefaltCart();
              }
              else {
                PUT_AXIOS(UPDATE_ACCOUNT, { fullName: user.givenName, email: user.email, device_Id: device_id, phoneNumber: null }).then(resq => {
                  if (resq.status === 200) {
                    getDefaltCart();
                  }
                })
              }
            }

          })
        } catch (ex) {
          POST_AXIOS(CREATE_ACCOUNT_ID, { account_Id: user.id, fullname: user.givenName, email: user.email }).then(response => {
            var data = response.data;
            if (response.status === 200) {
              AsyncStorage.setItem("jwt", response.data.access_token);
              gobalState.dispatch({
                type: "INFO_USER",
                user: { name: data.fullname, rank: data.rank }
              })
              if (data.Device_Id !== device_id) {
                PUT_AXIOS(UPDATE_ACCOUNT, { fullName: user.givenName, email: user.email, device_Id: device_id, phoneNumber: null }).then(res => {
                  if (res.status === 200) {
                    navigation.navigate("RouterTab");
                  }
                })
              } else {
                navigation.navigate("RouterTab");
              }
            }
          })
        }
        return result.accessToken;

      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  async function Login() {
    if (state.uername !== null || state.password !== null) {
      try {
        await POST_AXIOS(GET_TOKEN_ENDPOINT, { username: state.uername, password: state.password }).then(res => {
          console.log(res);
          var data = res.data;
          gobalState.dispatch({
            type: "INFO_USER",
            user: { name: data.fullname, rank: data.rank }
          })
          AsyncStorage.setItem("jwt", data.access_token);
          if (device_id === data.Device_Id) {
            getDefaltCart();
          }
          else {
            PUT_AXIOS(UPDATE_ACCOUNT, { fullName: data.name, email: data.email, device_Id: device_id, phoneNumber: null }).then(resq => {
              if (resq.status === 200) {
                getDefaltCart();
              }
            })
          }
        })
      } catch (error) {
        Alert.alert("sai username hoặc password");
      }
    } else {
      alert("Vui lòng điền tài khoản và mật khẩu")
    }
  }

  async function getDefaltCart() {
    await GET_AXIOS(GET_CART).then(res => {
      res.data.forEach(element => {
        gobalState.dispatch({
          type: "SET_DEFAULT_CART",
          product: { ...element, isChecked: true }
        })
      });
    });
    navigation.navigate("RouterTab");
  }
  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.BACKGROUND}
        style={{ width, height, zIndex: 1 }}
      >
        <Block
          center
          style={{
            width: width,
            height: 150,
            zIndex: 2,
            marginTop: (height * 4) / 10
          }}
        >
          <Block width={width * 0.68} style={{ marginBottom: 8 }}>
            <Input
              borderless
              placeholder="Tài khoản"
              onChangeText={context => {
                setState({ ...state, uername: context })
              }}
            />
          </Block>
          <Block width={width * 0.68} style={{ marginBottom: 15 }}>
            <Input
              borderless
              password
              placeholder=" Mật Khẩu"
              onChangeText={context => {
                setState({ ...state, password: context })
              }}
            />
          </Block>

          <Block middle style={{ zIndex: 3 }}>
            <Button
              style={{ ...styles.button }}
              color={argonTheme.COLORS.SUCCESS}
              onPress={() => { Login() }}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              ĐĂNG NHẬP
              </Button>
          </Block>
          <Block right>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Register")
              }
            >
              <Text style={{ marginTop: 10 }} size={12} color="blue">
                ĐĂNG KÝ TẠI ĐÂY
                </Text>
            </TouchableOpacity>
          </Block>
          <Block middle style={{ zIndex: 3 }}>
            <Button
              style={{ ...styles.buttonFB }}
              color={argonTheme.COLORS.SUCCESS}
              onPress={() => {
                logInFb();
              }}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              ĐĂNG NHẬP VỚI FACBOOK
              </Button>
          </Block>
          <Block middle style={{ zIndex: 3 }}>
            <Button
              style={{ ...styles.buttonGG }}
              color={argonTheme.COLORS.SUCCESS}
              onPress={() => {
                signInWithGoogleAsync();
              }}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              ĐĂNG NHẬP VỚI GOOGLE
              </Button>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  },
  buttonFB: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  },
  buttonGG: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  }
});
