/**
 * js 扩展工具方法
 *
 * @author wangtan
 * @date 2020-08-19 15:57:10
 * @since 1.0
 */

const extend = {}

/**
 * 判断不为空
 *
 * @param v
 * @returns {boolean}
 * @author wangtan
 * @date 2018年08月14日 17:39:38
 * @since 1.0
 */
extend.isNotBlank = (v) => {
    return !extend.isBlank(v)
}

/**
 * 判断为空
 *
 * @param v
 * @returns {boolean}
 * @author wangtan
 * @date 2018年08月14日 17:39:44
 * @since 1.0
 */
extend.isBlank = (v) => {
    return v === null || v === '' || v === undefined || typeof v === 'undefined' || v === 'undefined' || v === 'UNDEFINED'
}

/**
 * 判断数组是否为空
 * @param v 数组
 * @author wangtan
 * @date 2022-11-07 11:10:45
 * @since 1.0.0
 */
extend.isEmpty = (v) => {
    return extend.isBlank(v) || ((extend.isNotBlank(v) || v instanceof Array) && v.length === 0)
}

/**
 * 判断数组是否不为空
 * @param v 数组
 * @author wangtan
 * @date 2022-11-07 11:14:57
 * @since 1.0.0
 */
extend.isNotEmpty = (v) => {
    return !extend.isEmpty(v)
}

/**
 * 判断对象是否为空对象 {}
 * @param obj 对象
 * @author wangtan
 * @date 2023-03-10 15:40:50
 * @since 1.0.0
 */
extend.isEmptyObject = (obj) => {
    return JSON.stringify(obj) === '{}' || extend.isBlank(obj)
}

/**
 * 若源值为空，则返回新值
 * @param v 原值
 * @param nV 新值
 * @returns {*}
 * @author wangtan
 * @date 2022-10-31 09:30:00
 * @since 1.0.0
 */
extend.orElse = (v, nV) => {
    return extend.isBlank(v) ? nV : v
}

/**
 * 判断不为 NaN
 *
 * @param v
 * @returns {boolean}
 * @author wangtan
 * @date 2018年08月14日 17:39:50
 * @since 1.0
 */
extend.isNotNaN = (v) => {
    return !isNaN(v)
}

/**
 * 判断所有一级属性是否为空
 *
 * @param obj
 * @returns {boolean}
 * @author wangtan
 * @date 2023-02-16 15:57:07
 * @since 1.0
 */
extend.isAllPropBlank = (obj) => {
    let isEmpty = true
    Object.keys(obj).forEach(function (x) {
        if (extend.isNotEmpty(obj[x])) {
            isEmpty = false
        }
    })
    return isEmpty
}

/**
 * 判断所有一级属性是否为空，除了某某属性
 *
 * @param obj
 * @param keyList 排除的属性
 * @returns {boolean}
 * @author wangtan
 * @date 2023-03-01 15:03:11
 * @since 1.0
 */
extend.isAllPropBlankExcept = (obj, keyList) => {
    let isEmpty = true
    Object.keys(obj).forEach(function (key) {
        if (!keyList.includes(key) && extend.isNotEmpty(obj[key])) {
            isEmpty = false
        }
    })
    return isEmpty
}

/**
 * 翻译对象数组中对象的 key
 *
 * @param arr  待翻译对象数组
 * @param keys 新 key 数组
 * @returns {*[]}
 * @author wangtan
 * @date 2023-08-09 11:27:12
 * @since 1.0.0
 */
extend.convertKey = (arr, keys) => {
    // 新数组
    let result = []
    arr.forEach(item => {
        // 新数组里的新对象
        let newItemObj = {}
        for (let i = 0; i < keys.length; i++) {
            // key 值替换
            newItemObj[keys[i]] = item[Object.keys(item)[i]]
        }
        result.push(newItemObj)
    })
    return result
}

/**
 * 翻译对象数组中对象的 key
 *
 * @param arr     待翻译对象数组
 * @param keysMap 新 key 字典 map
 * @returns {*[]}
 * @author wangtan
 * @date 2023-08-09 11:37:16
 * @since 1.0.0
 */
extend.convertKeyByKeysMap = (arr, keysMap) => {
    // 新数组
    let result = []
    arr.forEach(item => {
        // 新数组里的新对象
        let newItemObj = {}
        Object.keys(item).forEach(key => {
            newItemObj[keysMap[key]] = item[key]
        })
        result.push(newItemObj)
    })
    return result
}

