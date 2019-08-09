import axios from 'axios';
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 3000,
  withCredentials: false
})
// 规定的重新请求次数
// let retry = 2;
// 重新请求间隔时间
// let retryDelay = 1000;
// 目前重新请求次数
// let __retryCount = 0;
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res
  },
  error => {
    var config = error.config;

    if (error.request.status == 500) {
      alert('网络错误！');
        return Promise.reject(error);
      // 如果重新请求次数大于规定次数就报错
      // if (__retryCount >= retry) {
      //   // Reject with the error
      //   //window.location.reload();
      //   alert('网络错误！');
      //   return Promise.reject(error);
      // }

    //   // Increase the retry count
    // 重新请求次数+1
    //  __retryCount += 1;
    //   // Create new promise to handle exponential backoff
    // 重新请求
      // var backoff = new Promise(function (resolve) {
      //   setTimeout(function () {
      //     //console.log('resolve');
      //     resolve();
      //   }, retryDelay || 1);
      // });

      // return backoff.then(function () {
      //   if (process.env.NODE_ENV === 'development') {
      //     let url = config.url;
      //     const baseurl = config.baseURL.substring(1);
      //     url = url.substring(url.indexOf(baseurl) + baseurl.length);
      //     config.url = url;
      //   }
      //   return service(config);
      // });
      
    }
    //请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
  
      if (error.request.readyState == 4 && error.request.status == 0) {
        alert('请求超时！');
      }
      return Promise.reject(error);
      // 如果重新请求次数大于规定次数就报请求超时
      // if (__retryCount >= retry) {
      //   // Reject with the error
      //   //window.location.reload();
      //   if (error.request.readyState == 4 && error.request.status == 0) {
      //     alert('请求超时！');
      //   }
      //   return Promise.reject(error);
      // }

    //   // Increase the retry count
    // 重新请求次数+1
      // __retryCount += 1;

    //   // Create new promise to handle exponential backoff
    // 重新请求retry
      // var backoff = new Promise(function (resolve) {
      //   setTimeout(function () {
      //     //console.log('resolve');
      //     resolve();
      //   },retryDelay || 1);
      // });

      // return backoff.then(function () {
      //   if (process.env.NODE_ENV === 'development') {
      //     let url = config.url;
      //     const baseurl = config.baseURL.substring(1);
      //     url = url.substring(url.indexOf(baseurl) + baseurl.length);
      //     config.url = url;
      //   }
      //   return service(config);
      // });
    } else {
      return Promise.reject(error);

    }
  }
)
export default service;