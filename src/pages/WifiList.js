import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import { Button } from 'react-native-elements';
import { setStorageData } from '../api/setStorageData'
import { getStorageData, getSingleStorageData } from '../api/getStorageData'
import { clearStorageData } from '../api/clearStorageData'
import global from '../utils/global';
let responseSize=global.responseSize
// let responseSize=global.responseSize

// let wifiList = [
//     {
//         Storagekey: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         key: '智能插座',
//     },
//     {
//         Storagekey: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         key: '智能电表',
//     },
//     {
//         Storagekey: '58694a0f-3da1-471f-bd96-145571e29d72',
//         key: '智能手环',
//     },
// ]
const HomeScreen = ({ navigation }) => {
    const [rate, setRate] = useState(0);
    const [showProcess, setShowProcess] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const [wifiList, setWifiList] = useState([]);
    // const [wifiListTemp, setWifiListTemp] = useState([]);
    let wifiListTemp
    let _loadStorageData = async () => {
        let wifiListStr = await getStorageData({ uuid: '15039493174' }, 'wifiList')
        if (wifiListStr != null) {
            wifiListTemp = JSON.parse(wifiListStr)
            let wifiTempArr = []
            for (let i in wifiListTemp) {
                let temp = await getSingleStorageData(wifiListTemp[i])
                if (temp != null) {
                    temp = JSON.parse(temp)
                    // Object.assign(temp,{Storagekey:wifiListTemp[i]})
                    // temp.Storagekey = wifiListTemp[i]
                    wifiTempArr.push(temp)
                }
            }
            // wifiList = wifiTempArr
            setWifiList(wifiTempArr)
            console.log(wifiList[0])
        }
    }
    useEffect(() => {
        console.log("这是模拟componentDidMount钩子函数")
        _loadStorageData()
        // return () => {
        //     _loadStorageData()
        //     //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
        //     console.log("这是模拟componentWillUnmount钩子函数")
        // }
    }, [])
    const flag = useRef(null)
    useEffect(() => {
        if (!flag.current) {
            flag.current = true
        } else {
            // console.log('responseSize',global.responseSize)
            console.log("更新了")
        }
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '路由列表',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);
    const Item = ({ title,subTitle, sotrageKey }) => {
        return (
            <View style={styles.item} >
                <Text style={styles.title}>{sotrageKey}</Text>
                <View style={styles.content}>
                    <Text style={styles.contentText}>ssidName:{title}</Text>
                    <Text style={styles.contentText}>ssid5gName{subTitle}</Text>
                    <Button
                        onPress={async()=>{await _onPressDevice(sotrageKey)}}
                        title='删除'
                        buttonStyle={styles.buttonStl}
                    />
                </View>
            </View>
        );
    }
    const renderItem = ({ item }) => (
        <Item title={item.ssid} subTitle={item.ssid5g} sotrageKey={item.sotrageKey} />
    );
    const _onPressDevice = async (sotrageKey) => {
        let set = new Set(wifiListTemp)
        console.log(set)
        set.delete(sotrageKey)
        set = [...set]
        setWifiList(set)
        let res = await setStorageData({ uuid: '15039493174' }, 'wifiList', JSON.stringify(set))
        console.log(res)
        await clearStorageData({ uuid: '15039493174', lanMac: global.lanMac }, 'netConfig');
        await clearStorageData({ uuid: '15039493174', lanMac: global.lanMac }, 'wifiConfig');
        await clearStorageData({ uuid: '15039493174', lanMac: global.lanMac }, 'netAndwifiConfig');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
            <FlatList
                data={wifiList}
                renderItem={renderItem}
            // keyExtractor={item => item.ssid}
            />
            <View
            style={{ width:'100%',justifyContent:'center', alignItems: 'center' ,marginBottom:20}}
            >
                <Button
                    onPress={() => { navigation.navigate('Home') }}
                    title='添加'
                    buttonStyle={styles.buttonStl}
                />
            </View>

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: responseSize * 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    item: {
        borderColor: '#999',
        borderWidth: 1,
        fontSize: 20,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 25,
        color: "#999"
    },
    content: {
        fontSize: 14,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentText: {

    },
    highlightBackground: {
        borderRadius: 10,
        // opacity:0.3

    },
    sectionTitle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // height: '100%',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: 'red',
        paddingBottom: '40%'
    },
    sectionTitleButton: {
        // color: Colors.blue,
        width: 120,
        height: 40,
        // borderRadius:20,
        textAlign: 'center',
    },
    linearGradient: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        // backgroundColor: 'transparent',
    },
    buttonStl: {
        backgroundColor: global.buttonColor,
        color: '#fff',
        width: 100,
    }

});
export default HomeScreen;
