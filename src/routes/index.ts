import * as Router from 'koa-router';
import * as moment from 'moment';
import { success, failed } from './base';
import { fetchData } from '../utils/request';
import { GAODE_KEY } from '../utils/const';
import Crypto from '../utils/encrypt';
import * as parser from 'ua-parser-js';
import Statistics from '../models/Statistics';
const router = new Router();

router.get('/page/count', async (ctx, next) => {
    const { userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code } = ctx.query;
    return await pageCount(ctx, next, userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code);
});

router.post('/page/count', async (ctx, next) => {
    const { userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code } = ctx.request.body;
    return await pageCount(ctx, next, userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code);
});

/**
 * 页面访问统计
 */
async function pageCount(ctx, next, userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code) {
    // ctx.set('Content-Type', 'application/json');
    if (!userId) {
        return failed(ctx, next, '用户ID不能为空')
    }
    if (!userName) {
        return failed(ctx, next, '用户名称不能为空')
    }
    if (!viewUrl) {
        return failed(ctx, next, '当前访问页面不能为空')
    }
    const ua = parser(ctx.req.headers['user-agent']);
    if (!code || code === 'none') {
        if (ua.browser.name) {
          code = ua.browser.name + ' ' + moment().format('YYYYMMDDHHmmss') + ' ' + screen;
        }
        code = Crypto.encrypt(code);
    } else {
        try {
            const tmpCode = Crypto.decrypt(code).split(' ');
            if (!!ua.browser.name && ua.browser.name !== tmpCode[0]) {
                return failed(ctx, next, 'code 1.参数错误');
            }
            if (!!tmpCode[1] && +moment(tmpCode[1], 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss') < +new Date() ) {
                return failed(ctx, next, 'code 2.参数错误');
            }
        } catch (error) {
            return failed(ctx, next, 'code 参数错误');
        }
    } 
    let province = '未知';
    let city = '未知';
    let adcode = '未知';
    // 设置城市信息
    const res = await fetchData({key: GAODE_KEY, ip: ctx.ipv4 }, 'https://restapi.amap.com/v3/ip', {
      method: 'GET'
    });
    // const res: any = {};
    if (res.info === 'OK') {
        province = res.province;
        city = res.city;
        adcode = res.adcode;
    }
    try {
        const st = await Statistics.create({
            userId,
            userName,
            viewUrl,
            preViewUrl,
            ip: ctx.ipv4,
            province,
            city,
            adcode,
            createTime,
            lastTime,
            deviceInfo: ctx.req.headers['user-agent'] || '未知',
            screen,
            code
        })
        if (!!st.id) {
            return success(ctx, next, code);
        } else {
            return failed(ctx, next, st);
        }
    } catch (error) {
        const message = `${error.message.split('\'').filter((item, index) => {return index % 2}).join(',')} 参数错误`
        return failed(ctx, next, message); 
    }
}

export default router;
  