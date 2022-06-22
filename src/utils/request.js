import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { create_form_data } from '@/utils/dom'
import BrowserStorage from '@/storage/browser'
import { ENV } from '@/config'

/* ######################################################## 基础配置 ######################################################## */

const URLENCODED_CONTENT_TYPE = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } // 浏览器默认配置值， 在 config.params 中生效
const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=UTF-8' } // 当前对接默认
const FORMDATA_CONTENT_TYPE = { 'Content-Type': 'multipart/form-datacharset=UTF-8' } // 文件上传

const headers = BrowserStorage.is_no_support_browser()
  ? Object.assign({}, {
    'Cache-Control': 'no-cache'
  }, URLENCODED_CONTENT_TYPE)
  : URLENCODED_CONTENT_TYPE

// 请求钩子
let startTime = 0

const service = axios.create({
  headers,
  method: 'post', // 定制： 默认使用post请求， 且使用json格式传参
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  // timeoutErrorMessage: '请求超时',
})

// request interceptor
service.interceptors.request.use(
  config => {
    // debugger
    if ( !config.params) { config.params = {} }
    const method = config.method ? config.method.toUpperCase() : 'GET'
      // 1. 不同请求参数的 特殊处理
    if (method === 'GET') {
      // if (config.json) {
      //   // config.data = JSON.stringify(config.data)
      //   // // config.data = qs.stringify(config.data)
      //   Object.assign(config.headers.get, JSON_CONTENT_TYPE)
      //   // config.headers = Object.assign({}, config.headers, JSON_CONTENT_TYPE)
      //   config.headers = Object.assign({}, config.headers, JSON_CONTENT_TYPE) // json
      // }

    } else if (method === 'POST') {
      if ( !config.data) { config.data = {} }
      if (config.formData) {
        config.data = create_form_data(config.data)
        config.headers = Object.assign({}, config.headers, FORMDATA_CONTENT_TYPE)
      } else {
        const json = config.json ? config.json : true 
        if (json) {
          config.headers = Object.assign({}, config.headers, JSON_CONTENT_TYPE) // json
        } else {
          config.data = qs.stringify(config.data) // url
        }
      }
    }

    const tokenVal = store.getters.token || getToken()
    if (tokenVal) {
      config.headers['IamToken'] = getToken()
    }
    config.headers['userId'] = 1 // store.getters.projectActive || 
    const projectActive = { projectId: 'e886761e63564f98825dc3fc62d40251' }
    config.headers['projectId'] = projectActive.projectId

    startTime = new Date().getTime()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const loadTime = new Date().getTime() - startTime

    const res = response.data

    if (ENV.is_dev && loadTime > 6000) {
      console.warn(`本次加载时间为 ${loadTime / 1000}s`, `api: ${response.request.responseURL}`)
    }

    const rst = { status: false, data: res.data, message: res.message || res.msg || '' }
    if (res.code === 200) {
      rst.status = true
    } else if (res.code === 500 && (res.code === 503 || rst.message === 'token已过期' || rst.message === 'token已被顶下线' || rst.message === 'token无效')) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      return rst // false
    } else {
      return rst 
    }
    return Promise.resolve(rst)
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
