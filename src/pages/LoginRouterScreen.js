import React, { useState, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import Progress from '../component/Progress'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Dialog from '../component/Dialog'

import Title from '../component/Title'
import global from '../utils/global';
let responseSize=global.responseSize

import { postData } from '../api/postData'

import Toast from 'react-native-root-toast';
const title = 'connection succeeded'
let imgUrl = require('../../src/assets/images/illus_connect_scanning_router/illus_connect_scanning_router.png')
let imgUrlCancel = require('../../src/assets/images/ic_nav_cancel_off/ic_nav_cancel_off.png')
const App = ({ navigation }) => {
    const [disableNext, setDisableNext] = useState(true);
    let [passWordValue, setPassWordValue] = useState('');
    let [loading, setLoading] = useState(false);
    const [forgetPasswordVisible, setForgetPasswordVisible] = useState(false);

    // let scrolltoEedEl = null

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'LoginRouter',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={Platform.OS == "ios" ? 'position' : 'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? responseSize * 60 : responseSize * -260}
                enabled='true'
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    bounces={false}
                >

                    <View style={styles.headContent}>
                        <Progress step={1}></Progress>
                        <Title title={title} />
                        <Image
                            style={styles.directionImg}
                            resizeMode='center'
                            source={imgUrl}
                        />
                        <View style={styles.routerPassWord}>
                            <Text style={styles.passWord}>
                                Password
                            </Text>
                            <View style={styles.passWordInputBox}>
                                <TextInput
                                    style={styles.passWordInput}
                                    placeholder='Password'
                                    placeholderTextColor='#9D9D9D'
                                    value={passWordValue}
                                    maxLength={64}
                                    secureTextEntry={true}
                                    returnKeyType='done'
                                    textContentType='password'
                                    // rejectResponderTermination={true}
                                    onBlur={() => {
                                        // scrolltoEedEl.scrollTo({
                                        //     y: 0, y: 0, animated: true
                                        // })
                                        // setContentOffset({ x: 0, y: 0})
                                    }}
                                    onFocus={() => {
                                        // if (Platform.OS == 'ios') {

                                        // } else {
                                        //     setContentOffset({ x: 0, y: responseSize * -260 })
                                        // }
                                        // console.log(scrolltoEedEl.scrollToEnd)
                                        // setTimeout(() => {
                                        //     scrolltoEedEl.scrollToEnd({ animated: true, duration: 500 })
                                        // }, 500)
                                    }}
                                    onChange={
                                        (e) => {
                                            let EventObject = e.nativeEvent;
                                            console.log(EventObject.text)
                                            setPassWordValue(EventObject.text)
                                            console.log(passWordValue)
                                            if (EventObject.text.length >= 8 || EventObject.text == 'admin') {
                                                setDisableNext(false)
                                            } else {
                                                setDisableNext(true)
                                            }
                                        }
                                    }
                                />
                                <TouchableOpacity
                                    onPress={
                                        () => { setPassWordValue('') }
                                    }
                                    style={styles.passWordInputImageTap}
                                >
                                    <Image
                                        style={styles.passWordInputImage}
                                        source={imgUrlCancel}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableWithoutFeedback
                                onPress={() => { setForgetPasswordVisible(true) }}
                                hitSlop={{ top: responseSize * 30, bottom: responseSize * 30 }}
                            >
                                <Text style={styles.forgetPassword}>
                                    Forget password
                                </Text>
                            </TouchableWithoutFeedback>
                            <Text style={styles.defaultPassword}>
                                The default password can be found on the device body
                            </Text>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.footer}>
                    <FootButton
                        disabled={disableNext}
                        loading={loading}
                        onPress={async () => {
                            setLoading(true)
                            let data = {
                                password: passWordValue,
                                topicurl: 'getCheckPasswordResult'
                            }
                            console.log(global.debug)
                            if (global.debug == false) {
                                console.log(data)
                                console.log(global.wifiNetworkIP)
                                let res = await postData(global.wifiNetworkIP, data)
                                console.log(res)
                                if (res.checkPassword == 'OK') {
                                    setLoading(false)
                                    navigation.navigate('Authorize')
                                } else {
                                    setLoading(false)
                                    Toast.show('密码错误！')
                                }
                            } else {
                                navigation.navigate('Authorize')
                            }
                            // navigation.navigate('Authorize')
                        }}
                        title='Next'
                        color={global.buttonColor}
                    />
                </View>
            </KeyboardAvoidingView>
            <Dialog
                title='忘记密码'
                content='如果你忘记了密码，可以通过重置设备后返回首页重新添加，是否前往如何重置路由器？'
                cancleTitle='我知道了'
                confirmTitle='如何重置路由器'
                isVisible={forgetPasswordVisible}
                cancle={() => {
                    setForgetPasswordVisible(false);
                }}
                confirm={() => {
                    // 直接跳转到WiFi详情页面
                    navigation.navigate('ResetRoute')
                    console.log('点击了确认'); setForgetPasswordVisible(false);
                }}

                onBackdropPress={() => {
                    console.log('111111');
                    setForgetPasswordVisible(false);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    avoidKeyboard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    container: {
        width: '100%',
        flexGrow: 1,
        paddingHorizontal: responseSize * 35,

    },
    headContent: {
        marginTop: responseSize * 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    routerPassWord: {
        marginTop: responseSize * 21,
    },
    directionImg: {
        width: responseSize * 300,
        height: responseSize * 100,
    },
    passWord: {
        // marginTop:30,
        textAlign: 'left',
    },
    passWordInputBox: {
        position: 'relative',
        width: responseSize * 280,
        height: responseSize * 44,
    },
    passWordInput: {
        marginTop: responseSize * 10,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8F8',
        width: responseSize * 280,
        height: responseSize * 44,
        borderRadius: responseSize * 10,
        color: '#414245',
        paddingRight: responseSize * 40,
    },
    passWordInputImageTap: {
        position: 'absolute',
        top: '50%',
        right: responseSize * -5,
        width: responseSize * 32,
        height: responseSize * 32,
        marginTop: -responseSize * 6,
    },
    passWordInputImage: {
        // position:'absolute',
        // top:'50%',
        right: responseSize * 15,
        width: responseSize * 32,
        height: responseSize * 32,
        // marginTop:-responseSize*6,
    },
    forgetPassword: {
        marginTop: responseSize * 10,
        fontSize: responseSize * 12,
        fontWeight: '700',
        color: global.buttonColor,
        marginBottom: responseSize * 10,
    },
    defaultPassword: {
        fontSize: responseSize * 12,
        fontWeight: '400',
        color: '#4142454D',
        marginBottom: responseSize * 10,
        width: responseSize * 280,
    },
    footer: {
        marginTop: responseSize * 20,
        marginBottom: responseSize * 20,
    }
});
export default App;
