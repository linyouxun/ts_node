import { Sequelize } from 'sequelize-typescript';
import { logger } from './utils/log';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '120.78.174.98',
    port: 3306,
    operatorsAliases: true,
    database: 'intelligent',
    username: 'root',
    password: '1qaz@WSX',
    modelPaths: [__dirname + '/models'],
    logging: function(sql) {
        console.log(sql);
        logger.info(sql);
    }
})
// export const sequelize = new Sequelize({
//     dialect: 'mysql',
//     host: '127.0.0.1',
//     port: 3306,
//     operatorsAliases: true,
//     database: 'intelligent',
//     username: 'root',
//     password: '123456l',
//     modelPaths: [__dirname + '/models/db'],
//     logging: function(sql) {
//         console.log(sql);
//         logger.info(sql);
//     }
// })
// export const sequelize = new Sequelize({
    // dialect: 'mysql',
    // operatorsAliases: true,
    // database: 'yoju',
    // username: 'root',
    // password: '123456l',
    // modelPaths: [__dirname + '/models'],
    // logging: function(sql) {
        // logger.info(sql);
    // }
// })