import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

import global from '../utils/global';
let responseSize=global.responseSize
import Switch from './Switch'
let imgUrl = require('../../src/assets/images/ic_options_enter_on_off/ic_options_enter_on_off.png')
let imgUrlIphone = require('../../src/assets/images/ic_nav_phone_40/ic_nav_phone_40.png')
import {translations} from '../i18n'
const App = (props) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={props.onPress}
            style={{ flex: 1 }}
        >
            <View style={styles.content}>
                <View style={styles.left}>
                    {
                        props.leftImg ? <Image
                            style={styles.leftImg}
                            resizeMode='center'
                            source={imgUrlIphone}
                        /> : <></>
                    }
                    <View style={styles.centerText}>
                        <Text style={styles.title}>
                            {props.title}
                        </Text>
                        {
                            props.time ? <Text style={styles.time}>
                                {props.time}
                            </Text> : <></>
                        }
                        {
                            props.date ? <Text style={props.time?{...styles.date}:{...styles.date,...styles.margin10}}>
                                {props.date}
                            </Text> : <></>
                        }

                    </View>
                </View>
                {
                    props.protect ? <Text>
                        {translations.router_protected}
                    </Text> : <Image
                        style={styles.rightImg}
                        resizeMode='center'
                        source={imgUrl}
                    />
                }

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
        paddingVertical: responseSize * 20,
    },
    centerText:{
        // height:responseSize*50,
        flexDirection:'column',
        justifyContent:'center',
    },
    title: {
        fontSize: responseSize * 18,
        lineHeight: responseSize * 17.8,
        fontWeight: '400',
        color: '#010C11'
    },
    time: {
        marginVertical:responseSize*5,
        fontSize: responseSize * 14,
        lineHeight: responseSize * 17.8,
        fontWeight: '400',
        color: '#010C11',
        opacity: 0.5,
    },
    date: {
        lineHeight: responseSize * 17.8,
        fontSize: responseSize * 14,
        maxWidth:responseSize*240,
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
    left: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    leftImg: {
        marginRight: responseSize * 10,
        width: 40,
        height: 40,
    },
    margin10:{
        marginTop:responseSize*15,
    },
    rightImg: {
        // marginVertical: responseSize * 5,
        marginLeft: responseSize * 10,
        width: 40,
        height: 40,
    }
});
export default App;
