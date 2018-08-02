<template>
    <div class="activity page_Wrap">
         <div class="activity_rules">      
           <div class="rule1 rules" @click="choice(1)">
                <!-- <h3>活动规则</h3> -->
            按照每个月1000公里的基数进行核算(用户开车大于1000公里则过去的一个月未能进行碳减排,不予奖励),(1000-X)则属于此用户减排的里程数,每少开一公里奖励现金:0.01元,碳积分:1个.
           </div>
         </div>
        <div class="activity_rules ">      
           <div class="rule2 rules" @click="choice(2)">
                <!-- <h3>活动规则</h3> -->
            每停驶一天,奖励现金:0.4元,碳积分:40个。
           </div>
       </div>

    </div>
</template>
<script>
 import {mapMutations} from 'vuex'
export default {
    data(){
        return {
          
        }
    },
    methods: {
        ...mapMutations(['SAVESCHEM']),
        choice(index){
          
            this.$router.push({path:'/pages/address/address'})
            this.$store.commit('SAVESCHEM',index)
            wx.setStorageSync('schem',index)
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
           
            .rules{
                border: 1px solid #4eb248;
                border-radius: 16rpx;
                padding: 48rpx 30rpx 50rpx 30rpx;
                margin-bottom: 20rpx;  
                   height:80px;
            }
            .rule1:before{
                content: '按里程计算';
                width:156rpx;      
                padding-left: 8rpx;
                padding-right:8rpx;
                position: absolute;
                top: -20rpx;
                color: #4eb248;
                background: #fff;
                font-size: 30rpx;     
            }
             .rule2:before{
                content: '按停驶天数';
                width:156rpx;      
                padding-left: 8rpx;
                padding-right:8rpx;
                color: #4eb248;
                position: absolute;
                top: -20rpx;
                background: #fff;
                font-size: 30rpx;     
            }
          
        }
    }

</style>
