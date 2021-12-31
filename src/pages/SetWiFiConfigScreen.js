import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
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

let title = `How does your router emit Wi-Fi?`
let imgUrlCloseEye = require('../../src/assets/images/ic_login_eye_off/ic_login_eye_off.png')
let imgUrlEye = require('../../src/assets/images/ic_login_eye_on/ic_login_eye_on.png')
let firstTimer
const app = ({ navigation, route }) => {


    const inputEl = useRef(null);
    const [backup, setBackup] = useState(false);
    const [intergrateSSID, setIntergrateSSID] = useState(true);
    const [tz, setTz] = useState('');

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
            title: 'SetWiFiConfig',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);
    let loadStorageData = async () => {
        let wifiConfig = await getStorageData({ uid: global.uid, lanMac: global.lanMac }, 'wificonfig')
        console.log(wifiConfig, 'wifiConfig')
        if (wifiConfig != null) {
            wifiConfig = JSON.parse(wifiConfig)
            conle.log(wifiConfig)
            setHssid(wifiConfig.hssid == '1' ? true : false)
            setSsid(wifiConfig.ssid)
            setKey(wifiConfig.key)
            setKey(wifiConfig.wpaMode == '1' ? true : false)
            if (wifiConfig.merge == '1') {
                setIntergrateSSID(true)
            } else {
                setIntergrateSSID(false)
                setHssid5g(wifiConfig.hssid5g == '1' ? true : false)
                setSsid5g(wifiConfig.ssid5g)
                setKey5g(wifiConfig.key5g)
                setKey(wifiConfig.wpaMode5g == '1' ? true : false)
            }
            if (wifiConfig.key == wifiConfig.loginpass) {
                setLoginpass(true)
            } else {
                setLoginpass(false)
            }
        }
    }
    useEffect(() => {
        console.log("这是模拟componentDidMount钩子函数")
        console.log(route.params, '上一页传过来的值')
        _getNtpCfg()
        loadStorageData()
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
    let _setWifi = async () => {
        setLoading(true)
        let data = {
            tz,
            wizard: "1",
            topicurl: "setWizardCfg"
        }
        let tempdata;
        if (useRouterPassword) {
            setLoginpass(key)
        }
        if (intergrateSSID) {
            tempdata = {
                ssid,
                key,
                ssid5g: ssid,
                key5g: key,
                merge: '1',
                hssid: hssid ? '1' : '0',
                hssid5g: hssid ? '1' : '0',
                wpaMode: wpaMode ? '1' : '2',
                wpaMode5g: wpaMode ? '1' : '2',
                loginpass,
                wifiOff: "0",
                wifiOff5g: "0",

            }
            Object.assign(data, tempdata)
            Object.assign(data, route.params)
        } else {
            tempdata = {
                ssid,
                key,
                ssid5g,
                key5g,
                merge: '1',
                hssid: hssid ? '1' : '0',
                hssid5g: hssid5g ? '1' : '0',
                wpaMode: wpaMode ? '1' : '2',
                wpaMode5g: wpaMode5g ? '1' : '2',
                loginpass,
                wifiOff: "1",
                wifiOff5g: "1",
            }
            Object.assign(data, tempdata)
            Object.assign(data, route.params)
        }
        console.log(data)

        if (global.debug == false) {
            try {
                let res = await postData(global.wifiNetworkIP, data)
                console.log(res)
                if (res.success == true) {
                    setLoading(false)
                    navigation.navigate('ConfigSuccessful')
                } else {
                    setLoading(false)
                    console.log(res)
                }
            } catch (e) {
                setLoading(false)
                Toast.show('出错了！')
            }

        } else {
            navigation.navigate('ConfigSuccessful')
        }
        console.log(global.lanMac)
        console.log(data, '请求的数据')
        _storeWifiConfig(route.params, tempdata, data)
    }
    let _getNtpCfg = async () => {
        let data = {
            topicurl: 'getNtpCfg'
        }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
        setTz(res.tz)
    }
    let _storeWifiConfig = async (params, tempdata, data) => {
        let moduleObject = {
            uid: global.uid,
            lanMac: global.lanMac
        }
        let moduleKey = Object.values(moduleObject).reduce((a, n) => {
            return a + '_' + n
        }) + '_' + 'netAndwifiConfig'
        Object.assign(data, { sotrageKey: moduleKey })
        if (backup) {
            await setStorageData({ uid: global.uid, lanMac: global.lanMac }, 'wifiConfig', JSON.stringify(tempdata))
        }
        await setStorageData({ uid: global.uid, lanMac: global.lanMac }, 'netAndwifiConfig', JSON.stringify(data))
        await _sendDeviceInfoToNative()
        // _storeRnDeviceList(moduleKey)
    }
    let _sendDeviceInfoToNative = async () => {
        let nativeStoreDiviceData = {
            uid: global.uid,
            lanMac: global.lanMac,
            model: global.model,
            deviceName: 'GNCC-E230',
            key: 'addRouterDiveice'
        }
        let res = await nativeDevicestore(nativeStoreDiviceData)
        console.log(res)
    }
    // rn 实现的设备列表,实际业务暂不用
    _storeRnDeviceList = async (moduleKey) => {
        let wifiList = []
        let wifiListStr = await getStorageData({ uid: global.uid }, 'wifiList')
        if (wifiListStr != null) {
            wifiList = JSON.parse(wifiListStr)
        }
        wifiList.push(moduleKey)
        let s = new Set(wifiList)
        wifiList = [...s]
        await setStorageData({ uid: global.uid }, 'wifiList', JSON.stringify(wifiList))
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : responseSize * -360}
                enabled='true'
            >
                <ScrollView contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    ref={inputEl}
                    bounces={false}
                >
                    <Progress step={2}></Progress>
                    <View style={styles.headContent}>
                        <Title title={title} />
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
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <FootButton
                        loading={loading}
                        onPress={_setWifi}
                        title={'Next'}
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
        width: responseSize * 200,
        height: responseSize * 200,
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
