import axios from 'axios'
import { Message , MessageBox} from 'element-ui'
import store from '../store'
import { getToken } from '../utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'https://test.yanmachina.com/summerbackend', // api 的 base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    // if (res.returnCode != '000000') {
    //   Message({
    //     message: res.returnMsg,
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //
    //   return Promise.reject('error')
    // }
    // 000011:Token 过期了;
    if (res.returnCode == '000011') {
      // 请自行在引入 MessageBox
      // import { Message, MessageBox } from 'element-ui'
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('hhhh33333'+window.location.href);
        store.dispatch('FedLogOut').then(() => {
          console.log('hhhh'+window.location.href);
          window.location.href = 'index.html/#/login';
          //this.$router.push('/login');
          //location.reload();// 为了重新实例化vue-router对象 避免bug
          return res;
        })
      })
    }

    // 000011:Token 过期了;
    else if (res.returnCode == '000022') {
      window.location.href = 'index.html/#/error/404'
      //this.$router.push('/error/404');
      return res
    }
    else {
      return response.data
    }
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
);

export default service
