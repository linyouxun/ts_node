
import { getToken, getTokenPost, sendTemplate, getCode} from '../controller/wx';
import { checkToken } from '../utils/tool';
import { failed, success } from './base';
import router from './router';
import { WX_APPID } from '../utils/const';

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

router.get('/wx/template/send', async(ctx, next) => {
    let { openId, templateId, url = 'http://www.baidu.com', data = '{}' } = ctx.query;
    if (!openId) {
        return failed(ctx, next, 'openId参数错误');
    }
    if (!templateId) {
        return failed(ctx, next, 'templateId参数错误');
    }
    try {
        data = JSON.parse(data); 
    } catch (error) {
        data = {}
    }
    const res = await sendTemplate(ctx, {
        "touser": openId,
        "template_id": templateId,
        "url": url,
        "data": data
    });
    success(ctx, next, res);
})

router.get('/wx/authorize', async(ctx, next) => {
    let { type, scope, callback , id, goback = '/loginjs.html', res = '{}'} = ctx.query;
    const server = 'http://38c90778.ngrok.io';
    const goUri = server + '/wx/getCode?goback=1';
    if (type == 'wxlogin_jump') {
        // 微信授權
        return ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(goUri)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`);    
    }
    if (type == 'wxlogin_cookie') {
        // 獲取數據
        res = await ctx.redis.getAsync(ctx.session.token);
        return ctx.redirect(`/loginjs.html?errNum=${1}&id=${id}&callback=${callback}&res=${encodeURIComponent(res)}`);
    }
    if (type == 'wxlogin_origin') {
        // 设置值
        try {
            res = JSON.parse(res)
        } catch (error) {
        }
        ctx.session.token = WX_APPID + '_' + res.openid;
        ctx.redis.set(WX_APPID + '_' + res.openid, JSON.stringify(res));
    }
    ctx.redirect(`/login.html`);
})

router.get('/wx/getCode', async(ctx, next) => {
    let { code, state, goback} = ctx.query;
    if (!code) {
        return failed(ctx, next, 'code参数错误');
    }
    const res = await getCode(code)
    if(!!goback) {
        return ctx.redirect(`/wx/authorize?type=wxlogin_origin&res=${encodeURIComponent(JSON.stringify(res))}`);    
    }
    success(ctx, next, res);
})

