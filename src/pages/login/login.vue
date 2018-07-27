<template>
    <div class="login_wrap page page_Wrap">
        <mptoast/>
       <show-modal v-if="isShow" :isSHow="isShow" v-on:hideModal="hideModal"></show-modal>
        <div class="login_logo">
           <div class="logo">
               <img src="../../../static/images/logo.png" alt="">
           </div>
        </div>
        <div class="login_main">
            <div class="btn_type">
                <span class="btnLogin" :class="loginOrRegister ? 'active' : '' "  @click="btnclick(true)">登录</span>
                <span class="btnLogin" :class="!loginOrRegister ? 'active' : '' "  @click="btnclick(false)">注册</span>
            </div>     
            <div class="weui-cells_form" v-if="loginOrRegister">
                <div class="weui-cell">
                        <input class="weui-input" type="tel" maxlength="11" @change="isDisable"  v-model="loginForm.phoneNumber"   placeholder="输入手机号码"/>
                </div>
                <div class="weui-cell">
                        <input type="password" class="weui-input" @change="isDisable" v-model="loginForm.password"  placeholder="输入登录密码"/>  
                </div>
                <div class="weui-cell">

                </div>
                 <div class="btn_wrap">
                    <button class="btn1" v-bind:disabled="disableLoginBtn" :class="disableLoginBtn ? 'disBtn' : 'activeCode' "  @click="login">登录</button>
                 </div>   
            </div>  
            <div class="weui-cells_form" v-else>
                <div class="weui-cell">
                        <input class="weui-input" type="tel" maxlength="11" @change="disable" v-model="register.phoneNumber" placeholder="输入手机号码"/>
                </div>
                <div class="weui-cell">
                        <input type="password" class="weui-input"  @change="disable" v-model="register.password" placeholder="输入注册密码"/>  
                </div>
                <div class="weui-cell code_wrap">
                   <input type="text" class="weui-input" @change="disable" v-model="register.code" placeholder="输入验证码"/>
                   <button class="btn1" :class="currentTime==61 ? 'activeCode': 'disBtn' "  id="codeBtn"  @click="getVerificationCode" v-bind:disabled="currentTime<61">{{time}}</button>
                </div>
                <div class="weui-cell">
                </div>
                 <div class="register_server">
                   <checkbox-group @change="checkboxChange">
                        <label class="weui-cell weui-check__label label_server">
                            <checkbox class="weui-check"  :checked="checked" />
                             <div class="weui-cell__hd weui-check__hd_in-checkbox">
                                <icon class="weui-icon-checkbox_circle icon1" type="circle" size="23" v-if="!checked"></icon>
                                <icon class="weui-icon-checkbox_success icon1" type="success" size="23" v-if="checked"></icon>
                            </div>
                        </label>
                  </checkbox-group>           
                  <div class="rules"><span>同意《</span><a style="color:#4eb248;" href="/pages/terms/terms">使用条款及隐私</a><span>》</span></div>
                </div>        
                 <div class="btn_wrap">
                    <button class="btn1" v-bind:disabled="disableRegisterBtn" :class="disableRegisterBtn ? 'disBtn' : 'activeCode' "  @click="login">注册</button>
                 </div>   
            </div>          
        </div>
    </div>
</template>
<script>
import { reqister,smsSend,authenticate,getCurrentLoginInfo} from '../../utils/api'
import { SAVEUSERINFO,LOGINSTATUS } from '../../store/index'
import mptoast from 'mptoast'
import showModal from '../../components/showModal'

const md5=require('md5')

