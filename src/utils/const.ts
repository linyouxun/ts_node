export const GAODE_KEY = 'f1f341fd8aa165eda6c0f29db0f5ef5d'
export const WX_TOKEN = 'yoju';
// 个人
// export const WX_APPID = 'wx6b4513a726c562bf';
// export const WX_SECRET = 'd4638d32493919f85a274582dbbeb690';
// 测试
export const WX_APPID = 'wx8447a832a5a9ebb9';
export const WX_SECRET = '55c82af3736a7182ffe09a012b64ff04';
export const WX_SERVER = 'https://api.weixin.qq.com';
export const redisParams = {
    host: '120.78.174.98',
    port: '6379',
    password: '123456l'
}
/**
 * 100// 高德地图appkey
 * 100——客户必须继续发出请求
 * 101——客户要求服务器根据请求转换HTTP协议版本
 *
 * 200
 * 200——表明该请求被成功地完成，所请求的资源发送回客户端
 * 201——提示知道新文件的URL
 * 202——接受和处理、但处理未完成
 * 203——返回信息不确定或不完整
 * 204——请求收到，但返回信息为空
 * 205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
 * 206——服务器已经完成了部分用户的GET请求
 *
 * 300
export const WX_SERVER = 'https://api.weixin.qq.com';
export const redisParams = {
    host: '120.78.174.98',
    port: '6379',
    password: '123456l'
}
/**
 * 100// 高德地图appkey
 * 100——客户必须继续发出请求
 * 101——客户要求服务器根据请求转换HTTP协议版本
 *
 * 200
 * 200——表明该请求被成功地完成，所请求的资源发送回客户端
 * 201——提示知道新文件的URL
 * 202——接受和处理、但处理未完成
 * 203——返回信息不确定或不完整
 * 204——请求收到，但返回信息为空
 * 205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
 * 206——服务器已经完成了部分用户的GET请求
 *
 * 300
 * 300——请求的资源可在多处得到
 * 301——本网页被永久性转移到另一个URL
 * 302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
 * 303——建议客户访问其他URL或访问方式
 * 304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
 * 305——请求的资源必须从服务器指定的地址得到
 * 306——前一版本HTTP中使用的代码，现行版本中不再使用
 * 307——申明请求的资源临时性删除
 *
 * 404
 * 400——客户端请求有语法错误，不能被服务器所理解
 * 401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
 * 402——保留有效ChargeTo头响应
 * 403——禁止访问，服务器收到请求，但是拒绝提供服务
 * 404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
 * 405——用户在Request-Line字段定义的方法不允许
 * 406——根据用户发送的Accept拖，请求资源不可访问
 * 407——类似401，用户必须首先在代理服务器上得到授权
 * 408——客户端没有在用户指定的饿时间内完成请求
 * 409——对当前资源状态，请求不能完成
 * 410——服务器上不再有此资源且无进一步的参考地址
 * 411——服务器拒绝用户定义的Content-Length属性请求
 * 412——一个或多个请求头字段在当前请求中错误
 * 413——请求的资源大于服务器允许的大小
 * 414——请求的资源URL长于服务器允许的长度
 * 415——请求资源不支持请求项目格式
 * 416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
 * 417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。
 *
 * 额外
 * 418 没有对应api
 * 419 没有对应网页
 * 420 用户权限不够
 *
 * 500
 * 500 - 服务器遇到错误，无法完成请求
 * 500.100 - 内部服务器错误 - ASP 错误
 * 500-11 服务器关闭
 * 500-12 应用程序重新启动
 * 500-13 - 服务器太忙
 * 500-14 - 应用程序无效
 * 500-15 - 不允许请求 global.asa
 * 501 - 未实现
 * 502 - 网关错误
 * 503：由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常
 */

export const ERRORCODE = {
    success: 200,
    noChangeEmpty: 204,
    failed: 500,
    nologin: 401,
    noAPI: 418,
    noHTML: 419,
    noAllow: 420
}

export default {
    ERRORCODE,
    GAODE_KEY
}  