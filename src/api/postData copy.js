//先定义延时函数
const delay = (timeOut = 8*1000) =>{
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
            reject('网络超时');
        },timeOut);
    })
}

//fetch网络请求
const fetchPromise = (method,url, formData) =>{
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: method,
            body:formData
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject(new Error('服务器异常'));
            }
        }).then((responseJson) => {
            resolve (responseJson);
        }).catch((err) => {
            reject(new Error(err));
        })
    })
}

//race任务
const _fetch = (fetchPromise, timeout) => {
    return Promise.race([fetchPromise,delay(timeout)]);
}

//post
const HttpPost = (url, formData,timeout = 8*1000)  =>{
    return _fetch(fetchPromise('POST', url, formData), timeout);
};

//get
const HttpGet = (url,timeout = 8*1000)  =>{
    return _fetch(fetchPromise('Get', url), timeout);
};

export {HttpPost ,HttpGet}
