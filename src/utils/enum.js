
//注册
const register='/api/services/app/UserService/Register'

/**
 * 发送验证码
 * @param smsType [0,1,2,3,4,5]
 * 0.注册,1.登陆,2.找回密码，3.修改密码,4.修改手机验证旧密码，5.修改手机验证新密码
 */
 const smsSend="/api/services/app/SmsService/SmsSend"

/**
 * 登陆
 * @param loginType [0,1,2]
 * 0.系统账号手机号 1.微信账号 2.支付宝账号
 * @param externalOpenId 第三方登入的 OpenId
 */
 const authenticate='/api/TokenAuth/Authenticate'

//获取动态加密的密钥
const changeSecretKey="/api/services/app/ClientService/ChangeSecretKey"

//录入车牌，更新车型数据
const updateCarBLInfoByMe='/api/services/app/CarService/UpdateCarBLInfoByMe'

//获取当前用户的登入信息
const getCurrentLoginInfo="/api/services/app/UserService/GetCurrentLoginInfo"

//上传本例图片到服务器
const uploadMileageImg='/api/FilesManage/UploadMileageImg'

//上传里程表 包含历程
const createMileage='/api/services/app/MileageService/CreateMileage'

//获取历史里程记录
const getMileageListByFilter=`/api/services/app/MileageService/GetMileageListByFilter`

//获取奖励汇总数据
const getStatistics='/api/services/app/AwardDetailService/GetStatistics'

//获取奖励画图数据
const getDrawData=`/api/services/app/AwardDetailService/GetDrawData`

//返回奖励详情数据
const getDetaildata='/api/services/app/AwardDetailService/GetDetaildata'

//获取碳积分汇总数据
const getAllWithCarbon='/api/services/app/CarbonPointDetailService/GetStatistics'

//获取碳积分画图数据
const getDrawWithCarbon='/api/services/app/CarbonPointDetailService/GetDrawData'

//获取碳积分详情数据
const getDetailwithCarBon='/api/services/app/CarbonPointDetailService/GetDetaildata'

//获取减排碳总数据getDetailWithReduction
const getAllWithReduction='/api/services/app/CarbonReductionDetailService/GetStatistics'

//减排的详细数据
const getDetailWithReduction='/api/services/app/CarbonReductionDetailService/GetDetaildata'

//获取活动二设备押金
const getGameTwoFee=`/api/services/app/GameService/GetGameTwoFee`

//参加活动二
const applyGameTwo=`/api/services/app/GameService/ApplyGameTwo`

//返回下次开始上传时间
const nextLoadPicDay=`/api/services/app/MileageService/NextLoadPicDay`

export default {
    register:register,
    smsSend:smsSend,
    authenticate:authenticate,
    changeSecretKey:changeSecretKey,
    updateCarBLInfoByMe:updateCarBLInfoByMe,
    getCurrentLoginInfo:getCurrentLoginInfo,
    createMileage:createMileage,
    uploadMileageImg:uploadMileageImg,
    getMileageListByFilter:getMileageListByFilter,
    getStatistics:getStatistics,
    getDrawData:getDrawData,
    getDetaildata:getDetaildata,
    getAllWithCarbon:getAllWithCarbon,
    getDrawWithCarbon:getDrawWithCarbon,
    getDetailwithCarBon:getDetailwithCarBon,
    getAllWithReduction:getAllWithReduction,
    getDetailWithReduction:getDetailWithReduction,
    getGameTwoFee:getGameTwoFee,
    applyGameTwo:applyGameTwo,
    nextLoadPicDay:nextLoadPicDay
}
