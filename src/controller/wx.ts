import * as moment from 'moment';
import { fetchData } from '../utils/request';
import { WX_APPID, WX_SECRET, WX_SERVER } from '../utils/const';
import { wxImage, wxText, wxVoice, wxVideo, wxMusic, wxNews, wxLink } from '../utils/wxMsg';

export const getToken = async function(ctx, refresh = null) {
    let obj = {} as any;
    try {
        obj = await ctx.redis.getAsync(WX_APPID);
        obj = JSON.parse(obj) || {};
    } catch (error) {}
    const time = +new Date();
    // 失效分钟
    const deadMinute = 15;
    // 1:45小时失效
    if (!obj.time || !obj.token || (time > obj.time) || !!refresh) {
        const res = await fetchData({
            grant_type: 'client_credential',
            appid: WX_APPID,
            secret: WX_SECRET
        }, `${WX_SERVER}/cgi-bin/token`, {
            method: 'GET'
        });
        if (!res.errcode || res.errcode === 0) {
            obj = {
                token: res.access_token,
                time: time + (res.expires_in - deadMinute * 60) * 1000
            }
            ctx.redis.set(WX_APPID, JSON.stringify(obj));
        } else {
            return res;
        }
    }
    obj.refreshTime = moment(obj.time || time).format('YYYY-MM-DD HH:mm:ss');
    obj.deadLine = moment(obj.time + deadMinute * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
    obj.currentTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
    return obj;
}

export const getTokenPost = function(ctx) {
    const json = ctx.xmlBody.xml;
    let xml = '';
    switch(json.MsgType.join('')) {
        case 'text': {
            xml = wxText(Object.assign(json))
            // xml = wxNews(Object.assign(json))
            break;
        }
        case 'image': {
            xml = wxImage(Object.assign(json))
            break;
        }
        case 'news': {
            xml = wxNews(Object.assign(json))
            break;
        }
        case 'voice': {
            xml = wxVoice(Object.assign(json))
            break;
        }
        case 'video': {
            xml = wxVideo(Object.assign(json))
            // xml = wxText(Object.assign(json, {MsgType: 'text', Content: '不能识别您发送的信息'}))
            break;
        }
        case 'music': {
            xml = wxMusic(Object.assign(json))
            break;
        }
        case 'video': {
            xml = wxVideo(Object.assign(json))
            break;
        }
        case 'link': {
            xml = wxLink(Object.assign(json));
            break;
        }
        case 'event': {
            xml = eventSwitch(Object.assign(json));
            break;
        }
        default: {
            xml = wxText(Object.assign(json, {MsgType: 'text', Content: '不能识别您发送的信息'}))
        }
    }
    return xml;
}

const eventSwitch = function(json): string {
    switch(json.Event.join('')) {
        case 'subscribe': {
            return wxText(Object.assign(json, {MsgType: 'text', Content: '公众号欢迎你'}))
        }
        case 'unsubscribe': {
            return wxText(Object.assign(json, {MsgType: 'text', Content: '你离开了公众号'}))
        }
        // 模板发送成功
        case 'TEMPLATESENDJOBFINISH': {
            if(json.Status.join('') === 'success') {
                console.log('模板消息发送成功');
            } else if(json.Status.join('') === 'failed: system failed') {
                console.log('模板消息发送失败，未知原因');
            } else {
                console.log('模板消息发送成功，用户拒收');
            }
        }
        // case 'subscribe': {
        //     break;
        // }
        default: {
            break;
        }
    }
    return '';
}

export const getCode = async function(code) {
    const res = await fetchData({
        appid: WX_APPID,
        secret: WX_SECRET,
        code,
        grant_type: 'authorization_code'
    }, `${WX_SERVER}/sns/oauth2/access_token`, {
        method: 'GET'
    });
    return res;
}

export const sendTemplate = async function(ctx, data) {
    const redisToken = await getToken(ctx);
    const res = await fetchData(data, `${WX_SERVER}/cgi-bin/message/template/send?access_token=${redisToken.token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res;
}

// /**
//  * 获取用户信息
//  * @param accessToken 
//  * @param openid 
//  * @param lang 
//  */

// export const getWxUserInfo = async function(accessToken, openid, lang = 'zh_CN') {
//     let res = await fetchData({
//         access_token: accessToken,
//         openid: openid,
//         lang: lang
//     }, `${WX_SERVER}/sns/userinfo`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (!!res.errcode) {
//         accessToken = '';
//     }
//     return {
//         access_token: accessToken,
//         res
//     };
// }

/**
 * 检验
 * @param accessToken 
 * @param openid 
 * @param lang 
 */

export const getWxUserInfo = async function(accessToken, openid, lang = 'zh_CN') {
    let res = await fetchData({
        access_token: accessToken,
        openid: openid,
        lang: lang
    }, `${WX_SERVER}/sns/userinfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!!res.errcode) {
        accessToken = '';
    }
    return {
        access_token: accessToken,
        res
    };
}