export default {
    data(){
        return{
            checked:false,
            loginOrRegister:true,
            register:{},
            isShow:false,
            time:'验证码',//倒计时
            currentTime:61,
            loginForm:{},
            disableLoginBtn:true,
            disableRegisterBtn:true,
            interval:null, //定时器 
         }
        
    },
    components: {
      mptoast,
      showModal  
    },
    methods: {
        hideModal(){
          this.isShow=false;
          this.refreshData() 
        },
        refreshData(){
            Object.assign(this.$data,this.$options.data())
        },
        isRegister(){  
          const myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
          if(!this.register.phoneNumber || this.register.phoneNumber.length===0){ 
              this.$mptoast('请输入手机号码','none',2000)
              return false;
          }
          if(!myreg.test(this.register.phoneNumber)){
               this.$mptoast('您输入的手机号码格式不正确请重新输入','none',2000)
               return false;
          }
          if(!this.register.password || this.register.password.length<6){
               this.$mptoast('密码长度为6~18位','none',2000)
               return false;
          }
         if(!this.register.password || this.register.password.length>18){
               this.$mptoast('密码长度为6~18位','none',2000)
               return false;
          }
          if(!this.register.code || this.register.password.code===0){
              this.$mptoast('请输入验证码','none',2000)
              return false;
          }
          if(!this.checked){
              this.$mptoast('请勾选使用条款','none',2000)
             return false;
          }
          return true
        },
        isLogin(){
             if(!this.loginForm.phoneNumber || this.loginForm.phoneNumber.length===0){ 
              this.$mptoast('账号或密码错误','none',2000)
              return false;
           }
          if(!this.loginForm.password || this.loginForm.password.length===0){
               this.$mptoast('账号或密码错误','none',2000)
               return false;
          }
          return true
        },
        checkboxChange(){
            this.checked=!this.checked
            this.disable()
        },
        btnclick(login){
           this.loginOrRegister=login
           if(login){
               this.register={}
               this.time="验证码"
               this.currentTime="61"
               clearInterval(this.interval)
           }else{
              this.loginForm={}       
           }
        },
        async getUserInfo(){
            let res = await getCurrentLoginInfo()
            if(res && res.success){
                let userInfo=res.result;
                
                this.$store.commit('SAVEUSERINFO',userInfo)
                wx.setStorageSync('userInfo',userInfo)
                this.goToUrl(userInfo)    
            }else {
              this.$mptoast(res.error.message,'none',2000)
            }
     },
    goToUrl(info){
        if(info.gameListType==2 || info.gameListType==1){
           wx.reLaunch({
             url:'/pages/mydetail/detail'
           })
        }else{
            this.$router.push({path:'/pages/carplate/carplate'})
        }
     },
       async login(){
         const that=this;
              if(!this.loginOrRegister){
                  //注册逻辑
                        if(this.isRegister())
                        {
                              
                        let data={
                            phoneNumber:this.register.phoneNumber,
                            code:this.register.code,
                            password:this.register.password
                        }
                         let res=await reqister(data)
                        if(res.success){
                            this.isShow=true;
                         
                        }else{
                            this.$mptoast(res.error.message,'error',2000)
                        }        
                 }
              }else{    
                   
                  //登陆逻辑
                 if(this.isLogin()){

                    
                       let str=md5(that.loginForm.password)
                       let password=str.toUpperCase()
    
                         let data={
                            phoneNumber:this.loginForm.phoneNumber,
                            password:password,
                            loginType:10  //web登录
                        } 
                    
                       
                        let ret = await authenticate(data)    
                      
                        if(ret && ret.success){
                           try{
                               wx.setStorageSync("authToken",ret.result);
                               this.$store.commit('LOGINSTATUS',true)
                               this.getUserInfo()
                            
                           }catch(e){
                              console.log(e,'eee')
                           }                        
                        }else{
                            this.$mptoast(ret.error.message,'error',2000)
                        }               
                 }
            }        
      },
      async getCode(){
          const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;    
          if(!this.register.phoneNumber || this.register.phoneNumber.length===0){ 
              this.$mptoast('请输入手机号码','none',2000)
              return false;
          }
          if(!myreg.test(this.register.phoneNumber)){
               this.$mptoast('您输入的手机号码格式不正确请重新输入','none',2000)
               return false;
          }
            if(!this.register.password || this.register.password.length<6){
               this.$mptoast('密码长度为6~18位','none',2000)
               return false;
          }
     
         const that=this;
       
       
        this.interval=setInterval( ()=>{
             this.currentTime--;
            if(this.currentTime>0){
               that.time= this.currentTime + '秒'
            }else{
                clearInterval(this.interval)
                this.time='重新发送'
                this.currentTime=61
            }        
         },1000)
          let data={
              phoneNumber:this.register.phoneNumber,
              smsType:0
         }
         let res= await smsSend(data)
         if(res && res.success){
              console.log(res.result)
         }else{
             this.$mptoast(res.error.message,'error',2000)
         }

      },
      getVerificationCode(){
          this.getCode() 
      },
      isDisable(){
       
          if(!this.loginForm || Object.keys(this.loginForm).length==0){
              this.disableLoginBtn=true
          }else{
              if(this.loginForm.phoneNumber && this.loginForm.phoneNumber.length>0 && this.loginForm.password && this.loginForm.password.length>0){
                  this.disableLoginBtn=false
              }else{
                  this.disableLoginBtn=true
              }
          }   
      },
      //注册按钮
      disable(){
       
      
        if(Object.keys(this.register).length){
        
           if(this.register.phoneNumber && this.register.phoneNumber.length>0 && this.register.password && this.register.password.length>0 && this.register.code && this.register.code.length>0 && this.checked){
               this.disableRegisterBtn=false
              
           }else{
            
               this.disableRegisterBtn=true
           }
        }else{
            this.disableRegisterBtn=true
        }
       
           
         
      }
    },
 
    mounted () {
       
         this.refreshData(); 
    } 
}
</script>
<style lang="less" scoped>
.activeCode{
      color: #fff;
      background-image: linear-gradient(90deg, 
		rgba(104, 169, 2, 0.54) 0%, 
		rgba(178, 217, 75, 0.9) 100%), 
	linear-gradient(
		#61c000, 
    #61c000);
    background-blend-mode: normal,ormal;
}
    .login_wrap{
        padding-left: 30rpx;
        padding-right: 30rpx;
        box-sizing: border-box;
        .disBtn[disabled]{
            background: #999;
            color: #fff;
        }
        .login_logo{
            margin-top:20rpx;
            .logo{
                img{
                  width: 139px;
                  height:50px;
                }
            }
        }
        .login_main{
            margin-top: 100rpx;
            .register_server{
                padding-left:10px;
                display: flex;
                display: -webkit-flex;
                justify-content: flex-start;
                align-items: center;
                .weui-check__hd_in-checkbox{
                    padding-right: 0;
                }
                .label_server:active{
                    background-color: #fff;
                }
                .label_server{
                    padding: 0;
                    .icon1{
                        margin: 0;
                        border-radius: 50%;
                    }
                }
            }
            .btn_type{
                margin-left: 20rpx;
                .btnLogin{
                    font-size: 42rpx;
                    color: #999;
                    display: inline-flex;
                    margin-right: 30rpx;            
                }
                .active{
                    color: #4eb248;
                }
            }
            .weui-cells_form{
                margin-top: 50rpx;
                .weui-input{
                    font-size: 30rpx;
                    color: #a8a8a8;
                }
                .btn_wrap{
                    margin-top: 80rpx;
                    .btn{
                           width: 620rpx;
                            height: 90rpx;
                            border-radius: 45rpx;
                            background-image: linear-gradient(90deg, 
                            rgba(104, 169, 2, 0.54) 0%, 
                            rgba(178, 217, 75, 0.9) 100%), 
                            linear-gradient(
                                #61c000, 
                                #61c000);
                            background-blend-mode: normal,normal;
                    }
                }
            }
        }
        .login_footer{
            width: 100%;
            .delivder{
                display: flex;
                display:-webkit-flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;     
                .line{
                   background: #999;
                   height: 4rpx;
                   width: 230rpx;            
                }
            }
        }
        .code_wrap{
            padding-right: 0;
        }
       
        .btn_wrap{
            margin-top: 30rpx;
        
        }
        .rules{
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 10px;
            span{
               margin-top: 6rpx;
            }
            a{
               margin-top: 6rpx;
            }
        }
    }
</style>


