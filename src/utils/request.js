
import { baseUrl} from './constant'
var Fly=require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
const request = new Fly()

request.config.baseURL=baseUrl
request.config.timeout=5000

request.interceptors.request.use((request) => {
     
        const csrfToken=wx.getStorageSync('authToken')
    
     if(csrfToken){
       const csrfTokenFormat=csrfToken
       request.headers['Authorization']=`Bearer ${csrfTokenFormat.accessToken}`
     }
  
     wx.showLoading({title:'加载中...'})
     return request
  })
  
 request.interceptors.response.use(
    (response, promise) => {
   
    
      wx.hideLoading()
      return promise.resolve(response.data)
    },
    (err, promise) => {
      wx.hideLoading()
      if(err){
        switch(err.status){
     
          case 401 :
             wx.clearStorageSync()
            //  wx.redirectTo({
            //   url:'/pages/login/login'
            // })
            break;
           case 403 :     
           wx.showToast({
            title:'你的账号已在其它的设备上登录',
            icon:'none',
            duration:2000,
            success:function(){  
               wx.clearStorageSync();     
               wx.redirectTo({
                 url:'/pages/login/login'
               })
            },
            fail:function(){
              wx.clearStorageSync()
            }
          })    
           wx.clearStorageSync()
           break;
           case 404 :
           wx.clearStorageSync();   
           break;
           default:
           wx.clearStorageSync();   
           wx.showToast({title:'连接错误'})
        }
      }else{
          wx.showToast({
            title:'请检查您的网络',
            icon:'none',
            duration:2000
          })  
      }  
      return promise.resolve()
    }
  )
  
  export default request