import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View, Image } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    return (
        <TextInput
            maxLength={32}
            style={styles.password}
            value={props.defaultValue}
            textContentType='username'
            onChange={props.onChange}
            returnKeyType='done'
        />
    );
}
const styles = StyleSheet.create({
    password: {
        // marginTop:10,
        paddingLeft:responseSize*20,
        backgroundColor: '#F8F8F8',
        width: responseSize * 345,
        height: responseSize * 44,
        borderRadius: responseSize * 10,
        color: '#414245',
        marginBottom: responseSize * 10,
    },
});
export default App;
