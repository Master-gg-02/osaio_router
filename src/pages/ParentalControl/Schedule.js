import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, FlatList, TouchableHighlight } from 'react-native';
import NavReturn from '../../component/NavReturn'
import Toast from 'react-native-root-toast';
import global from '../../utils/global';
let responseSize = global.responseSize
import { postData } from '../../api/postData'
import Dialog from '../../component/Dialog'
import { getStorageData } from '../../api/getStorageData'
import { ListItem, Button } from 'react-native-elements'
import { getStringTime } from '../../utils/util'
import ControlItem from '../../component/ControlItem'
let imgUrl = require('../../assets/images/ic_nav_delete/ic_nav_delete.png')
let imgUrlIphone = require('../../../src/assets/images/ic_nav_phone_40/ic_nav_phone_40.png')
import Swipeable from 'react-native-swipeable';
import { translations } from '../../i18n'


const App = ({ navigation, route }) => {
    const [rule, setRule] = useState([]);
    const [sectionID, setSectionID] = useState('');
    const [rowID, setRowID] = useState('');
    const [mac, setMac] = useState('');
    const [desc, setDesc] = useState('');
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
    // const _getRuleTempArr = async () => {
    //     let res = await getStorageData({ uid: global.uid, mac: global.lanMac }, 'ruleTempArr')
    //     console.log(res)
    //     let ruleArr = JSON.parse(res)
    //     setRule(ruleArr)
    // }


    useEffect(() => {
        console.log(111111)
        // _getRuleTempArr()
        return () => {

        }
    }, [])
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
            title: translations.detection_schedule_label,
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
            headerRight: () => (
                <NavReturn type='addParentControler' onPress={() => {
                    let data = {
                        mac,
                        desc,
                        frompage: 'ScheduleAdd'
                    }
                    console.log(data)
                    navigation.navigate('ParentalControler', data);
                }} />
            ),
        });
    }, []);
    let _delParentalRules = async (item) => {
        let delArr = rule.filter(n => {
            return n.delRuleName == item.delRuleName
        })
        let data = {
            topicurl: 'delParentalRules'
        }
        delRuleName = delArr[0].delRuleName
        data[delRuleName] = delRuleName.charAt(delRuleName.length - 1)
        console.log('要删除的控制规则', data)
        let res = await postData(global.wifiNetworkIP, data)
        _getParentalRules(mac)

    }
    let _getParentalRules = async (macTemp) => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'getParentalRules' })
        let ruleArrAll = JSON.parse(JSON.stringify(res.rule))
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

        let ruleTempArr = ruleArrAll.filter((n) => {
            return n.mac == macTemp
        })
        console.log(ruleTempArr, '99099999999')
        setRule(ruleTempArr)

    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params) {
                let temp = route.params
                setMac(temp.mac)
                setDesc(temp.desc)
                _getParentalRules(temp.mac)
            }
        });

        return unsubscribe;
    }, [navigation]);

    const Item = ({ item, onPress }) => {
        return (
            <Swipeable
                style={styles.listItem}
                rightButtonWidth={responseSize * 120}
                rightButtons={
                    [<TouchableHighlight
                        activeOpacity={0.6}
                        style={styles.delButton}
                        underlayColor={global.buttonColor}
                        onPress={onPress}
                    >
                        <Image
                            style={styles.deleteIcon}
                            resizeMode='center'
                            source={imgUrl}
                        />
                    </TouchableHighlight>]
                }
            >
                <ControlItem
                    onPress={() => {
                        console.log(item)
                        let data = {
                            mac: item.mac,
                            time: item.time,
                            delRuleName: item.delRuleName,
                            frompage: 'ScheduleView'
                        }
                        navigation.navigate('ParentalControler', data)
                    }}
                    title={getStringTime(item.time)} 
                    date={item.date.map((item)=>{return (translations[item]+' ')})} />
            </Swipeable>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <FlatList
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}
                bounces={false}
                data={rule}
                renderItem={({ item }) => <Item
                    item={item}
                    onPress={() => {
                        _delParentalRules(item)
                    }}
                />}
                keyExtractor={item => item.delRuleName}
                ListHeaderComponent={<View style={styles.head}>
                    <Image
                        style={styles.leftImg}
                        resizeMode='center'
                        source={imgUrlIphone}
                    />
                </View>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: responseSize * 20,
    },
    head: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responseSize * 30,
    },
    title: {
        fontSize: 15,
        paddingHorizontal: 20,
        color: '#010C11',
        lineHeight: responseSize * 17.9,
        fontWeight: '400',
        marginBottom: responseSize * 30,
    },
    listItem: {
        padding: 0,
        flex: 1,
    },
    delButton: {
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
    leftImg: {
        width: 40,
        height: 40,
    },

});
export default App;
