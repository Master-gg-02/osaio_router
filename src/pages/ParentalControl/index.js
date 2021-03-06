import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import NavReturn from '../../component/NavReturn'
import Toast from 'react-native-root-toast';
import global from '../../utils/global';
let responseSize = global.responseSize
import { postData } from '../../api/postData'
import { getStorageData } from '../../api/getStorageData'
import { setStorageData } from '../../api/setStorageData';
import { ListItem, Button } from 'react-native-elements'
import { getStringTime } from '../../utils/util'
import ControlItem from '../../component/ControlItem'
let imgUrl = require('../../assets/images/ic_nav_delete/ic_nav_delete.png')
import { translations } from '../../i18n'
import Swipeable from 'react-native-swipeable';


const App = ({ navigation }) => {

    const [rule, setRule] = useState([]);
    const [ruleAll, setRuleAll] = useState([]);
    const [weekData, setWeekData] = useState([
        {
            val: 1,
            lable: 'M',
            name: 'monday',
            select: false,
        },
        {
            val: 2,
            lable: 'T',
            name: 'tuesday',
            select: false,

        },
        {
            val: 3,
            lable: 'W',
            name: 'wednesday',
            select: false,
        },
        {
            val: 4,
            lable: 'T',
            name: 'thursday',
            select: false,
        },
        {
            val: 5,
            lable: 'F',
            name: 'friday',
            select: false,
        },
        {
            val: 6,
            lable: 'S',
            name: 'saturday',
            select: false,
        },
        {
            val: 7,
            lable: 'S',
            name: 'sunday',
            select: false,
        },
    ]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _getParentalRules()
        });
        return unsubscribe;
    }, [navigation]);

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
            title: translations.router_parental_control,
            headerTitleAlign: 'center',
            headerStyle: { height: responseSize * 43 },
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#F5F7FA',
                borderBottomWidth: 0,
                elevation: 0,
            },
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='addParentControl' />
            ),
        });
    }, []);
    let _getParentalRules = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'getParentalRules' })
        let DeviceList = await postData(global.wifiNetworkIP, { topicurl: 'getAccessDeviceCfg' })
        let arr = []
        arr = DeviceList.black.concat(DeviceList.white)
        // ?????????????????????delrule0 ??????????????? ???????????? 
        // ???????????????????????? ???????????????mac ?????????????????????
        // ???????????????????????? ???????????????mac ????????????????????????????????????????????????
        let ruleArrAll = JSON.parse(JSON.stringify(res.rule))
        let ruleArr = []
        let temp = []
        ruleArrAll.forEach(n => {
            let dateArr = []
            weekData.forEach((m) => {
                let ok = n.time.split(',')[0].split(';').includes(m.val + '')
                if (ok) {
                    dateArr.push(m.name)
                }
            })
            n.date = dateArr
        })
        ruleArr = ruleArrAll.filter(n => {
            if (!temp.includes(n.mac)) {
                temp.push(n.mac)
                return true
            }
        });


        console.log(temp)
        setRule(ruleArr)
        setRuleAll(ruleArrAll)
        console.log(ruleArrAll, 1111)

    }
    let _delParentalRules = async (item) => {
        let data = {
            topicurl: 'delParentalRules'
        }
        let delMac = item.mac
        ruleAll.forEach((n) => {
            if (delMac == n.mac) {
                let delRuleName = n.delRuleName
                data[delRuleName] = delRuleName.charAt(delRuleName.length - 1)
            }
        })
        console.log('????????????????????????', data)
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
        _getParentalRules()

    }
    const Item = ({ onPress, item }) => {
        return (
            <Swipeable
                style={styles.listItem}
                bottomDivider={true}
                onPress={() => {
                    console.log(11111)

                }}
                onPanAnimatedValueRef={(optional,event)=>{
                    // console.log(optional,event)
                }}
                onRef={(optional,event)=>{
                    // console.log(optional,event)
                }}
                rightButtonWidth={responseSize * 120}
                rightButtons={
                    [<TouchableHighlight
                        activeOpacity={0.6}
                        style={styles.delButtton}
                        underlayColor={global.buttonColor}
                        onPress={onPress}
                    >
                        <Image
                            style={styles.deleteIcon}
                            resizeMode='center'
                            source={imgUrl}
                        />
                    </TouchableHighlight>]
                }>
                <ControlItem leftImg={true}
                    title={item.desc}
                    time={getStringTime(item.time)}
                    date={item.date.map((item)=>{return (translations[item]+' ')})}
                    onPress={() => {
                        navigation.navigate('ParentalControlSchedule', { mac: item.mac, desc: item.desc })
                    }}
                />

            </Swipeable>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <FlatList
                contentContainerStyle={styles.container}
                bounces={false}
                data={rule}
                renderItem={({ item }) => <Item
                    item={item}
                    onPress={() => {
                        _delParentalRules(item)
                    }}
                />}
                keyExtractor={item => item.mac}
                ListHeaderComponent={<Text style={styles.title}>{translations.router_parental_control_allow_internet + '(' + rule.length + ')'}</Text>}
            />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        paddingVertical: responseSize * 20,
    },
    title: {
        fontSize: 15,
        paddingHorizontal: 20,
        color: '#010C11',
        lineHeight: 17.9,
        fontWeight: '400',
        marginBottom: responseSize * 30,

    },
    listItem: {
        flex: 1,
        padding: 0,
    },
    delButtton: {
        backgroundColor: '#ddd',
        width: responseSize * 120,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        width: responseSize * 30,
        height: responseSize * 30,
    },
});
export default App;
