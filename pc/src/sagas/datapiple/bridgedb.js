import get from 'lodash.get';

export const bridge_deviceinfo = (deviceinfo)=>{
  const {LastRealtimeAlarm,...rest} = deviceinfo;
  let deviceinfonew = {...rest};


    // let zdl = get(deviceitem,'总电流(A)',0);
    // let zdy = get(deviceitem,'总电压(V)',374);
    // let soc = get(deviceitem,'SOC(%)',50);
    // let cs = get(deviceitem,'车速(km/h)',60);
    // let zlc = get(deviceitem,'里程(km)',100000);
    // let jxzk = get(deviceitem,'电池绝缘电阻(KΩ)',9000);
    // let zgwd = get(deviceitem,'最高温度值(℃)',30);
    // let bjxx = get(deviceitem,'报警信息','无');
  deviceinfonew['总电流(A)'] = get(LastRealtimeAlarm,'AL_Over_U_HVS',0);
  deviceinfonew['总电压(V)'] = get(LastRealtimeAlarm,'AL_Over_I_Chg',0);
  deviceinfonew['SOC(%)'] = get(LastRealtimeAlarm,'AL_Over_U_HVS',0);
  deviceinfonew['车速(km/h)'] = get(LastRealtimeAlarm,'AL_Over_U_HVS',0);
  deviceinfonew['里程(km)'] = get(LastRealtimeAlarm,'AL_Over_U_HVS',0);
  deviceinfonew['最高温度值(℃)'] = get(LastRealtimeAlarm,'AL_Over_U_HVS',0);
  deviceinfonew['电池绝缘电阻(KΩ)'] = get(LastRealtimeAlarm,'AL_Over_U_HVS',0);

  return deviceinfonew;
}