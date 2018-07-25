<template>
    <div class="activity page_Wrap">
        <mptoast/>
       <div class="activity_img">
           <img src="../../../static/images/banner2.png">
       </div>
       <div class="activity_rules">      
           <div class="rules">
                <p>1.随时拍照爱车仪表盘,显示清晰的里程数,上传至车碳宝APP,审核确认后即开始您的减排返现之旅.</p>
                <p>2.次月更新上传仪表盘照片,审核确认后根据当月驾驶里程里程情况,计算当月返现奖励。</p>
                <p>返现规则:按照每个月1000公里的基数进行核算（用户开车大于等于1000公里，则过去的一个月未能进行减排,不予奖励,(1000-X)则属于此用户减排里程数,每少开1公里按照如下数据进行计算）每少开一公里,奖励现金:0.01元,碳积分:1个.</p>
           </div>
       </div>
       <div class="btn_wrap">
           <button class="btn1" :class="{ 'active' : !disabled }"  @click="join">{{btnTxt}}</button>
       </div>
    </div>
</template>
<script>
import { gameListType} from '../../utils/constant'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            btnTxt:'我要参加',
            disabled:false
        }
    },
    computed: {
      ...mapState(['isLogin','userInfo'])  
    },
    methods: {
   
        join(){ 
               if(this.disabled){
                return ;
               }     
               if(!this.isLogin){
                  this.$router.push({path:'/pages/login/login'})
               }else{
                  this.$router.push({path:'/pages/carplate/carplate?type=1'}) 
               }
        },
        getData(){
             if(this.isLogin){
                 if(this.userInfo && this.userInfo.gameListType==gameListType.two){
                       this.disabled=true
                     this.btnTxt='已参加活动二，不能再参加此活动'
                 }else if(this.userInfo && this.userInfo.gameListType==gameListType.one){
                      this.disabled=true
                    this.btnTxt='已参加'
                 }
             }
        }
    },
    mounted () {   
        this.getData()
    }
}
</script>
<style lang="less" scoped>
   @import '../../libs/activity.less';
</style>