/**
 * 格式化文本
 *
 * @param formatStr
 * @param args
 * @returns {*}
 * @author wangtan
 * @date 2018年08月28日 19:52:37
 * @since 1.0
 */
extend.format = function (formatStr, args) {
    let result = formatStr
    if (!result)
        return ' '
    if (arguments.length > 0) {
        if (arguments.length === 2 && typeof (args) === 'object') {
            for (let key in args) {
                if (args[key] !== undefined) {
                    let reg = new RegExp('({' + key + '})', 'g')
                    result = result.replace(reg, args[key])
                }
            }
        } else {
            for (let i = 1; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    let reg = new RegExp('({[' + (i - 1) + ']})', 'g')
                    result = result.replace(reg, arguments[i])
                }
            }
        }
    }
    return result
}

/**
 * js深度克隆，若是对象或数组，则递归；若是简单数据类型，则赋值
 *
 * @param source 源对象或数组
 * @returns result 克隆后的新对象或数组
 * @author wangtan
 * @date 2018年08月29日 19:37:59
 * @update 2018年10月24日 10:37:03
 * @since 1.0
 */
extend.deepClone = (source) => {
    let result = source instanceof Array ? [] : {}
    for (let k in source) {
        result[k] = typeof source[k] === 'object' ? extend.deepClone(source[k]) : source[k]
    }
    return result
}
extend.deepClone2 = (source) => {
    return JSON.parse(JSON.stringify(source))
}

/**
 * 判断对象是否包含属性
 *
 * @param source 源对象
 * @returns {boolean}
 * @author wangtan
 * @date 2018年08月29日 19:33:59
 * @since 1.0
 */
extend.hasProp = (source) => {
    if (typeof source === 'object' && !(source instanceof Array)) {
        let hasProp = false
        for (let prop in source) {
            hasProp = true
            break
        }
        return hasProp
    }
}

/**
 * 判断对象是否包含某属性属性
 *
 * @param source 源对象
 * @param key    某个属性
 * @returns {boolean}
 * @author wangtan
 * @date 2018年08月29日 19:33:59
 * @since 1.0
 */
extend.hasSpecificProp = (source, key) => {
    if (typeof source === 'object' && !(source instanceof Array)) {
        let hasProp = false
        for (let prop in source) {
            if (key === prop) {
                hasProp = true
                break
            }
        }
        return hasProp
    }
}

/**
 * 若源对象不包含某个属性，则返回新值
 * @param source 源对象
 * @param key 某个属性
 * @param nV 新值
 * @returns {*}
 * @author wangtan
 * @date 2022-10-31 09:38:32
 * @since 1.0.0
 */
extend.orElseGet = (source, key, nV) => {
    return extend.hasSpecificProp(source, key) ? source[key] : nV
}

/**
 * 获取对象长度
 *
 * @param source
 * @returns {number}
 * @author wangtan
 * @date 2018年09月20日 19:03:36
 * @since 1.0
 */
extend.getObjectLength = (source) => {
    return Object.keys(source).length
}

/**
 * 对象转 Array
 *
 * @param obj
 * @returns {any[]}
 * @author wangtan
 * @date 2018-09-20 19:13:38
 * @since 1.0
 */
extend.objectToArray = (obj) => {
    return Object.keys(obj).map(key => obj[key])
}

/**
 * 对象转 Map
 *
 * @param obj
 * @returns {Map<any, any>}
 * @author wangtan
 * @date 2018年09月20日 19:27:29
 * @since 1.0
 */
extend.objectToMap = (obj) => {
    let map = new Map()
    for (let key of Object.keys(obj)) {
        map.set(key, obj[key])
    }
    return map
}

/**
 * 判断数组是否包含重复数据
 *
 * @param arr 数组
 * @returns {boolean}
 * @author wangtan
 * @date 2023-03-16 16:40:58
 * @since 1.0.0
 */
extend.hasDuplicateData = (arr) => {
    // return Array.from(new Set(arr)).length < arr.length
    let arr1 = [...new Set(arr.map(item =>
        JSON.stringify(item)
    ))].map(val => JSON.parse(val))
    return arr1.length < arr.length
}

/**
 * 滚动条定位
 *
 * @param el jquery选择器对象
 * @param to 需要滚动的位置 number
 * @author wangtan
 * @date 2018年08月30日 15:17:57
 * @since 1.0
 */
