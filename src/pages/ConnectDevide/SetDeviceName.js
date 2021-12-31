import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Image, ScrollView, KeyboardAvoidingView} from 'react-native';

import NavReturn from '../../component/NavReturn'
import { postData } from '../../api/postData'
import { translations } from '../../i18n';

let title = 'Setting Device Name'
import Title from '../../component/Title'
import FootButton from '../../component/FootButton'
import UserInput from '../../component/UserInput'
import global from '../../utils/global';
let responseSize = global.responseSize
import { getStorageData } from '../../api/getStorageData'
import { setStorageData } from '../../api/setStorageData'
import { G } from 'react-native-svg';

let imgUrl = require('../../../src/assets/images/ic_nav_phone_40/ic_nav_phone_40.png')



const App = ({ navigation, route }) => {
    const [deviceName, setDeviceName] = useState('');
    const [isNext, setIsNext] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_device_detail_name,
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
        });
    }, []);
    useEffect(() => {
        if (route.params) {
            setDeviceName(route.params.deviceName)
        }
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [])
    // setStorageData({uid:global.uid},'ConnectDevideInfo',a)
    let validatorValue = () => {
        if (deviceName.length < 2 || deviceName.length > 32) {
            setIsNext(false)
        } else {
            setIsNext(true)
        }
    }
    useEffect(() => {
        validatorValue()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
        }
    }, [deviceName])
    let _setAccessDeviceCfg = async () => {
        let ConnectDevideInfo = await getStorageData({ uid: global.uid }, 'ConnectDevideInfo')
        let data = null
        if (ConnectDevideInfo != null) {
            console.log(ConnectDevideInfo)
            data = JSON.parse(ConnectDevideInfo)
        }
        data.name = deviceName
        let postdata = {
            addEffect: '0',
            modelType: data.white ? 'white' : 'black',
            idx: '1',
            name: deviceName,
            mac: data.mac,
            topicurl: 'setAccessDeviceCfg'
        }
        console.log(postdata)
        let res = await postData(global.wifiNetworkIP, postdata)
        console.log(res)
        await setStorageData({ uid: global.uid }, 'ConnectDevideInfo', JSON.stringify(data))
        navigation.navigate('ConnectDevide')

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <KeyboardAvoidingView
                style={styles.avoidKeyboard}
                behavior={'position'}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : responseSize * -200}
                enabled='true'
            >
                <View style={styles.container}> */}
                    <View style={styles.headContent}>
                        <Image
                            style={styles.directionImg}
                            resizeMode='center'
                            source={imgUrl}
                        />
                        <Title title={translations.router_device_detail_name} />
                        <UserInput
                            defaultValue={deviceName}
                            onChange={(e) => {
                                setDeviceName(e.nativeEvent.text)
                            }}
                        />
                    </View>
                    <View style={styles.footer}>
                        <FootButton
                            onPress={() => {
                                _setAccessDeviceCfg()
                            }}
                            title={translations.router_save}
                            color={global.buttonColor}
                            disabled={!isNext}
                        />
                    </View>
                {/* </View>

            </KeyboardAvoidingView> */}
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
