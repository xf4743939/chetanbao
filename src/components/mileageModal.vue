<template>
    <div>
    <div class="modal-mask" @click="hideModal" v-if="isShow" @catchtouchmove="preventTouchMove" ></div>
        <div class="modal-dialog" v-if="isShow ">
             <div @click="close" class="close">x</div>
            <div class="modal-title"  v-if="mileages">此次共行驶了<span style="color:#4eb248;font-size:24px;margin-right:6px;">{{allNum}}</span>公里</div>
            <div class="modal-content" v-if="mileages">
                <div class="item item_date">
                    <div class="date">
                         {{ mileages.eDate }}
                    </div>
                    <div class="num">
                         <div>里程表表值</div>
                         <div>{{ mileages.eMileage || 0 }}公里</div>
                    </div>
                </div>
                <div class="item item_date">
                      <div class="date">
                        {{ mileages.sDate }}
                    </div>
                    <div class="num">
                         <div>里程表表值</div>
                         <div>{{ mileages.sMileage }}公里</div>
                    </div>
                </div>
                <div class="item item1">
                    <div class="val">
                      获得奖励
                    </div>
                    <div class="val">
                      {{ mileages.cMoney }}元
                    </div>
                </div>
                <div class="item item1">
                   <div class="val">
                      获得碳积分
                   </div>
                   <div class="val">
                       {{ mileages.cPoints }}个
                   </div>
                </div>
                 <div class="item item1">
                    <div class="val">
                      减排碳
                    </div>
                    <div class="val">
                      {{ mileages.cReduction }}
                    </div>
                </div>
                <div class="item item1">
                   <div class="val">
                      减排污染物
                   </div>
                   <div class="val">
                       {{ mileages.cPollute }}
                   </div>
                </div>
            </div>
           
        </div>
    </div>
    
</template>
<script>


export default {
    data(){
        return{
            showModal:false,
            allNum:0,//总里程 
            mileages:{},//里程详情    
        }
    },
    props: ['isShow','mileage'],
    methods: {
          filters(item){
          
            
                    if(parseInt(item.cReduction)>0){
                     
                        let arr=item.cReduction.toFixed(2).split('.')
                        let a=arr[0],b=arr[1];
                        let num
                        if(a && a.length>3 && a.length<7){
                            num=(a/1000).toFixed(2) + "kg"
                        }else if(a && a.length>=7){
                        num=(a/1000).toFixed(2) + "t"
                        }else{
                            num=a.toFixed(2) +'g'
                        }
                        item.cReduction=num
                  }
                    if(parseInt(item.cPollute)>0){
                            let arr=item.cPollute.toFixed(2).split('.')
                            let a=arr[0],b=arr[1];
                            let num
                            if(a && a.length>3 && a.length<7){
                                num=(a/1000).toFixed(2) + "kg"
                            }else if(a && a.length>=7){
                            num=(a/1000).toFixed(2) + "t"
                            }else{
                                num=a.toFixed(2) +'g'
                            }
                            item.cPollute=num
                    }
           
     
        },
       preventTouchMove(){
      },
       close(){
          
           this.$emit('hideModal')
      }, 
    },
    mounted () {
      this.mileages=Object.assign(this.mileages,this.mileage)
     
       if(this.mileages && Object.keys(this.mileages).length>0){
           this.filters(this.mileages)
           let num=(this.mileages.eMileage || 0)-this.mileages.sMileage
           this.allNum=num> 0 ? num : 0 
       }
    
    }
}
</script>
<style lang="less" scoped>
.close{
   width:22px;
   height:22px;
   border-radius:50%;
   font-size: 18px;   
   float: right;
   display: block;
}
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
      .item_date {
          border-bottom: 1px solid #efefef;
          padding-bottom: 10px;
          margin-bottom: 8px;
          .date{
              font-size: 16px;
              font-weight: bold;
         
          }
          .num{
               
                display:flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
          }
          
      }
      .item1{
          margin-bottom: 24rpx;
          display:flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          
      }
  }
 
</style>

