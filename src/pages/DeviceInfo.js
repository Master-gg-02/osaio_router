import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Toast from 'react-native-root-toast';

import { getStorageData } from '../api/getStorageData'

import global from '../utils/global';
let responseSize=global.responseSize
import SettingItem from '../component/SettingItem'

import { postData } from '../api/postData'

const HomeScreen = ({ navigation,route }) => {
    const [device_uuid, setDevice_uuid] = useState('');
    const [lanIp, setLanIp] = useState('');
    const [model, setModel] = useState('');
    const [lanMac, setLanMac] = useState('');
    // const [wanIp, setWanIp] = useState('');
    const [priDns, setPriDns] = useState('');
    const [wanConnTime, setWanConnTime] = useState('');
    const [deviceName, setDeviceName] = useState(global.model);

    useEffect(() => {
        _getUuidInfo()
        _getSysStatusCfg()
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
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _getDeviceName()
        });

        return unsubscribe;
    }, [navigation]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: ' DeviceInfo',
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
    let _getDeviceName = async () => {
        let res = await getStorageData({ uid: global.uid }, 'deviceName')
        if (res != null) {
            console.log(res)
            // let data=JSON.parse(res)
            setDeviceName(res)
            // setAllowConnect(data.white)
        }
    }
    let _getSysStatusCfg= async()=>{
        let res = await postData(global.wifiNetworkIP,{topicurl:'getSysStatusCfg'})
        console.log(res)
        setLanIp(res.lanIp)
        setModel(res.model)
        setLanMac(res.lanMac)
        setPriDns(res.priDns)
        let time=res.wanConnTime.split(';')
        console.log(time)
        time=time[0]+'d '+time[1]+'h '+time[2]+'m '+time[3]+'s'
        setWanConnTime(time)

    }
    let _getUuidInfo= async()=>{
        let res = await postData(global.wifiNetworkIP,{topicurl:'getUuidInfo'})
        console.log(res)
        setDevice_uuid(res.device_uuid)
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}
            >
                <SettingItem title='Router Name' info ={deviceName}  />
                <SettingItem title='Router model' info={model} />
                <SettingItem title='MAC address'info={lanMac}  />
                <SettingItem title='Device uuid' info={device_uuid} />
                <SettingItem title='LAN IP'info={lanIp}  />
                <SettingItem title='DNS'info={priDns}  /> 
                <SettingItem title='Online Duration'info={wanConnTime}  />                 
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
