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
import { GET_TOKEN_ENDPOINT } from "./enviroments/endpoint";

firebase.initializeApp(firebaseConfig);

function App() {
  initState = {
    cart: [],
    totalProduct: 0,
    device_id: "",
    checkSMS: false,
    user: {},
    phone: null
  };


  useEffect(() => {
    async function getToken() {
      initState.device_id = await registerForPushNotificationsAsync();
    }
    getToken();
    callNoti();
  });

  function callNoti() {
    var noti = Notifications.addListener(_catchNoti);
  }
  function _catchNoti(noti) {
    alert(noti.data)
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
