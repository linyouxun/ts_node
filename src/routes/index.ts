import * as Router from 'koa-router';
import { pageCount, pageList } from '../controller/index';
import { macList, macList2, macList3 } from '../controller/mac';
import { failed } from './base';
import { checkToken } from '../utils/tool';
const router = new Router();

router.get('/page/count', async (ctx, next) => {
    const { userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code } = ctx.query;
    return await pageCount(ctx, next, userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code);
});

router.post('/page/count', async (ctx, next) => {
    const { userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code } = ctx.request.body;
    return await pageCount(ctx, next, userId, userName, viewUrl, preViewUrl, createTime, lastTime, screen, code);
});

router.get('/page/list', async (ctx, next) => {
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
    return await pageList(ctx, next, params);
});

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

router.get('/wx/token', async(ctx, next) => {
    const {signature, timestamp, nonce, echostr} = ctx.query;
    if (!signature) {
        return failed(ctx, next, 'signature参数错误');
    }
    if (!timestamp) {
        return failed(ctx, next, 'timestamp参数错误');
    }
    if (!nonce) {
        return failed(ctx, next, 'nonce参数错误');
    }
    if (!echostr) {
        return failed(ctx, next, 'echostr参数错误');
    }
    if (checkToken(signature, timestamp, nonce)) {
        return ctx.body = echostr;
    } 
    return ctx.body = '校验错误';
})

export default router;
  