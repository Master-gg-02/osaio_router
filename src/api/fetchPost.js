

// import qs from 'qs'
export const postData = async (ip, data) => {
    return new Promise((resolve, reject) => {
        let url = 'http://' + ip + '/cgi-bin/cstecgi.cgi'
        fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin' :'*',
                    // "Content-Type": "application/x-www-form-urlencoded"
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Origin": '*',
                    "Access-Control-Allow-Origin":'*'
                }
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                // setTimeout(() => {
                resolve(responseJson);
                // }, 3000)
            })
            .catch((error) => {
                // console.error(error,"网络请求错误！");

                reject(error)
                //这里应该弹出错误提示！是否要告诉用户请求确认需求后再定
                // 不同的错误类型做不同的处理
            });
    })

}
