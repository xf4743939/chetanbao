<template>
    <div class="activity page_Wrap">
             <div class="cc">2G设备</div>
              <div class="pay_item">
                
                  <div class="pay_name">  
                   
                    <span>2G设备，支持车辆定位等功能，享受停驶奖励。（需支付300元押金）</span>
                  </div>
                  <div>
                          <div class="check" @click="changewx" style="width:22px;height:22px;border-radius:50%;position:absolute;"></div>
                            <img v-if="checked" src="../../../static/images/select_active.png" style="width:22px;height:22px;" alt=""> 
                            <img v-if="!checked" src="../../../static/images/select.png" style="width:22px;height:22px;" alt="">
                  </div>
                  
              </div>
                  <dis class="cc" style="position:relative;top:10px;">4G设备</dis>
              <div class="pay_item"  style="margin-top:8px;">
                 
                  <div class="pay_name">
                   
                     <span>4G设备，具有车载WIFI、一键找车、车辆自检、行车报告等车碳宝APP全部功能。在享受停驶奖励的同时，“车碳宝”能识别您的驾驶行为，绿色行驶一定里程可获得现金奖励，不管停车开车都能创造收益。（需支付998元押金）</span>
                  </div>
                   <div>
                     <div class="check" @click="changezf" style="width:22px;height:22px;border-radius:50%;position:absolute;"></div>
                     <img v-if="zfchecked" src="../../../static/images/select_active.png" style="width:22px;height:22px;" alt=""> 
                     <img v-if="!zfchecked" src="../../../static/images/select.png" style="width:22px;height:22px;" alt="">
                        
                   </div>       
              </div>
                <div class="btn_wrap" >
                     <button class="btn" @click="choice">选择</button>
                 </div>

    </div>
</template>
<script>
 import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            checked:true, //表示2g设备
            zfchecked:false,//表示4g设备
        }
    },
    methods: {
        ...mapMutations(['SAVETYPE','SAVEFEE']),
           changewx(){
          
            if(this.checked){
                return;
            }
            this.checked=!this.checked;
            this.zfchecked=false
        },
        changezf(){
          
            if(this.zfchecked){
                return;
            }
            this.zfchecked=!this.zfchecked
            this.checked=false
        },
        choice(){
            let index=0;
            if(this.checked){
               index=1
               this.$store.commit('SAVEFEE',300)
                wx.setStorageSync('fee',300)
            }else{
               index=2
                this.$store.commit('SAVEFEE',998)
                 wx.setStorageSync('fee',998)
            }
            this.$store.commit('SAVETYPE',index)
            wx.setStorageSync('equipmentType',index)
            this.$router.push({path:'/pages/address/address'})
        
        }
    }
}
</script>
<style lang="less" scoped>
    .activity{
      
        margin-top: 90rpx;
        .activity_rules{
             position: relative;
              margin-top: 60rpx;
              margin-bottom: 70rpx; 
        }
          .cc{
                       color: #4eb248;
                       font-size: 16px;
                   }
    }
      .pay_item{
               display: flex;
               display: -webkit-flex;
               justify-content: space-between;
               align-items: center;
               border-bottom: 1px solid #efefef;
               padding:10rpx 0; 
                
               .pay_name{
                   width: 79%;
                   line-height: 60rpx;
                   display: flex;
                   display: -webkit-flex;
                   justify-content: flex-start;
                   align-items: center;
                
                   
               }
               img{
                   width:46rpx;
                   height:46rpx;
               
                   margin-right: 30rpx;
               }
               span{
                   height:100%;
                   color: #000;
                   font-size: 12px;
               }
               .weui-cell{
                   padding-right: 0;
               }
           }
           .btn_wrap{
               margin-top: 50px;
               .btn{
                   color: #fff;
               }
           }
   
</style>
