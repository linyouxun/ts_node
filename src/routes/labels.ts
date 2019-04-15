import { publishStatus } from '../controller/labels';
import router from './router';
import { failed } from './base';
router.get('/label/publishStatus', async (ctx, next) => {
    let { cursor = 1, limit = 100, params = '{}' } = ctx.query;
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
        params.limit = 100;
    } else {
        params.limit = +limit;
    }
    return await publishStatus(ctx, next, params);
});

export default router;