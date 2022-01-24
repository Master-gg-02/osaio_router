import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import NavReturn from '../../component/NavReturn'
import global from '../../utils/global';
let responseSize = global.responseSize
import { postData } from '../../api/postData'
import DeviceItem from '../../component/DeviceItem'
import CounterEmitter from '../../utils/CountEmitter';
import { getStorageData } from '../../api/getStorageData'
import { translations } from '../../i18n';
import { overflowText } from '../../utils/util'
import SettingItem from '../../component/SettingItem'
import Toast from 'react-native-root-toast';

let imgUrl = require('../../../src/assets/images/ic_nav_phone_40/ic_nav_phone_40.png')

const App = ({ navigation, route }) => {
    const [allowConnect, setAllowConnect] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [mac, setMac] = useState('');
    const [lock, setLock] = useState(false);


    const [linkType, setLinkType] = useState('');

    let _getConnectDevideInfo = async () => {
        let res = await getStorageData({ uid: global.uid }, 'ConnectDevideInfo')
        if (res != null) {
            console.log(res)
            let data = JSON.parse(res)
            setDeviceName(data.name)
            setAllowConnect(data.white)
            setLinkType(data.linkType)
            setMac(data.mac)
        }
    }
    // useEffect(() => {
    //     _getConnectDevideInfo()
    //     return () => {

    //     }
    // }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _getConnectDevideInfo()
        });

        return unsubscribe;
    }, [navigation]);

    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
        }
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_detail_connect_device,
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
    let _setAccessDeviceCfg = async (value) => {
        let data = {
            topicurl: 'setAccessDeviceCfg',
            mac_array: [{ mac }],
            addEffect: '1',
            modelType: value ? 'white' : 'black'
        }
        console.log(data, '设置黑名单')
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res, '设置黑名单成功')
        if (res.success) {
            if (lock==false) {
                setLock(true)
                Toast.show(translations.success + '!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                    onHide: () => {
                        setLock(false)
                        console.log(222222)
                    }
                })
            }

        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}
            >
                <DeviceItem type iconUrl={imgUrl} title={translations.router_connect_setting} subTitle={linkType} />
                <SettingItem title={translations.router_connect_setting_device_name} img={true} subTitle={overflowText(deviceName, 15)} onPress={() => { navigation.navigate('SetDeviceName', { deviceName }) }} />
                <SettingItem title={translations.router_connect_setting_intert_access_enable} switch={true} value={allowConnect} onSyncPress={(value) => {
                    _setAccessDeviceCfg(value)
                    setAllowConnect(value)
                }} />
                <SettingItem title={translations.router_connect_setting_devices_detail} img={true} onPress={() => {
                    navigation.navigate('ConnectDeviceInfo')
                    CounterEmitter.emit('ConnectDeviceInfo',)
                }} />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        paddingVertical: responseSize * 20,
    },

});
export default App;
