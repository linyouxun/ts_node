import { statisticsCount, statisticsList } from '../controller/statistics';
import { failed, success } from './base';
import router from './router';
import { jsStatistics } from '../utils/htmltool';
import { ihdr, idat } from '../utils/png';

router.get('/statistics/:id/count.png', async (ctx, next) => {
    const { id } = ctx.params;
    const { screen, width, height, referrer, url, vh, vc, vt, o, userId, pvl } = ctx.query;
    const userAgent = ctx.req.headers['user-agent'] || '未知';
    ctx.response.type = 'png';
    ctx.body = Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        ihdr(1, 1),
        idat(1, 1),
        Buffer.from('IEND'),
    ]);
    // 添加入库
    setTimeout(async () => {
        await statisticsCount(id, userAgent, screen, width, height, referrer, url, vh, vc, vt, o, userId, pvl, ctx.ipv4);
    }, 0);
});

router.get('/statistics/:id/count', async (ctx, next) => {
    const { id } = ctx.params;
    const { screen, width, height, referrer, url, vh, vc, vt, o, userId, pvl, ip } = ctx.query;
    console.log(screen, width, height, referrer, url, vh, vc, vt, o, userId, pvl, ip);
    const userAgent = ctx.req.headers['user-agent'] || '未知';
    success(ctx, next, {}, '添加统计：' + id);
    // 添加入库
    setTimeout(async () => {
        await statisticsCount(id, userAgent, screen, width, height, referrer, url, vh, vc, vt, o, userId, pvl, ip || ctx.ipv4);
    }, 0);
});

router.get('/statistics/:id/normal.js', async (ctx, next) => {
    const { id } = ctx.params;
    ctx.response.type = 'text/javascript';
    ctx.body = jsStatistics(id);
});

router.get('/statistics/list', async (ctx, next) => {
    let { cursor = 1, limit = 10, params = '{}', field = '[]', fieldmerge = '[]'} = ctx.query;
    try {
        params = JSON.parse(params);  
    } catch (error) {
        return failed(ctx, next, '参数错误');        
    }
    try {
        field = JSON.parse(field);  
    } catch (error) {
        return failed(ctx, next, '参数错误 field');        
    }
    try {
        fieldmerge = JSON.parse(fieldmerge);  
    } catch (error) {
        return failed(ctx, next, '参数错误 fieldmerge');        
    }
    // 页默认大小
    if (!cursor || +cursor < 1) {
        params.cursor = 1;
    } else {
        params.cursor = +cursor;
    }
    // 页默认次数
    if (!limit || +limit < 1) {
        params.limit = 10;
    } else {
        params.limit = +limit;
    }
    return await statisticsList(ctx, next, params, field, fieldmerge);
});
export default router;
  