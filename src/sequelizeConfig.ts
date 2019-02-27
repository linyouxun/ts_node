import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op as any,
    database: 'yoju',
    username: 'root',
    password: '123456l',
    modelPaths: [__dirname + '/models']
})