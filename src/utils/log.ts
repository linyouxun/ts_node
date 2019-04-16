import * as path from 'path';
import * as log4js from 'log4js';
const src = path.resolve(__dirname, '../../log/');
log4js.configure({
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
        mysql: { 
            type: 'dateFile', 
            filename: path.resolve(src, './mysql/page'),
            encoding: "utf-8",
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 10000000,
            alwaysIncludePattern: true,
        },
        visite: { 
            type: 'dateFile', 
            filename: path.resolve(src, './visite/page'),
            encoding: "utf-8",
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 10000000,
            alwaysIncludePattern: true,
        },
        error: { 
            type: 'dateFile', 
            filename: path.resolve(src, './error/page'),
            encoding: "utf-8",
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 10000000,
            alwaysIncludePattern: true,
        },
        api: { 
            type: 'dateFile', 
            filename: path.resolve(src, './api/page'),
            encoding: "utf-8",
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 10000000,
            alwaysIncludePattern: true,
        },
    },
    categories: { 
        default: { appenders: ['stdout'], level: 'info' },
        mysql: { appenders: ['mysql', 'stdout'], level: 'info' },
        visite: { appenders: ['visite', 'stdout'], level: 'info' },
        error: { appenders: ['error', 'stdout'], level: 'info' },
        api: { appenders: ['api', 'stdout'], level: 'info' },
    }
});

export const mysqlLogger = log4js.getLogger('mysql');
export const visiteLogger = log4js.getLogger('visite');
export const errorLogger = log4js.getLogger('error');
export const apiLogger = log4js.getLogger('api');
export const getLogger = function (name) {// name取categories项
    return log4js.getLogger(name || 'default')
}