import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from './store'
// 优先查找文件，如果文件找不到则找目录
// 找到目录，优先加载目录中的 index.js
import './styles/index.less'
import router from './router'
import 'nprogress/nprogress.css'

// 配置axios的基础路由
// 也就是说配置了这个东西，你就不用每次都写长长的http://xxxx
// 只需要，例如axios({ url: 'authorizations'})
// 路径中的/ ，多退少补
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 使用 JSONbig 处理返回数据中超出 JavaScript 安全整数范围的数字
// JSONbig 自己会分析数据中的哪个数字超出范围了
// 由于后端的数据id超出了JavaScript的安全整数范围，会导致整数无法精确表示
// 可以使用json-bigint来处理，它会帮你把超出范围的数字给处理好
axios.defaults.transformResponse = [function(data) {
  // data 是未经处理的后端响应数据：JSON 格式字符串
  // JSONbig.parse 类似于 JSON.parse，它的作用也是将 JSON 格式字符串转换为 JavaScript 对象
  // 唯一的区别就是：JSONbig.parse 会检测被转换数据中的数字是否超出了 JavaScript 安全整数范围，如果超出，它会做特殊处理
  // 如果 data 不是一个 JSON 格式字符串，会导致 JSONbig.parse 转换失败并异常
  // 例如我们执行删除操作，后端返回一个 204 状态码，但是没有返回任何数据，也就是空字符串
  // 那这里 JSONbig.parse(空字符串) 就报错了
  // return JSONbig.parse(data)
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
/*
Axios请求拦截器
所有使用axios发送的请求都要经过这里
*/
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  // console.log('有请求经过了')
  // return config // 就是允许通过的方式
  // console.log('request userInfo => ',userInfo)
  // console.log('request config => ',config)
  // config是本次请求相关的配置对象
  // 我们可以通过修改config配置来统一自定义请求相关参数
  // 如果登录了，才给那些需要token的接口统一添加token令牌
  // 登录相关接口不需要token令牌，想要也没有
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, error => {
  // console.log('request error', error)
  return Promise.reject(error)
})
/*
Axios响应拦截器
统一处理响应的数据格式
*/
axios.interceptors.response.use(response => { // >=200 &&<400的状态码进入这里
  // console.log('response => ', response)
  // return response
  // 将响应数据处理成统一的数据格式方便使用
  // 如果返回的数据格式是对象
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => { // >=400的状态码进入这里
  // console.log('response error => ', error)
  // console.dir(error)
  const status = error.response.status
  if (status === 401) {
    // 务必删除本地存储中的用户信息数据
    window.localStorage.removeItem('user_info')
    // 跳转到登录页面
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})
// 几乎每个组件都要使用axios去发请求，频繁的import就变得非常麻烦
// 我们可以将一些频繁使用的成员放到 Vue.prototype 中，然后就可以在组件中直接 this.xxx 使用了
// 为什么？因为所有组件都是 Vue 的实例
// 所以往 Vue.prototype 中添加的成员可以直接通过组件实例 this 进行访问
// Vue.prototype.foo = 'bar'
// 往Vue原型对象中添加成员，尽量使用 $名字 起名字，目的是为了防止和组件中的成员冲突
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
