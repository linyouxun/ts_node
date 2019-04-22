
import { getToken, getTokenPost, sendTemplate, getCode, getWxUserInfo} from '../controller/wx';
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
    const server = 'http://fcb961b2.ngrok.io';
    // console.log('log', goback, type, scope);
    const goUri = server + '/wx/getCode?goback=' + encodeURIComponent(goback) + '&scope=' + scope;
    if (type == 'wxlogin_jump') {
        // 微信授權
        return ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(goUri)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`);    
    }
    if (type == 'wxlogin_cookie') {
        // 獲取數據
        res = await ctx.redis.getAsync(ctx.session.token || 'none');
        let errNum = 1;
        if (!!res) {
            // 获取用户详细信息
            if (/snsapi_userinfo/.test(res)) {
                try {
                   res = JSON.parse(res) 
                } catch (error) {
                    res = {}
                }            
                const res2 = await getWxUserInfo(res.access_token, res.openid);
                if (!!res2.access_token ) {
                    res = JSON.stringify(res2.res);
                    errNum = 0;
                }
            } else {
                errNum = 0
            }
        }
        return ctx.redirect(`${goback}?errNum=${errNum}&id=${id}&callback=${callback}&res=${encodeURIComponent(res)}`);
    }
    if (type == 'wxlogin_origin') {
        // 设置值
        try {
            res = JSON.parse(res)
        } catch (error) {
        }
        ctx.session.token = WX_APPID + '_' + scope + '_' + res.openid;
        ctx.redis.set(ctx.session.token, JSON.stringify(res));
    }
    ctx.redirect(goback);
})

router.get('/wx/getCode', async(ctx, next) => {
    let { code, state, goback, scope} = ctx.query;
    if (!code) {
        return failed(ctx, next, 'code参数错误');
    }
    const res = await getCode(code)
    if(!!goback) {
        return ctx.redirect(`/wx/authorize?type=wxlogin_origin&res=${encodeURIComponent(JSON.stringify(res))}&goback=${encodeURIComponent(goback)}&scope=${scope}`);    
    }
    success(ctx, next, res);
})

