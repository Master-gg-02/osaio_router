import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, ScrollView, Alert, } from 'react-native';
import Progress from '../component/Progress'
import Title from '../component/Title'
import FootButton from '../component/FootButton'
import NavReturn from '../component/NavReturn'
import Checked from '../component/Checked'
import global from '../utils/global';
let responseSize = global.responseSize
console.log(responseSize)
import * as RNLocalize from "react-native-localize";
import {translations} from '../i18n'


let title = `connection succeeded`
let imgUrl = require('../../src/assets/images/illus_connect_scanning_router/illus_connect_scanning_router.png')

const app = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: translations.router_add_authorize_head,
            headerTitleAlign: 'center',
            headerLeft: () => (
                <NavReturn />
            ),
            headerRight: () => (
                <NavReturn type='cancel' />
            ),
        });
    }, []);
    const _getLauguageCode = async () => {
        let language = RNLocalize.getLocales()[0].languageCode
        let arr =['en', 'zh', 'es', 'de', 'fr', 'it', 'ja' ]
        if(arr.includes(language)){
            return language
        }else{
            return 'en'
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                bounces={false}
                contentContainerStyle={styles.container}>
                <View style={styles.headContent}>
                    <Progress step={0}></Progress>
                    <Title title={translations.router_add_connect_success_status} />
                    <Image
                        style={styles.directionImg}
                        resizeMode='center'
                        source={imgUrl}
                    />
                </View>
                <View>
                    <View style={styles.conduct}>
                        <View style={{ marginTop: 5, }}>
                            <Checked
                                onPress={() => {
                                    requestAnimationFrame(() => {
                                        setModalVisible(!modalVisible)
                                    })
                                }}
                                value={modalVisible}>
                            </Checked>
                        </View>
                        <Text style={styles.agreeStatement}>
                            {translations.router_add_authorize_agree} &nbsp;
                            <Text
                                hitSlop={{ top: responseSize * 10, bottom: responseSize * 10 }}
                                onPress={async () => {
                                    let code = await _getLauguageCode()
                                    let url = 'https://www.gncchome.com/terms-' + code
                                    console.log(url)
                                    navigation.navigate('WebView', { url: url, name: 'Licnese Agreement' })
                                }}
                                style={styles.licnese}>
                                {translations.router_add_authorize_agreement}&nbsp;&nbsp;
                            </Text>
                            {translations.router_add_authorize_agree_and}&nbsp;&nbsp;
                            <Text
                                hitSlop={{ top: responseSize * 10, bottom: responseSize * 10 }}
                                onPress={async () => {
                                    let code = await _getLauguageCode()
                                    let contryCode = 'us'
                                    let url = 'https://www.gncchome.com/privacy-policy-' + contryCode + '-' + code
                                    console.log(url)
                                    navigation.navigate('WebView', { url: url, name: 'Statement Privacy' })
                                }}
                                style={styles.statement}>
                                    {translations.router_add_authorize_privacy.format(global.productName)}
                            </Text>
                        </Text>
                    </View>
                    <FootButton
                        onPress={async () => {
                            navigation.navigate('SetNetConfig', { fromPage: 'Authorize' })
                        }}
                        title={translations.next}
                        color={global.buttonColor}
                        disabled={!modalVisible}
                    />
                </View>
            </ScrollView>
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
    headContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    textAttention: {
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: responseSize * 20,
        marginTop: responseSize * 20,
        marginBottom: responseSize * 10,
    },
    directionImg: {
        width: responseSize * 300,
        height: responseSize * 100,
    },
    check: {
        width: responseSize * 16,
        height: responseSize * 16,
        backgroundColor: global.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responseSize * 8,

    },
    checkCenter: {
        width: responseSize * 8.43,
        height: responseSize * 5.37,
        borderLeftColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: responseSize * 2,
        borderLeftWidth: responseSize * 2,
        transform: [{ rotate: "-45deg" }],
        marginBottom: responseSize * 2,
    },
    checked: {
        width: responseSize * 16,
        height: responseSize * 16,
        backgroundColor: global.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responseSize * 8,
    },
    checkedCenter: {
        backgroundColor: '#fff',
        width: responseSize * 10,
        height: responseSize * 10,
        borderRadius: responseSize * 5,
    },
    conduct: {
        paddingHorizontal: responseSize * 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    agreeStatement: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: responseSize * 8,
        marginBottom: responseSize * 10,
        lineHeight: responseSize * 16.8,
        fontSize: responseSize * 12,
        color: '#414245',
        fontWeight: '400',
    },
    licnese: {
        color: global.buttonColor,
        fontWeight: '700',

    },
    statement: {
        color: global.buttonColor,
        fontWeight: '700',

    },
});
export default app;
