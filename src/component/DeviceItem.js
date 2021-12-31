import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{backgroundColor:props.type?'#F5F7FA':'#fff',...styles.itemBox,}}>
                <Image
                    style={styles.logoImg}
                    source={props.iconUrl}
                />
                <View style={{justifyContent:props.type?'flex-start':'space-between',...styles.left}}>
                    <Text  ellipsizeMode='tail' numberOfLines={9} style={styles.title}> {props.title}</Text>
                    <Text style={styles.subTitle}>
                        {props.subTitle}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    itemBox: {
        paddingLeft:responseSize*8,
        paddingVertical:responseSize*20,
        paddingRight:responseSize*20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent:'flex-start',
        alignItems: 'center',
        width: responseSize * 160,
        paddingBottom: responseSize * 15,
        shadowColor: '#E9EDF3',
        shadowOffset: {
            width: responseSize * 0,
            height: responseSize * 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: responseSize * 4,
        borderRadius: responseSize * 10,
        marginBottom: responseSize * 15,
        overflow:'hidden',
    },
    left:{
        height: responseSize * 60,
        flexDirection:'column',
        alignItems:'flex-start',
    },
    title : {
        fontSize: responseSize * 14,
        fontWeight: '400',
        lineHeight: responseSize * 17.9,
        color: '#010C11',
        flexWrap:'nowrap',

    },
    subTitle: {
        fontSize: responseSize * 12,
        fontWeight: '400',
        lineHeight: responseSize * 17.9,
        // alignSelf: 'flex-end',
        textAlign: 'left',
        color: '#010C11',
        opacity: 0.5,
    },
    logoImg: {
        width: responseSize * 40,
        height: responseSize * 40,
    }
});
export default App;
