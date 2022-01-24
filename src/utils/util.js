import moment from 'moment';
import _ from 'lodash'

/**
 * 
 * @param {只能输入数字和 .字符} value 
 * @returns 
 */
const onlyNumberDot = (value) => {
    return value.replace(/[^\d^\.]+/g, '')
}

/**
 * 
 * @param {ip4地址 形如：192.168.8.xxx} ip 
 * @returns 
 */

const checkIp=(ip)=>{
    // var ip = document.getElementById('reg_ip').value;
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;//正则表达式   
    if (re.test(ip)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
            Toast.show('请注意ip格式：xxx.xxx.xxx.xxx')
            return false;
        }
    }
    console.log(ip, 'ip')
    return true;
}



/**
 * 
 * @param {id长度} length 
 * @returns 
 */
const genID = (length) => {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
/**
 * 
 * @param {时间对象} date 
 * @param {时期格式} n 
 * @returns 
 */
const formatTime = (date, n) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    switch (n) {
        case 1:
            return [year, month, day].map(formatNumber).join('-')
            break;
        case 2:
            return [month, day].map(formatNumber).join('.')
            break;
        case 3:
            return [hour, minute].map(formatNumber).join(':')
            break;
        case 4:
            return [hour].map(formatNumber)
            break;
        case 5:
            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
            break;
        case 6:
            return [year, month].map(formatNumber).join('-')
            break;
        case 7:
            return [year].map(formatNumber)
            break;
        default:
            console.log('目前第二次参数只有 1 2 3 4 5');
    }
}

/**
 * 自定义 定时器 
 * @fn  cb
 * @time 时间间隔
 */
var timeWorker = {}
/**
 * 
 * @param {cb} fn 
 * @param {间隔时间} time 
 * @returns 
 */
const mySetInterval = function (fn, time) {
    // 定义一个key，来标识此定时器
    var key = Symbol();
    // 定义一个递归函数，持续调用定时器
    var execute = function (fn, time) {
        timeWorker[key] = setTimeout(function () {
            fn();
            execute(fn, time);
        }, time)
    }
    execute(fn, time);
    // 返回key
    return key;
}
/**
 * 
 * @param {要清除的定时器} key 
 */
const myClearInterval = function (key) {

    if (key in timeWorker) {
        clearTimeout(timeWorker[key]);
        delete timeWorker[key];
    }
}

/**
 * 
 * @param {cb} func 
 * @param {时间间隔} w 
 * @param {频次} t 
 */
const interval = (func, w, t) => {
    var interv = function () {
        if (typeof t === "undefined" || t-- > 0) {
            setTimeout(interv, w);
            try {
                func.call(null);
            }
            catch (e) {
                t = 0;
                throw e.toString();
            }
        }
    };

    setTimeout(interv, w);
};
/**
 * 
 * @param {全部的文本} str 
 * @param {最小不超出的文体长度} n 
 * @returns 
 */
const overflowText = (str, n) => {
    // if(str=='*'){
    //     str='anonymous'
    // }
    return str.length > n ? str.substring(0, n - 1) + '...' : str
}
/**
 * 
 * @param {日期对象} date 
 * @returns 
 */

let getTime = (date) => {
    return fillZero(moment(date).get('hour')) + ':' + fillZero(moment(date).get('minute'))
}
let getStringTime = (date) => {
    let arr=date.split(',')
    return arr[1] + '-' + arr[2]
}


/**
 * 不满10 补0
 * @param {数字} n 
 * @returns 
 */
let fillZero = (n) => {
    if(typeof n=='string'){
        return n
    }
    if (n > 9) {
        return n

    } else {
        return '0' + n

    }
}
/**
 * 
 * @param {字符串时间 } time  //
 * @returns 
 */

let setTime = (time) => {
    let s = new Date()
    let arr = time.split(':')
    s.setHours(arr[0])
    s.setMinutes(arr[1])
    return s
}

/**
 * 
 * @returns 占位符的用变量替换
 * var str = "js实现用{two}自符串替换占位符{two} {three}  {one} ".format({one: "I",two: "LOVE",three: "YOU"});
 * var str2 = "js实现用{0}自符串替换占位符{0} {1}  {0} ".format("I","LOVE","YOU");
 */
String.prototype.format = function() {
    if(arguments.length == 0) return this;
    var param = arguments[0];
    var s = this;
    if(typeof(param) == 'object') {
     for(var key in param)
      s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
     return s;
    } else {
     for(var i = 0; i < arguments.length; i++)
      s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
     return s;
    }
   }

export {
    genID,
    overflowText,
    formatTime,
    mySetInterval,
    myClearInterval,
    interval,
    getTime,
    setTime,
    getStringTime,
    checkIp,
    onlyNumberDot,
}