extend.scrollTo = (el, to) => {
    el.scrollTop(to)
}

/**
 * 滚动条定位到顶部
 *
 * @param el jquery选择器对象
 * @author wangtan
 * @date 2018年08月30日 15:19:50
 * @since 1.0
 */
extend.scrollTop = (el) => {
    el.scrollTop(0)
}

/**
 * 格式化日期
 *
 * @param format 格式
 * @param isUTC 是否标准时间
 * @returns {*}
 * @author wangtan
 * @date 2018年11月06日 21:04:19
 * @since 1.0
 */
Date.prototype.format = function (format, isUTC) {
    let o = {
        'M+': isUTC ? (this.getUTCMonth() + 1) : (this.getMonth() + 1),//Month
        'd+': isUTC ? (this.getUTCDate()) : (this.getDate()),//day
        'h+': isUTC ? (this.getUTCHours()) : (this.getHours()),//hour
        'm+': isUTC ? (this.getUTCMinutes()) : (this.getMinutes()),//minute
        's+': isUTC ? (this.getUTCSeconds()) : (this.getSeconds()),//second
        'q+': isUTC ? (Math.floor((this.getUTCMonth() + 3) / 3)) : (Math.floor((this.getMonth() + 3) / 3)),//quarter
        'S+': isUTC ? (this.getUTCMilliseconds()) : (this.getMilliseconds())//millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ((isUTC ? this.getUTCFullYear() : this.getFullYear()) + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

/**
 * 时间戳转 yyyy-mm-dd yyyy-MM-dd HH-mm-ss
 * @param timestamp
 * @returns {string}
 * @author wangtan
 * @date 2022-11-07 14:47:51
 * @since 1.0.0
 */
extend.timestampToTime = (timestamp) => {
    var date = new Date(timestamp * 1000)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
}

/**
 * long类型时间转 yyyy-mm-dd yyyy-MM-dd HH-mm-ss
 */
extend.datetimeFormat = (date) => {
    var date = new Date(date)
    var YY = date.getFullYear() + '-'
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return YY + MM + DD + ' ' + hh + mm + ss
}

/**
 * 取 n 到 m 的随机数
 *
 * @param n
 * @param m
 * @returns {number}
 * @author wangtan
 * @date 2018年11月13日 17:15:57
 * @since 1.0
 */
extend.rd = (n, m) => {
    let c = m - n + 1
    return Math.floor(Math.random() * c + n)
}

/**
 * 获取 uuid，算法 2
 *
 * @returns {string}
 * @author wangtan
 * @date 2018年11月13日 18:45:44
 * @since 1.0
 */
extend.getRandomUUID = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * 获取 uuid，算法 1
 *
 * @returns {string}
 * @author wangtan
 * @date 2018年11月13日 17:16:47
 * @since 1.0
 */
extend.getRandomUUID1 = () => {
    let s = []
    let hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
}

/**
 * 获取 uuid，算法 2
 *
 * @returns {string}
 * @author wangtan
 * @date 2018年11月13日 18:45:44
 * @since 1.0
 */
extend.getRandomUUID2 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * 获取 uuid，算法 3
 *
 * @returns {string}
 * @author wangtan
 * @date 2018年11月13日 18:50:00
 * @since 1.0
 */
extend.getRandomUUID3 = () => {
    /**
     * @return {string}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 获取 uuid，算法 4
 *
 * 可以指定长度和基数，比如
 * // 8 character ID (base=2)
 * uuid(8, 2)  //  "01001010"
 * // 8 character ID (base=10)
 * uuid(8, 10) // "47473046"
 * // 8 character ID (base=16)
 * uuid(8, 16) // "098F4D35"
 *
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 * @author wangtan
 * @date 2018年11月13日 19:15:17
 * @since 1.0
 */
extend.getRandomUUID4 = (len, radix) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = [], i
    radix = radix || chars.length

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        // rfc4122, version 4 form
        var r

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}

/**
 * 生成随机 client_secret
 *
 * @param length 长度
 * @returns {string} client_secret
 */
extend.generateClientSecret = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let clientSecret = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        clientSecret += charset[randomIndex]
    }
    return clientSecret
}

/**
 * 数组去重
 *
 * @param {*} sourceArr 源数组
 * @author wangtan
 * @date 2020-08-19 14:59:33
 * @since 1.0
 */
