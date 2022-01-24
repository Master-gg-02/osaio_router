import { NativeModules } from 'react-native';
import CountrySelectConponent from 'react-native-element-dropdown/src/SelectCountry';


let RNPageManager = NativeModules.YRRNBridgeManager
// import Toast from 'react-native-root-toast';
// let uniDeal=(url,data)=>{
//     return new Promise(async(resolve,reject)=>{
//         let res = await RNPageManager.requestAsyn(url, data)
//         console.log(res)
//         resolve(res) 
//         if(res.code=='1000'){
//         resolve(res) 
//             resolve(res) 
//         }else{
//             reject(err)
//             Toast.show(res+'!',{
//                 duration: Toast.durations.LONG,
//                 position: Toast.positions.CENTER,
//                 shadow: true,
//                 animation: true,
//                 hideOnPress: true,
//                 delay: 0,
//                 onShow: () => {
//                     // calls on toast\`s appear animation start
//                 },
//                 onShown: () => {
//                     // calls on toast\`s appear animation end.
//                 },
//                 onHide: () => {
//                     // calls on toast\`s hide animation start.
//                 },
//                 onHidden: () => {
//                     // calls on toast\`s hide animation end.
//                 }
//             })
//         }
//     })
// }
// let nativeWiFiView = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/wifiview', data);return res }
// let nativePopPage = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/poppage', data);return res }
// let nativePopToRootView = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/poptorootview', data);return res }
// let nativeGatewayIP = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/gatewayip', data);return res }
// let nativeDevicestore = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/devicestore', data);return res }
// let nativeViewroutetype = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/viewroutetype', data);return res }
// let nativeUserid = async (data) => { let res= await uniDeal('yrcx://yrbasetoolservice/userid', data);return res }




/**
 * 
 * @param {*} data 
 * @returns 
 */
let nativeWiFiView = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrbase/systemwifi', data);return res.data }
let nativePopPage = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yruibusiness/pop', data);return res.data }
let nativePopToRootView = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yruibusiness/rootview', data);return res.data }
// react-native-network-info代替 不在使用该接口
let nativeGatewayIP = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrbase/routerip', data);return res.data }

let nativeDevicestore = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrxrouter/devicestore', data);return res.data }
let nativeViewroutetype = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrrnbridge/viewroutetype', data);return res.data }
let nativeUserid = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrcxsdk/uid', data);return res.data }
let nativeUserinfo = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrusercomponentlmpl/userinfo', data);return res.data }

let nativeRemove = async (data) => { let res= await RNPageManager.requestAsyn('yrcx://yrxrouter/remove', data);return res.data }


export {
    nativeWiFiView,
    nativePopPage,
    nativeGatewayIP,
    nativePopToRootView,
    nativeDevicestore,
    nativeViewroutetype,
    nativeUserid,
    nativeUserinfo,
    nativeRemove,
}


