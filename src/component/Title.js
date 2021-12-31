import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons"

import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    return (
        <Text style={{...styles.textTitle,fontSize:props.size,textAlign:props.align}}>
             {props.title}
        </Text>
    );
}
const styles = StyleSheet.create({
    textTitle: {
        marginVertical: responseSize*30,
        paddingHorizontal: responseSize*30,
        fontWeight:'bold',
        textAlign: 'center',
    },
});
export default App;
