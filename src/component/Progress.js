import React, { useState } from 'react';
import {  View,  StyleSheet, Text } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize
function Circular(props) {
    return (
        <View style={{ width: 14, height: 14, borderRadius: 7, ...props.color ? styles.blueCircular : styles.greyCircular }}>
        </View>
    );
}
function Dot(props) {
    return (
        <Text style={{ ...styles.Dot, ...props.color ? styles.blueDot : styles.greyDot }}>
            {'............'}
        </Text>
    );
}
const App = (props) => {
    return (
        <View style={styles.progressDirect}>
            <Circular color={props.step >= 1}></Circular>
            <Dot color={props.step >= 2}></Dot>
            <Circular color={props.step >= 2}></Circular>
            <Dot color={props.step >= 3}></Dot>
            <Circular color={props.step >= 3}></Circular>
        </View>
    );
}
const styles = StyleSheet.create({
    blueCircular: {
        backgroundColor: global.buttonColor
    },
    greyCircular: {
        backgroundColor: '#4142454D'
    },
    Dot: {
        marginBottom: responseSize*8,
    },
    blueDot: {
        color: global.buttonColor,
    },
    greyDot: {
        color: '#4142454D',
    },
    progressDirect: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default App;
