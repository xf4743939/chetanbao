<template>
    <div class="activity page_Wrap">
        <mptoast/>
       <div class="activity_img">
           <img src="../../../static/images/banner2.jpg">
       </div>
       <div class="activity_rules">      
           <div class="rules">
                <p>1.使用车碳宝APP随时拍照爱车仪表盘，显示清晰的里程数并上传，审核确认后即开始您的减排返现之旅。</p>
                <p>2.次月更新上传仪表盘照片，审核确认后根据当月驾驶里程情况，计算当月返现奖励。</p>
             
           </div>
             <div class="rule2" style="margin-top:25px;">
         
                <p>
                  1. 按照每个月1000公里的基数进行核算（用户开车大于等于1000公里，则过去的1个月未能进行减排，不予奖励），（1000-X）则属于此用户减排里程数，每少开1公里按照如下数据进行奖励计算）每少开1公里，奖励现金：0.01元，碳积分：1个。
                </p>
           </div>
       </div>
       <div class="btn_wrap" >
           <button class="btn1" :class="{ 'active' : !disabled }"  @click="join">{{btnTxt}}</button>
       </div>
    </div>
</template>
<script>
import { gameListType} from '../../utils/constant'
import {mapState,mapMutations} from 'vuex'
import { getCurrentLoginInfo} from '../../utils/api'
export default {
    data(){
        return{
            btnTxt:'我要参加',
            disabled:false,
            userInfo:null,
        }
    },
    computed: {
      ...mapState(['isLogin'])  
    },
    methods: {
      ...mapMutations(['UPDATETYPE']),
      async getCurrentLoginInfo(){
        
                let res = await getCurrentLoginInfo()
                if(res && res.success){
                 
                    this.userInfo=res.result;    
                 
                        if(this.userInfo && this.userInfo.gameListType==2){
                            this.disabled=true
                            this.btnTxt='已参加活动二，不能再参加此活动'
                        }else if(this.userInfo && this.userInfo.gameListType==1){
                            this.disabled=true
                            this.btnTxt='已参加'
                        }else {
                            this.disabled=false;
                            this.btnTxt="我要参加"
                        }
                    this.$store.commit('SAVEUSERINFO',userInfo)            
                }else {
                    wx.showToast({
                    title:res.error.message,
                    icon:'none',
                    duration: 2000
                    })
                }
           
     },
        join(){ 
               if(this.disabled){
                return ;
               } 
               this.$store.commit('UPDATETYPE',1)        
               if(!this.isLogin){
                  this.$router.push({path:'/pages/login/login'})
               }else{
                 if(this.userInfo && this.userInfo.carNo && this.userInfo.carNo.length){
                      setTimeout( () => {
                          wx.reLaunch({
                                  url:'/pages/mydetail/detail'
                               })     
                        },300)
                 }else{
                     this.$router.push({path:'/pages/carplate/carplate'}) 
                 }
                 
               }
        },
      
    },
    mounted () {   
      this.getCurrentLoginInfo()
    }
}
</script>
<style lang="less" scoped>
   @import '../../libs/activity.less';
</style>


