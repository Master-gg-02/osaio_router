import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

let imgUrl = require('../../src/assets/images/ic_options_selected_on_off/ic_options_selected_on_off.png')
let imgUrlChecked = require('../../src/assets/images/ic_options_selected_on_on/ic_options_selected_on_on.png')



import global from '../utils/global';
let responseSize=global.responseSize
const App = (props) => {
    // const [visible, setVisible] = useState(false);
    return (
        <TouchableOpacity
            onPress={props.onPress}
            hitSlop={{ left: 30, right: 30, top: 30, bottom: 30 }}
        >
            <Image
                style={styles.directionImg}
                resizeMode='center'
                source={props.value ? imgUrlChecked : imgUrl}
            />
            {/* <View style={ props.value? styles.check : styles.checked}>
                <View style={props.value ? styles.checkCenter : styles.checkedCenter}></View>
            </View> */}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    directionImg:{
        width: responseSize * 30,
        height: responseSize * 30,
    },
    // check: {
    //     width: responseSize * 16,
    //     height: responseSize * 16,
    //     backgroundColor: global.buttonColor,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: responseSize * 8,

    // },
    // checkCenter: {
    //     width: responseSize * 8.43,
    //     height: responseSize * 5.37,
    //     borderLeftColor: 'white',
    //     borderBottomColor: 'white',
    //     borderBottomWidth: responseSize * 2,
    //     borderLeftWidth: responseSize * 2,
    //     transform: [{ rotate: "-45deg" }],
    //     marginBottom: responseSize * 2,
    // },
    // checked: {
    //     width: responseSize * 16,
    //     height: responseSize * 16,
    //     backgroundColor: global.buttonColor,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: responseSize * 8,
    // },
    // checkedCenter: {
    //     backgroundColor: '#fff',
    //     width: responseSize * 8,
    //     height: responseSize * 8,
    //     borderRadius: responseSize * 4,
    // },
});
export default App;
