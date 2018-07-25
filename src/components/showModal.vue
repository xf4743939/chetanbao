<template>
    <div>
    <div class="modal-mask" @click="hideModal" v-if="isSHow" @catchtouchmove="preventTouchMove" ></div>
        <div class="modal-dialog" v-if="isSHow">
            <div class="modal-title">{{title}}</div>
            <div class="modal-content">
                <div>
                   恭喜您注册成功，同时赠送您<span style="color:#4ed248;">200</span>个碳积分 
                </div>       
            </div>
            <div class="modal-footer">
                <!-- <div class="btn-cancel" @click="onCancel" data-status="cancel">取消</div> -->
                <div class="btn-confirm" @click="onConfirm" data-status='confirm'>前往登录>></div> 
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            showModal:false,
            title:"注册成功",
        }
    },
    props: ['isSHow'],
    methods: {
       preventTouchMove(){
        },
        hideModal(){
           this.$emit('hideModal')
        },
         onCancel() {
           this.hideModal();
         },
         onConfirm() {
            this.hideModal(); 
        //    wx.redirectTo({
        //         url:'/pages/login/login'
        //      })
         }    
    }
}
</script>
<style lang="less" scoped>
  .modal-mask{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity:0.5;
      overflow: hidden;
      z-index: 9000;
      color: #fff;
  }
  .modal-dialog{
      width: 540rpx;
      overflow: hidden;
      position: fixed;
      top:50%;
      left:0;
      z-index: 9999;
      background: #f9f9f9;
      margin: -180rpx 105rpx;
      border-radius: 18rpx;
  }
  .modal-title{
      padding-top: 50rpx;
      font-size: 36rpx;
      color: #030303;
      text-align: center;
  }
  .modal-content{
      padding: 50rpx 32rpx;
  }
  .modal-footer {
    display: flex;
    flex-direction: row;
    height: 86rpx;
    border-top: 1px solid #dedede;
    font-size: 34rpx;
    line-height: 86rpx;
}
// .btn-cancel {
//   width: 50%;
//   color: #666;
//   text-align: center;
//   border-right: 1px solid #dedede;
// }

.btn-confirm {
  width: 100%;
  color: #4ed248;
  text-align: center;
}
</style>

