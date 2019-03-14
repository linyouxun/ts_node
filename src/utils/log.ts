import * as path from 'path';
import * as log4js from 'log4js';
const src = path.resolve(__dirname, '../../log/');
log4js.configure({
    appenders: {
        mysql: { 
            type: 'dateFile', 
            filename: path.resolve(src, './mysql-page'),
            encoding: "utf-8",
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 10000000,
            alwaysIncludePattern: true,
        }
    },
    categories: { default: { appenders: ['mysql'], level: 'info' } }
});

export const logger = log4js.getLogger('mysql');