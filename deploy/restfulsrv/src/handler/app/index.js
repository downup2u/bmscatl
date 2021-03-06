const systemconfig = require('../common/systemconfig');
const userlogin = require('../common/userlogin');
const device = require('../common/device.js');
const realtimealarm = require('../common/realtimealarm.js');
const moment = require('moment');
const historytrack = require('../common/historytrack');
const userrelate = require('../common/userrelate');
//司机端
const actiondatahandler = {
  'getsystemconfig':systemconfig.getsystemconfig,
  'loginwithtoken':userlogin.loginwithtoken,
  'logout':userlogin.logout,
  'login':userlogin.loginuser,
  //正式版本中下面的删除
};

const authhandler = {
  'savealarmsettings':userlogin.savealarmsettings,
  'changepwd':userlogin.changepwd,
  'querydevice':device.querydevice,
  'querydevicegroup':device.querydevicegroup,
  // 'queryrealtimealarm':realtimealarm.queryrealtimealarm,
  'querydeviceinfo':device.querydeviceinfo,
  'querydeviceinfo_list':device.querydeviceinfo_list,
  // 'searchbattery':device.searchbattery,
  'queryhistorytrack':historytrack.queryhistorytrack,
  'serverpush_devicegeo_sz':device.serverpush_devicegeo_sz,
  'collectdevice':userrelate.collectdevice,
  // 'searchbatteryalarm':realtimealarm.searchbatteryalarm,
  // 'searchbatteryalarmsingle':realtimealarm.searchbatteryalarmsingle,
  'ui_searchalarm':realtimealarm.ui_searchalarm,
  'uireport_searchalarm':realtimealarm.uireport_searchalarm,
  'uireport_searchalarmdetail':realtimealarm.uireport_searchalarmdetail,
  'uireport_searchposition':historytrack.uireport_searchposition,
  'serverpush_alarm_sz':realtimealarm.serverpush_alarm_sz,
};

module.exports = (socket,actiondata,ctx)=>{
  //console.log("app端获取数据--->" + JSON.stringify(actiondata));
  //console.log("app端获取上下文--->" + JSON.stringify(ctx));
  try{
      if(ctx.usertype !== 'app'){
        //console.log("不是正确的客户端--->" + actiondata.cmd);
        socket.emit('common_err',{errmsg:'无效的app客户端'});
        return;
      }
      if(!!actiondatahandler[actiondata.cmd]){
        actiondatahandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
          //console.log("服务端回复--->" + JSON.stringify(result));
          socket.emit(result.cmd,result.payload);
        });
      }
      else{
        if(!!authhandler[actiondata.cmd]){
          if(!ctx['userid']){
            //console.log("需要登录--->" + actiondata.cmd);
            socket.emit('common_err',{errmsg:'请先重新登录'});
          }
          else{
            authhandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
              if(JSON.stringify(result).length < 10000){
                //console.log("服务端回复--->" + JSON.stringify(result));
              }
              socket.emit(result.cmd,result.payload);
            });
          }
        }
        else{
          //console.log("未找到处理函数--->" + actiondata.cmd);
          socket.emit('common_err',{errmsg:`未找到处理函数${actiondata.cmd}`});
        }
      }
    }
    catch(e){
      //console.log("服务端内部错误--->" + e);
      socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
    }
}
