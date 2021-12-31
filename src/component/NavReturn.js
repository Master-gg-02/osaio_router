import React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { nativePopPage } from '../utils/bridge'
import { useNavigation } from '@react-navigation/native';


import global from '../utils/global';
let responseSize=global.responseSize

let imgUrlCancel = require('../../src/assets/images/ic_nav_cancel_off/ic_nav_cancel_off.png')
let imgUrlGoBack = require('../../src/assets/images/ic_nav_return_off/ic_nav_return_off.png')
let imgUrlSet = require('../../src/assets/images/ic_nav_set/ic_nav_set.png')
let imgUrlAdd = require('../../src/assets/images/ic_nav_add/ic_nav_add.png')



const ApemanButton = (props) => {
    let { type } = props;
    switch (type) {
        case 'cancel':
            return <Image
                style={styles.goConnect}
                source={imgUrlCancel}
            />
            break;
        case 'set':
            return <Image
                style={styles.goConnect}
                source={imgUrlSet}
            />
            break;
        case 'addParentControl':
            return <Image
                style={styles.goConnect}
                source={imgUrlAdd}
            />
            break;
        case 'addParentControler':
            return <Image
                style={styles.goConnect}
                source={imgUrlAdd}
            />
            break;
        default:
            return <Image
                style={styles.goConnect}
                source={imgUrlGoBack}
            />;
    }
}
const App = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableHighlight
            style={styles.tap}
            onPress={props.onPress?props.onPress:() => {
                if (props.type == 'cancel' || props.type == 'home') {
                    nativePopPage({});
                } else if (props.type == 'set') {
                    navigation.navigate('RouterSetting');
                } else if (props.type == 'addParentControl') {
                    navigation.navigate('ParentalControlDeviceList');
                }
                else {
                    navigation.goBack();
                }
            }
            }
            underlayColor='#4142454D'
        >
            <ApemanButton type={props.type} />
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({
    goConnect: {
        height: responseSize * 30,
        width: responseSize * 30,
    },
    tap: {
        // backgroundColor: '#999'
        borderRadius: responseSize * 15,
    }
});
export default App;