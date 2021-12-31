import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.itemBox}>
                {
                    props.head ? <Text style={styles.head}>
                        {props.head}({props.counts})
                    </Text> : <Text style={styles.head}></Text>
                }
                <Image
                    style={styles.logoImg}
                    source={props.iconUrl}
                />
                <Text style={styles.setName}>
                    {props.setName}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    itemBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: responseSize * 160,
        padding: responseSize * 5,
        paddingBottom:responseSize*15,
        backgroundColor: '#fff',
        shadowColor: '#E9EDF3',
        shadowOffset: {
            width: responseSize * 0,
            height: responseSize * 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: responseSize * 4,
        borderRadius:responseSize*10,
        marginBottom: responseSize * 15,
    },
    head: {
        fontSize: responseSize * 15,
        fontWeight: '400',
        lineHeight: responseSize * 17.9,
        alignSelf: 'flex-end',
        textAlign: 'right',
        color: '#010C11',
        opacity: 0.5,
    },
    setName: {
        fontSize: responseSize * 12,
        fontWeight: '400',
        lineHeight: responseSize * 17.9,
        color: '#010C11',
    },
    logoImg: {
        width: responseSize * 30,
        height: responseSize * 30,
    }
});
export default App;
