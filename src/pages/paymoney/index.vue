<template>
    <div class="pay_container page_Wrap">
        <detail-modal v-if="isShow" :isSHow="isShow" :payInfo="payInfo" v-on:hideModal="hideModal"></detail-modal>
          <div class="pay_money">
               <div class="pay_sale">
                   <span>{{ fee }}</span>
                   <span>元</span>
               </div>
               <div class="pay_real">
                   <p class="line"></p>
                   <p>原价200.00元</p>
               </div>
          </div>
          <div class="pay_types">
              <div class="title">付款方式</div>
              <div class="pay_item">
                  <div class="pay_name">
                    <img src="../../../static/images/wx.png">
                    <span>微信支付</span>
                  </div>
                  <div>
                       <checkbox-group @change="changewx">
                        <label class="weui-cell weui-check__label">
                            <checkbox class="weui-check"  :checked="checked" />
                            <div class="weui-cell__hd weui-check__hd_in-checkbox">
                                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checked"></icon>
                                <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checked"></icon>
                            </div>
                        </label>
                      </checkbox-group>
                  </div>
                  
              </div>
              <div class="pay_item">
                  <div class="pay_name">
                      <img src="../../../static/images/zhifubao.png">
                     <span>支付宝支付</span>
                  </div>
                   <div>
                        <checkbox-group @change="changezf">
                                <label class="weui-cell weui-check__label">
                                    <checkbox class="weui-check"  :checked="zfchecked" />
                                    <div class="weui-cell__hd weui-check__hd_in-checkbox">
                                        <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!zfchecked"></icon>
                                        <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="zfchecked"></icon>
                                    </div>
                                </label>
                        </checkbox-group>
                   </div>       
              </div>
          </div>
          <div class="pay_tip">
               <h3>付款说明</h3>
               <p>1.付款对象为深圳碳链技术股份有限公司.</p>
               <p>2.付款用途为“车碳宝”车载WIFI设备租用押金.</p>
            
          </div>
           <div class="btn_wrap">
                    <button class="btn" @click="confirm">确认</button>
          </div>
          <mptoast/>   
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import detailModal from '../../components/detailModal'
import mptoast from 'mptoast'
export default {
    data(){
        return{
           checked:true,
           zfchecked:false,
           isShow:false,
           gameFeePayType:0,//支付方式
           payInfo:null //支付的信息传给modal 
        }
    },
    components: {
        mptoast,
        detailModal
    },
    computed: {
      ...mapState(['fee','carNo','schem','address','gameFeeChoiceType'])  
    },
    methods: {
          hideModal(){
            this.isShow=false;     
        },
        changewx(){
            if(this.checked){
                return;
            }
            this.checked=!this.checked;
            this.zfchecked=false
        },
        changezf(){
            if(this.zfchecked){
                return;
            }
            this.zfchecked=!this.zfchecked
            this.checked=false
        },
        initData(){
            if(!this.fee){
             
                const fee=wx.getStorageSync('fee')
             
                if(fee){
                  this.$store.state.fee=fee
                }
            }
            if(!this.carNo || this.carNo.length==0){
                const carNo=wx.getStorageSync('carNo')   
                if(carNo){
                     this.$store.state.carNo=carNo
                     console.log(this.carNo)
                }
            }
              if(!this.schem){
                const schem=wx.getStorageSync('schem')
                if(schem){
                     this.$store.state.schem=schem
                }
            }
              if(!this.address && this.address.length==0){
                const address=wx.getStorageSync('address')
                if(address){
                     this.$store.state.address=address         
                }
            }
              if(!this.gameFeeChoiceType){
                const gameFeeChoiceType=wx.getStorageSync('choiceType')
                if(gameFeeChoiceType){
                     this.$store.state.gameFeeChoiceType=gameFeeChoiceType
                }
            }
          
        },
        confirm(){
            const that=this
            if(this.zfchecked){
                this.gameFeePayType=2
            }
            if(this.checked){
                this.gameFeePayType=1
            }
            this.payInfo={
                schem:that.schem,
                fee:that.fee,
                gameFeeChoiceType:that.gameFeeChoiceType,
                address:that.address,
                carNo:that.carNo,
                gameFeePayType:that.gameFeePayType
            }
            this.isShow=true
        }
    },
    mounted () {
        this.initData()
        
    }
     
}
</script>
<style lang="less" scoped>
   .pay_container{
      padding-left: 0;
      padding-right: 0;
       .pay_money{
           margin-top: 60rpx;
         .pay_sale{
             text-align: center;
             span:nth-child(1){
                 color: #f41f1f;
                 font-size: 66rpx;
                 margin-right: 20rpx;
                 display: inline-flex;
             }
             span:nth-child(2){
                 color: #333;
                 font-size: 28rpx;
             }
         }
         .pay_real{
             text-align: center;
             display: -webkit-flex;
             display: flex;
             justify-content: center;
             align-items: center;
             .line{
                 height: 4rpx;
                 background: #999;
                 width: 220rpx;
                 position: absolute;
             }
             span:nth-child(2){
                 color: #333;
                 z-index: 99;
             }
         }  
       }
       .pay_types{
           margin-top: 80rpx;
           padding-left: 40rpx;
           padding-right: 40rpx;
           .title{
               font-size: 32rpx;
               margin-bottom: 50rpx;
           }
           .pay_item{
               display: flex;
               display: -webkit-flex;
               justify-content: space-between;
               align-items: center;
               border-bottom: 1px solid #efefef;
               padding:10rpx 0; 
               .pay_name{
                   line-height: 60rpx;
                   display: flex;
                   display: -webkit-flex;
                   justify-content: flex-start;
                   align-items: center;
                   
               }
               img{
                   width:46rpx;
                   height:46rpx;
               
                   margin-right: 30rpx;
               }
               span{
                   height:100%;
                   color: #000;
               }
               .weui-cell{
                   padding-right: 0;
               }
           }
       }
       .pay_tip{
           padding: 0 40rpx;
           margin-top: 30rpx;
           h3{
               color: #333;
               margin-bottom: 10rpx;
           }
           p{
               color: #333;
           }
       }
       .btn_wrap{
           margin-top: 60rpx;
           .btn{
               color: #fff;
           }
       }
   }
</style>


