import { sequelize } from '../sequelizeConfig';
(async () => {
    await sequelize.sync({force: true});   
})()