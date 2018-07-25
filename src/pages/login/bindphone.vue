<template>
    <div class="login_wrap page">
        <div class="login_main">
         
            <div class="weui-cells_form">
                <div class="weui-cell">
                        <input class="weui-input" type="tel" placeholder="输入手机号码"/>
                </div>
                <div class="weui-cell code_wrap">
                   <input type="text" class="weui-input" placeholder="输入验证码"/>
                   <button class=" btn" id="codeBtn" type="primary">验证码</button>
                </div>
                <div class="weui-cell">
                        <input type="password" class="weui-input" placeholder="设置登录密码"/>  
                </div>
                <div class="weui-cell">
                </div>
                 <div>
                   <checkbox-group @change="checkboxChange">
                        <label class="weui-cell weui-check__label">
                            <checkbox class="weui-check"  :checked="checked" />
                            <div class="weui-cell__hd weui-check__hd_in-checkbox">
                                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checked"></icon>
                                <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checked"></icon>
                            </div>
                            <div class="weui-cell__bd rules"><span>同意《</span><a style="color:#4eb248;">使用条款及隐私</a><span>》</span></div>
                        </label>
                  </checkbox-group>
                </div>        
                 <div class="btn_wrap">
                    <button class="btn" type="primary">绑定</button>
                 </div>   
            </div>          
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            checked:true
        }
    },
    methods: {
        checkboxChange(){
            this.checked=!this.checked
        }
    }
}
</script>
<style lang="less" scoped>
    .login_wrap{
        padding-left: 30rpx;
        padding-right: 30rpx;
        .login_main{
           
            .weui-cells_form{
                margin-top: 20rpx;
                .weui-input{
                    font-size: 30rpx;
                    color: #a8a8a8;
                }
                .btn_wrap{
                    margin-top: 80rpx;
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
            span{
               margin-top: 6rpx;
            }
            a{
               margin-top: 6rpx;
            }
        }
    }
}  
</style>


