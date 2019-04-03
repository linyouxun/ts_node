import { sequelize } from '../sequelizeConfig';
import { UpdateLabel } from '../models/index';
import { labels } from '../models/data';
(async () => {
    await sequelize.sync({force: true});   
    // 默认标签
    UpdateLabel.bulkCreate(labels);
})()