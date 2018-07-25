//vue init F-loat/mpvue-quickstart my-project(初始化项目)
import request from'./request'
import enums from './enum'


//注册
export const reqister= (data) => request.post(enums.register,data)

/**
 * 发送验证码
 * @param smsType[0,1,2,3,4,5]
 * 0.注册,1.登陆,2.找回密码，3.修改密码,4.修改手机验证旧密码，5.修改手机验证新密码
 */
export const smsSend= (data) => request.post(enums.smsSend,data)

/**
 * 登陆
 * @param loginType [0,1,2，10]
 * 0.系统账号手机号 1.微信账号 2.支付宝账号,10 web登录 手机号
 * @param externalOpenId 第三方登入的 OpenId
 */
export const authenticate = (data) => request.post(enums.authenticate,data)

//获取动态加密密钥
export const changeSecretKey= () => request.post(enums.changeSecretKey)

//录入车牌，更新车型数据
export const updateCarBLInfoByMe= (data) => request.put(enums.updateCarBLInfoByMe,data)

//获取当前用户登录信息
export const getCurrentLoginInfo= ()=> request.get(enums.getCurrentLoginInfo)

//上传里程表
export const createMileage= (data) => request.post(enums.createMileage,data)

//获取历史里程记录
export const getMileageListByFilter= (data) => request.get(enums.getMileageListByFilter,data)

//获取奖励汇总数据 
export const getStatistics= () => request.get(enums.getStatistics)

//获取奖励画图数据
export const getDrawData= (data) => request.get(enums.getDrawData,data)

//返回奖励详情数据
export const getDetaildata= (data) => request.get(enums.getDetaildata,data)

//获取碳积分汇总数据
export const getAllWithCarbon= () => request.get(enums.getAllWithCarbon)

//获取碳积分画图数据
export const getDrawWithCarbon=(data) => request.get(enums.getDrawWithCarbon,data)

//获取碳积分详情数据
export const getDetailwithCarBon=(data) => request.get(enums.getDetailwithCarBon,data)

//获取减排碳总数据
export const getAllWithReduction=() => request.get(enums.getAllWithReduction)

//减排的详细数据
export const getDetailWithReduction= (data) => request.get(enums.getDetailWithReduction,data)

//获取活动二设备押金
export const getGameTwoFee= () => request.get(enums.getGameTwoFee)

//参加活动二
export const applyGameTwo= (data) => request.post(enums.applyGameTwo,data)

//返回下一次开始上传的时间
export const nextLoadPicDay= () => request.post(enums.nextLoadPicDay)