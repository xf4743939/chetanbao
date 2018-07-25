<template>
    <div class="carplate_container ">
      <mptoast/>
       <div class="weui-cell">
             <div class="weui-cell__hd">
                <a href="/pages/province/province">{{ city }}</a>
             </div>
             <div class="weui-cell__bd">
                <input type="text" v-model="cardNo" focus="true" class="weui-input">
             </div>
       </div>
        <div class="btn_wrap">
            <button class="btn" type="primary" @click="upDateBrand">确认</button>
        </div>   
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {updateCarBLInfoByMe} from '../../utils/api'

import mptoast from 'mptoast'
export default {
    data(){
        return {
             type:0, //1.表示活动1,2.表示活动二
             cardNo:''
        }
    },
    computed: {
        ...mapState(['city','userInfo'])
    },
    components: {
      mptoast  
    },
    methods:{
        ...mapMutations(['SAVECARNO','SAVEUSERINFO']),
        async upDateBrand(){
        
           if(!this.cardNo || this.cardNo.length==0){
               this.$mptoast('请输入车牌','none',2000)
               return;
           }       
            let carNoText=this.city + this.cardNo;           
            let data={
                carNo:carNoText
            }
            if(this.type==1) {
                  let res= await updateCarBLInfoByMe(data)
                    if(res && res.success){
                           
                            wx.reLaunch({
                            url:'/pages/mydetail/detail'
                        })
                    }else{
                        this.$mptoast(res.error.message,'error',2000)
                    }     
            }else{
                 this.$store.commit('SAVECARNO',carNoText)
                 wx.setStorageSync('carNo',carNoText)
                 this.$router.push({path:'/pages/reduction/reduction'}) 
            }
        },
        initData(){
           
          if(this.userInfo && this.userInfo.carNo){
              this.city=this.userInfo.carNo.substring(0,2)
              this.cardNo=this.userInfo.carNo.substring(2)
          }
        },
        //根据地质栏判断活动一活动er
        getType(){
            let type=parseInt(this.$route.query.type)
            if(!type){
                this.type=0
               
            }else(
                 this.type=type
            )
        }
    },
    mounted () {
        this.initData()
        this.getType()
    }
    
}
</script>
<style lang="less" scoped>
   .carplate_container{
       background:#ecedef;
       position: fixed;
       width: 100%;
       height: 100%;
        box-sizing: border-box;
       .weui-cell{
           height:300rpx;
           background: #fff;
           align-items: flex-end;
           a{
               font-size:34rpx;
               color: #4eb248; 
               height:100%;
               margin-right: 20rpx;
               line-height: 72rpx;
           }
           .weui-input{
               color: #666;
           }
       }
       .btn_wrap{
           margin-top: 200rpx;
       }
   }
</style>
