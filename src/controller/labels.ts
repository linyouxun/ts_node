// import * as moment from 'moment';
import { success } from '../routes/base';
import UpdateLabel from '../models/db/UpdateLabel';
import Pagination from '../utils/pagination';
import { Sequelize } from 'sequelize-typescript';
const Op = Sequelize.Op;

export async function publishStatus(ctx, next, params) {
    const [total, list] = await Promise.all([UpdateLabel.count({}), UpdateLabel.findAll(Object.assign(
    {
        attributes: ['id', 'labelName'],
        limit: params.limit,
        offset: params.limit * (params.cursor - 1)
    }))])
    let pagination = new Pagination(total, params.cursor, params.limit);
    console.log(list);
    return success(ctx, next, {
        list,
        pagination
    });
}