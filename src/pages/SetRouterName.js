import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { translations } from '../i18n';
import global from '../utils/global';
let responseSize = global.responseSize
import NavReturn from '../component/NavReturn'
let title = 'Setting Router Name'
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import UserInput from '../component/UserInput'
import { setStorageData } from '../api/setStorageData'
let imgUrl = require('../../src/assets/images/illus_connect_scanning_router/illus_connect_scanning_router.png')
const App = ({ navigation, route }) => {
    const [routerName, setRouterName] = useState('');
    const [isNext, setIsNext] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_connect_setting_device_name,
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
        if (route.params) {
            setRouterName(route.params.deviceName)
        }
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [])
    useEffect(() => {
        let validatorValue = () => {
            if (routerName.length < 2 || routerName.length > 32) {
                setIsNext(false)
            } else {
                setIsNext(true)
            }
        }
        validatorValue()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [routerName])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.headContent}>
                        <Image
                            style={styles.directionImg}
                            resizeMode='center'
                            source={imgUrl}
                        />
                        <Title title={translations.router_connect_setting_device_name} />
                        <UserInput
                            defaultValue={routerName}
                            onChange={(e) => {
                                setRouterName(e.nativeEvent.text)
                            }}
                        />
                    </View>
                    <View style={styles.footer}>
                        <FootButton
                            onPress={() => {
                                setStorageData({ uid: global.uid }, 'deviceName', routerName)
                                navigation.navigate('RouterSetting')
                            }}
                            title={translations.router_save}
                            color={global.buttonColor}
                            disabled={!isNext}
                        />
                    </View>
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
        justifyContent: 'space-between',
    },
    headContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
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
