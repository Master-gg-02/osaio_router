import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import FootButton from '../../component/FootButton'
import NavReturn from '../../component/NavReturn'
import Toast from 'react-native-root-toast';
import global from '../../utils/global';
let responseSize=global.responseSize
import {translations} from '../../i18n'
import SettingItem from '../../component/SettingItem'
import { getStorageData } from '../../api/getStorageData'

// import { postData } from '../../api/postData'

const HomeScreen = ({ navigation,route }) => {
    const [deviceName, setDeviceName] = useState('');
    const [mac, setMac] = useState('');
    const [IP, setIP] = useState('');


    let _getConnectDevideInfo = async() => {
        let res = await getStorageData({ uid: global.uid} , 'ConnectDevideInfo')
        if (res != null) {
            console.log(res)
            let data=JSON.parse(res)
            setDeviceName(data.name)
            setMac(data.mac)
            setIP(data.ip)
        }
    }
    useEffect(() => {
        _getConnectDevideInfo()
        return () => {

        }
    }, [])
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
            title: translations.router_connect_setting_device_name,
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}
            >
                <SettingItem title={translations.router_connect_setting_device_name} info ={deviceName}  />
                <SettingItem title={translations.router_device_detail_ip_address} info={IP} />
                <SettingItem title={translations.router_device_detail_mac_address} info={mac}  />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        paddingVertical: responseSize * 20,
    },
  
});
export default HomeScreen;
