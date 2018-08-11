<template>
    <div class="activity page_Wrap">
        <mptoast/>
       <div class="activity_img">
           <img src="../../../static/images/banner3.jpg">
       </div>
       <div class="activity_rules">      
           <div class="rules">
                <p>1.登记您的车牌号码，填写邮寄地址。支付押金获取“车碳宝”车载设备，与APP绑定后，装上爱车，即刻开始您的减排积分之旅。</p>
                <p>2.车载设备会自动记录您的停驶情况，您可在车碳宝APP上查看停驶情况和所获奖励。</p>
                <!-- <p>3.“车碳宝”能识别您健康的驾驶行为,规范行驶一定里程可获得正向碳积分,开车也能享受积分收益.</p>
                <p>4.碳积分可在系统商城内兑换奖品,亦可按照一定比例兑换成现金奖励.</p> -->
           </div>
            <div class="rule2" style="margin-top:25px;">
                <p>（2G设备）1.每停驶1小时，奖励现金：0.05元，碳积分：5个。</p>
                <p>（4G设备）1.每停驶1小时，奖励现金：0.05元，碳积分：5个。
                    2.每绿色行驶1公里，奖励0.03元。每次急加速、急减速扣：0.02元。</p>
           </div>
       </div>
       <div class="btn_wrap">
           <button @click="join" class="btn1" :class="{ 'active' : !disabled }" >{{btnTxt}}</button>
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
    computed:{
      ...mapState(['isLogin','type'])  
    },
    methods: {
        ...mapMutations(['UPDATETYPE']),
     async getCurrentLoginInfo(){
       
             let res = await getCurrentLoginInfo()
                if(res && res.success){
                    this.userInfo=res.result;  
                   
                   
                        if(this.userInfo && this.userInfo.gameListType==2){
                            this.disabled=true
                            this.btnTxt='已参加'
                        }else{
                            this.disabled=false
                            this.btnTxt='我要参加'
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
             this.$store.commit('UPDATETYPE',2)     
             if(!this.isLogin){
                  this.$router.push({path:'/pages/login/login'})
             }else{
                 if(this.userInfo && this.userInfo.carNo && this.userInfo.carNo.length){
                    this.$router.push({path:'/pages/reduction/reduction'}) 
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


