/**
 * 发送文本信息
 * @param json 发送的JSON
 */
export const wxText = function(json) {
    return `<xml>
    <ToUserName>${json.FromUserName}</ToUserName>
    <FromUserName>${json.ToUserName}</FromUserName>
    <CreateTime>${+new Date() / 1000}</CreateTime>
    <MsgType>text</MsgType>
    <Content>${json.Content}</Content>
    </xml>`
}

/**
 * 发送图片信息
 * @param json 发送的JSON
 */
export const wxImage = function(json) {
    return `<xml>
    <ToUserName>${json.FromUserName}</ToUserName>
    <FromUserName>${json.ToUserName}</FromUserName>
    <CreateTime>${+new Date() / 1000}</CreateTime>
    <MsgType>image</MsgType>
    <PicUrl>${json.PicUrl}</PicUrl>
    <Image>
        <MediaId>${json.MediaId}</MediaId>
    <Image>
    </xml>`
}

/**
 * 发送语音
 * @param json 发送的JSON
 */
export const wxVoice = function(json) {
    return `<xml>
    <ToUserName>${json.FromUserName}</ToUserName>
    <FromUserName>${json.ToUserName}</FromUserName>
    <CreateTime>${+new Date() / 1000}</CreateTime>
    <MsgType>voice</MsgType>
    <Voice>
        <MediaId>${json.MediaId}</MediaId>
    </Voice>
    </xml>`
}


/**
 * 发送视频
 * @param json 发送的JSON
 */
export const wxVideo = function(json) {
    return `<xml>
    <ToUserName>${json.FromUserName}</ToUserName>
    <FromUserName>${json.ToUserName}</FromUserName>
    <CreateTime>${+new Date() / 1000}</CreateTime>
    <MsgType>video</MsgType>
    <Video>
        <MediaId>KSpVJjNiU9_EXXYnZnf3-5_Xn65aLh8JOOWEbNCOS6oprKCosy7dcN6nuk8xveaD</MediaId>
        <Title>${json.Title || '暂无标题'}</Title>
        <Description>${json.Description || '暂无描述'}</Description>
    </Video>
    </xml>`
}
/**
 * 发送音乐
 * @param json 发送的JSON
 */
export const wxMusic = function(json) {
    return `<xml>
    <ToUserName>${json.FromUserName}</ToUserName>
    <FromUserName>${json.ToUserName}</FromUserName>
    <CreateTime>${+new Date() / 1000}</CreateTime>
    <MsgType>music</MsgType>
    <Music>
        <Title>${json.Title}</Title>
        <Description>${json.Description}</Description>
        <MusicUrl>${json.MusicUrl}</MusicUrl>
        <HQMusicUrl>${json.HQMusicUrl}</HQMusicUrl>
        <ThumbMediaId>${json.ThumbMediaId}</ThumbMediaId>
    </Music>
    </xml>`
}
/**
 * 发送图文
 * @param json 发送的JSON
 * 图文消息个数；当用户发送文本、图片、视频、图文、地理位置这五种消息时，开发者只能回复1条图文消息；其余场景最多可回复8条图文消息
 */
export const wxNews = function(json) {
    json.Articles = json.Articles || [{
        Title: '图文消息标题',
        Description: 'Description',
        PicUrl: 'https://pic.52112.com/icon/256/20190329/34232/1668100.png',
        Url: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140543'
    }];
    const count = json.Articles.length;
    let items = '';
    json.Articles.map(item => {
        items += `<item>
        <Title>${item.Title}</Title>
        <Description>${item.Description}</Description>
        <PicUrl>${item.PicUrl}</PicUrl>
        <Url>${item.Url}</Url>
        </item>`
        return '';
    })
    return `<xml>
        <ToUserName>${json.FromUserName}</ToUserName>
        <FromUserName>${json.ToUserName}</FromUserName>
        <CreateTime>${+new Date() / 1000}</CreateTime>
        <MsgType>news</MsgType>
        <ArticleCount>${count}</ArticleCount>
        <Articles>
            ${items}
        </Articles>
    </xml>`
}

/**
 * 发送link
 * @param json 发送的JSON
 */
export const wxLink = function(json) {
    json.Articles = [{
        Title: json.Title,
        Description: json.Description,
        Url: json.Url,
    }]
    return wxNews(json);
    // return `<xml>
    //     <ToUserName>${json.FromUserName}</ToUserName>
    //     <FromUserName>${json.ToUserName}</FromUserName>
    //     <CreateTime>${+new Date() / 1000}</CreateTime>
    //     <MsgType>link</MsgType>
    //     <Title>${json.Title}</Title>
    //     <Description>${json.Description}</Description>
    //     <Url>${json.Url}</Url>
    // </xml>`
}

/**
 * 取消关注
 * @param json 发送的JSON
 */
export const wxUnsubscribe = function(json) {
    return ``
}

/**
 * 关注
 * @param json 发送的JSON
 */
export const wxSubscribe = function(json) {
    return ``
}


