
import * as crypto from 'crypto';
import * as xml2js from 'xml2js';
import { WX_TOKEN } from './const';
// <xml><ToUserName><![CDATA[gh_eaf1b44e1400]]></ToUserName>
// <FromUserName><![CDATA[ohbyS525fs_Gc6uDC2yKBnmL81zQ]]></FromUserName>
// <CreateTime>1554170546</CreateTime>
// <MsgType><![CDATA[text]]></MsgType>
// <Content><![CDATA[/::)]]></Content>
// <MsgId>22250370541341016</MsgId>
// </xml>
/**
 * XML解析成JSON
 * @param xml 
 */
export const xmlToJson = async function(xml) {
    return new Promise(function(resolve, reject) {
        var parser = new xml2js.Parser();
        parser.parseString(xml, function (err, result) {
            !!err ? reject(result) : resolve(result)
        });
    })
}


/**
 * json解析成XML
 * @param json 
 */
export const jsonToXml = async function(json) {
    const builder = new xml2js.Builder();
    var xml = builder.buildObject(json);
    return xml;
}

/**
 * 微信校验token
 * @param signature 
 * @param timestamp 
 * @param nonce 
 */
export const checkToken = function(signature, timestamp, nonce) {
    const key = crypto.createHash('sha1').update([WX_TOKEN, timestamp, nonce].sort().join("")).digest('hex').toUpperCase();
    if(key === signature.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}

/**
 * 微信signature获取
 * @param noncestr 随机字符串
 * @param jsapiTicket 有效的jsapi_ticket
 * @param timestamp 时间戳(秒)
 * @param url 当前网页的URL，不包含#及其后面部分
 */
export const getSignature = function(noncestr, jsapiTicket, timestamp, url) {
    const list = [
        {key: 'noncestr', name: noncestr}, 
        {key: 'jsapi_ticket', name: jsapiTicket}, 
        {key: 'timestamp', name: timestamp}, 
        {key: 'url', name: url}
    ].sort(function(item, item2) {
        if (item.key < item2.key) {
            return -1;
        } else if (item.key == item2.key) {
            return 0
        } else {
            return 1
        }
    });
    const arr = [];
    list.forEach(element => {
        arr.push(element['key'] + '=' + element['name']);
    });
    const signature = crypto.createHash('sha1').update(arr.join("&")).digest('hex').toUpperCase();
    return signature;
}

/**
 * 微信卡卷列表
 * @param api_ticket 
 * @param appid 
 * @param location_id 
 * @param timestamp 
 * @param nonce_str 
 * @param card_id 
 * @param card_type 
 */
export const getCardSignature = function(api_ticket, appid, location_id, timestamp, nonce_str, card_id, card_type) {
    const list = [
        { key: '1api_ticket', name: api_ticket },
        { key: '2app_id', name: appid },
        { key: '3location_id', name: location_id },
        { key: '4time_stamp', name: timestamp + '' },
        { key: '5nonce_str', name: nonce_str },
        { key: '6card_id', name: card_id },
        { key: '7card_type', name: card_type },
    ].sort(function(item, item2) {
        if (item.name < item2.name) {
            return -1;
        } else if (item.name == item2.name) {
            return 0
        } else {
            return 1
        }
    });
    const arr = [];
    list.forEach(element => {
        arr.push(element['name'] || '');
    });
    const signature = crypto.createHash('sha1').update(arr.join("")).digest('hex');
    return signature;
}

/**
 * cardExt
 * @param api_ticket 
 * @param timestamp 
 * @param nonce_str 
 * @param card_id 
 */
export const getCardExtSignature = function(api_ticket, timestamp, nonce_str, card_id) {
    const list = [
        { key: '1api_ticket', name: api_ticket },
        { key: '2time_stamp', name: timestamp + '' },
        { key: '3nonce_str', name: nonce_str },
        { key: '4card_id', name: card_id },
    ].sort(function(item, item2) {
        if (item.name < item2.name) {
            return -1;
        } else if (item.name == item2.name) {
            return 0
        } else {
            return 1
        }
    });
    const arr = [];
    list.forEach(element => {
        arr.push(element['name'] || '');
    });
    const signature = crypto.createHash('sha1').update(arr.join("")).digest('hex');
    return signature
}