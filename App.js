import React, { useContext, useReducer, useEffect, useState } from "react";
import Navigate from "./service/Routers";
export const gobalStateContext = React.createContext();
import { reducer } from "./reducer/reducer";
import { View } from "native-base";
import { Dimensions, AsyncStorage } from "react-native";
const { width, height } = Dimensions.get("screen");
import * as Permissions from "expo-permissions";
import registerForPushNotificationsAsync from "./navigation/notification";
import { Notifications } from "expo";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { POST } from "./enviroments/caller";

firebase.initializeApp(firebaseConfig);

function App() {
  initState = {
    cart: [],
    totalProduct: 0,
    checkSMS: false,
    user: {},
    phone: null
  };


  useEffect(() => {
    async function getToken() {
      var token = await registerForPushNotificationsAsync();
      await AsyncStorage.setItem("device_id", token)
      console.log(token);
    }
    getToken();
    callNoti();
  });

  function callNoti() {
    var noti = Notifications.addListener(_catchNoti);
  }
  function _catchNoti(noti) {
    alert(noti.data.data);
    console.log(noti);
  }
  const [gobalState, dispatch] = useReducer(reducer, initState);
  console.disableYellowBox = true;
  return (
    <gobalStateContext.Provider
      value={{ gobalState: gobalState, dispatch: dispatch }}
    >
      <Navigate />
    </gobalStateContext.Provider>
  );
}

export default App;
