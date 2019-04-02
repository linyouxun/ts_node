
import { getToken, getTokenPost} from '../controller/wx';
import { checkToken } from '../utils/tool';
import { failed, success } from './base';
import router from './router';

/**
 * 微信
 */
router.get('/wx/checktoken', async(ctx, next) => {
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
});

router.post('/wx/checktoken', async(ctx, next) => {
    const xml = getTokenPost(ctx);
    ctx.set('content-type', 'text/xml');
    console.log(xml);
    ctx.body = xml;
})

router.get('/wx/token', async(ctx, next) => {
    const { refresh } = ctx.query;
    const obj = await getToken(ctx, refresh);
    success(ctx, next, obj);
})