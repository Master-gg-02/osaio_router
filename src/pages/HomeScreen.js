import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Toast from 'react-native-root-toast';
import { nativeDevicestore ,nativeUserid} from '../utils/bridge'
import { useColorScheme } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize
console.log(typeof responseSize,'responseSize')
let headerDirectText = `Power on the router and confirm that the indicator light is on`
let imgUrl = require('../../src/assets/images/illus_long_router/illus_long_router.png')

const HomeScreen = ({ navigation }) => {
    const [rate, setRate] = useState(0);
    const [showProcess, setShowProcess] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const colorScheme = useColorScheme();
    useEffect(() => {
        console.log(colorScheme,'colorScheme')
        _getUserId= async()=>{
            console.log('拿用户ID')
            let res =await nativeUserid({})
            global.uid=res.userid
            console.log(res,'nativeUserid')
        }
        _getUserId()
        // console.log("这是模拟componentDidMount钩子函数")
        // let toast = Toast.show('This is a message', {
        //     duration: Toast.durations.LONG,
        //     position: Toast.positions.BOTTOM,
        //     shadow: true,
        //     animation: true,
        //     hideOnPress: true,
        //     delay: 0,
        //     onShow: () => {
        //         // calls on toast\`s appear animation start
        //     },
        //     onShown: () => {
        //         // calls on toast\`s appear animation end.
        //     },
        //     onHide: () => {
        //         // calls on toast\`s hide animation start.
        //     },
        //     onHidden: () => {
        //         // calls on toast\`s hide animation end.
        //     }
        // });
        // console.log(global.responseSize)
        return () => {
            // setTimeout(function () {
            //     Toast.hide(toast);
            // }, 500);
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            // console.log("这是模拟componentWillUnmount钩子函数")
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
            title: 'Home',
            headerTitleAlign: 'center',
            headerStyle: { height: responseSize * 43 },
            headerLeft: () => (
                <NavReturn type='home' />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}
            >
                <View style={styles.headContent}>
                    <Image
                        style={styles.directionImg}
                        resizeMode='center'
                        source={imgUrl}
                    />
                    <Text style={styles.textTitle}>
                        {headerDirectText}
                    </Text>
                </View>
                <FootButton
                    onPress={async () => {
                        // let  nativeStoreDiviceData={
                        //     uid:global.uid,
                        //     lanMac:'222222',
                        //     model:'1111',
                        //     deviceName:'GNCC-E230',
                        //     key:'addRouterDiveice'
                        //  }
                        //  let res= await nativeDevicestore(nativeStoreDiviceData)
                        //  console.log(res)
                        // return
                        navigation.navigate('ConnectRouter')
                    }}
                    title='Next'
                    color={global.buttonColor}
                />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: responseSize * 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    headContent: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textTitle: {
        marginTop: 30,
        paddingHorizontal: responseSize * 30,
        fontSize: responseSize * 14,
        lineHeight: responseSize * 16.8,
        textAlign: 'center',
    },
    textAttention: {
        marginTop: responseSize * 20,
        marginBottom: responseSize * 10,
    },
    directionImg: {
        width: responseSize * 300,
        height: responseSize * 300,
    },
});

export default HomeScreen;
