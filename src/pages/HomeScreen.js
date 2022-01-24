import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Toast from 'react-native-root-toast';
import { nativeDevicestore, nativeUserid } from '../utils/bridge'
// import { useColorScheme } from 'react-native';
import global from '../utils/global';
let responseSize = global.responseSize
console.log(typeof responseSize, 'responseSize')
import { translations } from '../i18n'
let imgUrl = require('../../src/assets/images/illus_long_router/illus_long_router.png')

const HomeScreen = ({ navigation }) => {
    const [rate, setRate] = useState(0);
    const [showProcess, setShowProcess] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    // const colorScheme = useColorScheme();
    let _getUserId = async () => {
        console.log('拿用户ID')
        let res = await nativeUserid({})
        if (res.userid!=undefined) {
            global.uid = res.userid
        }
        console.log(global.uid, 'nativeUserid')

    }
    useEffect(() => {
        // console.log(colorScheme,'colorScheme')
        _getUserId()
        return () => {
            //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
            console.log("这是模拟componentWillUnmount钩子函数")
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
            title: translations.router_add_homepage_head,
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
                        {translations.router_homepage_indicator}
                    </Text>
                </View>
                <FootButton
                    onPress={async () => {
                        navigation.navigate('ConnectRouter')
                    }}
                    title={translations.next}
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
