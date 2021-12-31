import QueryString from 'qs';

export const getData = async data => {
    return new Promise((resolve, reject) => {
        let url='http://192.168.8.1/cgi-bin/cstecgi.cgi?'+QueryString.stringify(data)
        fetch(
            url,
            {
                method: 'GET',
                header: {//请求头
                }
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error)
                console.error(error);
                
            });
    })

}


