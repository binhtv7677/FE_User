import React, { Component } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";

import DetailProduct from "../Screens/Home/DetailProduct";
import { Product } from "../components";
import RouterTab from "../Screens/RouterTab";
const Stack = createStackNavigator();
import { StyleSheet, StatusBar, Dimensions } from "react-native";
import Cart from "../components/Cart";
import TabViewExample from "../Screens/History/Test";
const { width, height } = Dimensions.get("screen");
import Login from "../Screens/Login";
import Register from "../Screens/Account/Register";
import AppLogin from "../Screens/LoginSms/AppLogin";
import PhoneAuthentication from "../Screens/LoginSms/screens/PhoneAuthentication";
import Order from "../Screens/Order/Order";
import DetailOrder from "../Screens/Order/DetailOrder";
function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name={"RouterTab"}
          component={RouterTab}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name={"Login"}
          component={Login}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name={"DetailProduct"}
          component={DetailProduct}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name={"Cart"}
          component={Cart}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name={"TabViewExample"}
          component={TabViewExample}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name={"Register"}
          component={Register}
        />
        <Stack.Screen
          name={"PhoneAuth"}
          component={PhoneAuthentication}
        />
        <Stack.Screen
          name={"Order"}
          component={Order}
        />
        <Stack.Screen
          name={"DetailOrder"}
          component={DetailOrder}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
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
