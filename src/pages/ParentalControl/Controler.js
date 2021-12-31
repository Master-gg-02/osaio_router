import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import NavReturn from '../../component/NavReturn'
import FootButton from '../../component/FootButton'

import global from '../../utils/global';
let responseSize=global.responseSize
import { postData } from '../../api/postData'
import CounterEmitter from '../../utils/CountEmitter';
import { setStorageData } from '../../api/setStorageData'
import { getStorageData } from '../../api/getStorageData'
import {  overflowText, getTime, setTime, getStringTime } from '../../utils/util'
import DeviceItem from '../../component/DeviceItem'
let imgUrl = require('../../../src/assets/images/ic_nav_phone_40/ic_nav_phone_40.png')
import DatePicker from 'react-native-date-picker';
import { inRange, set } from 'lodash';
import Toast from 'react-native-root-toast';
import moment from 'moment';
import {translations} from '../../i18n'
const App = ({ navigation, route }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [mac, setMac] = useState('');
    const [desc, setDesc] = useState('');
    const [delRuleName, setDelRuleName] = useState('');





    const [frompage, setFrompage] = useState('');
    const [show, setShow] = useState(false);
    const [weekData, setWeekData] = useState([
        {
            val: 1,
            lable: 'M',
            name: '星期一',
            select: false,
        },
        {
            val: 2,
            lable: 'T',
            name: '星期二',
            select: false,

        },
        {
            val: 3,
            lable: 'W',
            name: '星期三',
            select: false,
        },
        {
            val: 4,
            lable: 'T',
            name: '星期四',
            select: false,
        },
        {
            val: 5,
            lable: 'F',
            name: '星期五',
            select: false,
        },
        {
            val: 6,
            lable: 'S',
            name: '星期六',
            select: false,
        },
        {
            val: 7,
            lable: 'S',
            name: '星期日',
            select: false,
        },
    ]);



    useEffect(() => {
        let s = setTime('0:0')
        let e = setTime("23:59")
        console.log(33333,route.params)
        if (route.params) {
            let temp = route.params
            setMac(temp.mac)
            console.log(temp.mac)
            setDesc(temp.desc)
            if (temp.frompage) {
                setFrompage(temp.frompage)
            }
            if (temp.frompage == 'ScheduleView') {
                console.log('ScheduleView')
                setDelRuleName(temp.delRuleName)
                let nTime = temp.time.split(',')
                s = setTime(nTime[1])
                e = setTime(nTime[2])
                let weekArr = nTime[0].split(';')
                let tempArr = JSON.parse(JSON.stringify(weekData))
                tempArr.forEach((n) => {
                    if (weekArr.includes(String(n.val))) {
                        n.select = true
                    }
                })
                setWeekData(tempArr)
            }
        }
        setStartDate(s)
        setEndDate(e)

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
    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_detail_parental_control,
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
    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setDate(currentDate);
    // };
    let _delParentalRules = async () => {
        let data = {
            topicurl: 'delParentalRules'
        }
        data[delRuleName] = delRuleName.charAt(delRuleName.length - 1)
        console.log(data, '删除规则')
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res, '删除规则成功')
        _addRule()
    }
    let _addRule = async () => {
        let weekAarr = []
        weekData.filter(n => {
            if (n.select) {
                weekAarr.push(n.val)
            }
        })
        let week = weekAarr.join(';')
        if (weekAarr.length == 7 || weekAarr.length == 0) {
            week = '0'
        }

        if (startDate > endDate) {
            Toast.show(translations.notifications_invalid_tip, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })
        }
        let sTime = getTime(startDate)
        let eTime = getTime(endDate)
        console.log(week)
        let data = {
            mac,
            desc,
            week,
            sTime,
            eTime,
            state: '1',
            addEffect: '0',
            topicurl: 'setParentalRules',
        }
        console.log(data, '添加规则')
        let res = await postData(global.wifiNetworkIP, data)
        console.log(res)
        console.log(res, '添加规则成功')


    }
    let _setParentalRules = async () => {
        if (frompage == '') {
            await _addRule()
            navigation.navigate('ParentalControl')
        } else {
            if (frompage == 'ScheduleView') {
                await _delParentalRules()
            } else {
                await _addRule()
            }
            navigation.navigate('ParentalControlSchedule', { mac })

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.timeBox} >
                    <View style={styles.startTime}>
                        <Text style={styles.time}>{getTime(startDate)}</Text>
                    </View>
                    <View >
                        <View style={styles.line}>
                        </View>
                        <View style={styles.hiddenLine}>
                        </View>
                    </View>
                    <View style={styles.endTime}>
                        <Text style={styles.time}>{getTime(endDate)}</Text>
                    </View>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>Start time</Text>
                    <Text style={styles.text}>End time</Text>
                </View>
            </View>

            <View
                style={styles.timer}
            >
                <DatePicker
                    style={styles.item}
                    mode={'time'}
                    date={startDate}
                    locale='fr'
                    androidVariant='iosClone'
                    onDateChange={setStartDate}
                />
                <DatePicker
                    style={styles.item}
                    mode={'time'}
                    locale='fr'
                    androidVariant='iosClone'
                    date={endDate}
                    onDateChange={setEndDate}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.week}>
                    {
                        weekData.map((item) => {
                            return (
                                <View
                                    key={item.val}
                                    style={item.select ? styles.select : styles.default}
                                >
                                    <Text
                                        selectable={false}
                                        style={styles.selectText}
                                        onPress={
                                            () => {
                                                let arr = JSON.parse(JSON.stringify(weekData))
                                                arr[item.val - 1].select = !item.select
                                                setWeekData(arr)
                                            }
                                        }>
                                        {item.lable}
                                    </Text>
                                </View>

                            )
                        })
                    }
                </View>

                <FootButton
                    onPress={() => { _setParentalRules() }}
                    color='#6C61F5'
                    title={translations.router_save}
                    disabled={false}
                />
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F5F7FA',
    },
    header: {
        margin: responseSize * 20,
        paddingVertical: 18,
        paddingHorizontal: responseSize * 30,
        borderRadius: responseSize * 10,
        borderWidth: 1,
        borderColor: '#6C61F5',
        backgroundColor: '#fff',
    },
    timeBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textBox: {
        marginTop: responseSize * 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    startTime: {
    },
    line: {
        width: responseSize * 50,
        height: 1,
        backgroundColor: '#010C11',
        opacity: 0.3,
    },
    hiddenLine: {
        width: responseSize * 50,
        height: 1,
        backgroundColor: '#010C11',
        opacity: 0,
    },
    endTime: {
        textAlign: 'center'
    },
    time: {
        fontSize: 30,
        fontWeight: '400',
        color: '#000000',
        lineHeight: responseSize * 35.16,
        textAlign: 'center'

    },
    text: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#000000',
        lineHeight: responseSize * 18,
        opacity: 0.5,
        textAlign: 'center',

    },
    timer: {
        paddingHorizontal: responseSize * 20,
        marginTop: responseSize * 37,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        width: 140,
        // backgroundColor:'red'
    },
    footer: {
        backgroundColor: '#F5F7FA',
        marginTop: responseSize * 50,

    },
    week: {
        paddingHorizontal: responseSize * 20,
        marginBottom: responseSize * 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    default: {
        backgroundColor: '#C4C4C4',
        width: responseSize * 35,
        height: responseSize * 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responseSize * 17.5,
        color: '#fff',

    },
    select: {
        backgroundColor: '#6C61F5',
        width: responseSize * 35,
        height: responseSize * 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responseSize * 17.5,
        color: '#fff',
    },
    selectText: {
        width: responseSize * 35,
        height: responseSize * 35,
        flex: 1,
        lineHeight: responseSize * 35,
        textAlign: 'center',

    }
});
export default App;
