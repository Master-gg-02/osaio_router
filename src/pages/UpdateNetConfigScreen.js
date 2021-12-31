import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import IPContainer from '../component/IPContainer'
import PPPoEContainer from '../component/PPPoEContainer'
import { Dropdown } from 'react-native-element-dropdown'
import Toast from 'react-native-root-toast';
import Switch from '../component/Switch'
import { postData } from '../api/postData'
import {translations} from '../i18n'
import { getStorageData } from '../api/getStorageData'
import { setStorageData } from '../api/setStorageData'


import { checkIp, onlyNumberDot } from '../utils/util'
import global from '../utils/global';
let responseSize = global.responseSize



// import RNPickerSelect from 'react-native-picker-select';


let title = `How does your router connect to the network?`
let footerText = `The router has been able to access the Internet normally. If you don't need to switch the network mode, you can skip it`
const data = [
    { value: '1', label: 'Automatic IP（DHCP）' },
    { value: '0', label: 'Static IP' },
    { value: '3', label: 'PPPoE (from ISP)' },
];
let imgUrl = require('../../src/assets/images/ic_nav_confirm_off/ic_nav_confirm_off.png')
let imgUrlOption = require('../../src/assets/images/ic_options_down_on_off/ic_options_down_on_off.png')



const app = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdown, setDropdown] = useState('1');
    const [checkOK, setCheckOK] = useState(false);
    const [onTextInputFocus, setOnTextInputFocus] = useState(false);


    const [staticIp, setStaticIp] = useState('');
    const [staticMask, setStaticMask] = useState('');
    const [staticGw, setStaticGw] = useState('');
    const [priDns, setPriDns] = useState('');
    const [secDns, setSecDns] = useState('');

    const [pppoeUser, setPoppuser] = useState('');
    const [pppoePass, setPppoePass] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'SetNetConfig',
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

    useEffect(() => {
        _getWanCfg()

        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [])


    // 监听ip地址的配置情况
    useEffect(() => {
        let validatorValueStaticIp = () => {
            let a = [staticIp, staticMask, staticGw, priDns].filter((n) => {
                return n.length < 8 || n.length > 64
            }).length
            console.log(a)
            if (a == 0) {
                setCheckOK(false)
            } else {
                setCheckOK(true)
            }
            if (dropdown == '1') {
                setCheckOK(false)
            }
        }
        validatorValueStaticIp()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [staticIp, staticMask, staticGw, priDns])

    // 监听pppoe 的输入情况
    useEffect(() => {
        let validatorValue = () => {
            let a = [pppoeUser, pppoePass].filter((n) => {
                return n.length < 8 || n.length > 64
            }).length
            if (a == 0) {
                setCheckOK(false)
            } else {
                setCheckOK(true)
            }
            if (dropdown == '1') {
                setCheckOK(false)
            }
        }
        validatorValue()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [pppoeUser, pppoePass])


    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            console.log("更新了")
        }
    })
    let _getWanCfg = async () => {
        let data = {
            topicurl: 'getWanCfg'
        }
        let res = await postData(global.wifiNetworkIP, data)
        // setDropdown(res.proto)
        _setNetConfig(res.proto, res)
    }

    let _setNetConfig = async (protoTemp, data) => {
        console.log(protoTemp, 'protoTemp')
        if (protoTemp == '0') {
            setDropdown(protoTemp)
            setStaticIp(data.staticIp)
            setStaticMask(data.staticMask)
            setStaticGw(data.staticGw)
            setPriDns(data.priDns)
            if (data.secDns != '') {
                setSecDns(data.secDns)
            }
        } else if (protoTemp == '3') {
            setDropdown(protoTemp)
            setPoppuser(data.pppoeUser)
            setPppoePass(data.setpppoePass)
        } else {
            setDropdown('1')
        }
    }
    let _setWanCfg = async (data) => {
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
        navigation.navigate('DeviceHome')

    }

    const _saveUpdate = async () => {
        let routerOptionNetconfig = {
            proto: dropdown,
            hostName: '',
            dhcpMtu: '1500',
            dnsMode: '1',
            ttlWay: '1',
            clone: '0',
            cloneMac: global.lanMac,
            topicurl: 'setWanCfg'
        }

        switch (dropdown) {
            case '0':
                let a = [staticIp, staticMask, staticGw, priDns].filter(n => {
                    return checkIp(n)
                }).length
                if (a >= 1) {
                    console.log('IP有误！')
                    Toast.show('请注意ip格式：xxx.xxx.xxx.xxx')
                    return
                }
                Object.assign(routerOptionNetconfig, {
                    staticIp,
                    staticMask,
                    staticGw,
                    priDns,
                    secDns
                })
                break;
            case '3':
                if (pppoePass == '' || pppoePass == '') {
                    console.log('请输入完整信息！')
                    return
                }
                Object.assign(routerOptionNetconfig, {
                    pppoeUser,
                    pppoePass,
                    pppoeMtu:'1492',
                    dnsMode:'0'
                })
                break;
            default:
                Object.assign(routerOptionNetconfig, {
                    priDns: '8.8.8.8',
                    secDns: '9.9.9.9',
                })

                break;
        }
        _setWanCfg(routerOptionNetconfig)
    }
    const _autoPick = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'discoverWan' })
        console.log(res, 'discoverWan\n')
        let getWizardCfg = await postData(global.wifiNetworkIP, { topicurl: 'getWizardCfg' })
        console.log(getWizardCfg, 'getWizardCfg')
        _setNetConfig(res.discoverProto, getWizardCfg)
    }
    const SecletHook = (props) => {
        if (props.value == dropdown) {
            return <Image style={styles.checkoutIcon} source={imgUrl} />
        } else {
            return <Text> </Text>
        }
    }
    const _renderItem = item => {
        return (
            <View style={styles.itemDropdwon}>
                <Text style={{ color: '#414245', fontWeight: '700', ...styles.textItem }}>{item.label}</Text>
                {/* <Image source={require('../assets/images/ic_nav_confirm_off.png')} /> */}
                <SecletHook value={item.value}></SecletHook>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={Platform.OS == "ios" ? 'position' : 'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : responseSize * 20}
                enabled={true}
            >
                <ScrollView
                    scrollEnabled={!onTextInputFocus}
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    bounces={false}
                >
                    <View style={styles.headContent}>
                        <Title title={title} />
                        {/* <View style={styles.backupSet}>
                            <Text style={{ color: '#414245', fontWeight: '700' }}>
                                Use backup settings
                            </Text>
                            <Switch
                                value={modalVisible}
                                onSyncPress={value => {
                                    setModalVisible(value)
                                }} />
                        </View> */}
                    </View>
                    <View style={{ flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ marginBottom: 10 }}>
                            <Dropdown
                                style={styles.selectSet}
                                containerStyle={styles.dropdown}
                                selectedTextStyle={styles.dropdownText}
                                data={data}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                maxHeight={responseSize * 160}
                                value={dropdown}
                                onChange={item => {
                                    setDropdown(item.value);
                                    console.log('selected', item);
                                }}
                                renderRightIcon={() => (
                                    <Image style={styles.icon} source={imgUrlOption} />
                                )}
                                renderItem={item => _renderItem(item)}
                            />
                            <Text style={styles.autoPick}
                                onPress={_autoPick}
                            >voluntarily pick</Text>
                            {
                                (() => {
                                    switch (dropdown) {
                                        case '3':
                                            return <PPPoEContainer
                                                userName={pppoeUser}
                                                password={pppoePass}
                                                onUserNameChange={(e) => { setPoppuser(e.nativeEvent.text) }}
                                                onPasswordChange={(e) => { setPppoePass(e.nativeEvent.text) }}
                                            />;
                                            break;
                                        case '0':
                                            return <IPContainer
                                                ipValue={staticIp}
                                                maskValue={staticMask}
                                                gatewayValue={staticGw}
                                                priDnsValue={priDns}
                                                secDnsValue={secDns}
                                                // onFocus={(e) => { checkIp(e.nativeEvent.text) }}
                                                // onBlur={(e) => {  checkIp( }}
                                                onIpChange={(e) => { setStaticIp(onlyNumberDot(e.nativeEvent.text)) }}
                                                onMaskChange={(e) => { setStaticMask(onlyNumberDot(e.nativeEvent.text)) }}
                                                onGatewayChange={(e) => { setStaticGw(onlyNumberDot(e.nativeEvent.text)) }}
                                                onPriDnsChange={(e) => { setPriDns(onlyNumberDot(e.nativeEvent.text)) }}
                                                onSecDnsChange={(e) => { setSecDns(onlyNumberDot(e.nativeEvent.text)) }}
                                            />;
                                            break;
                                        default:
                                            return <></>;
                                    }
                                })()
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <FootButton
                        onPress={_saveUpdate}
                        color={global.buttonColor}
                        title={translations.router_save}
                        // title={'Next'}
                        disabled={checkOK}
                    />
                    <Text style={styles.footerText}>
                        {footerText}
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
        // justifyContent: 'space-between',
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
        marginBottom: responseSize * 10,
    },
    directionImg: {
        width: responseSize * 200,
        height: responseSize * 200,
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
    icon: {
        width: responseSize * 10,
        height: responseSize * 20,
    },
    checkoutIcon: {
        width: responseSize * 32,
        height: responseSize * 20,
    },

    selectSet: {
        marginTop: responseSize * 10,
        paddingHorizontal: responseSize * 20,
        width: responseSize * 345,
        height: responseSize * 50,
        borderRadius: responseSize * 10,
        backgroundColor: '#F8F8F8',
    },
    vector: {
        width: responseSize * 10,
        height: responseSize * 5,
    },
    dropdown: {
        width: responseSize * 345,
        height: responseSize * 50,
        marginTop: responseSize * 10,
        borderColor: '#4142450D',
        borderRadius: responseSize * 15,
        paddingHorizontal: responseSize * 10,
    },
    dropdownText: {
        fontSize: responseSize * 14,
        fontWeight: '400',
        color: '#555555'
    },
    autoPick: {
        marginTop: responseSize * 10,
        textAlign: 'right',
        fontSize: responseSize * 12,
        color: global.buttonColor,
        fontWeight: '700',
        lineHeight: responseSize * 16.8,
    },
    itemDropdwon: {
        paddingVertical: responseSize * 15,
        paddingHorizontal: responseSize * 4,
        backgroundColor: '#fff',
        // maxHeight: 160,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: '#FAFAFA',
        borderBottomWidth: 1,
    },
    textItem: {
        fontSize: responseSize * 14,
        fontWeight: '400',
        color: '#555555',
    },
    footer: {
        marginTop: responseSize * 20,
    },
    footerText: {
        color: '#4142454D',
        marginTop: responseSize * 15,
        marginBottom: responseSize * 12,
        marginHorizontal: responseSize * 20,
    }

});
export default app;
