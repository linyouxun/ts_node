import { Sequelize } from 'sequelize-typescript';

// export const sequelize = new Sequelize({
    // dialect: 'mysql',
    // host: '121.41.58.94',
    // port: 3307,
    // operatorsAliases: true,
    // database: 'intelligent',
    // username: 'yunwei',
    // password: '!@#_20150414',
    // modelPaths: [__dirname + '/models']
// })
export const sequelize = new Sequelize({
    dialect: 'mysql',
    operatorsAliases: true,
    database: 'yoju',
    username: 'root',
    password: '123456l',
    modelPaths: [__dirname + '/models']
})