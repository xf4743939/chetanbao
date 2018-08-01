<template>
    <div class="reward_container page_Wrap">
        <div class="reward_head" v-if="reduction">
            <div>
                减排碳<span class="cur">{{reduction.totalCarbon}}</span>&nbsp;,&nbsp;&nbsp;减排污染物<span class="sum ">{{ reduction.totalPollute }}</span>
            </div>
        </div>
        <div class="reward_main wrap"  @touchstart='touchStart'            
                     @touchend='touchEnd'>
             <img src="../../../static/images/bd_reduction.png">
              <mpvue-echarts :echarts="echarts" :onInit="onInit" />
            <div class="tip" v-if="!draw || draw.items.length==0">还没有数据...</div>
        </div>
        <div class="reward_list" v-if="detail">
            <h3>减排明细</h3>
            <ul>
                <li v-if="detail.items.length>0" class="item_li" v-for="(item,index) in detail.items" :key="index">
                    <div class="item">
                        <div class="item1" v-if="item.type==carbonSpecificType.carbonRedction_photograph">碳减排--拍照</div>
                        <div class="item1" v-if="item.type==carbonSpecificType.carbonRedction_mileage">碳减排--里程</div>
                        <div class="item1" v-if="item.type==carbonSpecificType.carbonRedction_startStop">碳减排--停驶</div>
                        <div class="item2">{{ item.date}}</div>
                    </div>
                    <div class="item3">
                        <div class="item1">碳 {{item.carbon}}</div>
                        <div class="item2">污染物{{ item.pollute}}</div>
                    </div>
                    
                </li>
                <li v-if="detail.items.length==0">还没有数据...</li>
            </ul>
        </div>
    </div>
</template>
<script>

import echarts from 'echarts/dist/echarts.common.min'
import mpvueEcharts from 'mpvue-echarts'
import {getAllWithReduction,getDetailWithReduction} from '../../utils/api.js'
import request from '../../utils/request.js'
import mptoast from 'mptoast'
import {carbonSpecificType} from '../../utils/constant'
//初始化图标
let  charto=null ;
let  weightCanvasone=null;

const  initCharto=(canvas, width, height) => {

  charto = echarts.init(canvas, null, {
    width: width,
    height: height
  })
   canvas.setChart(charto) 
   weightCanvasone=canvas;  
   return charto
}


