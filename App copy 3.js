/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//  import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View ,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';

// import { enableScreens } from 'react-native-screens'



import HomeScreen from './src/pages/HomeScreen';


// 导航相关
const Stack = createNativeStackNavigator();
// enableScreens()

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RootSiblingParent>
        <NavigationContainer>
           {/* {
           isAdd && Loading == false ?<StatusBar  backgroundColor={isAdd && Loading == false ?'#fff':isAdd == false && Loading == false ?'#F5F7FA':'#fff'} networkActivityIndicatorVisible={true} barStyle={'dark-content'}
           />:<></>
         } */}
         <StatusBar backgroundColor={isAdd && Loading == false ? '#fff' : isAdd == false && Loading == false ? '#F5F7FA' : '#fff'} networkActivityIndicatorVisible={true} barStyle={'dark-content'}
         />
         {/* <Stack.Navigator initialRouteName={isAdd && Loading == false?'Home':isAdd == false && Loading == false?'DeviceHome': 'HomeLoading'}> */}
         <Stack.Navigator initialRouteName={'Home'}>
           {/* {
             isAdd && Loading == false ?
               (<>
                 <Stack.Screen name="Home" component={HomeScreen} />
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
           } */}
         </Stack.Navigator>
          {/* <View style={styles.container}>
            <Text
              // onPress={()=>{alert('a')}}
              style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View> */}
        </NavigationContainer>
      </RootSiblingParent>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
