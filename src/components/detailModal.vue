<template>
    <div>
    <div class="modal-mask" @click="hideModal" v-if="isSHow" @catchtouchmove="preventTouchMove" ></div>
        <div class="modal-dialog" v-if="isSHow">
            <div class="modal-title">{{title}}</div>
            <div class="modal-content">
                <div class="item">
                    <span>车牌</span>
                    <span class="item_val">{{ payInfo.carNo }}</span>
                </div>
                <div class="item">
                    <span>减排计算方式</span>
                    <span class="item_val">按小时计算</span>
                </div>
                <div class="item">
                    <span>设备邮寄地址</span>
                    <span class="item_val " id="item_address">{{ payInfo.address }}</span>
                </div>
                <div class="item">
                    <span>设备类型</span>
                    <span class="item_val">{{ payInfo.equipmentType==1 ? '2G设备' : '4G设备' }}</span>
                </div>
                <div class="item">
                    <span>押金付款方式</span>
                    <span class="item_val">{{ payInfo.gameFeePayType==1 ? '微信' : '支付宝' }}</span>
                </div>
                <div class="item">
                    <span>押金金额</span>
                    <span class="item_val" style="color:#f41f1f">{{ payInfo.fee }}元</span>
                </div>             
            </div>
            <div class="modal-footer">
                <div class="btn-cancel" @click="onCancel" data-status="cancel">取消</div>
                <div class="btn-confirm" @click="onConfirm" data-status='confirm'>确认并付款</div> 
            </div>
        </div>
    </div>
    
</template>
<script>
import { applyGameTwo } from '../utils/api'
import { appId} from '../utils/constant'
const md5=require('md5')

export default {
    data(){
        return{
            showModal:false,
            title:"活动二详情",
            code:'',
        }
    },

    props: ['isSHow','payInfo'],
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
            this.payMoney()
         }, 
        async payMoney(){
            const that=this;
             this.payInfo.wxtradeType=1
             this.payInfo.scode=that.code
             let data=this.payInfo
  
            let res= await applyGameTwo(data)
         
            if(res && res.success){
                let data=JSON.parse(res.result);
                let appid=appId
                let timestamp=''+ data.timestamp
                let nonceStr=  data.noncestr
                let packages='prepay_id='+ data.prepayid
                let keys="gS8NoVGODkOCtuEisN8ZmN6qeSbSF4y9"; //商户支付密钥
             
                const str=`appId=${appid}&nonceStr=${nonceStr}&package=prepay_id=${data.prepayid}&signType=MD5&timeStamp=${timestamp}&key=${keys}`
               
                let paysign=md5(str).toUpperCase()    
     
                wx.requestPayment({
                    'timeStamp':timestamp,
                    'nonceStr': nonceStr,
                    'package': packages,
                    'signType': 'MD5',
                    'paySign':paysign,       
                    'success':function(res){
                        setTimeout( () => {
                          wx.reLaunch({
                                  url:'/pages/mydetail/detail'
                               })     
                        },300)

                    },
                    'fail':function(res){ 
                        //  wx.removeStorageSync('schem');
                        //  wx.removeStorageSync('address');
                        //   wx.removeStorageSync('choiceType');      
                         that.hideModal()
                     },        
                    })
            }else{
                        //  wx.removeStorageSync('schem');
                        //  wx.removeStorageSync('address');
                        //  wx.removeStorageSync('choiceType');      
              that.hideModal()
               wx.showToast({
                   title:res.error.message,
                   icon:'none',
                   duration:2000,
                   mask:true
               })
            }
        }   
    },
    mounted () {
        const that=this;
       wx.login({
           success:function(res){
               if(res.code){
                  
                  that.code=res.code
               }  else{
                   console.log('登录失败！' + res.errMsg)
               }
           }
       })
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
      width:600rpx;
      overflow: hidden;
      position: fixed;
      top:50%;
      left:0;
      z-index: 9999;
      background: #f9f9f9;
      margin: -420rpx 70rpx;
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
      .item{
          margin-bottom: 30rpx;
          display:flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          .item_val{
              color:#4eb248;        
          }
          span:nth-of-type(2){
              width:320rpx;
              text-align: right;
              overflow: hidden;
              white-space: nowrap;
              text-overflow:ellipsis;
          }
        
      }
  }
  #item_address{
              width: 160px;
              white-space:normal;
             word-wrap:break-word;
              max-height: 130px
  }
  .modal-footer {
    display: flex;
    flex-direction: row;
    height: 86rpx;
    border-top: 1px solid #dedede;
    font-size: 34rpx;
    line-height: 86rpx;
}
.btn-cancel {
  width: 50%;
  color: #666;
  text-align: center;
  border-right: 1px solid #dedede;
}

.btn-confirm {
  width: 50%;
  color: #4ed248;
  text-align: center;
}
</style>

