import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize
let headerDirectText = `Power on the router and confirm that the indicator light is on`
let imgUrl = require('../../src/assets/images/illus_long_router/illus_long_router.png')

const HomeScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 0,
                // elevation: 0,
            },
            // headerTitleAlign: 'center',
            // headerStyle: { height: responseSize * 43 },
            // headerLeft: () => (
            //     <NavReturn type='home' />
            // ),
            // headerRight: () => (
            //     <NavReturn type='cancel' />
            // ),
        });
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',justifyContent:'center', }}>
          <ActivityIndicator size="large" color={global.buttonColor} />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
});
export default HomeScreen;
