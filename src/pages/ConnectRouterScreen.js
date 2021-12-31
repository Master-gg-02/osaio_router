import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, View, StyleSheet, Image, Text, ScrollView, AppState,AppStateStatic } from 'react-native';
import Progress from '../component/Progress'
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Dialog from '../component/Dialog'
import { nativeWiFiView, nativeGatewayIP } from '../utils/bridge'
import {nativePopPage} from '../utils/bridge'

import { postData } from '../api/postData'



import { getStorageData } from '../api/getStorageData'
import { clearStorageData } from '../api/clearStorageData'
// import {responseSize} from '..//utils/util'

import global from '../utils/global';
let responseSize=global.responseSize
console.log(typeof responseSize,'responseSize')
 
let title = `Please connect to the router hotspot`
let attention = `1. Connect to Wi-Fi starting with “GNCC”
2. Return to Osaio APP after successful connection`
let imgUrl = require('../../src/assets/images/illus_wifi_router/illus_wifi_router.png')

const App = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const appState = useRef(AppState.currentState);
    // const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            _findSystemWifi()
        }

        appState.current = nextAppState;
        // setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };

    useEffect(() => {
        // 获取本地存储的路由列表设备 查看当前设备是否已经被添加
        console.log("这是模拟componentDidMount钩子函数", 'connect')
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            // clearTimeout(timer)
            AppState.removeEventListener("change", _handleAppStateChange);
            // AppStateStatic.removeEventListener("change", _handleAppStateChange);
            // .removeEventListener()
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [])
    _getWifiModle = async() => {
        // 获取WiFi设备的品类名称
        let getInitCfg = await postData(global.wifiNetworkIP, {
            topicurl: 'getInitCfg'
        })
        global.model = getInitCfg.model
        console.log(global.model,'model')
    }
    _getLanMac = async() => {
        // 获取WiFi设备的型号
        let res = await postData(global.wifiNetworkIP, {
            topicurl: "getSysStatusCfg"
        })
        global.lanMac = res.lanMac
        console.log(res.lanMac,'lanMac')
    }
    _findSystemWifi = async () => {
        try {
            // 获取系统的WiFi地址
            let res = await nativeGatewayIP({});
            console.log(res, 'ip地址')
            if (res.status == 'ok') {
                global.wifiNetworkIP = res.responsed
                timer = null
            } else {
                // 提示用户是否正确连接WiFi
                console.log('请检查是否正确连接')
            }
            // 取mac地址和model名称
            // if (global.debug == false) {

            // }
            await _getLanMac()
            await _getWifiModle()
         
            //从缓存中取存储的网络或者WiFi配置信息
            let getNetAndwifiConfig = await getStorageData({
                uid: global.uid,
                lanMac: global.lanMac
            }, 'netAndwifiConfig')
            console.log(getNetAndwifiConfig, 12331)
            if (getNetAndwifiConfig != null) {
                setModalVisible(true)
                return
            }

            // 如果不存在则跳转到下一页
            navigation.navigate('LoginRouter')

        } catch (e) {
            console.error(e);
        }
    }
    //第二个参数一定是一个空数组，因为如果不写会默认监听所有状态，这样写就不会监听任何状态，只在初始化时执行一次。
    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            console.log("更新了")
        }
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Connect',
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
            <ScrollView contentContainerStyle={styles.container}
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
                    <View>
                        <Text style={styles.textAttention}>
                            {attention}
                        </Text>
                    </View>
                </View>
                <FootButton
                    onPress={async () => {
                        // 已经连接过WiFi直接调到下一页
                        // if (global.wifiNetworkIP != '') {
                        //     navigation.navigate('LoginRouter')
                        //     return
                        // }

                        let res = await nativeWiFiView({});
                        console.log(res)
                    }}
                    title='Connect'
                    color={global.buttonColor}
                />
            </ScrollView>
            <Dialog
                title='You have bound the device'
                content='Wi-Fi of the router is connected, and the router already exists in the device list'
                cancleTitle='Cancle'
                confirmTitle='Check'
                isVisible={modalVisible}
                cancle={() => {
                    clearStorageData({ uuid: global.uid, lanMac: global.lanMac }, 'netAndwifiConfig')
                    // console.log('暂时清除同一设备的缓存');
                     setModalVisible(false);
                     nativePopPage()
                }}
                confirm={() => {
                    // 直接跳转到WiFi详情页面
                    navigation.navigate('DeviceHome')
                    console.log('点击了确认'); setModalVisible(false);
                }}
                onBackdropPress={() => {
                    console.log('111111');
                    setModalVisible(false);
                }}
            />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: responseSize * 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    headContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    textAttention: {
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: responseSize * 20,
        marginTop: responseSize * 20,
        marginBottom:  10,
    },
    directionImg: {
        width: responseSize * 280,
        height: responseSize * 160,
    },
});
export default App;
