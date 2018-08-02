
<script>
import {mapState,mapMutations, mapActions} from 'vuex' 
import {LOGINSTATUS,SAVEUSERINFO} from './store/index'
import { getCurrentLoginInfo} from '../src/utils/api'
export default {
  created () {
     let token=wx.getStorageSync('authToken');
      if(!token){
         this.$store.commit('LOGINSTATUS',false);
         wx.clearStorageSync()
      }else{
          this.$store.commit('LOGINSTATUS',true);                
          this.getUserInfo()                             
      }  
  },
  computed: {
    ...mapState(['isLogin','userInfo'])
  },
  methods: {
    async getUserInfo(){
         let res = await getCurrentLoginInfo()
         if(res && res.success){
              let userInfo=res.result;
                this.$store.commit('SAVEUSERINFO',userInfo)
                this.goToUrl(userInfo)
            
         }else {
            wx.showToast({
              title:res.error.message,
              icon:'none',
              duration: 2000
            })
         }
     },
     goToUrl(info){
        if(info.gameListType==2 || info.gameListType==1){
            setTimeout( () => {
                          wx.reLaunch({
                                  url:'/pages/mydetail/detail'
                               })     
                        },200)
        }
     }
  },
}
</script>

<style>
@import '../src/libs/common.css';
@import '../src/libs/weui.css';

page{  
  font-family:Arial, Helvetica, sans-serif,MicrosoftYaHei; 
  background:#fff; 
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 28rpx;
  box-sizing: content-box;
    
}  
.container {  
  height: 100%;  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: space-between;  
  padding: 200rpx 0;
  box-sizing: border-box;  
}

</style>
