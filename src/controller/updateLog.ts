import { UpdateLog, UpdateLabel } from '../models/';
import queryInclude from '../models/util/queryInclude';
import Pagination from '../utils/pagination';
import { Sequelize } from 'sequelize-typescript';
const Op = Sequelize.Op;
export const updateAdd = async function(params) {
    const log = await UpdateLog.create({
        createTime: +new Date(),
        updateTime: +new Date(),
        html: params.html || '',
        userId: params.userId,
        userName: params.userName,
        accessory: params.accessory,
        count: 0,
        countBase: params.countBase || 0
    })
    const labels2 = await UpdateLabel.findAll({
        where: {
            id: {
                [Op.in]: params.labels || []
            }
        }
    });
    await log.$set('labels', labels2);
    return Object.assign(params, {
        id: log.id
    });
}

export const updateList = async function(params) {
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
    let total = await UpdateLog.count(options);
    let pagination = new Pagination(total, params.cursor, params.limit);
    const list = await UpdateLog.findAll(Object.assign(
        options, {
            attributes: ['id', 'createTime', 'updateTime', 'html', 'userName', 'userId', 'accessory', 'count', 'countBase'],
            limit: params.limit,
            offset: params.limit * (params.cursor - 1),
            include: [queryInclude.UpdateLabel]
        }))
    return {
        list,
        pagination
    };
}

