import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Switch, Animated, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, SwitchComponent } from 'react-native';
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import {nativePopPage} from '../utils/bridge'

import global from '../utils/global';
let responseSize=global.responseSize


let title = 'The configuration is successful!'
let info = 'The new SSID and password will take effect in about 1 minute. Please reconnect your mobile phone to the router Wi-Fi in the future.'
const app = ({ navigation }) => {
    const [goto, setGoto] = useState(false);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'ConfigSuccessful',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel'/>
            ),
        });
    }, []);
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headContent}>
                <Title title={title} />
                <Image
                    style={styles.directionImg}
                    source={require('../../src/assets/images/ic_device_router/ic_device_router.png')}
                />
                <Text style={styles.info}>
                    {info}
                </Text>
            </View>
            <FootButton
                onPress={()=> {
                    nativePopPage({});
                    // navigation.navigate('WifiList')
                }}
                title='OK'
                color={global.buttonColor}
                // disabled={goto}
            />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: responseSize*20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    headContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    directionImg: {
        width: responseSize*200,
        height: responseSize*200,
    },
    info:{ color: '#555555', 
    fontWeight: '400', 
    lineHeight: responseSize*16.8, 
    marginBottom: responseSize*10, 
    padding: responseSize*20 }
});
export default app;
