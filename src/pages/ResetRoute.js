import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import NavReturn from '../component/NavReturn'
import global from '../utils/global';
let responseSize=global.responseSize
import FootButton from '../component/FootButton'

const App = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'How Does Reset Router',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>1.请确保路由器已开启。在路由器上找到重置按钮或重置孔。</Text>
        <Text style={styles.text}>2.长按重置按钮5-8秒，直到路由器的指示灯慢闪</Text>

        <Text style={styles.text}>3.路由器将重启病恢复出厂设置。该过程将大约花费两分钟。完成后您需要重新设置路由器</Text>

        <Text style={styles.acttion}>为避免固件或者设备损坏，重置过程中请确保路由器处于开机状态。</Text>
      </View>
      <View style={styles.footer}>
        <FootButton
          onPress={async () => {
            navigation.navigate('LoginRouter')
          }}
          title='重置路由器成功'
          color={global.buttonColor}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: responseSize * 15,
    paddingVertical: responseSize * 25,
    paddingHorizontal: responseSize * 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: responseSize * 15,
    color: '#010C11',
    lineHeight: responseSize * 17.9,
    opacity: .6,
    marginBottom: responseSize * 30,
  },
  acttion: {
    fontSize: responseSize * 15,
    color: '#010C11',
    fontWeight: '700'
  },
  footer:{
    marginBottom:responseSize*20,
  }
});
export default App;


