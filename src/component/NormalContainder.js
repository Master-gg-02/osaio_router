import React,{useState} from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize

import UserInput from './UserInput'
import Checked from './Checked'
import PasswordInput from './PasswordInput'
import {translations} from '../i18n'
const App = (props) => {
    return (
        <View>
            <View style={styles.networkName}>
                <Text style={styles.title}>
                   {translations.router_wifi_name_ssid} (5G)
                </Text>
                <UserInput
                    defaultValue={props.ssid}
                    onChange={props.ssidOnChange}
                />
                <View style={styles.networkNameFooter}>
                    <Checked
                        value={props.hssid}
                        onPress={props.hssidOnChange}
                    ></Checked>
                    <Text style={styles.checkText}>
                       {translations.router_hidden_ssid}
                    </Text>
                </View>
            </View>
            <View style={styles.networkName}>
                <Text style={styles.title}>
                    {translations.router_wifi_password}(5G)
                </Text>
                <PasswordInput 
                    defaultValue={props.ssidkey}
                    onChange={ props.keyOnChange }
                />
                <View style={styles.networkNameFooter}>
                    {
                        props.ssidkey.length >= 8?
                            <Checked
                                value={props.wpaMode}
                                onPress={props.wpaModeOnChange}   
                            >
                            </Checked> :
                            <View style={styles.encDisable}></View>
                    }

                    <Text style={styles.checkText}>
                        {translations.router_support_wpa3_encryption}
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    networkName: {
        marginTop: responseSize * 10,
    },
    title: {
        color: '#414245',
        fontWeight: '700',
        marginBottom: responseSize * 10,
    },
    networkNameText: {
        width: responseSize * 345,
        height: responseSize * 44,
        backgroundColor: 'rgba(65, 66, 69, 0.05)',
        borderRadius: responseSize * 10,
    },
    networkNameFooter: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    encDisable: {
        width: responseSize * 16,
        height: responseSize * 16,
        borderRadius: responseSize * 8,
        backgroundColor: 'rgba(65, 66, 69, 0.3)'
    },
    checkText: {
        flexWrap: 'wrap',
        marginLeft: responseSize * 12,
        color: '#9D9D9D',
        fontWeight: '400',
    },
});
export default App;
