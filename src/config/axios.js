import axios from 'axios'
import qs from 'qs'

// import { MessageBox, Message } from 'element-ui'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.8.1', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
// service.defaults.withCredentials=true
// service.defaults.crossDomain=true
service.interceptors.request.use(
  config => {
    let token = getToken()
    if (token) {
      config.headers['X-Token'] = token
      config.headers['Accept'] = 'application/json'
      config.headers['Content-Type'] = 'application/json'
      config.headers['Connection'] = 'close'
      config.headers['type'] = 'getUserData'

    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('token')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // read error
    console.log(e)
  }
}
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      console.log(res.code)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    console.log(error)
    return Promise.reject(error)
  }
)
service.post = (api, data) => {
  let params = qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.post(api, params).then((res) => {
      resolve(res)
    }).catch((error) => {
      console.error(error);
    })
  })
}
service.get = (api, data) => {
  let params = qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.get(api, params).then((res) => {
      resolve(res)
    }).catch((error) => {
      console.error(error);
    })
  })
}

export default service