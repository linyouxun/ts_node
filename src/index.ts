import * as Koa from 'koa';
import { sequelize } from './sequelizeConfig';
import { ipconfig, commonHeaders, commonError} from './middleware/common';
import router from './routes';
import * as koaBody from 'koa-body';

const app = new Koa();
(async () => {
    await sequelize.sync({force: false});   
    // 查看远程IP地址
    app.use(ipconfig);
    // 设置头
    app.use(commonHeaders);
    // 通用错误异常处理
    app.use(commonError)
    app.use(koaBody());
    app.use(router.routes()).use(router.allowedMethods());
    app.use((ctx: any) => {
        ctx.body = '访问错误'
    })
    app.listen(3002, () => {
        console.log('start the server: http://127.0.0.1:3000');
    })
})()