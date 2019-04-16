import { sequelize } from '../sequelizeConfig';
import { UpdateLabel , Shi} from '../models/index';
import { labels, shi, shi2, shi3, shi4, shi5, shi6, shi7, ci, ci2, ci3, ci4, ci5, ci6, qu, qu2, qu3, qu4, qu5, qu6, qu7 } from '../models/data/data';
import { sushi1, sushi10, sushi11, sushi12, sushi13, sushi14, sushi15, sushi16, sushi17, sushi2, sushi3, sushi4, sushi5, sushi6, sushi7, sushi8, sushi9 } from '../models/data/sushi';
(async () => {
    await sequelize.sync({force: true});   
    // 默认标签
    UpdateLabel.bulkCreate(labels);
    // Shi.bulkCreate(shi);
    // Shi.bulkCreate(shi2)
    // Shi.bulkCreate(shi3)
    // Shi.bulkCreate(shi4)
    // Shi.bulkCreate(shi5)
    // Shi.bulkCreate(shi6)
    // Shi.bulkCreate(shi7)
    // Shi.bulkCreate(ci);
    // Shi.bulkCreate(ci2)
    // Shi.bulkCreate(ci3)
    // Shi.bulkCreate(ci4)
    // Shi.bulkCreate(ci5)
    // Shi.bulkCreate(ci6)
    // Shi.bulkCreate(qu);
    // Shi.bulkCreate(qu2)
    // Shi.bulkCreate(qu3)
    // Shi.bulkCreate(qu4)
    // Shi.bulkCreate(qu5)
    // Shi.bulkCreate(qu6)
    // Shi.bulkCreate(qu7)
    // Shi.bulkCreate(sushi1)
    // Shi.bulkCreate(sushi2)
    // Shi.bulkCreate(sushi3)
    // Shi.bulkCreate(sushi4)
    // Shi.bulkCreate(sushi5)
    // Shi.bulkCreate(sushi6)
    // Shi.bulkCreate(sushi7)
    // Shi.bulkCreate(sushi8)
    // Shi.bulkCreate(sushi9)
    // Shi.bulkCreate(sushi10)
    // Shi.bulkCreate(sushi11)
    // Shi.bulkCreate(sushi12)
    // Shi.bulkCreate(sushi13)
    // Shi.bulkCreate(sushi14)
    // Shi.bulkCreate(sushi15)
    // Shi.bulkCreate(sushi16)
    // Shi.bulkCreate(sushi17)
})()