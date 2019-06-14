// import * as moment from 'moment';
import { success, failed } from '../routes/base';
import { fetchData } from '../utils/request';
import { GAODE_KEY } from '../utils/const';
// import Crypto from '../utils/encrypt';
// import * as parser from 'ua-parser-js';
import Statistics from '../models/db/Statistics';
import ConfigHtml from '../models/db/ConfigHtml';
import Pagination from '../utils/pagination';
import { Sequelize } from 'sequelize-typescript';
import queryInclude from '../models/util/queryInclude';
const Op = Sequelize.Op;


export async function statisticsList(ctx, next, params, field, fieldmerge) {
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
    if(!!params.configId) {
        where = Object.assign(where, {
            configId: {
                '$like': `%${params.configId}%`
            }
        })
    }
    let options = { where: {
            [Op.and]: where
        }
    };
    let attributes = ['id', 'configId', 'viewUrl', 'preViewUrl', 'city', 'province', 'createTime', 'lastTime', 'visitor'];
    if (field instanceof Array && field.length > 0) {
        attributes = field;
    } else if (fieldmerge instanceof Array && fieldmerge.length > 0) {
        attributes = attributes.concat(fieldmerge);
    }
    let total = await Statistics.count(options);
    let pagination = new Pagination(total, params.cursor, params.limit);
    const list = await Statistics.findAll(Object.assign(
        options, {
            attributes,
            limit: params.limit,
            offset: params.limit * (params.cursor - 1),
            include: queryInclude.ConfigHtml,
            order: [
                ['createTime', 'DESC'],
            ],
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
    let province : any = '未知';
    let city : any = '未知';
    let county: any = '未知';
    let provinceCode : any = '未知';
    let cityCode : any = '未知';
    let adcode: any = '未知';
    // 设置城市信息
    const res = await fetchData({key: GAODE_KEY, ip}, 'https://restapi.amap.com/v4/ip', {
      method: 'GET'
    });
    // const res: any = {};
    if (res.errcode == 0) {
        province = res.data.pcd.province;
        city = res.data.pcd.city;
        county = res.data.pcd.county;
        provinceCode = res.data.pcd.provinceCode;
        cityCode = res.data.pcd.cityCode;
        adcode = res.data.pcd.countyCode;
    }
    try {
        await Statistics.create({
            configId: +configId,
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
            county,
            provinceCode,
            cityCode
        });
    } catch (error) {
        console.log('count.png', error, configId, userAgent, screen, width, height, referrer, url, vh, vc, vt, o, visitor, ip)
    }
}
