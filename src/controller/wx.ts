import * as moment from 'moment';
import { success, failed } from '../routes/base';
import { fetchData } from '../utils/request';
import { WX_APPID, WX_SECRET, WX_SERVER } from '../utils/const';

export const getToken = async function(ctx, next) {
    const { refresh } = ctx.query;
    let obj = {} as any;
    try {
        obj = await ctx.redis.getAsync('token');
        obj = JSON.parse(obj);
    } catch (error) {}
    const time = +new Date();
    // 失效分钟
    const deadMinute = 119;
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
            ctx.redis.set('token', JSON.stringify(obj));
        } else {
            return failed(ctx, next, res)
        }
    }
    obj.refreshTime = moment(obj.time || time).format('YYYY-MM-DD HH:mm:ss');
    obj.deadLine = moment(obj.time + deadMinute * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
    obj.currentTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
    return success(ctx, next, obj);
}