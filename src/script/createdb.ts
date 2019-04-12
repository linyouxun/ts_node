import { sequelize } from '../sequelizeConfig';
import { UpdateLabel , Shi} from '../models/index';
import { labels, shi, shi2, shi3, shi4, shi5, shi6, shi7, ci, ci2, ci3, ci4, ci5, ci6, qu, qu2, qu3, qu4, qu5, qu6, qu7 } from '../models/data';
(async () => {
    await sequelize.sync({force: true});   
    // 默认标签
    UpdateLabel.bulkCreate(labels);
    Shi.bulkCreate(shi);
    Shi.bulkCreate(shi2)
    Shi.bulkCreate(shi3)
    Shi.bulkCreate(shi4)
    Shi.bulkCreate(shi5)
    Shi.bulkCreate(shi6)
    Shi.bulkCreate(shi7)
    Shi.bulkCreate(ci);
    Shi.bulkCreate(ci2)
    Shi.bulkCreate(ci3)
    Shi.bulkCreate(ci4)
    Shi.bulkCreate(ci5)
    Shi.bulkCreate(ci6)
    Shi.bulkCreate(qu);
    Shi.bulkCreate(qu2)
    Shi.bulkCreate(qu3)
    Shi.bulkCreate(qu4)
    Shi.bulkCreate(qu5)
    Shi.bulkCreate(qu6)
    Shi.bulkCreate(qu7)
})()