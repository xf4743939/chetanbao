
//地址
export const baseUrl="https://www.chetanlian.com";

export const gameListType={
   no:0, //没有活动
   one:1, //活动一
   two:2, //活动二
}

export const wifiStatus={
    No:0, //无设备
    NoActivate:1, //有设备等待激活
    Activate_Normal:2, //已激活并正常
    Activate_Exception:3 //已激活但异常
}

//里程表数据状态
export const theStatus={
   start:1, //开始状态--等待下次上传完成End状态
   end:2,//结束状态
   finish:3, //数据结算完成一次有效数据
   invalid:4 //无效状态 
}

//碳的类型
export const carbonSpecificType={
    unKnown:0, //未知
    awardMoney_regist:1,//奖励金--注册
    awardMoney_sign:2, //签到
    awardMoney_photograph:3, //拍照
    awardMoney_mileage:4, //里程
    awardMoney_startStop:5,//停驶
    carbonPosint_regist:21, //谈积分--注册
    carbonPosint_sign:22, //签到
    carbonPosint_photograph:23,//拍照
    carbonPosint_mileage:24,//里程
    carbonPosint_startStop:25, //停驶
    carbonRedction_regist:41, //碳减排--注册（无用）
    carbonRedction_sign:42,//签到（无用）
    carbonRedction_photograph:43,//拍照
    carbonRedction_mileage:44,//里程
    carbonRedction_startStop:45, //停驶
}
