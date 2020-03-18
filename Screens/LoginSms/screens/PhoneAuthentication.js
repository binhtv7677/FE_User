import React, { useState, useContext } from 'react';
import { ScrollView, TextInput, Button, Text, Dimensions } from 'react-native';
import { signInWithPhoneNumber } from '../domain/phoneAuthentication';
import { gobalStateContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { Block } from 'galio-framework';
import { POST_AXIOS, GET_AXIOS } from '../../../enviroments/caller';
import { ORDER_CART } from '../../../enviroments/endpoint';
const { width, height } = Dimensions.get("screen");

const PhoneAuthentication = ({ route, navigation }) => {
    const state = useContext(gobalStateContext);
    const [phone, setPhone] = useState('+84');
    const [smsCode, setSmsCode] = useState('');
    const [confirmSMSCode, setConfirmSMSCode] = useState();
    const [valiSms, setSMS] = useState(state.gobalState.checkSMS);
    const handleSendSMS = async () => {
        signInWithPhoneNumber(phone).then(confirmation => {
            setConfirmSMSCode(() => confirmation);
        });
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
    const handleConfirmSMSCode = () => {
        if (!confirmSMSCode || smsCode === '') {
            return;
        }
        confirmSMSCode(smsCode);
        var obj = {
            ...route.params.data,
            phoneNumber: phone
        }
        POST_AXIOS(ORDER_CART, obj).then(res => {
            if (res.status === 200) {
                sendNotifi();
                Alert.alert(
                    "Thông Báo",
                    "Đặt hàng thành công",
                    [
                        {
                            text: "Xác nhận",
                            onPress: () => { navigation.navigate("RouterTab") }
                            ,
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                );
            }
        }).catch(res => {
            console.log(res);
        })
    };

    if (!confirmSMSCode)
        return (
            <ScrollView style={{ padding: 20, marginTop: 20 }}>
                <Block row>
                    <Text>Số điện thoại :</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{
                            width: width * 0.5,
                            borderBottomColor: "#999da1",
                            borderBottomWidth: 1,
                            height: 25
                        }}
                        onChangeText={content => {
                            setPhone(content);
                        }}
                        defaultValue={"+84"}
                    ></TextInput>
                </Block>

                <Button onPress={handleSendSMS} style={{ marginTop: 10 }} title="Xác nhận" />
            </ScrollView>
        );
    else
        return (
            <ScrollView style={{ padding: 20, marginTop: 20 }}>
                <TextInput
                    value={smsCode}
                    onChangeText={setSmsCode}
                    keyboardType="numeric"
                    placeholder="Code from SMS"
                />
                <Button
                    onPress={handleConfirmSMSCode}
                    title="Xác nhận mã SMS"
                />
            </ScrollView>
        );
};

export default PhoneAuthentication;