extend.distinct = (sourceArr) => {
    return sourceArr.reduce((resultArray, currentValue, currentIndex, arr) => {
        if (!resultArray.includes(currentValue)) {
            resultArray.push(currentValue)
        }
        return resultArray
    }, [])
}

/**
 * 对象数组以某属性去重
 *
 * @param {*} sourceArr 源数组
 * @param {*} prop 根据此属性去重
 * @author wangtan
 * @date 2020-08-19 15:01:25
 * @since 1.0
 */
extend.distinctByProp = (sourceArr, prop) => {
    if (sourceArr.length > 0 && sourceArr[0][prop] === undefined) {
        console.log('数组元素没有属性 ' + prop)
        return sourceArr
    }
    return sourceArr.reduce((resultArray, currentValue, currentIndex, arr) => {
        let propArr = resultArray.map((item, index, arr) => {
            return item[prop]
        })
        if (!propArr.includes(currentValue[prop])) {
            resultArray.push(currentValue)
        }
        return resultArray
    }, [])
}

/**
 * json 格式化
 *
 * @param {*} json json 字符串 或者 json 对象
 * @author wangtan
 * @date 2020-08-25 17:31:36
 * @since 1.0
 */
extend.beautifyJson = (json) => {
    (typeof json === 'string') && (() => {
        json = JSON.parse(json)
    })()
    return JSON.stringify(json, null, 4)
}

/**
 * 判断字符串是否为 json
 *
 * @param {*} str json 字符串
 * @author wangtan
 * @date 2020-09-02 14:29:29
 * @since 1.0
 */
extend.isJson = (str) => {
    if (typeof str === 'string') {
        try {
            var obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log('error：' + str + '!!!' + e)
            return false
        }
    }
    console.log('It is not a string!')
}

/**
 * 分组
 * @param arr
 * @param func
 * @returns {*}
 * @author wangtan
 * @date 2022-11-08 17:19:01
 * @since 1.0.0
 */
extend.groupBy = (arr, func) => {
    if (!arr || !func) return arr
    return arr.reduce((a, b) => {
        let k = func(b),
            item = a.filter(x => x._key === k)[0] || []
        return (item._key = k), item.length || a.push(item), item.push(b), a
    }, [])
}

/**
 * 进制转换
 *
 * @param number 数字
 * @param sourceRadix 原进制
 * @param targetRadix 转换后进制
 * @author wangtan
 * @date 2023-01-17 14:30:55
 * @since 1.0.0
 */
extend.convertRadix = (number, sourceRadix, targetRadix) => {
    let decimal = parseInt(number, sourceRadix)
    return decimal.toString(targetRadix)
}

/**
 * 校验ipv4地址是否是正确的
 *
 * @param ipv4 地址
 * @returns {boolean}
 * @author wangtan
 * @date 2023-03-31 19:08:53
 * @since 1.0.0
 */
extend.isValidIPv4Address = (ipv4) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipv4Regex.test(ipv4)
}

/**
 * 校验ipv6地址是否是正确的，需要考虑缩写的情况
 *
 * @param ipv6 地址
 * @returns {boolean}
 * @author wangtan
 * @date 2023-03-30 09:17:10
 * @since 1.0.0
 */
extend.isValidIPv6Address = (ipv6) => {
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
    return ipv6Regex.test(ipv6)
}

extend.expandIPv6Address = (simpeIpv6) => {
    simpeIpv6 = simpeIpv6.toUpperCase()
    if (simpeIpv6 == '::') {
        return '0000:0000:0000:0000:0000:0000:0000:0000'
    }
    let arr = ['0000', '0000', '0000', '0000', '0000', '0000', '0000', '0000']
    if (simpeIpv6.startsWith('::')) {
        let tmpArr = simpeIpv6.substring(2).split(':')
        for (let i = 0; i < tmpArr.length; i++) {
            arr[i + 8 - tmpArr.length] = ('0000' + tmpArr[i]).slice(-4)
        }
    } else if (simpeIpv6.endsWith('::')) {
        let tmpArr = simpeIpv6.substring(0, simpeIpv6.length - 2).split(':')
        for (let i = 0; i < tmpArr.length; i++) {
            arr[i] = ('0000' + tmpArr[i]).slice(-4)
        }
    } else if (simpeIpv6.indexOf('::') >= 0) {
        let tmpArr = simpeIpv6.split('::')
        let tmpArr0 = tmpArr[0].split(':')
        for (let i = 0; i < tmpArr0.length; i++) {
            arr[i] = ('0000' + tmpArr0[i]).slice(-4)
        }
        let tmpArr1 = tmpArr[1].split(':')
        for (let i = 0; i < tmpArr1.length; i++) {
            arr[i + 8 - tmpArr1.length] = ('0000' + tmpArr1[i]).slice(-4)
        }
    } else {
        let tmpArr = simpeIpv6.split(':')
        for (let i = 0; i < tmpArr.length; i++) {
            arr[i + 8 - tmpArr.length] = ('0000' + tmpArr[i]).slice(-4)
        }
    }
    return arr.join(':')
}

