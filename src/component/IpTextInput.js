import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize


const App = (props) => {

    return (
        <View style={styles.inputBox}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                placeholder='0.0.0.0'
                style={styles.input}
                value={props.value}
                maxLength={15}
                returnKeyType='done'
                onChange={props.onChange}
                keyboardType='numeric'
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                // onEndEditing={(e)=>{
                //     console.log(e.nativeEvent.text)
                // }}

            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputBox: {

    },
    title: {
        marginTop: responseSize * 10,
        marginBottom: responseSize * 5,
        fontSize: responseSize * 15,
        color: '#555555',
        fontWeight: '700',
        lineHeight: responseSize * 21,

    },
    input: {
        backgroundColor: '#F8F8F8',
        // width: responseSize * 345,
        height: responseSize * 44,
        borderRadius: responseSize * 10,
        color: '#414245',
        marginBottom: responseSize * 10,
        paddingHorizontal: responseSize * 20,
    },
});
export default App;
