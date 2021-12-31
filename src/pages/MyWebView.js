import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import NavReturn from '../component/NavReturn'
import global from '../utils/global';
let responseSize=global.responseSize


const App = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerTitleAlign: 'center',
      headerStyle: { height: responseSize * 43 },
      headerLeft: () => (
        <NavReturn />
      ),
      headerRight: () => (
        <NavReturn type='cancel' />
      ),
    });
  }, []);
  return (
    <SafeAreaView style={{flex:1}}>
      <WebView source={{ uri: route.params.url }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

});
export default App;


