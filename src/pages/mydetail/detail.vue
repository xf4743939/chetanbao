<template>
    <div class="detail_wrap ">  
  
        <div class="detail_bd">     
              <img src="../../../static/images/detail_bd.png" >
        </div>
        <div class="detail_info" v-if="userInfo && userInfo.carNo!=null">
            <div class="info_head">
                {{ userInfo.carNo }}
            </div>
            <div class="info_main">
                <div class="info_item" @click="detailInfo(1)">
                    <p class="item_num" >
                        <span>{{ userInfo.cMoney  }}</span>
                      
                        <span>元</span>
                    </p>
                    <p class="item_name">
                        <img style="width:13px;height:15px;top:2px;" src="../../../static/images/money.png">
                        <span>奖励</span>
                    </p>
                </div>
                <div class="info_item" @click="detailInfo(2)">
                    <p class="item_num">
                        <span>{{ userInfo.cPoints }}</span>
                        <span>个</span>
                    </p>
                    <p class="item_name">
                        <img style="width:19px;height:20px;" src="../../../static/images/scort.png">
                        <span>碳积分</span>
                    </p>
                </div>
                 <div class="info_item" @click="detailInfo(3)">
                    <p class="item_num item_group">
                        <div>
                              <span style="font-size:28rpx;font-weight:normal;margin-right:10rpx;">{{ userInfo.cReduction }}</span>
                              <span style="color:#999;">碳</span>
                        </div>
                        <div>
                          <span style="margin-right:10rpx;">{{ userInfo.cPollute }}</span>
                       
                          <span style="color:#999">污染物</span>
                        </div>                
                    </p>
                    <p class="item_name men">
                        <img style="width:20px;height:20px;" src="../../../static/images/tree.png">
                        <span>环保达人</span>
                    </p>
                 </div>
            </div>
        </div>
        <div class="detail_banner">
            <a href="/pages/home/home">
              <img src="../../../static/images/banner4.png">
            </a>
        </div>
        <div class="detail_footer">
            <div class="footer_container" v-if="userInfo && userInfo.gameListType==1">

                       <div>
                          <img src="../../../static/images/footer.png" >
                       </div>
                       <div class="footer_right" @click="camer" v-if="userInfo"> 
                            <p>拍照上传>></p>
                            <p v-if="userInfo.nextPicDay>0" >距离可拍照时间{{ userInfo.nextPicDay }}天</p>
                            <p v-else>活动拍照时间中</p>
                        </div>
              
            </div> 
             <div class="footer_container" v-if="userInfo && userInfo.gameListType==2">

                       <div>
                          <img style="width:56px;" src="../../../static/images/wifi.png" >
                       </div>
                       <div class="footer_right" > 
                            <p style="color:#ff0000">下载APP绑定设备</p>
                            <p>设备激活需在车碳宝APP上进行</p>
                       </div>         
             </div> 
            <div class="footer_container" v-if="userInfo && userInfo.gameListType==2 && userInfo.wifiStatus==wifiStatus.Activate_Normal">
                       <div>
                          <img style="width:56px;" src="../../../static/images/wify_active.png" >
                       </div>
                       <div class="footer_right" > 
                            <p style="color:#ff0000">设备激活中...</p>
                            <p>WiFi到期时间{{ userInfo.wifiExpire }}</p>
                       </div>         
            </div>               
        </div>
    </div>
 
