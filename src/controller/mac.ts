
// import * as moment from 'moment';
import { success } from '../routes/base';
import MacData from '../models/db/MacData';
import Pagination from '../utils/pagination';
import { Sequelize } from 'sequelize-typescript';
import { sequelize } from '../sequelizeConfig';
const Op = Sequelize.Op;


export async function macList(ctx, next, params) {
    let where = {};
    let options = { where: {
            [Op.and]: where
        }
    };
    const sqlStr = `
        SELECT m.id as id, mac, create_time AS createTime, capture_time AS captureTime, shop_id AS shopId from mac_data as m 
        right join (
            select id from mac_data order by id limit ${params.limit * (params.cursor - 1)}, ${params.limit}
        ) as t 
        on m.id = t.id;
    `;
    const [total, list] = await Promise.all([MacData.count(options), sequelize.query(sqlStr)])
    let pagination = new Pagination(total, params.cursor, params.limit);
    return success(ctx, next, {
        list,
        pagination
    });
}
export async function macList2(ctx, next, params) {
    let where = {};
    let options = { where: {
            [Op.and]: where
        }
    };
    const [total, list] = await Promise.all([MacData.count(options), MacData.findAll(Object.assign(
    options, {
        attributes: ['id', 'mac', 'createTime', 'captureTime', 'shopId'],
        limit: params.limit,
        offset: params.limit * (params.cursor - 1)
    }))])
    let pagination = new Pagination(total, params.cursor, params.limit);
    return success(ctx, next, {
        list,
        pagination
    });
}
export async function macList3(ctx, next, params) {
    let where = {};
    // if(!!params.times && params.times.length > 1) {
        // where = Object.assign(where, {
            // createTime: {
                // '$gte': +params.times[0],
                // '$lt': +params.times[1]
            // }
        // })
    // }
    let options = { where: {
            [Op.and]: where
        }
    };
    const total = await MacData.count(options);
    let pagination = new Pagination(total, params.cursor, params.limit);
    const list = await MacData.findAll(Object.assign(
    options, {
        attributes: ['id', 'mac', 'createTime', 'captureTime', 'shopId'],
        limit: params.limit,
        offset: params.limit * (params.cursor - 1)
    }))
    return success(ctx, next, {
        list,
        pagination
    });
}
