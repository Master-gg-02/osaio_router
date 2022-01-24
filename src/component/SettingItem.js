import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

import global from '../utils/global';
let responseSize = global.responseSize
import Switch from '../component/Switch'
let imgUrl = require('../../src/assets/images/ic_options_enter_on_off/ic_options_enter_on_off.png')

const App = (props) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={props.onPress}
        >
            <View style={styles.content}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <View style={styles.right}>
                    {
                        props.subTitle ?
                            <Text style={styles.subTitle}>
                                {props.subTitle}
                            </Text> :
                            <></>
                    }
                    {
                        props.switch ?
                            <View style={styles.rightIcon}>
                                <Switch
                                    value={props.value}
                                    onSyncPress={props.onSyncPress}
                                    hitSlop={{ left: 50, right: 50, top: 50, bottom: 50 }}
                                />
                            </View> :
                            props.info ?
                                <Text style={styles.info}>
                                    {props.info}
                                </Text> :
                                props.img ?
                                    <Image
                                        style={styles.rightImg}
                                        resizeMode='center'
                                        source={imgUrl}
                                    /> : <></>
                    }
                </View>
            </View>
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        borderRadius: responseSize * 10,
        paddingHorizontal: responseSize * 20,
        paddingVertical: responseSize * 15,
    },
    title: {
        fontSize: responseSize * 15,
        lineHeight: responseSize * 17.8,
        fontWeight: '400',
        color: '#010C11'
    },
    subTitle: {
        fontSize: responseSize * 15,
        lineHeight: responseSize * 17.8,
        fontWeight: '400',
        color: '#010C11',
        opacity: 0.5,
    },
    info: {
        width: responseSize * 200,
        textAlign: 'right',
        fontSize: responseSize * 12,
        lineHeight: responseSize * 17.8,
        fontWeight: '400',
        color: '#010C11',
        opacity: 0.5,
    },
    subTitle2: {
        // marginVertical: responseSize * 15,
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rightIcon: {
        // marginVertical: responseSize * 4.5,
    },
    rightImg: {
        marginLeft: responseSize * 5,
        width: responseSize * 25,
        height: responseSize * 25,
    }
});
export default App;
