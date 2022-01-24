import React from 'react';
import { StyleSheet, Text } from 'react-native';
// import Switch from 'react-native-switch-pro'
import Toggle from 'react-native-toggle-element';


import global from '../utils/global';
let responseSize = global.responseSize

const App = (props) => {

    return (
        <Toggle
            value={props.value}
            onPress={props.onSyncPress}
            trackBar={{
                activeBackgroundColor: global.buttonColor,
                inActiveBackgroundColor: 'rgba(65, 66, 69, 0.3)',
                width: 45,
                height: 22,
                radius: 11,
            }}
            thumbButton={{
                activeBackgroundColor: '#FFF',
                inActiveBackgroundColor: '#fff',
                width: 25,
                height: 25,
                radius: 12.5,
            }}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        width: responseSize * 16,
        height: responseSize * 16,
        borderRadius: 8,
        position: 'absolute'
    }
});
export default App;
