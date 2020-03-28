import React, { Component, useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    FlatList,
    Alert
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Header } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; // 6.2.2
import { gobalStateContext } from '../../App'
import { POST, POST_AXIOS, GET, GET_AXIOS } from "../../enviroments/caller";
import { POST_CART, GET_CART, ORDER_CART } from "../../enviroments/endpoint";
export default Order = ({ route, navigation }) => {
    const state = useContext(gobalStateContext);
    const [totalPrice, setPrice] = useState(route.params.totalPrice);
    const [user, setUser] = useState({ fullName: "Trần Văn Bình", address: "928/8 ách mạng tháng 8", note: "" })

    // useEffect(() => {
    //     setUser({ ...user, phoneNumber: state.gobalState.phone });
    // }, [])
    function handleLeftPress() {
        return navigation.goBack();
    };
    async function sendNotifi() {
        var listDevice_Admin = [];
        await GET_AXIOS("http://45.119.83.107:9002/api/Account/Device_idOfAdmin").then(res => {
            res.data.Device_Ids.map(i => {
                if (i !== null) {
                    listDevice_Admin.push(i);
                }
            })
        })
        if (listDevice_Admin.length > 0) {
            listDevice_Admin.map(divice_idAdmin => {
                let response = fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify({
                        to: divice_idAdmin,
                        sound: 'default',
                        title: 'Demo',
                        body: 'Demo notificaiton'
                    })
                })
            })
        }
    }
    async function create() {
        var data = state.gobalState.cart;
        var postData = [];
        await data.map(item => {
            if (item.isChecked)
                postData.push(item.Id)
        })
        var obj = {
            cartIds: postData
            , price: totalPrice
            , ...user, phoneNumber: "+840907269083"
        }
        navigation.navigate("PhoneAuth", {
            data: obj
        })
        // POST_AXIOS(ORDER_CART, obj).then(res => {
        //     if (res.status === 200) {
        //         sendNotifi();
        //         Alert.alert(
        //             "Thông Báo",
        //             "Đặt hàng thành công",
        //             [
        //                 {
        //                     text: "Xác nhận",
        //                     onPress: () => { navigation.navigate("RouterTab") }
        //                     ,
        //                     style: "cancel"
        //                 }
        //             ],
        //             { cancelable: false }
        //         );
        //     }
        // }).catch(res => {
        //     console.log(res);
        // })
    }
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
        headerTitle: props => <Text
            style={{
                marginLeft: 25,
                fontSize: 20,
                color: "#00c4cc"
            }}
        >
            XÁC NHẬN ĐƠN HÀNG
    </Text>
    });
    return (
        <Block flex center style={{ ...styles.registerContainer }}>
            <ScrollView style={{ width: width }}>
                <Block style={{ ...styles.tempBlock }}>
                    <Text
                        style={{
                            marginLeft: 25,
                            marginTop: 5,
                            fontSize: 18,
                            color: argonTheme.COLORS.BLACK
                        }}
                    >
                        Thông tin cơ bản đơn hàng
            </Text>
                    <Text
                        style={{
                            marginLeft: 35,
                            marginTop: 5,
                            fontSize: 12,
                            color: argonTheme.COLORS.BLACK
                        }}
                    >
                        *Vui lòng không để trống
            </Text>
                    <Block
                        style={{
                            paddingHorizontal: theme.SIZES.BASE,
                            width: width * 0.8,
                            marginLeft: 10,
                            marginTop: 15
                        }}
                    >
                        <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                            Người nhận hàng
              </Text>
                        <TextInput
                            style={{
                                width: width * 0.8,
                                borderBottomColor: "#999da1",
                                borderBottomWidth: 1,
                                height: 25
                            }}
                            onChangeText={content => {
                                setUser({ ...user, fullName: content })
                            }
                            }
                            placeholder=""
                        ></TextInput>
                    </Block>
                    {/* <Block
                        style={{
                            paddingHorizontal: theme.SIZES.BASE,
                            width: width * 0.8,
                            marginLeft: 10,
                            marginTop: 15
                        }}
                    >
                        <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                            Số điện thoại
              </Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{
                                width: width * 0.8,
                                borderBottomColor: "#999da1",
                                borderBottomWidth: 1,
                                height: 25
                            }}
                            onChangeText={content => {
                                setUser({ ...user, phoneNumber: content })
                            }
                            }
                            defaultValue={"+84"}
                        ></TextInput>
                    </Block>
                 */}

                    <Block
                        style={{
                            paddingHorizontal: theme.SIZES.BASE,
                            width: width * 0.8,
                            marginLeft: 10,
                            marginTop: 15
                        }}
                    >
                        <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                            Địa chỉ nhận hàng
              </Text>
                        <TextInput
                            style={{
                                width: width * 0.8,
                                borderBottomColor: "#999da1",
                                borderBottomWidth: 1,
                                height: 30
                            }}
                            onChangeText={content => setUser({ ...user, address: content })}
                            placeholder=""
                        ></TextInput>
                    </Block>

                    <Block
                        style={{
                            paddingHorizontal: theme.SIZES.BASE,
                            width: width * 0.8,
                            marginLeft: 10,
                            marginTop: 15
                        }}
                    >
                        <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                            Ghi chú
                        </Text>
                        <TextInput
                            multiline={true}
                            style={{
                                width: width * 0.8,
                                borderBottomColor: "#999da1",
                                borderBottomWidth: 1,
                                height: 30
                            }}
                            onChangeText={content => setUser({ ...user, note: content })}
                            placeholder=""
                        ></TextInput>
                    </Block>
                </Block>
                <Block
                    center
                    style={{
                        ...styles.tempBlock,
                        height: (height * 1) / 10,
                        marginTop: height / 12
                    }}
                >
                    <Button
                        center
                        style={{ marginTop: 20, backgroundColor: "#00c4cc" }}
                        onPress={() => {
                            create()
                        }}
                    >
                        Xác nhận
            </Button>
                </Block>
            </ScrollView>
        </Block>


    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1
    },
    registerContainer: {
        width: width,
        height: height * 1.5,
        backgroundColor: "white",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    category: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE / 2,
        borderWidth: 0,
        width: 50,
        height: 50
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2,
        backgroundColor: "white"
    },
    title: {
        width: "100%",
        fontSize: 20,
        marginLeft: width / 3
    },
    tempBlock: {
        marginTop: 8,
        backgroundColor: "white",
        width: width,
        justifyContent: "flex-start"
    },
    containerShadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 1
    },
    blockActive: {
        borderColor: "blue"
    },
    blockNonActive: {
        borderColor: "#f6f6f6"
    }
});
