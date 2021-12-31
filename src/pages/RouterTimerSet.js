import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, } from 'react-native';

import { myClearInterval, mySetInterval } from '../utils/util'
import NavReturn from '../component/NavReturn'
import FootButton from '../component/FootButton'
import global from '../utils/global';
let responseSize = global.responseSize
import moment from 'moment';
import Checked from '../component/Checked'
import { postData } from '../api/postData'
import { translations } from '../i18n'
const App = ({ navigation, route }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [isNext, setIsNext] = useState(false);
    const [enable, setEnable] = useState(false);

    const [server, setServer] = useState('');
    const [tz, setTz] = useState('');



    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_time_settings,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#F5F7FA',
                borderBottomWidth: 0,
                // elevation: 0,
            },
            headerLeft: () => (
                <NavReturn />
            ),
            // headerRight: () => (
            //     <NavReturn type='cancel' />
            // ),
        });
    }, []);

    useEffect(() => {
        _getNtpCfg()
        //    let timer= mySetInterval(() => {
        //         _getNtpCfg()
        //     }, 1000)
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            // myClearInterval(timer)
        }
    }, [])
    // 获取路由器时区和时间
    let _getNtpCfg = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'getNtpCfg' })
        s = new Date(res.currentTime)
        setCurrentTime(moment(s).format('YYYY-MM-DD HH:mm:ss'))
        setServer(res.server)
        setTz(res.tz)
        setEnable(res.enable == '1' ? true : false)
    }
    // 设置使用本机时间
    let _NTPSyncWithHost = async () => {
        let data = {
            host_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            topicurl: 'NTPSyncWithHost'
        }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
    }
    let _setNtpCfg = async () => {
        let data = {
            tz,
            server,
            enable: enable ? '1' : '0',
            topicurl: 'setNtpCfg'
        }
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headContent} >
                <View style={styles.head}>
                    <Text>
                        {translations.router_timezone_current_time}
                    </Text>
                    <Text>
                        {currentTime}

                    </Text>
                </View>
                <Text
                    style={styles.copy}
                    onPress={() => {
                        setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'))
                    }}>
                    {translations.router_timezone_copy_mobilephone_time}
                </Text>
                <View style={styles.getNetTime}>
                    <Checked
                        onPress={() => {
                            setEnable(!enable)
                        }}
                        value={enable}>
                    </Checked>
                    <Text
                        onPress={() => {
                            setEnable(!enable)
                        }}
                    >
                        {translations.router_timezone_sync_to_network}
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <FootButton
                    onPress={() => {
                        // setStorageData({uid:global.uid},'deviceName',routerName)
                        // navigation.navigate('RouterSetting')
                        _NTPSyncWithHost().then(
                            () => { _setNtpCfg() }
                        ).then(() => {
                            navigation.navigate('DeviceHome')
                        })
                    }}
                    title={translations.router_save}
                    color={global.buttonColor}
                    disabled={isNext}
                />
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: responseSize * 20,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F7FA'
    },
    headContent: {
        flex: 1,
    },
    head: {
        borderBottomColor: '#101010',
        borderBottomWidth: 1,
        borderTopColor: '#101010',
        borderTopWidth: 1,
        paddingVertical: responseSize * 10,
        paddingHorizontal: responseSize * 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responseSize * 10,
    },
    time: {
        padding: responseSize * 5,
        borderColor: '#101010',
        borderWidth: 1,
    },
    getNetTime: {
        marginLeft: responseSize * 15,
        marginTop: responseSize * 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    copy: {
        marginRight: responseSize * 20,
        color: 'blue',
        textAlign: 'right',
    },
    directionImg: {
        width: responseSize * 300,
        height: responseSize * 100,
    },
    footer: {
        marginTop: responseSize * 20,
    },

});
export default App;
