import React from "react";
// import { withNavigation } from "react-navigation";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Block, Text, theme } from "galio-framework";
// import { IconExtra } from "./Icon";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons"; // 6.2.2

import materialTheme from "../constants/Theme";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

export default Product = props => {
  const navigation = useNavigation();

  const {
    product,
    horizontal,
    full,
    style,
    priceColor,
    imageStyle,
    like,
    order
  } = props;
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle
  ];


  return (

    <>
      {
        order === true ? <Block
          row={horizontal}
          card
          flex
          style={[styles.product, styles.shadow, style]}
        >
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("DetailOrder", { checkOrder: true, OrderId: product.Id })
            }
          >
            <Block flex style={[styles.imageContainer, styles.shadow]} style={{ marginTop: 5 }}>
              <Text>Tên người nhận</Text>
              <Text style={{ marginLeft: 5 }}> - {product.FullName}</Text>
              <Text>Số điện thoại</Text>
              <Text style={{ marginLeft: 5 }}> - {product.PhoneNumber}</Text>
              <Text>Địa chỉ</Text>
              <Text style={{ marginLeft: 5 }}> - {product.Address}</Text>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("DetailOrder", { checkOrder: true, OrderId: product.Id })
            }
          >
            <Block center flex space="between" style={styles.productDescription}>
              <Text size={14} style={styles.productTitle}>
                Trạng thái đơn hàng
              </Text>
              <Text size={20} style={{ ...styles.productTitle, color: product.Status === "processing" ? "green" : "red" }}>{product.Status}</Text>

              <Text size={12} muted={!priceColor} color={priceColor}>
                Tổng tiền :  ${product.Price}
              </Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block> :
          <Block
            row={horizontal}
            card
            flex
            style={[styles.product, styles.shadow, style]}
          >
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("DetailProduct", { product: product })
              }
            >
              <Block flex style={[styles.imageContainer, styles.shadow]}>
                <Image source={{ uri: product.image }} style={imageStyles} />
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("DetailProduct", { product: product })
              }
            >
              <Block flex space="between" style={styles.productDescription}>
                <Text size={14} style={styles.productTitle}>
                  {product.Name}
                </Text>
                <Block row style={{ width: 25 }}>
                  <AntDesign
                    name="heart"
                    size={18}
                    color="pink"
                    style={{ marginRight: 5 }}
                  ></AntDesign>
                  <Text>{product.NumberOfLike}</Text>
                </Block>
                <Text size={12} muted={!priceColor} color={priceColor}>
                  ${product.Price}
                </Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
      }
    </>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 140
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    elevation: 1
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16
  },
  horizontalImage: {
    height: 122,
    width: "auto"
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  }
});
