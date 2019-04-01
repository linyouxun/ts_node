import * as Router from 'koa-router';
import { failed, success } from './base';
import { networkInterfaces } from 'os';

const router = new Router();

router.get('/redis/set', (ctx, next) => {
    const { key, value } = ctx.query;
    if (!key) {
        return failed(ctx, next, 'key参数不能为空');
    }
    if (!value) {
        return failed(ctx, next, 'value参数不能为空');
    }
    ctx.redis.set(key, value);
    return success(ctx, next, {
        [key]: value
    });
})
router.get('/redis/get', async (ctx, next) => {
    const { key } = ctx.query;
    if(!key) {
        return failed(ctx, next, 'key参数不能为空');
    }
    const value = await ctx.redis.getAsync(key);
    return success(ctx, next, {
        [key]: value
    });
})

export default router;
