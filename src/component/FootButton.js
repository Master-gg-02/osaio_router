import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    return (
        <View style={styles.goConnect}>
                <Button
                    onPress={props.onPress}
                    buttonStyle={{ ...styles.goConnectButton,backgroundColor: props.color}}
                    title={props.title}
                    disabled={props.disabled}
                    loading={props.loading}
                />
        </View>
    );
}
const styles = StyleSheet.create({
    goConnect: {
        // paddingBottom:responseSize*20,
        // backgroundColor:'#fff',
        alignItems: 'center',
    },
    goConnectButtonBox: {


    },
    goConnectButton: {
        width: responseSize*256,
        height:responseSize* 44,
        fontSize: responseSize*14,
        borderRadius: responseSize*10,
    },
});
export default App;