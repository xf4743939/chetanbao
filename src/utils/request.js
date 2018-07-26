
import { baseUrl} from './constant'
var Fly=require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
const request = new Fly()

request.config.baseURL=baseUrl
request.config.timeout=5000

request.interceptors.request.use((request) => {
     console.log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`)
     
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
      switch(err.status){
     
        case 401 :
          wx.removeStorageSync('authToken')
          wx.redirectTo({
            url:'/pages/login/login'
          })
          break;
         case 403 :
         wx.removeStorageSync('authToken')
         wx.showToast({
           title:'你的账号已在其它的设备上登录',
           icon:'none',
           duration:2000,
           success:function(){
              wx.redirectTo({
                url:'/pages/login/login'
              })
           }
         })
         break;
         case 404 :
         wx.removeStorageSync('authToken')
         wx.removeStorageSync('userInfo')
         break;
      }
      return promise.resolve()
    }
  )
  
  export default request