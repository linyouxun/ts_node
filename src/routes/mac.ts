import { macList, macList2, macList3 } from '../controller/mac';
import { failed } from './base';
import router from './router';
router.get('/mac/list', async (ctx, next) => {
    let { cursor = 1, limit = 10, params = '{}' } = ctx.query;
    try {
        params = JSON.parse(params);  
    } catch (error) {
        return failed(ctx, next, '参数错误');        
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
    return await macList(ctx, next, params);
});
router.get('/mac/list2', async (ctx, next) => {
    let { cursor = 1, limit = 10, params = '{}' } = ctx.query;
    try {
        params = JSON.parse(params);  
    } catch (error) {
        return failed(ctx, next, '参数错误');        
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
    return await macList2(ctx, next, params);
});
router.get('/mac/list3', async (ctx, next) => {
    let { cursor = 1, limit = 10, params = '{}' } = ctx.query;
    try {
        params = JSON.parse(params);  
    } catch (error) {
        return failed(ctx, next, '参数错误');        
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
    return await macList3(ctx, next, params);
});
export default router;
  