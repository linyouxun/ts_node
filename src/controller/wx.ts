import * as moment from 'moment';
import { fetchData } from '../utils/request';
import { getSignature, getCardSignature, getCardExtSignature } from '../utils/tool';
import { WX_APPID, WX_SECRET, WX_SERVER } from '../utils/const';
import { wxImage, wxText, wxVoice, wxVideo, wxMusic, wxNews, wxLink } from '../utils/wxMsg';

/**
 * 获取微信开发token
 * @param ctx 
 * @param refresh 
 */
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

/**
 * 获取微信js开发ticket
 * @param ctx 
 * @param refresh 
 */
export const getJSTicket = async function(ctx, type = 'jsapi', refresh = null) {
    let tokenObj = await getToken(ctx);
    let ticketKey = WX_APPID + '_' + type + '_ticket';
    let obj = {} as any;
    try {
        obj = await ctx.redis.getAsync(ticketKey);
        obj = JSON.parse(obj) || {};
    } catch (error) {}
    const time = +new Date();
    // 失效分钟
    const deadMinute = 15;
    // 1:45小时失效
    if (!obj.time || !obj.ticket || (time > obj.time) || !!refresh) {
        const res = await fetchData({
            access_token: tokenObj.token,
            type,
        }, `${WX_SERVER}/cgi-bin/ticket/getticket`, {
            method: 'GET'
        });
        if (!res.errcode || res.errcode === 0) {
            obj = {
                ticket: res.ticket,
                time: time + (res.expires_in - deadMinute * 60) * 1000
            }
            ctx.redis.set(ticketKey, JSON.stringify(obj));
        } else {
            return res;
        }
    }
    obj.refreshTime = moment(obj.time || time).format('YYYY-MM-DD HH:mm:ss');
    obj.deadLine = moment(obj.time + deadMinute * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
    obj.currentTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
    obj.type = type;
    return obj;
}

/**
 * 返回签名
 * @param noncestr 
 * @param jsapiTicket 
 * @param timestamp 
 * @param url 
 */
export const getJSApiTicket = async function(noncestr, jsapiTicket, timestamp, url) {
    return getSignature(noncestr, jsapiTicket, timestamp, url);
}

/**
 * js卡卷签名
 * @param api_ticket 
 * @param appid 
 * @param location_id 
 * @param timestamp 
 * @param nonce_str 
 * @param card_id 
 * @param card_type 
 */
export const getJSCardTicket = async function(api_ticket, appid, location_id, timestamp, nonce_str, card_id, card_type) {
    return getCardSignature(api_ticket, appid, location_id, timestamp, nonce_str, card_id, card_type);
}

/**
 * 添加卡卷
 * @param api_ticket 
 * @param timestamp 
 * @param nonce_str 
 * @param card_id 
 */
export const getJSCardExtTicket = async function(api_ticket, timestamp, nonce_str, card_id) {
    return getCardExtSignature(api_ticket, timestamp, nonce_str, card_id);
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

export const getCardList = async function(token, data) {
    const res = await fetchData(data, `${WX_SERVER}/card/batchget?access_token=${token}`, {
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