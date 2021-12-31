import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import NavReturn from '../component/NavReturn'
import Toast from 'react-native-root-toast';
import { postData } from '../api/postData'
import Dialog from '../component/Dialog'
import { getStorageData } from '../api/getStorageData'

import global from '../utils/global';
let responseSize=global.responseSize
import SettingItem from '../component/SettingItem'
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const App = ({ navigation, route }) => {
    const [rate, setRate] = useState(0);
    var timeWorker = {}
    var mySetInterval = function (fn, time) {
        // 定义一个key，来标识此定时器
        var key = Symbol();
        // 定义一个递归函数，持续调用定时器
        var execute = function (fn, time) {
            timeWorker[key] = setTimeout(function () {
                fn();
                execute(fn, time);
            }, time)
        }
        execute(fn, time);
        // 返回key
        return key;
    }
    var myClearInterval = function (key) {

        if (key in timeWorker) {
            clearTimeout(timeWorker[key]);
            delete timeWorker[key];
        }
    }
    useEffect(() => {
        let timer = mySetInterval(
            () => {
            setRate(rate+1)
            }, 3000
        )

        return () => {
            myClearInterval(timer)
        }
    }, [rate])
    // useEffect(() => {
        
    //     const unsubscribe = navigation.addListener('blur', () => {
            
    //     });
    //     return unsubscribe;
    // }, [navigation]);

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
            title: ' OtaUpdate',
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
    // let _getInitCfg = async () => {
    //     let res = await postData(global.wifiNetworkIP, { topicurl: 'getInitCfg' })
    //     console.log(res)
    //     setFmVersion(res.fmVersion)
    //     let ledStatus = res.ledStatus == '1' ? true : false
    //     setShowIndicator(ledStatus)
    // }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}

            >
                <AnimatedCircularProgress
                    size={160}
                    width={8}
                    fill={rate}
                    // prefill={30}
                    tintColor={global.buttonColor}
                    rotation={
                        (value) => { console.log(value) }
                    }
                    onAnimationComplete={
                        () => console.log('onAnimationComplete')
                    }
                    backgroundColor="#EBEBEB" >
                    {
                        (fill) => (
                            <Text>
                                {rate}%
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>

            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: responseSize * 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default App;
