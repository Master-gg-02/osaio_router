import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import NavReturn from '../component/NavReturn'
import FootButton from '../component/FootButton'


import Toast from 'react-native-root-toast';
import { postData } from '../api/postData'
import Dialog from '../component/Dialog'
import { getStorageData } from '../api/getStorageData'
import { translations } from '../i18n';
import global from '../utils/global';
let responseSize = global.responseSize
import SettingItem from '../component/SettingItem'

const App = ({ navigation, route }) => {
    const [rate, setRate] = useState(0);
    const [removeRouter, setRemoveRouter] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const [deviceName, setDeviceName] = useState(global.productName);
    const [fmVersion, setFmVersion] = useState('');
    const [rebootRouter, setRebootRouter] = useState(false);
    const [upDateOTG, setUpDateOTG] = useState(false);
    let _getDeviceName = async () => {
        let res = await getStorageData({ uid: global.uid }, 'deviceName')
        if (res != null) {
            console.log(res)
            // let data=JSON.parse(res)
            setDeviceName(res)
            // setAllowConnect(data.white)
        }
    }
    useEffect(() => {
        console.log(111111)
        _getInitCfg()
        _CloudSrvVersionCheck()
        return () => {

        }
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _getDeviceName()
        });

        return unsubscribe;
    }, [navigation]);

    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            // 
        }
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_detail_setting_title,
            headerTitleAlign: 'center',
            headerStyle: { height: responseSize * 43 },
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#F5F7FA',
                borderBottomWidth: 0,
                // elevation: 0,
            },
            headerLeft: () => (
                <NavReturn />
            ),
        });
    }, []);
    let _getInitCfg = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'getInitCfg' })
        console.log(res)
        setFmVersion(res.fmVersion)
        let ledStatus = res.ledStatus == '1' ? true : false
        setShowIndicator(ledStatus)
    }
    let _setLedCfg = async (value) => {
        let data = { topicurl: 'setLedCfg', enable: value ? '1' : '0' }
        console.log(data)
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
        if (res.success == true) {
            Toast.show(value ? translations.router_detail_setting_on+ '!' : translations.cam_setting_night_vision_type_off+'!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })
        }
    }
    let _RebootSystem = async () => {
        let data = { topicurl: 'RebootSystem' }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
    }
    let _CloudSrvVersionCheck = async () => {
        let data = { topicurl: 'CloudSrvVersionCheck' }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
    }
    let _getCloudSrvCheckStatus = async () => {
        let data = { topicurl: 'getCloudSrvCheckStatus' }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res, 'hhhhhhhh')
        if (res.cloudFwStatus == '2') {

            // 临时跳转到升级页面 
            // navigation.navigate('OtaUpdate')
            Toast.show(translations.gateway_firmware_new_version_label, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })
        } else if (res.cloudFwStatus == '1') {
            // 网络连接失败，请重试
            Toast.show(translations.message_device_update_fail, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })
        } else if (res.cloudFwStatus == '3') {
            // 检测中请等待
            Toast.show(translations.message_device_update_start, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })
        } else {
            // console.log('有新版本可升级!')
            setUpDateOTG(true)
        }
    }

    let _setUpgradeFW = async () => {
        let data = { topicurl: 'setUpgradeFW' }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
        navigation.navigate('OtaUpdate')
        // goto 这里应该有个进度条，同时需要轮询接口，升级是否完成，待确定。
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}
            >
                <View style={{flex:1}}>
                    <SettingItem title={translations.router_detail_setting_router_name} img={true} subTitle={deviceName} onPress={() => { navigation.navigate('SetRouterName', { deviceName }) }} />
                    <SettingItem title={translations.router_detail_setting_device_information} img={true} onPress={() => { navigation.navigate('DeviceInfo') }} />
                    <SettingItem title={translations.router_detail_setting_led_indicator} switch={true} value={showIndicator} onSyncPress={(value) => {
                        _setLedCfg(value)
                        setShowIndicator(value)
                    }} />
                    <SettingItem title={translations.router_setting_detail_firmware_version} img={true} subTitle={fmVersion} onPress={_getCloudSrvCheckStatus} />
                    <SettingItem title={translations.router_detail_setting_reboot_router} img={true} onPress={() => setRebootRouter(true)} />
                </View>

                <View style={styles.footer}>
                    <FootButton
                        onPress={() => {
                            setRemoveRouter(true)
                        }}
                        title={translations.router_info_remove_device}
                        color={global.buttonColor}
                    />
                </View>
                <Dialog
                    title={translations.router_reboot_dialog_info}
                    content={translations.router_reboot_dialog_msg}
                    cancleTitle={translations.cancel_normal}
                    confirmTitle={translations.confirm}
                    isVisible={rebootRouter}
                    cancle={() => {
                        setRebootRouter(false)
                    }}
                    confirm={() => {
                        _RebootSystem()
                        setRebootRouter(false);
                    }}

                    onBackdropPress={() => {
                        setRebootRouter(false);
                    }}
                />

                <Dialog
                    title={translations.router_firmware_upgrade}
                    content={translations.router_firmware_upgrade_dialog_info + '\n\r' +
                        translations.router_firmware_upgrade_info2}
                    cancleTitle={translations.cancel_normal}
                    confirmTitle={
                        translations.router_firmware_upgrade_dialog_title
                    }
                    isVisible={upDateOTG}
                    cancle={() => {
                        setUpDateOTG(false)
                    }}
                    confirm={() => {
                        _setUpgradeFW()
                        setUpDateOTG(false);
                    }}

                    onBackdropPress={() => {
                        setUpDateOTG(false);
                    }}
                />
                <Dialog
                    title={translations.router_remove_router}
                    content={translations.router_remove_device_dialog_info}
                    cancleTitle={translations.cancel_normal}
                    confirmTitle={translations.confirm}
                    isVisible={removeRouter}
                    cancle={() => {
                        setRemoveRouter(false)
                    }}
                    confirm={() => {
                        // 删除路由器 goto 
                        //清除本地路由器配置的缓存，告诉原生路由器已经被清除
                        setRemoveRouter(false);
                    }}

                    onBackdropPress={() => {
                        setRemoveRouter(false);
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: responseSize * 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },


});
export default App;