</template>
<script>
import { getCurrentLoginInfo,nextLoadPicDay} from '../../utils/api'
import { mapState,mapMutations } from 'vuex';
import {wifiStatus} from '../../utils/constant'
export default {
    data(){
        return{
           nextDay:0,
           wifiStatus:wifiStatus,
           userInfo:null,      
        }
    },
    methods: {
        filters(userInfo){
                           
                           if(parseInt(userInfo.cMoney)>=0){
                               userInfo.cMoney=userInfo.cMoney.toFixed(2)
                           }
                            if(parseInt(userInfo.cReduction)>0){
                                let arr=userInfo.cReduction.toFixed(2).split('.')
                                let a=arr[0],b=arr[1];
                                let num
                                if(a && a.length>3 && a.length<7){
                                    num=(a/1000).toFixed(2) + "kg"
                                }else if(a && a.length>=7){
                                num=(a/1000).toFixed(2) + "t"
                                }else{
                                    num=a.toFixed(2) + 'g'
                                }
                                userInfo.cReduction=num
                        }else if(parseInt(userInfo.cReduction)==0){
                            userInfo.cReduction='0g'
                        }
                        if(parseInt(userInfo.cPollute)>0){
                                let arr=userInfo.cPollute.toFixed(2).split('.')
                                let a=arr[0],b=arr[1];
                                let num
                                if(a && a.length>3 && a.length<7){
                                    num=(a/1000).toFixed(2) + "kg"
                                }else if(a && a.length>=7){
                                num=(a/1000).toFixed(2) + "t"
                                }else{
                                    num= a.toFixed(2) + 'g'
                                }
                                userInfo.cPollute=num
                        }else if(parseInt(userInfo.cPollute)==0){
                              userInfo.cPollute='0g'
                        }      
        },
        ...mapMutations(['SAVEUSERINFO']),
       camer(){
       
           wx.navigateTo({
                  url:'/pages/odometer/odometer'
              })
       },
       detailInfo(index){
         
            let url
            if(index==1){
                url="/pages/reward/reward"
            }else if(index==2){
                url='/pages/point/point'
            }else{
                url='/pages/carbonReduction/carbonReduction'
            }
           wx.navigateTo({
               url:url
           })
        },
       async getCurrentLoginInfo(){
           let res=await getCurrentLoginInfo()
           if(res && res.success){
               this.userInfo=res.result
                this.filters(this.userInfo)
               this.$store.commit(SAVEUSERINFO,res.result) 
           }else{
               this.$mptoast(res.error.message,'none',2000)
           }
       }
    },
    mounted () {  
      this.getCurrentLoginInfo()
    }
}
</script>
<style lang="less" scoped>
    .detail_wrap{
       
        .top{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height:50px ;
        }
        .detail_bd{
            img{
                width: 100%;
                height:290px;
            }
        }
        .detail_info{
            padding-left: 40rpx;
            padding-right: 40rpx;
            position: relative;
            top: -140rpx;
           .info_head{          
               padding-top: 6rpx;
               background: #fff;
               border-radius: 30rpx;
               width: 300rpx;
               margin-left: 190rpx;
               height: 60rpx;
               font-size: 32rpx;
               color:#0068b7;
               z-index: 9999;
               position: relative;
               top: 36rpx;
               text-align: center;
               font-weight: bold;            
           }
        }
        .info_main{
            display: flex;
            display: -webkit-flex;
            justify-content:space-around;
            align-items: center;
            height:260rpx ;
            z-index: 99;
            background: #fff;
            border-radius: 16rpx;
            box-shadow:0px 0px 0px 0 #fff,
            -2px 0px 3px 0px #efefef,
            2px 0px 3px 0px #efefef,
            0px 3px 3px 0px #efefef;
            .info_item{
                 flex: 1;
                 text-align:center;      
                .item_num{
                    span:nth-of-type(1){
                      font-size: 40rpx;
                      font-weight: bold;
                      color: #000;
                      margin-right: 4rpx;
                    }
                }
                .item_group{
                    padding-top: 28rpx;
                    align-items: center;
                    display: flex;
                    font-size: 28rpx;
                    font-weight:normal;
                    display: -webkit-flex;
                    flex-direction: column;                              
                }
               .item_name{
                   img{
                       position: relative;
                       left: -5px;
                       top: 4px;
                   }
                   span{
                       color:#4eb248;
                       font-weight: bold;
                       margin-top: 50rpx;
                       display: inline-flex;
                   }
               }
               .men{
                   position: relative;
                   top: -26rpx;
               }
            }         
        }
        .detail_banner{
            position: relative;
            top: -84rpx;
            img{
                width: 100%;
                height: 90px;
            }
        }
        .detail_footer{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 170rpx;
            background: #fff;
            box-shadow: 0px 0px 32px 0px 
        rgba(0, 0, 0, 0.32);
           img{
               width: 53px;
               height: 48px;
               margin-right: 30rpx;
           }
           .footer_container{
               height: 100%;
               display: flex;
               display: -webkit-flex;
               justify-content: center;
               align-items: center;
               .footer_right{
                   position: relative;
                   top:-10rpx;
               }
               p:nth-child(1){
                    font-size: 36rpx;
                    color: #4eb248;      
               }
               p:nth-child(2){
                   color: #999;
               }
           }
        }
    }
</style>

