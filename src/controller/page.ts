import * as moment from 'moment';
import { success, failed } from '../routes/base';
import { fetchData } from '../utils/request';
import { GAODE_KEY } from '../utils/const';
import Crypto from '../utils/encrypt';
import * as parser from 'ua-parser-js';
import Statistics from '../models/db/Statistics';
import Pagination from '../utils/pagination';
import { Sequelize } from 'sequelize-typescript';
const Op = Sequelize.Op;


export async function pageList(ctx, next, params) {
    let where = {};
    if(!!params.times && params.times.length > 1) {
        where = Object.assign(where, {
            createTime: {
                '$gte': +params.times[0],
                '$lt': +params.times[1]
            }
        })
    }
    if(!!params.viewUrl) {
        where = Object.assign(where, {
            viewUrl: {
                '$like': `%${params.viewUrl}%`
            }
        })
    }
    if(!!params.preViewUrl) {
        where = Object.assign(where, {
            preViewUrl: {
                '$like': `%${params.preViewUrl}%`
            }
        })
    }
    if(!!params.city) {
        where = Object.assign(where, {
            city: params.city
        })
    }
    if(!!params.province) {
        where = Object.assign(where, {
            province: params.province
        })
    }
    if(!!params.id) {
        where = Object.assign(where, {
            id: params.id
        })
    }
    if(!!params.userName) {
        where = Object.assign(where, {
            userName: {
                '$like': `%${params.userName}%`
            }
        })
    }
    let options = { where: {
            [Op.and]: where
        }
    };
    let total = await Statistics.count(options);
    let pagination = new Pagination(total, params.cursor, params.limit);
    const list = await Statistics.findAll(Object.assign(
        options, {
            attributes: ['id', 'userId', 'userName', 'viewUrl', 'preViewUrl', 'city', 'province', 'createTime', 'lastTime'],
            limit: params.limit,
            offset: params.limit * (params.cursor - 1)
        }))
    return success(ctx, next, {
        list,
        pagination
    });
}

/**
 * 页面访问统计
 */
export async function pageCount(ctx, next, userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code) {
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
