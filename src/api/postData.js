

import { FetchPost } from "./fetchConfig"
// import { Alert } from "react-native"
import Toast from 'react-native-root-toast';
export const postData = async (ip, data) => {
    return new Promise((resolve, reject) => {
        let url = 'http://' + ip + '/cgi-bin/cstecgi.cgi'
        FetchPost(url, data).then((res) => {
            resolve(res)
        }).catch(err => {
            Toast.show('请检查网络是否连接正确!',{
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow: () => {
                    // calls on toast\`s appear animation start
                },
                onShown: () => {
                    // calls on toast\`s appear animation end.
                },
                onHide: () => {
                    // calls on toast\`s hide animation start.
                },
                onHidden: () => {
                    // calls on toast\`s hide animation end.
                }
            })
            reject(err)
        })

    })
}


