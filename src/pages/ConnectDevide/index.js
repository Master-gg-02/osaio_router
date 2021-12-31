import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView, ViewBase } from 'react-native';
import NavReturn from '../../component/NavReturn'
import {translations} from '../../i18n'
import global from '../../utils/global';
let responseSize = global.responseSize
import { postData } from '../../api/postData'
import CounterEmitter from '../../utils/CountEmitter';
import { setStorageData } from '../../api/setStorageData'
import { getStorageData } from '../../api/getStorageData'
import { overflowText } from '../../utils/util'
import DeviceItem from '../../component/DeviceItem'
let imgUrl = require('../../../src/assets/images/ic_nav_phone_40/ic_nav_phone_40.png')
const App = ({ navigation, route }) => {
    const [DeviceList, setDeviceList] = useState([]);

    useEffect(() => {
        // _getAccessDeviceCfg()
        return () => {

        }
    }, [])

    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            console.log('更新了')
        }
    })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _getAccessDeviceCfg()
        });

        return unsubscribe;
    }, [navigation]);
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
    let _getAccessDeviceCfg = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'getAccessDeviceCfg' })
        let arr = []
        res.black.forEach(element => {
            element.white = false
        });
        res.white.forEach(element => {
            element.white = true
        });
        arr = arr.concat(res.black).concat(res.white)
        console.log(arr)
        setDeviceList(arr)

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                {
                    DeviceList.map((item) => {
                        return (
                            <DeviceItem iconUrl={imgUrl} title={overflowText(item.name, 10)} subTitle={item.linkType} key={item.mac} onPress={() => {
                                let a = JSON.stringify(item)
                                setStorageData({ uid: global.uid }, 'ConnectDevideInfo', a)
                                navigation.navigate('ConnectDevide')
                            }} />
                        )
                    })
                }
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    box:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#F5F7FA',
        padding: responseSize * 20,
    },
});
export default App;
