<template>
    <div class="carplate_container ">
      <mptoast/>
       <div class="weui-cell">
             <div class="weui-cell__hd">
                <a href="/pages/province/province">{{ city }}</a>
             </div>
             <div class="weui-cell__bd">
                <input type="text" maxlength="6" v-model="cardNo" focus="true" class="weui-input">
             </div>
       </div>
        <div class="btn_wrap">
            <button class="btn" type="primary" @click="upDateBrand">确认</button>
        </div>   
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {updateCarBLInfoByMe,getCurrentLoginInfo} from '../../utils/api'

import mptoast from 'mptoast'
export default {
    data(){
        return {
    
             cardNo:''
        }
    },
    computed: {
        ...mapState(['city','userInfo','type'])
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
                carNo:carNoText.toUpperCase()
            }
            
            if(this.type==1) {

                  let res= await updateCarBLInfoByMe(data)
                    if(res && res.success){ 
                         this.$store.state.userInfo.carNo=carNoText.toUpperCase();
                            wx.reLaunch({
                                  url:'/pages/mydetail/detail'
                               })                      
                    }else{
                       
                        this.$mptoast(res.error.message,'error',2000)
                    }     
            }else{
                 this.$store.commit('SAVECARNO',carNoText.toUpperCase())
                 wx.setStorageSync('carNo',carNoText.toUpperCase())
                 this.$router.push({path:'/pages/reduction/reduction'}) 
            }
        },
        initData(){
           
          if(this.userInfo && this.userInfo.carNo){
              this.city=this.userInfo.carNo.substring(0,2)
              this.cardNo=this.userInfo.carNo.substring(2)
          }
        },
      
    },
    mounted () {
       
        this.initData()
    
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
