import { updateAdd, updateList } from '../controller/updateLog';
import router from './router';
import { success, failed } from './base';

router.get('/update/list', async (ctx, next) => {
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
    const res = await updateList(params);

    return success(ctx, next, res);
});

router.post('/update/add', async (ctx, next) => {
    let { accessory, labels, title, html, userName = '暂无', userId = '暂无', countBase = 0 } = ctx.request.body;
    if (!html && !html.trim()) {
        return failed(ctx, next, '内容不能为空');
    }
    if (!title && !title.trim()) {
        return failed(ctx, next, '标题不能为空');
    }
    if (!labels && title.length() < 1) {
        return failed(ctx, next, '标签不能为空');
    }
    try {
        labels = JSON.parse(labels)
    } catch (error) {
        labels = [];   
    }

    const res = await updateAdd({
        countBase: countBase || 0,
        userId,
        labels,
        userName,
        accessory: accessory || '',
        title: title.trim(),
        html: html.trim()
    });
    success(ctx, next, res);
})

export default router;