export default {
    data(){
        return{ 
            carbonSpecificType:carbonSpecificType,  
            echarts,
            onInit:initCharto,
            reduction:null,//奖励
            draw:null,//图数据
            detail:null, //明细数据
            page:1,
            num:5,
            options:{}, //图标option
            dates:[],//图的横坐标
            carbons:[],//碳的
            pollutes:[],//污染物     
             startX:0,//开始触摸的位置，       
            moveX:0,//滑动时的位置
            disX:0,
            endX:0,
            drawPage:1,
            drawNum:5,
        }
    },
    components:{
        mpvueEcharts,
     mptoast
    },
    methods:{
        filters(item){    
          
           if(parseInt(item.totalCarbon)>=0){
            
               if(item.totalCarbon==0){
                
                   item.totalCarbon="0g"
                  
               }else{
                    let arr=item.totalCarbon.toFixed(2).split('.')
                        let a=arr[0],b=arr[1];
                        let num
                        if(a && a.length>3 && a.length<7){
                            num=(a/1000).toFixed(2) + "kg"
                        }else if(a && a.length>=7){
                        num=(a/1000).toFixed(2) + "t"
                        }else if(a && a>0 &&  a.length<=3){   
                            num=item.totalCarbon.toFixed(2) + 'g'
                        }
                    item.totalCarbon=num
               }
              
           }
           if(parseInt(item.totalPollute)>=0){
           
                if(item.totalPollute==0){
                    item.totalPollute='0g'
                    
                } else{
                        let arr=item.totalPollute.toFixed(2).split('.')
                        let a=arr[0],b=arr[1];
                        let num
                        if(a && a.length>3 && a.length<7){
                            num=(a/1000).toFixed(2) + "kg"
                        }else if(a && a.length>=7){
                        num=(a/1000).toFixed(2) + "t"
                        }else{
                            num=a.toFixed(2) + 'g'
                        }
                     item.totalPollute=num
                } 
              
           }
        }, 
        touchStart(ev){
            ev=ev || event;
            ev.preventDefault();
         
            if(ev.touches.length == 1){
               this.startX = ev.mp.touches[0].clientX
            }
        },
      touchEnd(ev){
          ev = ev || event;
          ev.preventDefault();
        
             this.endX = ev.mp.changedTouches[0].clientX
             this.disX=this.endX-this.startX;
                if(this.disX>0){
                     if(this.drawPage<=1){
                        this.drawPage=1
                        if(this.detail.items.length){
                              wx.showToast({
                                title: '已是最新数据了..',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                       
                    }else{
                       this.drawPage--
                       if(this.detail.items.length){
                         this.getDetailWithReduction(this.drawPage,this.drawNum)    
                       }
                           
                    }                  
                   
                }else{
                     this.drawPage++; 
                       if(this.detail.items.length){
                         this.getDetailWithReduction(this.drawPage,this.drawNum)    
                       }
                }  
         
    },
 async getDetailWithReduction(page,num){
         const that=this;
         let data={
            page:this.drawPage,
            rows:num 
         }
         let items=[];
         let drawData=[];
         let res=await getDetailWithReduction(data);
         if(res && res.success){
              items=res.result.items;
                this.initChart(items)
              
         }else{
             wx.showToast({title:res.error.message})
         }
    },
      getData(){
          const that=this;
          let data={
              page:this.page,
              rows:this.num,

          }
          request.all([getAllWithReduction(),getDetailWithReduction(data)])
          .then(request.spread(function(a,b){
              that.reduction=a.result
              that.detail=b.result    
              that.filters(that.reduction)
             that.initChart(that.detail.items)
          }))
          .catch(function(error){
            that.$mptoast(error,'none',2000)
          })
      },
      initChart(arr){
        
          let x=[];
          let y1=[];
          let y2=[]; 
          let title='2018'
          if(arr.length>0){
            title=arr[arr.length-1].date.substring(0,4)
          }  
          arr.forEach(((item,index)=>{
              x[index]=item.date.substring(5,10).replace(/-/g,'/');
              y1[index]=item.carbon.toFixed(2);
              y2[index]=item.pollute.toFixed(2);   
          })) 
   
        let option = {    
            title:{
             text:`${title}年-${parseInt(title)+1}年`,
             textStyle:{
                 color:'#fff',
                 fontSize:14
             },
             left:8,
           
            },
            legend:{
               left:114, 
                top:1,    
               data:[
              {
                 name:'碳',
                 textStyle:{
                     color:'#5A6147'
                 },

               },{
                   name:'污染物',
                   textStyle:{
                       color:'#EFF304'
                   }
               }
               ]
            },
            grid: {

              show:false
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:x,
                show:true,
                axisLine:{
                            show:false,       
                        },
                axisTick:{
                    show:false
                },
                position:'bottom',
                offset:9
            },
            yAxis: {
                   type: 'value',
                    show:false,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
            },
            series: [{
                type: 'line',
                symbolSize:5,
                symbol:'circle',
                smooth: true,
                name:'碳',
                stack:'总量',
                data:y1,     
                lineStyle: {            
                        normal: {
                            color: '#5A6147',
                            width:1             
                        }  
                },
                itemStyle:{
                   normal:{
                     borderColor:'#5A6147',
                     color:'#ddd',
                     borderWidth:1,            
                     label:{
                         show:true,
                         color:'#5A6147'
                     }
                   }
                }
            },
            {
                type: 'line',
                name:'污染物',
                smooth: true,
                stack:'总量',
                symbol:'circle',
                data:y2,     
                lineStyle: {            
                        normal: {
                            color: '#EFF304',
                            width:1               
                        }  
                },
                itemStyle:{
                   normal:{
                     borderColor:'#EFF304',
                     color:'rgba(239,243,4,.2)',
                     borderWidth:1,            
                     label:{
                         show:true,
                         color:'#EFF304'
                     }
                   }
                }
            }
            ]
       }
       this.options=option;
       if(!this.options || Object.keys(this.options).length==0){
          return;
       }  
     
       charto.setOption(this.options)     
       weightCanvasone.setChart(charto) 
     },
      
    },
    components:{ 
        mpvueEcharts
    },
    mounted() {
        setTimeout(()=> {
                 this.getData()
              },100)     
    },
}
</script>
<style lang="less" scoped>

.wrap{
    width: 100%;
    position: relative;
     height: 182px;
     margin-top: 40px;
    img{
       height:222px ;
        position: absolute;
        width: 100%;
        top: -40px;
    }
}
   .reward_container{

       height: 100%;
       padding: 60rpx 40rpx 0 40rpx;
      .reward_head{
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          align-items: center;
          div{
            font-size: #999;
          }
          .cur{
              font-size: 36rpx;
              font-weight: bold;
              color: #333;
          }
          .sum{
              font-size: 36rpx;
              font-weight: bold;
              color: #333;
          }
      }
      .reward_main{
      
            width: 100%;
          height: 367rpx;
          margin-top: 40rpx;
           .tip{
              position:absolute;
                top:50%;
                left:50%;
                margin-left:-38px;
                margin-top:-17px;

          }
         
      } 
   }
   .reward_list{
     
       h3{
           margin-top: 10px;
           font-size: 30rpx;
            margin-bottom: 20rpx;      
       }
       .item_li{
           display: flex;
           display: -webkit-flex;
           justify-content:space-between;
           align-items: center; 
           margin-bottom: 16rpx;
           .item1{
              margin-bottom: 16rpx;
           }
           .item2{
               color: #999;
           }
           .item3{
               color:#4eb248;
               font-size: 32rpx;
           }
       }
   }
</style>

