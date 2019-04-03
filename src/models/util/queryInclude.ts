// TODO 2.2 如何缓存重复查询？https://github.com/rfink/sequelize-redis-cache
import UpdateLabel from '../db/UpdateLabel';
import UpdateLog from '../db/UpdateLog';
import { Model, IIncludeOptions } from 'sequelize-typescript';

declare interface IQueryInclude {
  [key: string]: typeof Model | IIncludeOptions
}

const QueryInclude: IQueryInclude = {
  UpdateLabel: { model: UpdateLabel, as: 'labels', attributes: { exclude: ['id'] }, required: true },
  UpdateLog: { model: UpdateLog, as: 'logs', attributes: { exclude: ['id'] }, required: true },
}

export default QueryInclude