import map from "lodash.map";

import Car_online from "../img/1.png";
import Car_outline from "../img/3.png";
import Point_list_img from "../img/13.png";
import store from '../env/store';


const createInfoWindow_popinfo =(data)=> {
    // console.log(map);
    // console.log(data);
    //iscollection


    let title = '车辆编号:'+data.DeviceId;

    let contenthtml = "<ul>";
    map(data.fields, (v,i)=>{
        return contenthtml = `${contenthtml}<li key=${i} class='show_${v.systemflag}'><span class='t'>${v.showname}</span><span>${v.fieldvalue}</span></li>`;
    })

    contenthtml =
        `
        ${contenthtml}
        <div class='pop_info_btn'>
            <div class='lnk'>
                <span onclick="clickfn_historyplay(${data.DeviceId})">历史轨迹回放</span>
                <span onclick="clickfn_device(${data.DeviceId})">查看详情</span>
                <span onclick="clickfn_showhistory(${data.DeviceId})">历史报警信息</span>
            </div>
        </div>
        `;

    let content = [];


    content.push(contenthtml);
    let info = document.createElement("div");
    info.className = "Window_pop_info";

    //可以通过下面的方式修改自定义窗体的宽高
    info.style.width = "800px";
    // 定义顶部标题
    let top = document.createElement("div");
    let titleD = document.createElement("div");
    // let closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;

    top.appendChild(titleD);
    // top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    // var bottom = document.createElement("div");
    // bottom.className = "info-bottom";
    // bottom.style.position = 'relative';
    // bottom.style.top = '0px';
    // bottom.style.margin = '0 auto';
    // var sharp = document.createElement("img");
    // sharp.src = "https://webapi.amap.com/images/sharp.png";
    // bottom.appendChild(sharp);
    // info.appendChild(bottom);

    return {
        isCustom: true,  //使用自定义窗体
        content: info,
        // offset: new AMap.Pixel(16, -50)//-113, -140
    }
}

//构建自定义信息窗体
const createInfoWindow_poplistinfo =(data)=> {
    // console.log(map);
    console.log(data);
    //iscollection
    let title = "<span class='p'></span><span>聚合点车辆</span>";
    let Car_img = Car_online || Car_outline;

    let contenthtml = "<ul>";
    map(data, (v,i)=>{
        let dinfo = `
            <span>${v.fields[0].showname}:</span><span>${v.fields[0].fieldvalue}</span>
            <span>${v.fields[1].showname}:</span><span>${v.fields[1].fieldvalue}</span>`;

        return contenthtml = `${contenthtml}
            <li key=${i} onclick="clickfn_device(${v.DeviceId})">
                <div class='l'><img src=${Car_img} /></div>
                <div class='r'>
                    <p class="t"><span>车辆ID:</span><span>${v.DeviceId}</span></p>
                    <p><span>${dinfo}</span></p>
                </div>
                <img src="${Point_list_img}" />
            </li>`;
    })

    let content = [];
    console.log(contenthtml);

    content.push(contenthtml);
    let info = document.createElement("div");
    info.className = "juhe_pop_info";

    //可以通过下面的方式修改自定义窗体的宽高
    info.style.width = "400px";
    // 定义顶部标题
    let top = document.createElement("div");
    let titleD = document.createElement("div");
    // let closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;

    top.appendChild(titleD);
    // top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    // var bottom = document.createElement("div");
    // bottom.className = "info-bottom";
    // bottom.style.position = 'relative';
    // bottom.style.top = '0px';
    // bottom.style.margin = '0 auto';
    // var sharp = document.createElement("img");
    // sharp.src = "https://webapi.amap.com/images/sharp.png";
    // bottom.appendChild(sharp);
    // info.appendChild(bottom);

    return {
        isCustom: true,  //使用自定义窗体
        content: info,
        // offset: new AMap.Pixel(16, -50)//-113, -140
    }
}

export {createInfoWindow_popinfo,createInfoWindow_poplistinfo};