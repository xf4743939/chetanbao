<template>
    <div class="province_container page_Wrap">
        <div class="grids">
            <a v-if="citys && citys.length>0" @click="selectCity(item)" v-for="(item,index) in citys" :key="item.id">
                <!-- <p>{{item.s_name}}</p> -->
                <p>{{item.name}}</p>
           </a>
            <p v-if="citys && citys.length==0">还没有数据...</p>
        </div>
    </div>
</template>
<script>
import {provinces} from '../../libs/province'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            citys:[],
            provinces:provinces
        }
    },
    methods: {
        ...mapMutations(['GETCITY']),
        selectCity(item){
            let city=item.name.substring(0,2);
            this.$store.commit('GETCITY',city);
            this.$router.push({path:'/pages/carplate/carplate'})
        },
       getData(){
           let cityId=this.$route.query.id || 0
           if(cityId){
               let curProvince=this.provinces.find( x =>x.id==cityId)
               if(curProvince){
                   this.citys=curProvince.areaList
               }
           }else{
               this.citys=[]
           }
       }  
    },
    mounted () {
       this.getData()
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
             
               padding: 20rpx 10rpx;
               margin-bottom: 30rpx;
               box-shadow: 0px -2px 2px 0px #efefef,   /*上边阴影  红色*/
                -2px 0px 2px 0px #efefef,   /*左边阴影  绿色*/
                2px 0px 2px 0px #efefef,    /*右边阴影  蓝色*/
                0px 2px 2px 0px #efefef;    /*下边阴影  黄色*/
              p:nth-child(1){
                   color: #4eb248;
                   white-space: nowrap;
                   text-overflow: ellipsis;
                   overflow: hidden;
               }
              
           }
       }
  }
</style>

