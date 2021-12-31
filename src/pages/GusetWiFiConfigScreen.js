import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import Progress from '../component/Progress'
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import Checked from '../component/Checked'
import NavReturn from '../component/NavReturn'
import { postData } from '../api/postData'
import PassWordInput from '../component/PasswordInput'
import NormalContainder from '../component/NormalContainder'
import UserInput from '../component/UserInput'
// import TitleAndTextInput from '../component/TitleAndTextInput'
import { nativeDevicestore } from '../utils/bridge'
import Switch from '../component/Switch'
import Toast from 'react-native-root-toast';


import { setStorageData } from '../api/setStorageData'
import { getStorageData } from '../api/getStorageData'
import { clearStorageData } from '../api/clearStorageData'

import CounterEmitter from '../utils/CountEmitter';

import global from '../utils/global';
let responseSize = global.responseSize

let title = `This network is used by guests`
let imgUrlCloseEye = require('../../src/assets/images/ic_login_eye_off/ic_login_eye_off.png')
let imgUrlEye = require('../../src/assets/images/ic_login_eye_on/ic_login_eye_on.png')
let imgUrl = require('../../src/assets/images/ic_link_visitors/ic_link_visitors.png')

let firstTimer
const app = ({ navigation, route }) => {


    const inputEl = useRef(null);
    const [backup, setBackup] = useState(false);
    const [intergrateSSID, setIntergrateSSID] = useState(true);
    const [goto, setGoto] = useState(false);
    const [openGuest, setOpenGuest] = useState(false);


    const [checkOK, setCheckOK] = useState(false);

    const [ssid, setSsid] = useState('GNCC-E230');
    const [hssid, setHssid] = useState(false);
    const [key, setKey] = useState('');
    const [wpaMode, setWpaMode] = useState(false);


    const [ssid5g, setSsid5g] = useState('GNCC-E230-5g');
    const [hssid5g, setHssid5g] = useState(false);
    const [key5g, setKey5g] = useState('');
    const [wpaMode5g, setWpaMode5g] = useState(false);

    const [loginpass, setLoginpass] = useState('');
    const [useRouterPassword, setUseRouterPassword] = useState(false);
    let [loading, setLoading] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'SetGuessWiFiConfig',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#F5F7FA',
                borderBottomWidth: 0,
                // elevation: 0,
            },
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);
    let loadStorageData = async () => {
        let guessWificonfig = await getStorageData({ uid: global.uid, lanMac: global.lanMac }, 'guessWificonfig')
        console.log(guessWificonfig, 'guessWificonfig')
        if (guessWificonfig != null) {
            setIntergrateSSID(JSON.parse(guessWificonfig))
        }
    }
    useEffect(() => {
        _getWiFiGuestCfg()
        loadStorageData().then(() => {
            if (!intergrateSSID) {
                _getWiFiGuestCfg5g()
            }
        })
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            clearTimeout(firstTimer)
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [])
    useEffect(() => {

        let validatorValue = () => {
            let a = [ssid, key, loginpass].filter((n) => {
                return n.length < 8 || n.length > 64
            }).length
            if (a == 0 || loginpass == 'admin') {
                setCheckOK(false)
            } else {
                setCheckOK(true)
            }
            if (intergrateSSID == false) {
                let a = [ssid5g, key5g, loginpass].filter((n) => {
                    return n.length < 8 || n.length > 64
                }).length
                if (a == 0 || loginpass == 'admin') {
                    setCheckOK(false)
                } else {
                    setCheckOK(true)
                }
            }

        }
        validatorValue()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [ssid, key, loginpass, ssid5g, key5g])

    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            console.log("更新了")
        }
    })

    let _getWiFiGuestCfg5g = async () => {
        let data = {
            wifiIdx: '1',
            topicurl: 'getWiFiGuestCfg'
        }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res, '5g网络配置')
        if (res.key) {
            setKey5g(res.key)
        }
        setSsid5g(res.ssid)
        setKey5g(res.key)
        setHssid5g(res.hssid)
    }
    let _getWiFiGuestCfg = async () => {
        let data = {
            wifiIdx: '0',
            topicurl: 'getWiFiGuestCfg'
        }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res, '2.4网络配置')
        setSsid(res.ssid)
        if (res.key) {
            setKey(res.key)
        }
        setHssid(res.hssid)
    }
    let _setWifi = async () => {
        setLoading(true)
        let data = {
            setWiFiGuestCfg: 'setWiFiGuestCfg'
        }
        let data0 = {
            wifiOff: "0",
            hssid: hssid,
            ssid: ssid,
            key: key,
            wifiIdx: "0",
            accessEnabled: "0",
            topicurl: "setWiFiGuestCfg"
        }
        let data1 = {
            wifiOff: "0",
            hssid: hssid5g,
            ssid: ssid5g,
            key: key5g,
            wifiIdx: "0",
            accessEnabled: "0",
            topicurl: "setWiFiGuestCfg"
        }
        if (intergrateSSID) {
            // 部分频段请求
            delete data0.topicurl
            delete data0.wifiIdx
            data['wifi.1.ap.1'] = JSON.parse(JSON.stringify(data0))
            data['wifi.2.ap.1'] = JSON.parse(JSON.stringify(data0))
            let res = await postData(global.wifiNetworkIP, data)
            console.log(res)
        } else {
            let res1 = await postData(global.wifiNetworkIP, data0)
            let res2 = await postData(global.wifiNetworkIP, data1)
            console.log(res1, res2)
        }
        await setStorageData({ uid: global.uid, lanMac: global.lanMac }, 'guessWificonfig', JSON.stringify(openGuest))
    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : responseSize * 20}
                enabled='true'
            >
                <ScrollView contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    ref={inputEl}
                    bounces={false}
                >
                    <Image
                        style={styles.directionImg}
                        resizeMode='center'
                        source={imgUrl}
                    />
                    <Title title={title} />
                    <View style={{ marginBottom: responseSize * 10, ...styles.backupSet }}>
                        <Text style={styles.backupSetText}>
                            Guest WIFI
                        </Text>
                        <Switch
                            value={openGuest}
                            onSyncPress={value => {
                                setOpenGuest(value)
                            }} />
                    </View>
                    {
                        openGuest ? <View style={styles.headContent}>

                            <View style={styles.backupSet}>
                                <Text style={styles.backupSetText}>
                                    Use backup settings
                                </Text>
                                <Switch
                                    value={backup}
                                    onSyncPress={value => {
                                        setBackup(value)
                                    }} />
                            </View>
                            <View>
                                <View style={styles.smartSSID}>
                                    <View style={styles.smartSsidHead}>
                                        <Text style={styles.smartSsidHeadText}>
                                            Smart Integrated SSID
                                        </Text>
                                        <Switch
                                            value={intergrateSSID}
                                            onSyncPress={value => {
                                                setIntergrateSSID(value)
                                            }} />
                                    </View>
                                    <Text style={styles.smartSsidText}>
                                        Use the same SSID on both 2.4G and 5G,and the
                                        5G is preferred at the same signal level.
                                    </Text>
                                </View>
                                <View style={styles.networkName}>
                                    <Text style={styles.title}>
                                        Wi-Fi Network Name({intergrateSSID ? 'SSID' : '2.4G'})
                                    </Text>
                                    <UserInput
                                        defaultValue={ssid}
                                        onChange={(e) => { setSsid(e.nativeEvent.text) }}
                                    />
                                    <View style={styles.networkNameFooter}>
                                        <Checked
                                            value={hssid}
                                            onPress={() => {
                                                setHssid(!hssid)
                                            }}
                                        ></Checked>
                                        <Text style={styles.checkText}>
                                            Hidden SSID
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.networkName}>
                                    <Text style={styles.title}>
                                        Wi-Fi Network Password({intergrateSSID ? 'SSID' : '2.4G'})
                                    </Text>
                                    <PassWordInput
                                        defaultValue={key}
                                        onChange={
                                            (e) => { setKey(e.nativeEvent.text) }
                                        } />
                                    <View style={styles.networkNameFooter}>
                                        {
                                            key.length >= 8 ?
                                                <Checked
                                                    value={wpaMode}
                                                    onPress={() => {
                                                        setWpaMode(!wpaMode)
                                                    }}
                                                ></Checked> :
                                                <View style={styles.encDisable}></View>
                                        }
                                        <Text style={styles.checkText}>
                                            Support WPA3 encryption{wpaMode}
                                        </Text>
                                    </View>
                                </View>
                                {
                                    intergrateSSID ? <></> : <NormalContainder
                                        ssid={ssid5g}
                                        ssidkey={key5g}
                                        hssid={hssid5g}
                                        wpaMode={wpaMode5g}
                                        ssidOnChange={
                                            (e) => {
                                                setSsid5g(e.nativeEvent.text)
                                            }
                                        }
                                        hssidOnChange={
                                            () => { setHssid5g(!hssid5g) }
                                        }
                                        keyOnChange={
                                            (e) => {
                                                setKey5g(e.nativeEvent.text)
                                            }
                                        }
                                        wpaModeOnChange={
                                            () => { setWpaMode5g(!wpaMode5g) }
                                        }
                                    />
                                }
                                <View style={styles.networkName}>
                                    {useRouterPassword ? <></> :
                                        <>
                                            <Text style={styles.title}>
                                                Router's Admin Password
                                            </Text>
                                            <PassWordInput
                                                defaultValue={loginpass}
                                                onChange={
                                                    (e) => {
                                                        setLoginpass(e.nativeEvent.text)
                                                    }
                                                }
                                            />
                                        </>
                                    }
                                    <View style={styles.networkNameFooter}>
                                        <Checked
                                            value={useRouterPassword}
                                            onPress={() => {
                                                setUseRouterPassword(!useRouterPassword);
                                                if (useRouterPassword) {
                                                    console.log(1111)
                                                    firstTimer = setTimeout(() => {
                                                        inputEl.current.scrollToEnd({ animated: true });
                                                    }, 0)
                                                }
                                            }}
                                        ></Checked>
                                        <Text style={styles.checkText}>
                                            Use Wi-Fi Password as Router's Admin Password
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View> : <></>

                    }
                </ScrollView>
                <View style={styles.footer}>
                    <FootButton
                        loading={loading}
                        onPress={_setWifi}
                        title={'Save'}
                        // title={route.params.fromPage=='DeviceHome'?'Save':'Next'}
                        color={global.buttonColor}
                        disabled={checkOK}
                    />
                    <Text style={styles.footText}>
                        The router has been able to access the Internet normally. If you don't need to switch the network mode, you can skip it
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    avoidKeyboard: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'

    },
    container: {
        padding: responseSize * 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    headContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    textAttention: {
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: responseSize * 20,
        marginTop: responseSize * 20,
        marginBottom: responseSize * 10,
    },
    directionImg: {
        marginTop: responseSize * 65,
        width: responseSize * 80,
        height: responseSize * 80,
    },
    passwordBox: {
        // width:'100%',
        // textAlign:'left',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: responseSize * 20,

    },
    staticIpDress: {
        marginTop: responseSize * 10,
        width: responseSize * 345,
        maxHeight: responseSize * 200,
        padding: responseSize * 10,
    },
    staticItem: {
        // flexDirection:'row'
    },
    staticItemText: {
        marginBottom: responseSize * 5,
    },
    password: {
        backgroundColor: '#F8F8F8',
        width: responseSize * 345,
        height: responseSize * 44,
        borderRadius: responseSize * 10,
        color: '#414245',
        marginBottom: responseSize * 10,
    },
    backupSet: {
        paddingHorizontal: responseSize * 20,
        width: responseSize * 345,
        height: responseSize * 50,
        borderRadius: responseSize * 10,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backupSetSwitch: {
        height: responseSize * 30,
    },
    smartSSID: {
        borderRadius: responseSize * 10,
        marginTop: responseSize * 10,
        paddingHorizontal: responseSize * 20,
        paddingVertical: responseSize * 10,
        backgroundColor: '#F8F8F8',
        width: responseSize * 345,
    },
    smartSsidText: {
        fontSize: responseSize * 10,
        fontWeight: '700',
        color: '#9D9D9D',
        lineHeight: 14,
    },
    smartSsidHead: {
        height: responseSize * 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    networkName: {
        marginTop: responseSize * 10,
    },
    title: {
        color: '#414245',
        fontWeight: '700',
        marginBottom: responseSize * 10,
    },
    networkNameText: {
        width: responseSize * 345,
        height: responseSize * 44,
        backgroundColor: 'rgba(65, 66, 69, 0.05)',
        borderRadius: responseSize * 10,
    },
    networkNameFooter: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    encDisable: {
        width: responseSize * 16,
        height: responseSize * 16,
        borderRadius: responseSize * 8,
        backgroundColor: 'rgba(65, 66, 69, 0.3)'
    },
    checkText: {
        // maxWidth:responseSize*345,
        flexWrap: 'wrap',
        marginLeft: responseSize * 10,
        color: '#414245',
        fontWeight: '700',
        // marginBottom: responseSize * 28,
    },
    footer: {
        marginTop: responseSize * 10,
    },
    footText: {
        color: '#4142454D',
        marginBottom: responseSize * 12,
        marginHorizontal: responseSize * 20,
        marginTop: responseSize * 5,

    }

});
export default app;
