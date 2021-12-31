import React from 'react';
import { StyleSheet, Text ,View} from 'react-native';

import PassWordInput from '../component/PasswordInput'
import PasswordInputSetStorage from '../component/PasswordInputSetStorage'
import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    return (
        <View style={styles.networkName}>
            <Text style={{ color: '#414245', fontWeight: '700', marginBottom: 10, }}>
                {/* Wi-Fi Network Password({intergrateSSID ? 'SSID' : '2.4G'}) */}
                {props.title}{props.exTitile}
            </Text>
            {
                props.inputType=='password'? <PassWordInput value={props.storageKey}/>:<PasswordInputSetStorage value={props.storageKey} />
            }
            <View style={styles.networkNameFooter}>
                <Checked
                    value={props.checkValue}
                    onPress={checkeChange}
                ></Checked>
                <Text style={{ color: '#414245', fontWeight: '700' }}>
                    {props.checkeText}
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    networkName: {
        marginTop: responseSize * 10,
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
    }
});
export default App;
