
import { getToken, getTokenPost, sendTemplate, getCode, getWxUserInfo, getJSTicket, getJSApiTicket, getJSCardTicket, getJSCardExtTicket, getCardList } from '../controller/wx';
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

router.get('/wx/getticket', async(ctx, next) => {
    const { refresh, type } = ctx.query;
    const res = await getJSTicket(ctx, type || 'jsapi', refresh || null);
    success(ctx, next, res);
});

router.get('/wx/getsignature', async(ctx, next) => {
    let { url } = ctx.query;
    if (!url) {
        return failed(ctx, next, 'signature参数错误');
    }
    url = url.split('#')[0];
    const timestamp = Math.round((+new Date() / 1000));
    const ticketObj = await getJSTicket(ctx);
    if (!!ticketObj.errcode) {
        return failed(ctx, next, ticketObj)
    }
    const noncestr = 'Wm3WZYTPz0wzccnW';
    const signType = await getJSApiTicket(noncestr, ticketObj.ticket, timestamp, url);
    success(ctx, next, {
        appid: WX_APPID,
        noncestr,
        signType,
        timestamp,
    });
});

/**
 * 获取卡卷列表
 */
router.get('/wx/getCards', async(ctx, next) => {
    let { shopId, cardType, cardId,  } = ctx.query;
    const timestamp = Math.round((+new Date() / 1000));
    const ticketObj = await getJSTicket(ctx, 'wx_card');
    if (!!ticketObj.errcode) {
        return failed(ctx, next, ticketObj)
    }
    const noncestr = 'Wm3WZYTPz0wzccnW';
    const cardSign = await getJSCardTicket(ticketObj.ticket, WX_APPID, shopId, timestamp, noncestr, cardId, cardType);
    success(ctx, next, {
        appid: WX_APPID,
        noncestr,
        signType: 'SHA1',
        timestamp,
        cardSign,
        shopId,
        cardType,
        cardId,
    });
});

/**
 * 卡卷列表
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
 */
router.get('/wx/card/list', async(ctx, next) => {
    let { offset = '1', count = '10' } = ctx.query;
    let params = {} as any;
    // 页默认大小
    if (!offset || +offset < 1) {
        params.offset = 1;
    } else {
        params.offset = +offset;
    }
    // 页默认次数
    if (!count || +count < 1) {
        params.count = 10;
    } else {
        params.count = +count;
    }
    let tokenObj = await getToken(ctx);
    const res = await getCardList(tokenObj.token, params);
    success(ctx, next, res);
});

/**
 * 添加卡卷
 */
router.get('/wx/addCard', async(ctx, next) => {
    let { cardId } = ctx.query;
    if (!cardId) {
        return failed(ctx, next, 'cardId参数错误');
    }
    const timestamp = Math.round((+new Date() / 1000));
    const ticketObj = await getJSTicket(ctx, 'wx_card');
    if (!!ticketObj.errcode) {
        return failed(ctx, next, ticketObj)
    }
    const noncestr = 'Wm3WZYTPz0wzccnW';
    // const noncestr = '';
    const cardExt = await getJSCardExtTicket(ticketObj.ticket, timestamp, noncestr, cardId);
    success(ctx, next, {
        appid: WX_APPID,
        noncestr,
        timestamp,
        cardExt,
        cardId,
    });
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
    const server = 'http://9d6b34e6.ngrok.io';
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

