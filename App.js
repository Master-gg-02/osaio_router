/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet,StatusBar} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
// import { Provider } from 'react-redux';
// import store from './src/store';
//  import * as Analytics from 'expo-firebase-analytics'; 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomeScreen';
import LoginRouterScreen from './src/pages/LoginRouterScreen'
import ConnectRouterScreen from './src/pages/ConnectRouterScreen'
import AuthorizeScreen from './src/pages/AuthorizeScreen'
import SetNetConfigScreen from './src/pages/SetNetConfigScreen'
import SetWiFiConfigScreen from './src/pages/SetWiFiConfigScreen'
import ConfigSuccessfulScreen from './src/pages/ConfigSuccessfulScreen'
import DemoScreen from './src/pages/DemoScreen'
import CommunicationDemoScreen from './src/pages/CommunicationDemoScreen'
import WifiListScreen from './src/pages/WifiList'
import WebViewScreen from './src/pages/MyWebView'
import ResetRouteScreen from './src/pages/ResetRoute'
import SetRouterNameScreen from './src/pages/SetRouterName'
import HomeLoadingScreen from './src/pages/HomeLoading'
import RouterSettingScreen from './src/pages/RouterSetting'
import DeviceInfoScreen from './src/pages/DeviceInfo'
import ConnectDevideListScreen from './src/pages/ConnectDevide'
import ConnectDevideScreen from './src/pages/ConnectDevide/ConnectDevide'
import SetDeviceNameScreen from './src/pages/ConnectDevide/SetDeviceName'
import ConnectDeviceInfoScreen from './src/pages/ConnectDevide/ConnectDeviceInfo'
import ParentalControlScreen from './src/pages/ParentalControl'
import ParentalControlDeviceListScreen from './src/pages/ParentalControl/DeviceList'
import ParentalControlerScreen from './src/pages/ParentalControl/Controler'
import ParentalControlScheduleScreen from './src/pages/ParentalControl/Schedule'
import GusetWiFiConfigScreen from './src/pages/GusetWiFiConfigScreen'
import RouterTimerSetScreen from './src/pages/RouterTimerSet'
import UpdateNetConfigScreen from './src/pages/UpdateNetConfigScreen'
import UpdateWiFiConfigScreen from './src/pages/UpdateWiFiConfigScreen'



import OtaUpdateScreen from './src/pages/OtaUpdate'






import DeviceHomeScreen from './src/pages/DeviceHomeScreen'
import DeviceSettingScreen from './src/pages/DeviceHomeScreen'


import { nativeViewroutetype } from './src/utils/bridge'



// import { Colors } from 'react-native/Libraries/NewAppScreen';

import Toast from 'react-native-root-toast';

import { enableScreens } from 'react-native-screens'

