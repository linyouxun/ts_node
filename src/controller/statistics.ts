// import * as moment from 'moment';
import { success, failed } from '../routes/base';
import { fetchData } from '../utils/request';
import { GAODE_KEY } from '../utils/const';
// import Crypto from '../utils/encrypt';
// import * as parser from 'ua-parser-js';
import Statistics from '../models/db/Statistics';
import Pagination from '../utils/pagination';
import { Sequelize } from 'sequelize-typescript';
const Op = Sequelize.Op;


export async function statisticsList(ctx, next, params) {
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
            attributes: ['id', 'configId', 'viewUrl', 'preViewUrl', 'city', 'province', 'createTime', 'lastTime'],
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
export async function statisticsCount(configId, userAgent, screen, width, height, referrer, url, vh, vc, vt, o, visitor, pvl, ip) {
    let province = '未知';
    let city = '未知';
    let adcode = '未知';
    // 设置城市信息
    const res = await fetchData({key: GAODE_KEY, ip}, 'https://restapi.amap.com/v3/ip', {
      method: 'GET'
    });
    // const res: any = {};
    if (res.info === 'OK') {
        province = !!res.province ? res.province.join('') : '无法识别';
        city = !!res.city ? res.city.join('') : '无法识别';
        adcode = !!res.adcode ? res.adcode.join('') : '无法识别';
    }
    try {
        await Statistics.create({
            configId,
            viewUrl: url,
            createTime: +new Date(),
            visitHtmlCount: vh,
            visitCount: vc,
            visitCountTotal: vt,
            visitor: visitor,
            deviceInfo: userAgent,
            screen: screen,
            referrer: referrer,
            ip: ip,
            province,
            city,
            adcode,
            preViewUrl: pvl,
        });
    } catch (error) {
        console.log('count.png', error, configId, userAgent, screen, width, height, referrer, url, vh, vc, vt, o, visitor, ip)
    }
}
