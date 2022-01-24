import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import NavReturn from '../component/NavReturn'
import global from '../utils/global';
let responseSize=global.responseSize
import FootButton from '../component/FootButton'
import {translations} from '../i18n'

const App = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: translations.router_add_login_router_reset_route_head,
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
        <Text style={styles.text}>{translations.router_how_to_reset_the_router_tip_one}</Text>
        <Text style={styles.text}>{translations.router_how_to_reset_the_router_tip_two}</Text>
        <Text style={styles.text}>{translations.router_how_to_reset_the_router_tip_three}</Text>

        <Text style={styles.acttion}>{translations.router_how_to_reset_the_router_tip_final}</Text>
      </View>
      <View style={styles.footer}>
        <FootButton
          onPress={async () => {
            navigation.navigate('LoginRouter')
          }}
          title={translations.router_add_login_router_reset_router_success}
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


