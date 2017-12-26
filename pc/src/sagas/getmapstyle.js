import get from 'lodash.get';
import store from '../env/store';
import {ui_showmenu} from '../actions';
import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import moment from 'moment';
import lodashmap from 'lodash.map';
import {bridge_deviceinfo_pop,bridge_deviceinfo_popcluster} from './datapiple/bridgedb';
//地图上点图标的样式【图标类型】


//弹出窗口样式
// adcode
// :
// "150782"
// city
// :
// "呼伦贝尔市"
// district
// :
// "牙克石市"
// formattedAddress
// :
//设备

const getCoureName = (course)=> {

    var name = "";
    if(typeof course === 'string'){
      course = parseFloat(course);
    }

    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
    {
        name = "正北";
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        name = "东北";
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        name = "正东";
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        name = "东南";
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        name = "正南";
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        name = "西南";
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        name = "正西";
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        name = "西北";
    }
    else {
        name = "未知.";
    }
    return name;
}

window.clickfn_device =(DeviceId)=>{
  store.dispatch(push(`/deviceinfo/${DeviceId}`));
}

const getpop_device =({deviceitem,kvlist})=>{
  let DeviceId = get(deviceitem,'DeviceId','');
  let contentxt = '';
  lodashmap(kvlist,(v)=>{
    const fieldvalue = get(deviceitem,v.name,'');
    const unit = get(deviceitem,v.unit,'');
    contentxt += `<p class='l'><span class='t'>${v.showname}</span><span class='color_warning'>${fieldvalue}${unit}</span></p>`;
  });

  return {
        infoBody: `<p>车辆编号:${DeviceId}</p>
        ${contentxt}
        <button onclick="clickfn_device(${DeviceId})">查看详情</button>`
    };
}


export const getpopinfowindowstyle = (deviceitem)=>{
  let result = bridge_deviceinfo_pop(deviceitem);
  return getpop_device(result);
}


export const getlistpopinfowindowstyle = (deviceitemlist)=>{
    let info = '<div class="getmapstylepage">';
    let result = bridge_deviceinfo_popcluster(deviceitemlist);
    const {kvlist} = result;
    lodashmap(result.deviceitemlist,(deviceitem)=>{

        let DeviceId = get(deviceitem,'DeviceId','');

        let contentxt = '';
        lodashmap(kvlist,(v)=>{
          const fieldvalue = get(deviceitem,v.name,'');
          const unit = get(deviceitem,v.unit,'');
          contentxt += `${v.showname}${fieldvalue}${unit}|`;
        });

        info +=  `<p onclick="clickfn_device(${deviceitem.DeviceId})">
        <i class="t">车辆ID:${DeviceId}</i>
        <i>${contentxt}</i></p>`;
    });
    info += '</div>'
    return {
        infoBody: `${info}`
    };
}
