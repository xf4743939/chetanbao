// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import { GETPROVINCE,GETCITY,LOGINSTATUS,SAVEUSERINFO,
  SAVECARNO,SAVESCHEM,SAVEADDRESS,SAVECHOICETYPE,UPDATETYPE} from './mutation-type'
import {getCurrentLoginInfo} from '../../src/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
     type:1, //活动一 活动二
     city:'粤B',
     isLogin:false,
     userInfo:null,
     carNo:'', //车牌号
     schem:0, //减排计算方式 按里程 按停驶 0.还没有参加活动 1.按里程计算 2.按停驶天数
     fee:0,//押金金额
     gameFeePayType:0, //押金支付方式 0.不用支付 1.微信支付 2.支付宝支付
     address:'', //设备邮寄地址
     gameFeeChoiceType:0 //押金选择方案 1.自费 2.抵押贷 3.商家活动
  },
  mutations: {   
     [GETCITY](state,city){
       state.city=city
     },
     [LOGINSTATUS](state,status){
        state.isLogin=status
     },
     [SAVEUSERINFO](state,info){  
   
       if(!state.isLogin){
         return
       }
     
       state.userInfo=info
     },
     [SAVECARNO](state,carNo){
        state.carNo=carNo
     },
     [SAVESCHEM](state,index){
       state.schem=index
     },
     [SAVEADDRESS](state,address){
       state.address=address
     },
     [SAVECHOICETYPE](state,payload){
       state.gameFeeChoiceType=payload.type
       state.fee=payload.fee
     },
     [UPDATETYPE](state,type){
       state.type=type
     }
  },
  actions:{
     async getCurrentLoginInfo({commit}){
     
        let res = await getCurrentLoginInfo();
        commit(SAVEUSERINFO,res.result) 
     }
  }
})

export default store
