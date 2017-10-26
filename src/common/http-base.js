import Vue from 'vue'
import axios from 'axios'
// import jsonp from 'jsonp'

import {Toast} from 'mint-ui'

var api =  process.env.NODE_ENV == 'development'?'/pengkuan':'' 

let timeOut = (delay = 10000) => {

  return setTimeout(() => {

    Toast('当前网络不稳定', 'bottom');
  }, delay)
}

// let http = (url, data) => {
//   let api =  process.env.NODE_ENV == 'development'?'/pengkuan':'http://10.0.30.11:8001/' 

//   url = api+ url + '?pid=1043'

//   let timer = timeOut()

//   return Vue.http.post(url, data).then(res => {
//     return res.json();
//   }).catch(err => {
//     Toast('网络故障！请稍后再试.');

//   }).finally(() => clearTimeout(timer));
// };


/*##############################*/
//POST传参序列化
axios.interceptors.request.use((config) => {
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data)
    // }
    return config
},(error) =>{
    return Promise.reject(error)
})

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status != 200){
        return Promise.reject(res)
    }
    return res.data.body
}, (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
            // 
      }
    }
    return Promise.reject(error)
})
let http =  (Interface, params) => {
    var resParams = {
        'head':{
            'version':"0.01",
            'msgtype':"request",
            'interface': Interface,
            'remark':""
        },
        'params':{
            "system":"APPH5",
            "time":String( (new Date()).getTime() ).substr(0,10),
            "sign":"APPH5",
        }
    }
    for(var i in params){
        resParams.params[i] = params[i]
    }
    let timer = timeOut()
    return new Promise((resolve, reject) => {
        axios.post(api+'/api/appstore', resParams)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
               reject(error)
            }).finally(() => clearTimeout(timer))
    })
}

export {
  http
}