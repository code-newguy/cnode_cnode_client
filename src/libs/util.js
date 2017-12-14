'use strict'

// import _ from 'lodash'
import Timeago from 'timeago.js'

// let getCheck = {
//     checkEmail (val) {
//       var filter = /^[0-9a-zA-Z_\\.\\-]+\@(([a-zA-Z0-9\\-])+\.)+([a-zA-Z0-9]{2,4})+$/
//       if (filter.test(val)) {
//         return true
//       } else {
//         return false
//       }
//     },
//     checkPhone (val) {
//       var filter = /^1\d{10}$/
//       if (filter.test(val)) {
//         return true
//       } else {
//         return false
//       }
//     }
// }

// 从文本中提取username 标记的用户名数组
// @param {String} text文本内容
// @param {Array} 用户名数组
// const fetchUsers = (text) => {
//   if (!text) {
//     return []
//   }
// }
/**
*配置节流函数
*@param {[function]} fn [要执行的函数]
*@param {[Number]} delay [延迟执行的毫秒数]
*@param {[Number]} mustRun [至少多久执行一次]
*@return {[function]} [节流函数]
*/
const throttle = (fn, wait, mustRun) => {
  let timeout
  let startTime = new Date()
  return function () {
    let context = this
    let args = arguments
    let curTime = new Date()

    clearTimeout(timeout)

    if (curTime - startTime >= mustRun) {
      // 如果到达触发时间 触发handler
      fn.apply(context, args)
      startTime = curTime
    } else {
      // 如果没到达触发 时间 重新设定定时器
      timeout = setTimeout(fn, wait)
    }
  }
}
const getTabInfo = (tab, good = false, top = false, isClass = false) => {
  let str = ''
  let className = ''
  if (top) {
    str = '置顶'
    className = 'top'
  } else if (good) {
    str = '精华'
    className = 'good'
  } else {
    switch (tab) {
      case 'share':
        str = '分享'
        className = 'share'
        break
      case 'ask':
        str = '问答'
        className = 'ask'
        break
      case 'job':
        str = '招聘'
        className = 'job'
        break
      case 'dev':
        str = '测试'
        className = 'test'
        break
      case 'message':
        str = '消息'
        break
      case 'about':
        str = '关于'
        break
      case 'all':
        str = '全部'
        break
      case 'good':
        str = '精华'
        break
      case 'top':
        str = '置顶'
        break
      // default:
      //   str = '暂无'
      //   className = 'default'
      //   break
    }
  }
  return isClass ? className : str
}
const MilliSecondToDate = (time) => {
  let str = ''
  if (time !== null && time !== '') {
    let timeagoInstance = new Timeago()
    str = timeagoInstance.format(time, 'zh_CN')
  }
  return str
}
// exports.getTabInfo = getTabInfo
// exports.throttle = throttle
// exports.MilliSecondToDate = MilliSecondToDate
export {MilliSecondToDate}
export {getTabInfo}
export {throttle}
