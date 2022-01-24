import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import Progress from '../component/Progress'
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import { translations } from '../i18n'

import IPContainer from '../component/IPContainer'
import PPPoEContainer from '../component/PPPoEContainer'


import { getStorageData } from '../api/getStorageData'
import { setStorageData } from '../api/setStorageData'

import global from '../utils/global';
let responseSize = global.responseSize
import { postData } from '../api/postData'

import { Dropdown } from 'react-native-element-dropdown'
import Toast from 'react-native-root-toast';
import Switch from '../component/Switch'

const data = [
    { value: '1', label: translations.router_internet_setting_dhcp },
    { value: '0', label: translations.router_config_static_ip },
    { value: '3', label: translations.router_internet_setting_pppoe },
];
let imgUrl = require('../../src/assets/images/ic_nav_confirm_off/ic_nav_confirm_off.png')
let imgUrlOption = require('../../src/assets/images/ic_options_down_on_off/ic_options_down_on_off.png')



const app = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdown, setDropdown] = useState('1');
    const [selected, setSelected] = useState();
    const [selecedValue, setSelecedValue] = useState(data[0].label);
    const [checkOK, setCheckOK] = useState(false);
    const [onTextInputFocus, setOnTextInputFocus] = useState(false);


    const [staticIp, setStaticIp] = useState('');
    const [staticMask, setStaticMask] = useState('');
    const [staticGw, setStaticGw] = useState('');
    const [priDns, setPriDns] = useState('');
    const [secDns, setSecDns] = useState('');

    const [pppoeUser, setPoppuser] = useState('');
    const [pppoePass, setPppoePass] = useState('');
    const [showSelect, setShowSelect] = useState(false);



    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_internet_setting_title,
            headerTitleAlign: 'center',
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);

    useEffect(() => {
        let loadStorageData = async () => {
            let netConfig = await getStorageData({ uid: global.uid, lanMac: global.lanMac }, 'netConfig')
            if (netConfig != null) {
                netConfig = JSON.parse(netConfig)
                setDropdown(netConfig.proto)
                // setDropdown('0')
            }
        }
        loadStorageData()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [])
    useEffect(() => {
        let loadStorageData = async () => {
            if (dropdown == '1') {
                setCheckOK(false)
            } else {
                setCheckOK(true)
            }
            let netConfig = await getStorageData({ uuid: global.uid, lanMac: global.lanMac }, 'netConfig')
            console.log(netConfig)
            if (netConfig != null) {
                console.log(netConfig, 'netConfig')
                netConfig = JSON.parse(netConfig)
                if (netConfig.proto == '0') {
                    setStaticIp(netConfig.staticIp)
                    setStaticMask(netConfig.staticMask)
                    setStaticGw(netConfig.staticGw)
                    setPriDns(netConfig.priDns)
                    setSecDns(netConfig.secDns)
                } else if (netConfig.proto == '3') {
                    setPoppuser(netConfig.pppoeUser)
                    setPppoePass(netConfig.setpppoePass)
                }
            }
        }
        loadStorageData()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [dropdown])



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
    const _checkIP = (value) => {
        return value.replace(/[^\d^\.]+/g, '')
    }
    function f_check_IP(ip) {
        // var ip = document.getElementById('reg_ip').value;
        var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;//正则表达式   
        if (re.test(ip)) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                Toast.show(translations.router_internet_setting_error.format('ip', '\'xxx.xxx.xxx.xxx\''))
                return false;
            }
        }
        console.log(ip, 'ip')
        return true;
    }


    const _setNextWork = async () => {
        let routerOptionNetconfig = {
            proto: dropdown
        }
        switch (dropdown) {
            case '0':
                let a = [staticIp, staticMask, staticGw, priDns].filter(n => {
                    return f_check_IP(n)
                }).length
                if (a >= 1) {
                    console.log('IP有误！')
                    Toast.show(translations.router_internet_setting_error.format('ip', '\'xxx.xxx.xxx.xxx\''))
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
                    pppoePass
                })
                break;
            default:
                break;
        }
        navigation.navigate('SetWiFiConfig', routerOptionNetconfig)
        if (modalVisible) {
            console.log(routerOptionNetconfig, '备份网络设置')
            await setStorageData({ uid: global.uid, lanMac: global.lanMac }, 'netConfig', JSON.stringify(routerOptionNetconfig))
        }

        // navigation.navigate('SetRouterName', routerOptionNetconfig)


    }
    const _autoPick = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'discoverWan' })
        console.log(res, 'discoverWan')
        let getWizardCfg = await postData(global.wifiNetworkIP, { topicurl: 'getWizardCfg' })
        console.log(getWizardCfg, 'getWizardCfg')
        if (res.discoverProto == '0') {
            setDropdown(res.discoverProto)
            setStaticIp(getWizardCfg.staticIp)
            setStaticMask(getWizardCfg.staticMask)
            setStaticGw(getWizardCfg.staticGw)
            setPriDns(getWizardCfg.priDns)
            if (getWizardCfg.secDns != '') {
                setSecDns(res.secDns)
            }
        } else if (res.discoverProto == '3') {
            setDropdown(res.discoverProto)
            setPoppuser(getWizardCfg.pppoeUser)
            setPppoePass(getWizardCfg.setpppoePass)
        } else {
            setDropdown('1')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? 20 : responseSize * -200}
                enabled='true'
            >
                <ScrollView
                    scrollEnabled={!onTextInputFocus}
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    bounces={false}
                >
                    <View style={styles.headContent}>
                        <Progress step={1}></Progress>
                        <Title title={translations.router_add_set_net_config_title} />
                        <View style={styles.backupSet}>
                            <Text style={{ color: '#414245', fontWeight: '700' }}>
                                {translations.router_config_backup}
                            </Text>
                            <Switch
                                value={modalVisible}
                                onSyncPress={value => {
                                    setModalVisible(value)
                                }} />
                        </View>
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
                            <TouchableOpacity
                                onPress={() => {
                                    _autoPick()
                                }} >
                                <Text style={styles.autoPick}>{translations.router_add_set_net_config_voluntarily_pick}</Text>
                            </TouchableOpacity>

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
                                                // onFocus={(e) => { f_check_IP(e.nativeEvent.text) }}
                                                // onBlur={(e) => {  f_check_IP( }}
                                                onIpChange={(e) => { setStaticIp(_checkIP(e.nativeEvent.text)) }}
                                                onMaskChange={(e) => { setStaticMask(_checkIP(e.nativeEvent.text)) }}
                                                onGatewayChange={(e) => { setStaticGw(_checkIP(e.nativeEvent.text)) }}
                                                onPriDnsChange={(e) => { setPriDns(_checkIP(e.nativeEvent.text)) }}
                                                onSecDnsChange={(e) => { setSecDns(_checkIP(e.nativeEvent.text)) }}
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
                        onPress={_setNextWork}
                        color={global.buttonColor}
                        title={translations.next}
                        // title={'Next'}
                        disabled={checkOK}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SetWiFiConfig')
                        }}
                    >
                        <Text style={styles.footerText}>
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
    skip: {
        color: global.buttonColor
    },
    footerText: {
        color: '#4142454D',
        marginTop: responseSize * 15,
        marginBottom: responseSize * 12,
        marginHorizontal: responseSize * 20,
    }

});
export default app;
