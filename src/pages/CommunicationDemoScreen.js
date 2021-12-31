
import React from 'react';

import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';

import { nativeGatewayIP } from '../utils/bridge'
import FootButton from '../component/FootButton'
import { NativeEventEmitter, NativeModules } from 'react-native';
// import { getData } from '../api/getData'

// import { NativeEventEmitter } from 'react-native';
// let RNPageManager = NativeModules.YRRNBridgeManager
const { YRRNBridgeManager } = NativeModules;

const App = () => {
    //andorid
    // async function DemoPromise() {
    //     try {
    //         const {
    //             relativeX,
    //             relativeY,
    //             width,
    //             height
    //         } = await RNPageManager.requestAsynPromise('100', { name: 'yanlu' });
    //         let a = relativeX + ':' + relativeY + ':' + width + ':' + height
    //         console.log(relativeX, relativeY, width, height)
    //         Alert.alert(a);
    //     } catch (e) {
    //         Alert.alert(e);
    //     }
    // }
    //ios
    async function DemoPromise() {
        try {
            const events = nativeGatewayIP({});
            Alert.alert('promise原生给的值', events)
        } catch (e) {
            console.error(e);
        }
    }
    async function postData() {
        return new Promise((resolve, reject) => {
            console.log(new Date(), 2)
            setTimeout(() => {
                console.log(new Date(), 3)
                resolve(123)
            }, 3000)
        })
    }
    //android Emiter
    // let _this=this
    // React.useEffect(() => {
    //     console.log("这是模拟componentDidMount钩子函数")
    //     const eventEmitter = new NativeEventEmitter();
    //     _this.eventListener = eventEmitter.addListener('EventReminder', (event) => {
    //         let a = event.eventProperty
    //         Alert.alert(a);
    //     });
    //     return () => {
    //         //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
    //         console.log("这是模拟componentWillUnmount钩子函数")
    //         _this.eventListener.remove();
    //     }
    // }, [])
    //ios Emiter
    React.useEffect(() => {
        const calendarManagerEmitter = new NativeEventEmitter(YRRNBridgeManager);
        let subscription = calendarManagerEmitter.addListener(
            'EventReminder',
            (reminder) => console.log(reminder.name)
        );
        console.log("RNPageManager",'1111111111')

        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
            subscription.remove();
        }
    }, [])

    return (
        <SafeAreaView>
            <View>
                <FootButton
                    onPress={() => {
                        // RNPageManager.requestAsyn((err) => { Alert.alert(1) }, (res) => { Alert.alert(2) });
                    }}
                    title='回调演示'
                    color='#4D8CEC'
                />
            </View>
            <View>
                <FootButton
                    onPress={() => {
                        DemoPromise()
                        // RNPageManager.requestAsyn((err) => { Alert.alert(1) }, (res) => { Alert.alert(2) });
                    }}
                    title='Promies演示'
                    color='#4D8CEC'
                />
            </View>
            <View>
                <FootButton
                    onPress={async () => {
                        let data = {
                            password: 'admin',
                            topicurl: 'getCheckPasswordResult'
                        }
                        console.log(new Date(), 1)
                        let res = await postData(data, (reajd) => {

                        })
                        console.log(new Date(), 4)
                        console.log(res)
                        // RNPageManager.requestAsyn((err) => { Alert.alert(1) }, (res) => { Alert.alert(2) });
                    }}
                    title='请求'
                    color='#4D8CEC'
                />
            </View>


        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

});

export default App;