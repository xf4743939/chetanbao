<template>
    <div class="odometer ">
       <mptoast/>
       <mileage-modal v-if="isShow" :isShow="isShow"  v-on:hideModal="hideModal" :mileage="modalVal"></mileage-modal>
      <div class="odometer_head">
          <div style="width:85px;">输入里程表</div>
          <div style="width:150px;"><input type="number"  max="999999" min="0" maxlength="6" placeholder="输入里程表数值" v-model="number"></div>
          <div style="width:50ox;">公里</div>         
      </div>
       <div v-if="imgUrl.length>0" class="odometr_img">
           <div>
                 <image style="height:400rpx;" mode="scaleToFill" :src="imgUrl"></image>
           </div>
           <div class="btns">
                  <span @click="cancel">重新拍摄</span>
                  <span @click="save">确认上传</span>
           </div>        
      </div>
       
      <div v-else  class="odometr_main" @click="authorize">
          <span v-if="nextLoadPicDay==0">点击拍摄里程表照片</span>
          <span v-if="nextLoadPicDay>0">距离可拍照时间{{ nextLoadPicDay }}天</span>
      </div>
      <div class="odometerList" v-if="mileages" v-for="(item,index) in mileages" :key="index">
          <div class="odometer_info">
             <div class="odometer_date" >{{ item.sDate}}</div>
             <div style="margin-bottom:10px;">
                 {{ item.sMileage }}公里
             </div>
             <div>
                 <img v-if="item.eDate && item.eMileage>0 && item.theStatus==3 " @click="showModal(item)" src="../../../static/images/detail.png" style="width:23px;height:27px;">
             </div>
          </div>
          <div class="odemeter_img">
              <img :src="baseUrl + item.sImg ">
          </div>
      </div>
    </div>
</template>
<script>
import { createMileage,getMileageListByFilter,nextLoadPicDay} from '../../utils/api'
import {uploadFile} from '../../utils/wechat'
import { baseUrl } from '../../utils/constant'
import enums from '../../utils/enum'
import mptoast from 'mptoast'
import mileageModal from '../../components/mileageModal'
import{mapState} from 'vuex'
import request from '../../utils/request.js'
export default {
    data(){
        return {
           isShow:false,
           imgUrl:'', //拍照的图片路径
           number:'',//里程数
           page:1,//第一页
           num:100,//页面大小
           mileagesObj:null,
           mileages:[], //历史里程
           baseUrl:baseUrl,//网站地址
           modalVal:null, //传给modal 
           nextLoadPicDay:0, //下次上传的天数
        }
    },
    components: {
      mptoast,
      mileageModal  
    },
    computed: {
      ...mapState(['userInfo'])  
    },
    methods: {
        hideModal(){
            this.isShow=false;     
        },
        showModal(item){
            this.modalVal=item;
            this.isShow=true;
        },
     
        //调取摄像头拍照
        authorize(){
            const that=this
           if(this.nextLoadPicDay && this.nextLoadPicDay>0){
               return;
           } 
           wx.chooseImage({
            count:1,
            sizeType:['original','compressed'],
            sourceType: ['camera'],  
            success: function(res) {
                 that.imgUrl = res.tempFilePaths[0]
               }
            })
        },
        //上传图片
         upload(){
           const that=this;
           const csrfToken=wx.getStorageSync('authToken')
           if(!this.number || this.number.lenhth===0){ 
               wx.showToast({
                   title:'请输入里程表',
                   icon:'none',
                   duration:2000
               })       
               return;
           }
          that.$mptoast('正在上传请稍后...','none',2000)
           wx.uploadFile({
                url:baseUrl + enums.uploadMileageImg,
                filePath: that.imgUrl, 
                // formData:{"Content-Type": "image/jpg"},
                name: 'file',
                header: {'Authorization':`Bearer ${csrfToken.accessToken}`,
                         "Content-Type": "image/jpg", //表单提交时伴随文件上传的场合
                },
                success: function (res) {   
                
                       try{
                                let imgUrl= JSON.parse(res.data).result  
                               
                                if(!imgUrl || imgUrl.length==0){
                                    return ;
                                }
                             
                                that.createMileage(imgUrl[0])    
                       }catch(e){
                             that.$mptoast('上传失败','none',2000)
                             that.imgUrl="";
                           
                       }
                    
                 
                },
                fail: function (e) {    
                  that.$mptoast('上传失败','none',2000)
                  this.imgUrl="";
                }
           })  
        },

        async createMileage(url){
            let parms={
                 mileage:parseInt(this.number),
                 imgSrc:url
            }
        
           let res=await createMileage(parms)
   
           if(res && res.success){
               this.imgUrl='';
               this.number='';
               this.$mptoast('上传成功','none',2000)
               this.initData()
           }else{
                this.imgUrl="";
               this.$mptoast('上传失败','none',2000)
           }
        },
   
       initData(){
           const that=this;
             let data={
               page:this.page,
               rows:this.num
            } 
              request.all([nextLoadPicDay(),getMileageListByFilter(data)])
                .then(request.spread(function(a,b){
                  
                    that.mileagesObj=b.result;
                    that.mileages=b.result.items;
                    that.nextLoadPicDay=a.result;
                }))
       }, 
        cancel(){
            this.imgUrl='';
            this.authorize()
        },
        save(){       
           this.upload()  
        }
    },
    mounted (){
        this.initData()
        // this.getMileageListByFilter();
    }
}
</script>
<style lang="less" scoped>
  .odometer{
      position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        box-sizing:border-box;
       padding-left: 0;
       padding-right: 0;
      .odometerList{
        padding-left: 40rpx;
        padding-right: 40rpx;
        margin-bottom: 25px;
        .odometer_info{
            display: flex;
            display: -webkit-flex;
            justify-content:space-between;
            align-items: center;
            font-size: 30rpx;
            .odometer_date{
                font-weight: bold;
                margin-bottom: 10px;
            }
        }
        .odemeter_img{
            img{
                width: 100%;
            }
        }
      }
      .odometer_head{
          margin-top: 40rpx;
          display: flex;
          display: -webkit-flex;
          justify-content:space-between;
          align-items: center;
          padding-left: 40rpx;
          padding-right: 40rpx;
          padding-bottom: 16rpx;
          font-size: 30rpx;
          border-bottom: 1px solid #efefef; 
      }
      .odometr_main{
          width:90%;
          height:400rpx;
          border: 1px dotted #999;
          margin: 40rpx auto; 
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
          color: #999;
      }
      .odometr_img{
          width:670rpx;
          height:300px;     
          margin: 40rpx auto 0 auto;
          margin-bottom: 0rpx;
          .btns{
               width:670rpx;
                height:80rpx;     
                margin: 20rpx auto;
                border-radius: 40px;
                box-shadow: 0px 1px 9px 0px 
                rgba(102, 106, 102, 0.2);
                text-align: center;
            
                span:nth-child(1){
                  color:#4d4d4d;
                  margin-top: 20rpx;
                  width: 50%;
                  display: inline-flex;
                  justify-content: center;
                  border-right: 1px solid #efefef;
                  box-sizing: border-box;
                }
                span:nth-child(2){
                    box-sizing: border-box;
                    color: #4eb248;
                    margin-top: 20rpx;
                    width: 50%;
                    text-align: center;
                    display: inline-flex;
                    justify-content: center;
                }
          } 
      }
  }
</style>
