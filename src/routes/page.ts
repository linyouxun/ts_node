import { pageCount, pageList } from '../controller/page';
import { failed } from './base';
import router from './router';
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
export default router;
  