enableScreens()
const Stack = createNativeStackNavigator();
const App: () => React$Node = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDeviceEventType();
    return () => {
      //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
      console.log("这是模拟componentWillUnmount钩子函数")
    }
  }, [])

  let getDeviceEventType = async () => {
    let res = await nativeViewroutetype({})
    // console.log(res.data)
    // console.log(res.data.viewroutetype)

    // Toast(res.data.viewroutetype)
    if (res.viewroutetype == '1') {
      setIsAdd(false)
    } else {
      setIsAdd(true)
    }
    setLoading(false)
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        {/* {
          isAdd && Loading == false ?<StatusBar  backgroundColor={isAdd && Loading == false ?'#fff':isAdd == false && Loading == false ?'#F5F7FA':'#fff'} networkActivityIndicatorVisible={true} barStyle={'dark-content'}
          />:<></>
        } */}
        <StatusBar  backgroundColor={isAdd && Loading == false ?'#fff':isAdd == false && Loading == false ?'#F5F7FA':'#fff'} networkActivityIndicatorVisible={true} barStyle={'dark-content'}
          />
        {/* <Stack.Navigator initialRouteName={isAdd && Loading == false?'Home':isAdd == false && Loading == false?'DeviceHome': 'HomeLoading'}> */}
        <Stack.Navigator initialRouteName={'Home'}>
          {
            isAdd && Loading == false ?
              (<>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="DeviceHome" component={DeviceHomeScreen} />
                <Stack.Screen name="ConnectRouter" component={ConnectRouterScreen} />
                <Stack.Screen name="LoginRouter" component={LoginRouterScreen} />
                <Stack.Screen name="Authorize" component={AuthorizeScreen} />
                <Stack.Screen name="SetNetConfig" component={SetNetConfigScreen} />
                <Stack.Screen name="SetWiFiConfig" component={SetWiFiConfigScreen} />
                <Stack.Screen name="ConfigSuccessful" component={ConfigSuccessfulScreen} />
                <Stack.Screen name="WifiList" component={WifiListScreen} />
                <Stack.Screen name="ResetRoute" component={ResetRouteScreen} />
                <Stack.Screen name="WebView" component={WebViewScreen} />
              </>) : isAdd == false && Loading == false ?
                (<>
                  {/* <Stack.Screen name="CommunicationDemo" component={CommunicationDemoScreen} /> */}
                  {/* <Stack.Screen name="ParentalControler" component={ParentalControlerScreen} />    */}

                  {/* <Stack.Screen name="ParentalControlSchedule" component={ParentalControlScheduleScreen} />                                    */}

                  <Stack.Screen name="DeviceHome" component={DeviceHomeScreen} />
                  <Stack.Screen name="UpdateNetConfig" component={UpdateNetConfigScreen} />
                  <Stack.Screen name="UpdateWiFiConfig" component={UpdateWiFiConfigScreen} />
                  <Stack.Screen name="RouterSetting" component={RouterSettingScreen} />
                  <Stack.Screen name="SetRouterName" component={SetRouterNameScreen} />
                  <Stack.Screen name="DeviceInfo" component={DeviceInfoScreen} />
                  <Stack.Screen name="ConnectDevideList" component={ConnectDevideListScreen} />
                  <Stack.Screen name="ConnectDevide" component={ConnectDevideScreen} />
                  <Stack.Screen name="SetDeviceName" component={SetDeviceNameScreen} />
                  <Stack.Screen name="ConnectDeviceInfo" component={ConnectDeviceInfoScreen} />
                  <Stack.Screen name="OtaUpdate" component={OtaUpdateScreen} />
                  <Stack.Screen name="ParentalControl" component={ParentalControlScreen} />
                  <Stack.Screen name="ParentalControlDeviceList" component={ParentalControlDeviceListScreen} />
                  <Stack.Screen name="ParentalControler" component={ParentalControlerScreen} />
                  <Stack.Screen name="ParentalControlSchedule" component={ParentalControlScheduleScreen} />
                  <Stack.Screen name="GusetWiFiConfig" component={GusetWiFiConfigScreen} />
                  <Stack.Screen name="RouterTimerSet" component={RouterTimerSetScreen} />



                </>) :
                (
                  <>
                    <Stack.Screen name="HomeLoading" component={HomeLoadingScreen} />
                  </>
                )
          }
          {/* <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DeviceHome" component={DeviceHomeScreen} />
          <Stack.Screen name="ConnectRouter" component={ConnectRouterScreen} />
          <Stack.Screen name="LoginRouter" component={LoginRouterScreen} />
          <Stack.Screen name="Authorize" component={AuthorizeScreen} />
          <Stack.Screen name="SetNetConfig" component={SetNetConfigScreen} />
          <Stack.Screen name="SetWiFiConfig" component={SetWiFiConfigScreen} />
          <Stack.Screen name="ConfigSuccessful" component={ConfigSuccessfulScreen} />
          <Stack.Screen name="WifiList" component={WifiListScreen} />
          <Stack.Screen name="WebView" component={WebViewScreen} />
          <Stack.Screen name="SetRouterName" component={SetRouterNameScreen} />
          <Stack.Screen name="Demo" component={DemoScreen} />
          <Stack.Screen name="CommunicationDemo" component={CommunicationDemoScreen} /> */
          }
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({

});

export default App;
