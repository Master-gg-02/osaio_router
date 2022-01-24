import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import NavReturn from '../../component/NavReturn'
import global from '../../utils/global';
let responseSize=global.responseSize
import { postData } from '../../api/postData'
import { overflowText } from '../../utils/util'
import ControlItem from '../../component/ControlItem'
import Toast from 'react-native-root-toast';
import {translations} from '../../i18n'
const App = ({ navigation}) => {
    const [devices, setDevice] = useState([]);


    useEffect(() => {
        console.log(111111)
        _getOnlineMsg()
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
    let _getOnlineMsg = async () => {
        let res = await postData(global.wifiNetworkIP, { topicurl: 'getOnlineMsg' })
        let ruleList = await postData(global.wifiNetworkIP, { topicurl: 'getParentalRules' })
        let temp = []
        ruleArr= ruleList.rule.filter(n => {
            if (!temp.includes(n.mac)) {
                temp.push(n.mac)
                return true
            }
        });
        let arr = JSON.parse(JSON.stringify(res))
        arr.forEach(n => {
            if(temp.includes(n.mac)){
                n.protect=true
            }
        });
        setDevice(arr)
        console.log(devices, 1111)

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <ScrollView contentContainerStyle={styles.container}
                bounces={false}
            >
                <Text style={styles.title}>{translations.router_add_parent_control_select_device}:({devices.length})</Text>
                {
                    devices.map((item) => {
                        return (
                            <ControlItem key={item.mac} leftImg title={overflowText(item.name,22)} onPress={() => { 
                                if(item.protect){
                                    Toast.show(translations.add_device_add_by_yourself, {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER
                                    })
                                    return
                                }
                                navigation.navigate('ParentalControler',{mac:item.mac,desc:item.name})
                            
                            }} protect={item.protect} />
                        )
                    })
                }
            </ScrollView>
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
    deleteIcon: {
        marginTop: responseSize * 30,
        marginLeft: responseSize * 45,
        width: responseSize * 30,
        height: responseSize * 30,
    },
});
export default App;
