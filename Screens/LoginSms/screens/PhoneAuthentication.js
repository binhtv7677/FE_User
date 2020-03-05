import React, { useState, useContext } from 'react';
import { ScrollView, TextInput, Button, Text } from 'react-native';
import { signInWithPhoneNumber } from '../domain/phoneAuthentication';
import { gobalStateContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { Block } from 'galio-framework';

const PhoneAuthentication = () => {
    const navigation = useNavigation();
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

    const handleConfirmSMSCode = () => {
        if (!confirmSMSCode || smsCode === '') {
            return;
        }
        confirmSMSCode(smsCode);
        state.dispatch({
            type: "UPDATE_PHONE",
            phone: phone
        })
        navigation.navigate("Order");
    };

    if (!confirmSMSCode)
        return (
            <ScrollView style={{ padding: 20, marginTop: 20 }}>
                <Block row>
                    <Text>Số điện thoại :</Text>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        placeholder="Your phone"
                    />
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
                    title="Confirm SMS code"
                />
            </ScrollView>
        );
};

export default PhoneAuthentication;
