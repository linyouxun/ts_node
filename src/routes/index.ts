import * as Router from 'koa-router';
import { success, failed } from './base';
import { fetchData } from '../utils/request';
import { GAODE_KEY } from '../utils/const';
import Statistics from '../models/Statistics';
const router = new Router();

router.get('/page/count', async (ctx, next) => {
    const { userId, userName, pageUrl, prePageUrl, accessTime, durationOfTime } = ctx.query;
    return await pageCount(ctx, next, userId, userName, pageUrl, prePageUrl, accessTime, durationOfTime);
});

router.post('/page/count', async (ctx, next) => {
    const { userId, userName, pageUrl, prePageUrl, accessTime, durationOfTime } = ctx.request.body;
    return await pageCount(ctx, next, userId, userName, pageUrl, prePageUrl, accessTime, durationOfTime);
});

/**
 * 页面访问统计
 */
async function pageCount(ctx, next, userId, userName, pageUrl, prePageUrl, accessTime, durationOfTime) {
    if (!userId) {
        return failed(ctx, next, '用户ID不能为空')
    }
    if (!userName) {
        return failed(ctx, next, '用户名称不能为空')
    }
    if (!pageUrl) {
        return failed(ctx, next, '当前访问页面不能为空')
    }
    let province = '未知';
    let city = '未知';
    let adcode = '未知';
    // 设置城市信息
    const res = await fetchData({key: GAODE_KEY, ip: ctx.ipv4 }, 'https://restapi.amap.com/v3/ip', {
      method: 'GET'
    });
    if (res.info === 'OK') {
        province = res.province;
        city = res.city;
        adcode = res.adcode;
    }
    console.log({
        userId,
        userName,
        pageUrl,
        prePageUrl,
        ip: ctx.ipv4,
        province,
        city,
        adcode,
        accessTime,
        durationOfTime
    })

    const st = await Statistics.create({
        userId,
        userName,
        pageUrl,
        prePageUrl,
        ip: ctx.ipv4,
        province,
        city,
        adcode,
        accessTime,
        durationOfTime
    })
    if (!!st.id) {
        return success(ctx, next, st);
    } else {
        return failed(ctx, next, st);
    }
}

export default router;
  