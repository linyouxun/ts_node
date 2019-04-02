
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