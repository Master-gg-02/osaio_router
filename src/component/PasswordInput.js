import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View, Image } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize


let imgUrlCloseEye = require('../../src/assets/images/ic_login_eye_off/ic_login_eye_off.png')
let imgUrlEye = require('../../src/assets/images/ic_login_eye_on/ic_login_eye_on.png')

const App = (props) => {
    const [showPassword, setShowPassword] = useState(true);
    return (
        <View style={{ position: 'relative' }}>
            <TextInput
                // placeholder='0.0.0.0'
                maxLength={64}
                secureTextEntry={showPassword}
                // password={showPassword}
                // editable={true}
                style={styles.password}
                // keyboardType={showPassword?'visible-password':''}
                value={props.defaultValue}
                onChange={props.onChange}
                textContentType='password'
                onBlur={props.onBlur}
                returnKeyType='done'
            // returnKeyLabel={'完成'}
            />
            <TouchableWithoutFeedback
                hitSlop={{ left: 30, right: 30, top: 30, bottom: 30 }}
                onPress={() => {
                    setShowPassword(!showPassword)
                }}
                style={styles.passwordEyeTouch}
            >
                {
                    showPassword ? <Image
                        style={styles.passwordEye}
                        source={imgUrlCloseEye}
                    /> :
                        <Image
                            style={styles.passwordEye}
                            source={imgUrlEye}
                        />
                }
            </TouchableWithoutFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    password: {
        // marginTop:10,
        paddingLeft: responseSize * 20,
        paddingRight: responseSize * 40,
        backgroundColor: '#F8F8F8',
        width: responseSize * 345,
        height: responseSize * 44,
        borderRadius: responseSize * 10,
        color: '#414245',
        marginBottom: responseSize * 10,
    },
    passwordEyeTouch: {
        width: responseSize * 19.51,
        height: responseSize * 8.57,
    },
    passwordEye: {
        position: 'absolute',
        top: responseSize * 20,
        right: responseSize * 20,
        width: responseSize * 19.51,
        height: responseSize * 8.57,
    },
});
export default App;
