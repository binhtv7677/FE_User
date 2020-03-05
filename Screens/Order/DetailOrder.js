import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Image, Alert, AsyncStorage } from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; // 6.2.2
import { CheckBox, ButtonGroup } from "react-native-elements";
import { GET, POST, GET_AXIOS, POST_AXIOS, PUT_AXIOS } from "../../enviroments/caller";
import { CHECK_LOGIN_ENDPOINT, GET_TOKEN_ENDPOINT, UPDATE_CART, GET_ORDER_DETAIL } from "../../enviroments/endpoint";
import { gobalStateContext } from "../../App";
export default DetailOrder = ({ route, navigation }) => {
    const state = useContext(gobalStateContext);
    const [data, setData] = useState();
    const [user, setUser] = useState(state.gobalState.user);
    console.log(route)
    useEffect(() => {
        GET_AXIOS(GET_ORDER_DETAIL + route.params.OrderId).then(res => {
            setData(res.data);
        })
    }, [])
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
        headerTitle: props => <Text size={20}>Giỏ Hàng</Text>
    });
    function handleLeftPress() {
        return navigation.goBack();
    }
    function numberWithCommas(item) {
        var x = item.Quantity * item.Price;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function renderItem(item) {
        return (
            <Block
                row
                key={item.Id}
                style={{
                    width: width,
                    height: 150,
                    backgroundColor: "white",
                    marginTop: 5,
                    marginBottom: 5
                }}
            >
                <Block center style={{ width: width * 0.15 }}>
                </Block>
                <Block row style={{ width: width * 0.85 }}>
                    <Block center style={{ width: width * 0.35 }}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: width * 0.35, height: 150 }}
                        />
                    </Block>
                    <Block
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 10,
                                height: 40,
                                width: width * 0.45
                            }}
                            size={14}
                        >
                            {item.ProductName}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                width: width * 0.5,
                                color: "red"
                            }}
                            size={17}
                        >
                            <Text size={15}>đ</Text> {numberWithCommas(item)}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                width: width * 0.5,
                            }}
                            size={17}
                        >
                            <Text size={15}>Số lượng:</Text> {item.Quantity}
                        </Text>
                    </Block>
                </Block>
            </Block>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#eef0f2" }}>
            <FlatList
                data={data.CartVMs}
                keyExtractor={item => item.Id}
                renderItem={item => {
                    return renderItem(item.item);
                }}
            />
            <Block
                style={{ width: width, height: 10, backgroundColor: "#eef0f2" }}
            ></Block>
            <Block
                style={{
                    width: width,
                    height: 150,
                    backgroundColor: "white",
                    borderBottomWidth: 0.2
                }}
            >
                <Block row style={{ height: 50, width: width, borderBottomWidth: 0.2 }}>
                    <Block row middle style={{ height: 50, width: width * 0.4 }}>
                        <MaterialCommunityIcons name={"crown"} size={40} color="#3858a5" />
                        <Text size={17}>Rank :</Text>
                    </Block>
                    <Block
                        row
                        style={{
                            height: 50,
                            width: width * 0.6
                        }}
                    >
                        <Block
                            row
                            center
                            middle
                            style={{
                                width: width * 0.4,
                                height: 30
                            }}
                        >
                            <Text size={20}>{user.rank}</Text>
                            {
                                user.rank === "Gold" ?
                                    <Text> (Sell Off 10%)</Text>
                                    :
                                    <></>
                            }
                            {
                                user.rank === "Platinum" ?
                                    <Text> (Sell Off 10%)</Text>
                                    :
                                    <></>
                            }
                        </Block>
                    </Block>
                </Block>
                <Block center>
                    <Text>Tổng tiền : {data.Price}</Text>
                    <Text> Địa chỉ :{data.Address}</Text>
                    <Text> Người nhận  :{data.Fullname}</Text>
                </Block>
            </Block>
        </View >
    );
};
const styles = StyleSheet.create({
    button: {
        width: width - theme.SIZES.BASE * 19,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        marginTop: 15,
        opacity: 1,
        marginBottom: 15,
        color: "#e8866c"
    },
    productTitle: {
        flex: 1,
        flexWrap: "wrap",
        paddingBottom: 6
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
    }
});
