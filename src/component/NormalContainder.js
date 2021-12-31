import React,{useState} from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize

import UserInput from './UserInput'
import Checked from './Checked'
import PasswordInput from './PasswordInput'


const App = (props) => {
    return (
        <View>
            <View style={styles.networkName}>
                <Text style={styles.title}>
                    Wi-Fi Network Name(5G)
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
                        Hidden SSID
                    </Text>
                </View>
            </View>
            <View style={styles.networkName}>
                <Text style={styles.title}>
                    Wi-Fi Network password(5G)
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
                        Support WPA3 encryption
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
        marginTop: responseSize * 10,
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    encDisable: {
        width: responseSize * 16,
        height: responseSize * 16,
        borderRadius: responseSize * 8,
        backgroundColor: 'rgba(65, 66, 69, 0.3)'
    },
    checkText: {
        // maxWidth:responseSize*345,
        flexWrap: 'wrap',
        marginLeft: responseSize * 10,
        color: '#414245',
        fontWeight: '700',
        marginBottom: responseSize * 28,
    },
});
export default App;
