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
// import { Input, Icon } from "../components";
const { width, height } = Dimensions.get("screen");
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationService from "../service/navigation";

export default class Show extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
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
            <Block middle style={{ zIndex: 3 }}>
              <Button
                style={{ ...styles.button }}
                color={argonTheme.COLORS.SUCCESS}
                onPress={() =>
                  navigate("Login", {
                    data: this.state
                  })
                }
                textStyle={{ color: argonTheme.COLORS.WHITE }}
              >
                ĐĂNG NHẬP BẰNG TÀI KHOẢN
              </Button>
            </Block>

            <Block middle style={{ zIndex: 3, marginTop: 25 }}>
              <Button
                style={{ ...styles.button }}
                color="red"
                onPress={() =>
                  NavigationService.navigate("Login", {
                    data: this.state
                  })
                }
                textStyle={{ color: argonTheme.COLORS.WHITE }}
              >
                ĐĂNG NHẬP BẰNG GOOGLE
              </Button>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  }
});
