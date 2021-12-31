import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize
import IpTextInput from './IpTextInput'
import Toast from 'react-native-root-toast';

const App = (props) => {
    function f_check_IP(ip) {
        var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;//正则表达式   
        if (re.test(ip)) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                return false;
            }
        }
        Toast.show('请注意ip格式：xxx.xxx.xxx.xxx', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER
        })
        return true;
    }
    return (
        < View style={styles.staticIpDress}>

            <IpTextInput
                title='ip地址'
                value={props.ipValue}
                onChange={props.onIpChange}
                onFocus={props.onFocus}
                onBlur={() => {
                    if (props.ipValue != '') {
                        f_check_IP(props.ipValue)
                    }
                }}
            />
            <IpTextInput
                title='子网掩码'
                value={props.maskValue}
                onChange={props.onMaskChange}
                onFocus={props.onFocus}
                onBlur={() => {
                    if (props.maskValue != '') {
                        f_check_IP(props.maskValue)
                    }
                }}
            />
            <IpTextInput
                title='网关'
                value={props.gatewayValue}
                onChange={props.onGatewayChange}
                onFocus={props.onFocus}
                onBlur={() => {
                    if (props.gatewayValue != '') {
                        f_check_IP(props.gatewayValue)
                    }
                }}

            />
            <IpTextInput
                title='首选DNS服务器'
                value={props.priDnsValue}
                onChange={props.onPriDnsChange}
                onFocus={props.onFocus}
                 onBlur={() => {
                    if (props.priDnsValue != '') {
                        f_check_IP(props.priDnsValue)
                    }
                }}
            />
            <IpTextInput
                title='备用DNS服务器'
                value={props.secDnsValue}
                onChange={props.onSecDnsChange}
                onFocus={props.onFocus}
                onBlur={() => {
                    if (props.secDnsValue != '') {
                        f_check_IP(props.secDnsValue)
                    }
                }}

            />
        </View>
    )
}
const styles = StyleSheet.create({
    staticIpDress: {
        marginTop: responseSize * 10,
        width: responseSize * 345,
        flex: 1,
        // padding: responseSize * 10,
    },
});
export default App;
