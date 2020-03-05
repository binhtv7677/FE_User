import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { Icon, Input } from "../components";
const { width, height } = Dimensions.get("screen");

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
  }
  state = { username: "a", password: "c" };
  static navigationOptions = {
    title: "Welcome"
  };

  render() {
    return <></>;
  }
}
const styles = StyleSheet.create({});
