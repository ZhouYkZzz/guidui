import axios from 'axios'

//import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://192.168.43.106:8080'
// const baseURL = 'http://172.20.10.2:8080'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 100000
})

// 响应拦截器
// instance.interceptors.response.use(
//   (res) => {
//     // TODO 4. 摘取核心响应数据
//     if (res.data.status != 0) {
//       return res
//     }
//     // TODO 3. 处理业务失败
//     // 处理业务失败, 给错误提示，抛出错误
//     ElMessage.error(res.data.message || '服务异常')
//     return Promise.reject(res.data)
//   },
//   (err) => {
//     // 错误的默认情况 => 只要给提示
//     ElMessage.error(err.response.data.message || '服务异常')
//     return Promise.reject(err)
//   }
// )

instance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420'

export default instance
export { baseURL }
