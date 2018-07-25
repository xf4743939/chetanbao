<template>
    <div class="province_container page_Wrap">
        <div class="grids">
            <a :href=" '/pages/city/city?id=' + item.id" v-for="(item,index) in provinces" :key="item.id">
                <p >{{item.s_name}}</p>
                <p >{{item.name}}</p>
           </a>
        </div>
    </div>
</template>
<script>
import {provinces} from '../../libs/province'
export default {
    data(){
        return{
            provinces:[]
        }
    },
    mounted () {
        this.provinces=provinces
    }
}
</script>
<style lang="less" scoped>
  .province_container{

       .grids{
           display: flex;
           display: -webkit-flex;
           flex-wrap: wrap;
           justify-content:  space-between;
           padding-top: 10rpx;
           margin-top: 40rpx;
           a{
              display: flex;
              display: -webkit-flex;
               width: 28%;
               justify-content: center;
               align-items: center;
               white-space: nowrap;
               text-overflow: ellipsis;
               padding: 20rpx 10rpx;
               margin-bottom: 30rpx;
               box-shadow: 0px -2px 2px 0px #efefef,   /*上边阴影  红色*/
                -2px 0px 2px 0px #efefef,   /*左边阴影  绿色*/
                2px 0px 2px 0px #efefef,    /*右边阴影  蓝色*/
                0px 2px 2px 0px #efefef;    /*下边阴影  黄色*/
               p:nth-child(1){
                   color: #4eb248;
                   margin-right: 18rpx;
                   width: 30rpx;
                   white-space: nowrap;
                   text-overflow: ellipsis;
                   overflow: hidden;
               }
               p:nth-child(2){
                   color: #999;
                   width: 86rpx;
                   white-space: nowrap;
                   text-overflow: ellipsis;
                   overflow: hidden;
               }
           }
       }
  }
</style>

