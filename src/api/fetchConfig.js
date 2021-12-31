
// import Toast from '../component/toast'
//先定义延时函数
const timeout = 15 * 1000
const delay = (n) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve()
            reject('网络超时');
        }, n);
    })
}

//fetch网络请求
const fetchPromise = (method, url, formData) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            body: JSON.stringify(formData),
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Origin": '*',
                "Access-Control-Allow-Origin": '*'
            }
        }).then((response) => {
            let statusCode = response.status
            if (statusCode == 200) {
                console.log(response.json)
                return response.json();
            } else if (statusCode == 404) {
                // return '请求错误'
                reject('请求错误')
            } else {
                // return '服务端错误'
                reject('服务端错误')
            }
        }).then((responseJson) => {
            resolve(responseJson);
        }).catch((err) => {
            reject(err)
        })
    })
}

//race任务
const _fetch = (fetchPromise) => {
    return Promise.race([fetchPromise, delay(timeout)]);
}

//post
const FetchPost = (url, formData) => {
    return _fetch(fetchPromise('POST', url, formData), timeout);
};

//get
const FetchGet = (url) => {
    return _fetch(fetchPromise('Get', url), timeout);
};

export { FetchPost, FetchGet }
