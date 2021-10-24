import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import printLog from './log'

export interface RequestResopnse {
  code: number
  msg: string
  result: {
    lastOperaTime: number
    data: any
  }
}

export interface HttpRequestParams {
  url: string
  data?: object
  filter?: boolean
  responseType?: string
  headers?: any
  timeout?: number
}
interface HttpResquest {
  get(params: HttpRequestParams): Promise<any>
  post(params: HttpRequestParams): Promise<any>
  put(params: HttpRequestParams): Promise<any>
  patch(params: HttpRequestParams): Promise<any>
  delete(params: HttpRequestParams): Promise<any>
}

const http = {} as HttpResquest
const methods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete']
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

methods.forEach((v: HttpMethod) => {
  http[v] = (params: HttpRequestParams) => {
    params = {
      ...params,
      responseType: params.responseType || 'json',
      timeout: params.timeout || 0
    }
    const { url, data, filter, responseType, timeout } = params
    const instance = axios.create({
      timeout
    })
    // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const headers = {
      token: '',
      lang: 'zh-CN',
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
    const axiosConfig: AxiosRequestConfig = {
      method: v,
      url: `${process.env.API_ASSETS}${url}`,
      headers: {
        ...headers,
        ...(params.headers || {})
      },
      responseType,
      transformRequest: (data) => {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    }
    if (data) {
      if (v === 'get') {
        axiosConfig.params = data
      } else if (data instanceof FormData) {
        axiosConfig.params = data
      } else {
        axiosConfig.data = data
      }
    }

    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => handleSuccess(res, params),
      (err) => handleError(err, params)
    )

    function handleSuccess(
      response: AxiosResponse<RequestResopnse>,
      requestParams: HttpRequestParams
    ) {
      if (response.data) {
        const { code, msg, result } = response.data
        if (code !== 0) {
          // message.error(msg)
          printLog.error(msg)
        }

        if (requestParams.responseType === 'json') {
          return filter ? result?.data : response?.data
        } else {
          return response.data
        }
      } else {
        message.error('请求错误，请重试')
        printLog.error('incorrect data format')
        return response.data
      }
    }

    function handleError(err: AxiosError, requestParams: HttpRequestParams) {
      if (err.response?.status === 388) {
        printLog.warning(`redirect: ${err.response.headers}`)
        window.location.href = err.response.headers.nyjlocation || '/'
      }
      if (err.response) {
        printLog.error(`api: ${requestParams.url}: ${err.response.status}`)
      }
      if (err instanceof Error) {
        if (err.message) {
          printLog.error(err.message)
        }
      }
      if (!window.navigator.onLine) {
        // 处理断网情况
        printLog.error('netwrok error')
      }
      return Promise.reject(err)
    }
    return instance.request(axiosConfig)
  }
})

// 存量项目可根据实际情况自行实现requestProxy
interface Params {
  url: string
  method: HttpMethod
  data?: any
  filter?: boolean
  headers?: any
  responseType?: string
}
const requestProxy = <T>(requestOpts: Params): Promise<T> => {
  const { url, method, data = {}, responseType, filter = true, headers } = requestOpts
  return new Promise((resolve, reject) => {
    http[method]({
      url,
      data,
      filter,
      responseType,
      headers
    }).then(
      (res: T) => resolve(res),
      (err: Error) => {
        reject(err)
      }
    )
  })
}

export default requestProxy
