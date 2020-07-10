import axios from 'axios'
import service from './api'
import { message } from 'antd'

let Http = {}
let baseURL = process.env.REACT_APP_BASEURL
let instance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

for (let key in service) {
  let api = service[key]
  Http[key] = async function (params, isFromData = false, config = {}) {
    let response = {}
    let newParams = {}

    //判断是否是fromData
    if (params && isFromData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }

    if (
      api.method === 'put' ||
      api.method === 'post' ||
      api.method === 'patch'
    ) {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (error) {
        response = error
      }
    } else if (api.method === 'get' || api.method === 'delete') {
      try {
        config.params = newParams
        response = await instance[api.method](api.url, config)
      } catch (error) {
        response = error
      }
    }
    return response
  }
}

//请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  res => {
    if (res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      message.error(res.data.message)
      return Promise.reject(res.data)
    }
  },
  error => {
    if (error.response) {
      const msg = showStatus(error.response.status)
      message.error(msg)
      // 发送前端请求异常
      if (error.response.config.url !== 'report') {
        axios.post('report', {
          source: '货主PC',
          requestHeaders: error.response.config.headers, // 前端请求头
          responseHeaders: error.response.headers, // 后端请求头
          data: error.response.config.data, // 请求参数
          url: error.response.config.baseURL + error.response.config.url, // 请求URL
          status: error.response.status, // 错误码
          host: window.location.href // 域名
        })
      }
    } else if (axios.isCancel(error)) {
      console.log('请求过于频繁，请稍后重试')
    } else {
      console.log(456, error.response)
      message.error('网络异常,请刷新重试！')
    }
    return Promise.reject({})
  }
)

// 根据不同的状态码，生成不同的提示信息
const showStatus = (status) => {
  let message = ''
  // 这一坨代码可以使用策略模式进行优化
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}


export default Http
