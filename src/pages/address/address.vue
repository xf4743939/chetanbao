<template>
    <div class="page address page_Wrap">
        <div class="address_text">
            <textarea class="weui-textarea"  maxlength="50" minlength="5" v-model="addr" placeholder="设备邮寄地址"></textarea>
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
           addr:" "
        }
    },
    components: {
      mptoast  
    },
   methods: {
       ...mapMutations(['SAVEADDRESS']),
       bind(){
           if(!this.addr || this.addr.length<5 || this.addr.length>50){
               this.$mptoast('请输入5-50个字符的地址','none',2000)
               return;
           }
           this.$store.commit('SAVEADDRESS',this.addr)
           wx.setStorageSync('address',this.addr)
           this.$router.push({path:'/pages/paymoney/index'})

       }
   },
   mounted () {
         Object.assign(this.$data,this.$options.data())
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

