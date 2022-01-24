import { Dimensions, useWindowDimensions } from 'react-native';


let uiWidthPx = 375;
let uiHeightPx = 812;
let deviceWidthDp = Dimensions.get('window').width;
let deviceHeightDp = Dimensions.get('window').height;
// 如果应用是竖屏的
let responseSize = deviceWidthDp / uiWidthPx;

Dimensions.addEventListener("change", () => {
    console.log("屏幕转动了")
    if (deviceWidthDp > deviceHeightDp) {
        // 如果应用是横屏
        console.log(responseSize, '横屏')
        responseSize = deviceHeightDp / uiHeightPx
    } else {
        console.log(responseSize, '竖屏')
        responseSize = deviceWidthDp / uiWidthPx;
    }
    // CounterEmitter.emit('responseSize',responseSize);

})




export default {
    uid:'15039493174',
    wifiNetworkIP:'192.168.8.1',
    lanMac:'',
    debug:false,
    nativeDebug:false,
    model:'',
    productName:'AX18',
    ssid:'',
    BaseUrl:'',
    buttonColor:'#B4E555',
    addThemeColor:'',
    setThemeColor:'#F5F7FA',
    shadowColor:'#E9EDF3',
    whiteBackgroundColor:'#fff',
    mainFontSize:responseSize*15,
    subFontSize:responseSize*12,
    mainColor:'',
    subColor:'',
    responseSize:responseSize
};
