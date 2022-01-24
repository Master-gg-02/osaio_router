import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, View, StyleSheet, Image, Text, ScrollView, AppState, AppStateStatic } from 'react-native';
import Progress from '../component/Progress'
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Dialog from '../component/Dialog'
import { nativeWiFiView, nativeGatewayIP } from '../utils/bridge'
import { nativePopPage } from '../utils/bridge'
import { translations } from '../i18n'
import { postData } from '../api/postData'
import { getStorageData } from '../api/getStorageData'
import { clearStorageData } from '../api/clearStorageData'


import global from '../utils/global';
let responseSize = global.responseSize
console.log(typeof responseSize, 'responseSize')

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
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        }
    }, [])
    let _getWifiModle = async () => {
        console.log(222222, global.wifiNetworkIP)

        // 获取WiFi设备的品类名称
        let getInitCfg = await postData(global.wifiNetworkIP, {
            topicurl: 'getInitCfg'
        })
        console.log(getInitCfg, 2222)
        global.model = getInitCfg.model
        console.log(global.model, 'model')
    }
    let _getLanMac = async () => {
        console.log(222221, global.wifiNetworkIP)
        // 获取WiFi设备的型号
        let res = await postData(global.wifiNetworkIP, {
            topicurl: "getSysStatusCfg"
        })
        global.lanMac = res.lanMac
        global.ssid = res.ssid
        global.productName = res.productName
        console.log(res.lanMac, 'lanMac')
    }
    // 获取系统的WiFi地址
    let _getGateWay = async () => {
        let res = await nativeGatewayIP({});
        console.log(res, 'ip地址')
        if (res.result) {
            global.wifiNetworkIP = res.routerip
        } else {
            // 提示用户是否正确连接WiFi
            console.log('请检查是否正确连接')
        }
    }
    //从缓存中取存储的网络或者WiFi配置信息
    let checkConfig = async () => {
        let res = await getStorageData({
            uid: global.uid,
            lanMac: global.lanMac
        }, 'netAndwifiConfig')
        console.log(res, 'netAndwifiConfig')
        if (res != null) {
            setModalVisible(true)
            return
        }
    }
    _findSystemWifi = async () => {
        try {
            await _getGateWay()
            await Promise.all([_getWifiModle(), _getLanMac()])
            await checkConfig()
            navigation.navigate('LoginRouter')
        } catch (e) {
            console.log(e);
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
            title: translations.router_connect_head,
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
                    <Progress step={0}></Progress>
                    <Title title={translations.router_connect_header} />
                    <Image
                        style={styles.directionImg}
                        resizeMode='center'
                        source={imgUrl}
                    />
                    <View>
                        <Text style={styles.textAttention}>
                            {translations.router_connect_indictor.format('')}
                        </Text>
                    </View>
                </View>
                <FootButton
                    onPress={async () => {
                        let res = await nativeWiFiView({});
                        console.log(res)
                    }}
                    title={translations.router_connect_head}
                    color={global.buttonColor}
                />
            </ScrollView>
            <Dialog
                title={translations.router_connect_dialog_title}
                content={translations.router_router_connect_wifi_msg}
                cancleTitle={translations.cancel_normal}
                confirmTitle={translations.router_connect_dialog_check}
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
        marginBottom: 10,
    },
    directionImg: {
        width: responseSize * 280,
        height: responseSize * 160,
    },
});
export default App;
