<template>
    <div class="pay_container page_Wrap">
          <div class="pay_money">
               <div class="pay_sale">
                   <span>{{fee}}</span>
                   <span>元</span>
               </div>
               <div class="pay_real">
                   <p class="line"></p>
                   <p>原价200.00元</p>
               </div>
          </div>
          <div class="types">
              <div class="type1 type" @click="choice(1)">
              支持支付宝/微信支付设备押金,押金共计80元.使用满一年后押金即可提现,车载WIFI设备您可保留,继续使用“车碳宝”APP仍可获得现金和碳积分奖励.
              </div>
          </div>
         <div class="types" v-if="false">
              <div class="type2 type" @click="choice(2)">
                 采用租赁贷方式代为支付押金.
              </div>
          </div>
          <mptoast/> 
    </div>
</template>
<script>
import { mapMutations} from 'vuex'
import { getGameTwoFee} from '../../utils/api'
import mptoast from 'mptoast'
export default {
    data(){
        return{
           fee:0
        }
    },
    components: {
      mptoast  
    },
    methods: {
        ...mapMutations(['SAVECHOICETYPE']),
       choice(index){
           const that=this
         this.$store.commit('SAVECHOICETYPE',{type:index,fee:that.fee})
            wx.setStorageSync('choiceType',index)
            wx.setStorageSync('fee',that.fee)
           this.$router.push({path:'/pages/paymoney/index'})
       },
     async getGameTwoFee(){
         let res= await getGameTwoFee()
         console.log(res)
         if(res && res.success){
            this.fee=res.result
         }else{
             this.$mptoast(res.error.message,'none',2000)
         }
     }
    },
    mounted () {
        this.getGameTwoFee()
    }   
}
</script>
<style lang="less" scoped>
   .pay_container{
       padding-left: 0;
       padding-right: 0;
       .pay_money{
           margin-top: 60rpx;
         .pay_sale{
             text-align: center;
             span:nth-child(1){
                 color: #f41f1f;
                 font-size: 66rpx;
                 margin-right: 20rpx;
                 display: inline-flex;
             }
             span:nth-child(2){
                 color: #333;
                 font-size: 28rpx;
             }
         }
         .pay_real{
             text-align: center;
             display: -webkit-flex;
             display: flex;
             justify-content: center;
             align-items: center;
             .line{
                 height: 4rpx;
                 background: #999;
                 width: 220rpx;
                 position: absolute;
             }
             span:nth-child(2){
                 color: #333;
                 z-index: 99;
             }
         }  
       }
        .types{
             padding-left: 40rpx;
             padding-right: 40rpx;
             position: relative;
              margin-top: 60rpx;
              margin-bottom: 70rpx;
            .type{
                border: 1px solid #4eb248;
                border-radius: 16rpx;
                padding: 48rpx 30rpx 50rpx 30rpx;
                margin-bottom: 20rpx;
                height:80px;  
            }
            .type1:before{
                content: '自付';
                width:88rpx;      
                padding-left: 8rpx;
                padding-right:8rpx;
                position: absolute;
                top: -20rpx;
                color: #4eb248;
                background: #fff;
                font-size: 30rpx;     
            }
             .type2:before{
                content: '租赁贷';
                width:100rpx;      
                padding-left: 8rpx;
                padding-right:8rpx;
                color: #4eb248;
                position: absolute;
                top:-20rpx;
                background: #fff;
                font-size: 30rpx;     
            }
          
        }
     
      
   }
</style>


