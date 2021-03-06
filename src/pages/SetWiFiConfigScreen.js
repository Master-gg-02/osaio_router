import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, KeyboardAvoidingView ,TouchableOpacity} from 'react-native';
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
import { translations } from '../i18n'

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
            title: translations.router_wifi_setting,
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
        console.log("????????????componentDidMount????????????")
        console.log(route.params, '????????????????????????')
        _getNtpCfg()
        loadStorageData()
        return () => {
            //return???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            clearTimeout(firstTimer)
            console.log("????????????componentWillUnmount????????????")
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
            //return???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            console.log("????????????componentWillUnmount????????????")
        }
    }, [ssid, key, loginpass, ssid5g, key5g])

    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            console.log("?????????")
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
                Toast.show('????????????')
            }

        } else {
            navigation.navigate('ConfigSuccessful')
        }
        console.log(global.lanMac)
        console.log(data, '???????????????')
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
            deviceName: global.ssid,
            key: 'addRouterDiveice'
        }
        let res = await nativeDevicestore(nativeStoreDiviceData)
        console.log(res)
    }
    // rn ?????????????????????,?????????????????????
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

    // const Skip = () => {
    //     return (
    //         <Text style={styles.skip}>
    //             skip
    //         </Text>
    //     )
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? 20 : responseSize * -360}
                enabled='true'
            >
                <ScrollView contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    ref={inputEl}
                    bounces={false}
                >
                    <Progress step={1}></Progress>
                    <View style={styles.headContent}>
                        <Title title={translations.router_add_set_net_wifi_config_title} />
                        <View style={styles.backupSet}>
                            <Text style={styles.backupSetText}>
                                {translations.router_config_backup}
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
                                        {translations.router_smart_intergrated_ssid}
                                    </Text>
                                    <Switch
                                        value={intergrateSSID}
                                        onSyncPress={value => {
                                            setIntergrateSSID(value)
                                        }} />
                                </View>
                                <Text style={styles.smartSsidText}>
                                    {translations.router_smart_intergrated_ssid_tip}
                                </Text>
                            </View>
                            <View style={styles.networkName}>
                                <Text style={styles.title}>
                                    {translations.router_wifi_name_ssid}({intergrateSSID ? 'SSID' : '2.4G'})
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
                                        {translations.router_hidden_ssid}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.networkName}>
                                <Text style={styles.title}>
                                    {translations.router_wifi_password}({intergrateSSID ? 'SSID' : '2.4G'})
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
                                        {translations.router_support_wpa3_encryption}
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
                            <View style={{ ...styles.networkName, marginTop: responseSize * 20 }}>
                                {useRouterPassword ? <></> :
                                    <>
                                        <Text style={styles.title}>
                                            {translations.router_admin_password}
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
                                                firstTimer = setTimeout(() => {
                                                    inputEl.current.scrollToEnd({ animated: true });
                                                }, 0)
                                            }
                                        }}
                                    ></Checked>
                                    <Text style={styles.checkText}>
                                        {translations.router_admin_password_tip}
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
                        title={translations.next}
                        // title={route.params.fromPage=='DeviceHome'?'Save':'Next'}
                        color={global.buttonColor}
                        disabled={checkOK}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ConfigSuccessful')
                        }}
                    >
                        <Text style={styles.footText}>
                            {translations.router_add_set_net_config_footer}
                            <Text style={styles.skip}>
                                {translations.router_add_set_net_config_footer_skip}
                            </Text>
                            {translations.router_add_set_net_config_footer_it}
                        </Text>
                    </TouchableOpacity>
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
        width: responseSize * 18,
        height: responseSize * 18,
        margin: responseSize * 6,
        borderRadius: responseSize * 9,
        backgroundColor: 'rgba(65, 66, 69, 0.3)'
    },
    checkText: {
        flexWrap: 'wrap',
        marginLeft: responseSize * 12,
        color: '#9D9D9D',
        fontWeight: '400',
    },
    footer: {
        marginTop: responseSize * 10,
    },
    footText: {
        color: '#4142454D',
        marginBottom: responseSize * 12,
        marginHorizontal: responseSize * 20,
        marginTop: responseSize * 5,

    },
    skip: {
        marginBottom: responseSize * 12,
        color: global.buttonColor
    }

});
export default app;
