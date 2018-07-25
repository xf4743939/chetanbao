<template>
    <div class="page address page_Wrap">
        <div class="address_text">
            <textarea class="weui-textarea" v-model="address" placeholder="设备邮寄地址"></textarea>
        </div>
        <div class="btn_wrap">
             <button class="btn" @click="bind">下一步</button>
        </div>  
        <mptoast/>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import mptoast from 'mptoast'
export default {
    data(){
        return {
           address:""
        }
    },
    components: {
      mptoast  
    },
   methods: {
       ...mapMutations(['SAVEADDRESS']),
       bind(){
           if(!this.address || this.address.length==0){
               this.$mptoast('请输入设备邮寄地址','none',2000)
               return;
           }
           this.$store.commit('SAVEADDRESS',this.address)
           wx.setStorageSync('address',this.address)
           this.$router.push({path:'/pages/choicetype/choicetype'})

       }
   }
}
</script>
<style lang="less" scoped>
  .address{
    padding-left: 0;
    padding-right: 0;
      background:#ecedef;
      .address_text{
          background: #fff;
           padding-left: 30rpx;
           padding-right: 30rpx;
        
      }
      .btn_wrap{
          margin-top: 120rpx;
          .btn{
              color: #fff;
          }
      }

  }
</style>

