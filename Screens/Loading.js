import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  View
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { Icon, Input } from "../components";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../service/navigation";
import * as firebase from "firebase";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  checkIfLoggin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        NavigationService.navigate("DashBoard");
      } else {
        NavigationService.navigate("Login");
      }
    });
  };
  render() {
    return (
      <>
        <View
          style={{
            width: width,
            height: height,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({});