/**
 * 数据类型
 * @type {string[]}
 */
extend.dataType = ['string', 'number', 'integer', 'boolean']
/**
 * jsonSchema 转 Json对象
 * @param data
 * @returns {{}}
 */
extend.jsonSchema2Json = (data) => {

    let obj = {}

    for (let key in data) {

        let param = data[key]
        let type = param.type

        obj[key] = {}

        if (extend.dataType.includes(type)) {

            obj[key] = param.default || ''

        } else if (type === 'array') {

            let items = param.items
            if (extend.dataType.includes(items.type)) {

                obj[key] = [items.default]

            } else {

                obj[key] = [extend.jsonSchema2Json(items.properties)]

            }

        } else if (type === 'object') {

            obj[key] = extend.jsonSchema2Json(param.properties)

        }

    }

    return obj

}

/**
 * jsonschema 转 数据对象
 *
 * @param root
 * @returns {{}}
 */
extend.transformSchemaToDataObj = (root) => {
    const properties = root.properties

    const result = {}

    for (const key in properties) {
        const prop = properties[key]
        result[key] = prop.default || ''
    }

    return result
}

/**
 * jsonschema 转 数据对象列表
 *
 * @param root
 * @returns {{label, trigger: string[], message: string, value, key: *, required: boolean}[]}
 */
extend.transformSchemaToDataArray = (root) => {
    const properties = root.properties
    const requiredFields = new Set(root.required || [])

    return Object.keys(properties).map(key => {
        const prop = properties[key]
        return {
            label: prop.title || key,
            key: key,
            value: prop.default || undefined,
            required: requiredFields.has(key),
            message: `${prop.title || key}不能为空`,
            trigger: ['blur', 'change']
        }
    })
}

/**
 * jsonschema 转 表单校验规则
 *
 * @param root
 * @returns {{}}
 */
extend.transformSchemaToRules = (root) => {
    const properties = root.properties
    const requiredFields = new Set(root.required || [])

    const result = {}

    for (const key in properties) {
        const prop = properties[key]
        const title = prop.title || key
        const isRequired = requiredFields.has(key)

        result[key] = [
            {
                required: isRequired,
                message: `${title || key}不能为空`,
                trigger: ['blur', 'change']
            }
        ]
    }

    return result
}

/**
 * 添加自定义原型方法
 *
 * @author wangtan
 * @date 2020-08-19 15:44:59
 * @since 1.0
 */
(() => {

    console.debug('添加自定义原型方法 start')

    /**
     * 数组去重
     *
     * @author wangtan
     * @date 2020-08-19 15:10:51
     * @since 1.0
     */
    Array.prototype.distinct = function () {
        return this.reduce((resultArray, currentValue, currentIndex, arr) => {
            if (!resultArray.includes(currentValue)) {
                resultArray.push(currentValue)
            }
            return resultArray
        }, [])
    }

    /**
     * 对象数组以某属性去重
     *
     * @param prop 根据此属性去重
     * @author wangtan
     * @date 2020-08-19 15:11:03
     * @since 1.0
     */
    Array.prototype.distinctByProp = function (prop) {
        if (this.length > 0 && this[0][prop] === undefined) {
            console.log('数组元素没有属性 ' + prop)
            return this
        }
        return this.reduce((resultArray, currentValue, currentIndex, arr) => {
            let propArr = resultArray.map((item, index, arr) => {
                return item[prop]
            })
            if (!propArr.includes(currentValue[prop])) {
                resultArray.push(currentValue)
            }
            return resultArray
        }, [])
    }

    console.debug('添加自定义原型方法 end')

})()

export default extend
