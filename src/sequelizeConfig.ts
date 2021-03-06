import { Sequelize } from 'sequelize-typescript';
import { logger } from './utils/log';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '121.41.58.94',
    port: 3307,
    operatorsAliases: true,
    database: 'intelligent',
    username: 'yunwei',
    password: '!@#_20150414',
    modelPaths: [__dirname + '/models'],
    logging: function(sql) {
        console.log(sql);
        logger.info(sql);
    }
})
// export const sequelize = new Sequelize({
    // dialect: 'mysql',
    // host: '127.0.0.1',
    // port: 3306,
    // operatorsAliases: true,
    // database: 'intelligent',
    // username: 'root',
    // password: '123456l',
    // modelPaths: [__dirname + '/models'],
    // logging: function(sql) {
        // console.log(sql);
        // logger.info(sql);
    // }
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