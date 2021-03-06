import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView, PlatformColor } from 'react-native';
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import SetItem from '../component/SetItem'
import * as RNLocalize from 'react-native-localize';
import { getStorageData } from '../api/getStorageData'
import { nativeGatewayIP } from '../utils/bridge'
import { translations } from '../i18n'
import { postData } from '../api/postData'
import global from '../utils/global';
let responseSize = global.responseSize
import Toast from 'react-native-root-toast';
let imgUrl = require('../../src/assets/images/wifi_logo/wifi_logo.png')
let ConnectedSetUrl = require('../../src/assets/images/ic_link_connect/ic_link_connect.png')
let NetworkSettingUrl = require('../../src/assets/images/ic_link_features_network/ic_link_features_network.png')
let TimeSettingUrl = require('../../src/assets/images/ic_link_features_done/ic_link_features_done.png')
let ParentalControlUrl = require('../../src/assets/images/ic_link_parental/ic_link_parental.png')

let guestWifiUrl = require('../../src/assets/images/ic_link_features_guest/ic_link_features_guest.png')
let WifiManagemantUrl = require('../../src/assets/images/ic_link_features_managemant/ic_link_features_managemant.png')

// import NetInfo from "@react-native-community/netinfo";

// import { NetworkInfo } from 'react-native-network-info';
const App = ({ navigation }) => {
    const [upRate, setUpRate] = useState('0');
    const [downRate, setDownRate] = useState('0');
    const [connectCounts, setConnectCounts] = useState(0);
    const [showIndicator, setShowIndicator] = useState(false);
    const [title, setTitle] = useState(global.ssid);

    let conversionRate = async (n) => {
        if (n >= 100 && n <= 1024) {
            let a = (n / 1024).toFixed(3)
            return a * 8 + 'm'
        } else if (n > 1024) {
            let a = (n / (1024 * 1024)).toFixed(3)
            return a * 8 + 'g'
        } else if (n > 1024 * 1024) {
            let a = (n / (1024 * 1024)).toFixed(3)
            return a * 8 + 't'
        } else {
            return n * 8 + 'k'
        }
    }
    let getSystemIp = async () => {
        let res = await nativeGatewayIP({});
        if (res.result == true) {
            global.wifiNetworkIP = res.routerip
        }
    }

    let getNetInfoCfg = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: "getNetInfoCfg" })
        let up = await conversionRate(res.up)
        let down = await conversionRate(res.down)
        setUpRate(up)
        setDownRate(down)
    }
    let getAccessDeviceCfg = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: "getAccessDeviceCfg" })
        let whiteCount = res.white.length
        let blackCount = res.black.length
        let n = whiteCount + blackCount
        setConnectCounts(n)
    }
    _getLanMac = async () => {
        // ??????WiFi???????????????
        let res = await postData(global.wifiNetworkIP, {
            topicurl: "getSysStatusCfg"
        })
        global.lanMac = res.lanMac
        setTitle(res.productName)
        global.productName = res.productName
        let ssid = await getStorageData({
            uid: global.uid
        }, 'deviceName')
        if (ssid = !null) {
            global.ssid = ssid
        } else {
            global.ssid = res.ssid

        }
        // console.log(res, '??????')
    }

    useEffect(() => {
        if (!global.debug) {
            if (!global.nativeDebug) {
                getSystemIp().then(() => {
                    getNetInfoCfg()
                    getAccessDeviceCfg()
                    _getLanMac()
                })
            }
        }
        // Subscribe
        // const unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        // });
        // NetInfo.fetch("other").then(state => {
        //     console.log("SSID", state.details);
        //     console.log("BSSID", state.details.bssid);
        //     console.log("Is connected?", state.isConnected);
        // });




        // Unsubscribe


        // interval(function () {

        // }, 3000, 20);
        return () => {
            // unsubscribe();

            //return???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            // myClearInterval(timer)
        }
    }, [])
    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            // console.log('responseSize',global.responseSize)
        }
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#F5F7FA',
                borderBottomWidth: 0,
                elevation: 0,
            },
            headerLeft: () => (
                <NavReturn type='home' />
            ),
            headerRight: () => (
                <NavReturn type='set' />
            ),
        });
    }, []);

    const RateItem = (props) => {
        return (
            <View style={styles.itemBox}>
                <Text style={styles.title}>
                    {props.rate}bps
                </Text>
                <Text style={styles.rateText}>
                    {props.rateText}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headContent}>
                    <Image
                        style={styles.logoImg}
                        source={imgUrl}
                    />
                    <View style={styles.rateBox}>
                        {/* 'Download rate' */}
                        <RateItem rate={downRate} rateText={translations.router_detail_download_rate} />
                        <View style={styles.divider} ></View>
                        <RateItem rate={upRate} rateText={translations.router_connect_setting_upload_rate} />
                    </View>
                    <View style={styles.settingList}>
                        <SetItem iconUrl={ConnectedSetUrl} head={translations.online} counts={connectCounts} setName={translations.router_detail_connect_device} onPress={() => { navigation.navigate('ConnectDevideList') }} />
                        <SetItem iconUrl={ParentalControlUrl} setName={translations.router_connect_setting_parental_control} onPress={() => { navigation.navigate('ParentalControl') }} />
                        <SetItem iconUrl={WifiManagemantUrl} setName={translations.router_detail_wifi_manager} onPress={() => { navigation.navigate('UpdateWiFiConfig') }} />
                        <SetItem iconUrl={guestWifiUrl} setName={translations.router_guest_wifi_guest_wifi} onPress={() => { navigation.navigate('GusetWiFiConfig') }} />
                        <SetItem iconUrl={NetworkSettingUrl} setName={translations.router_detail_net_setting} onPress={() => { navigation.navigate('UpdateNetConfig') }} />
                        <SetItem iconUrl={TimeSettingUrl} setName={translations.router_detail_time_setting} onPress={() => { navigation.navigate('RouterTimerSet') }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: responseSize * 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: global.setThemeColor,
    },
    headContent: {
        marginTop: responseSize * 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rateBox: {
        marginTop: responseSize * 20,
        width: responseSize * 335,
        height: responseSize * 70,
        paddingVertical: responseSize * 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: global.whiteBackgroundColor,
        shadowColor: global.shadowColor,
        shadowOffset: {
            width: responseSize * 0,
            height: responseSize * 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: responseSize * 4,
        borderRadius: responseSize * 10,
    },
    itemBox: {
        flex: 1,
        width: responseSize * 150,
    },
    title: {
        fontSize: responseSize * 20,
        fontWeight: '500',
        lineHeight: responseSize * 23.87,
        textAlign: 'center',
        color: '#010C11'
    },
    divider: {
        width: responseSize * 1,
        height: responseSize * 40,
        backgroundColor: '#010C11',
        opacity: 0.1,

    },
    rateText: {
        marginTop: responseSize * 8,
        textAlign: 'center',
        lineHeight: responseSize * 17.9,
        fontSize: responseSize * 15,
        fontWeight: '400',
        color: '#010C11',
        opacity: 0.5,
    },
    logoImg: {
        width: responseSize * 80,
        height: responseSize * 80,
    },
    settingList: {
        marginTop: responseSize * 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
});
export default App;
