import React from "react";
import * as Font from "expo-font";
import { View, Text } from "react-native";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { Icon, Input, Tabs, Product } from "../components";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons"; // 6.2.2

import argonConfig from "../assets/font/argon.json";
const ArgonExtra = require("../assets/font/argon.ttf");
const IconArgonExtra = createIconSetFromIcoMoon(argonConfig, "ArgonExtra");

class IconExtra extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({ ArgonExtra: ArgonExtra });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { name, family, value, size, color, styles, ...rest } = this.props;

    if (name && family && this.state.fontLoaded) {
      if (family === "ArgonExtra") {
        return <IconArgonExtra name={name} family={family} {...rest} />;
      } else if (family === "AntDesign") {
        return (
          <View style={styles}>
            <AntDesign name={name} size={size} color={color}></AntDesign>
            {value > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  backgroundColor: "red",
                  borderRadius: 6,
                  width: 12,
                  height: 12,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                >
                  {value}
                </Text>
              </View>
            )}
          </View>
        );
      } else if (family === "MaterialCommunityIcons") {
        return (
          <MaterialCommunityIcons
            name={name}
            size={size}
            color={color}
          ></MaterialCommunityIcons>
        );
      } else if (family === "Ionicons") {
        return <Ionicons name={name} size={size} color={color}></Ionicons>;
      } else {
        return (
          <View style={styles}>
            <Entypo name={name} size={size} color={color}></Entypo>
            {value > 0 && (
              <View
                style={{
                  position: "absolute",
                  right: -6,
                  top: -3,
                  backgroundColor: "red",
                  borderRadius: 6,
                  width: 12,
                  height: 12,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                >
                  {value}
                </Text>
              </View>
            )}
          </View>
        );
      }
    }

    return null;
  }
}

export default IconExtra;
