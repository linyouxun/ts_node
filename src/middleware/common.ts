import { ERRORCODE, redisParams } from '../utils/const';
import * as redis from 'redis';
import { xmlToJson } from '../utils/tool';
import { apiLogger } from '../utils/log';
import { promisify } from 'util';

export const redisConfig = async (ctx, next) => {
  const client = redis.createClient(redisParams) || {};
  const getAsync = promisify(client.get).bind(client);
  client.getAsync = getAsync;
  ctx.redis = client;
  await next();
}
export const logger = async (ctx, next) => {
  await next();
  apiLogger.info(`[method:${ctx.method} status:${ctx.status} url:${ctx.href} ip:${ctx.ip} data: ${JSON.stringify(ctx.query || {})} ${JSON.stringify(ctx.xmlBody || {})} ${JSON.stringify(ctx.request.body || {})} user-agent:${ctx.header['user-agent']}]`);
}
// 解析XML
export const xmlConfig = async (ctx, next) => {
  if (ctx.method == 'POST' && ctx.is('text/xml')) {
    let buf = '';
    const xmlstr = await new Promise(function(resolve, reject) {
      ctx.req.on('data', (chunk) => {
        buf += chunk;
      })
      ctx.req.on('end', () => {
        resolve(buf)
      })
    })
    const body = await xmlToJson(xmlstr);
    ctx.xmlBody = body;
  }
  await next();
}
export const ipconfig = async (ctx, next) => {
  ctx.ipv4 = ctx.req.headers['x-real-ip'] || '58.62.203.182';
  await next();
}
export const commonError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = ERRORCODE.failed;
    ctx.body = {
      code: ERRORCODE.failed,
      message: error.message,
    };
  }
}

export const commonHeaders = async (ctx, next) => {
  const startTime = +new Date();
  // ctx.set("Access-Control-Allow-Origin", ctx.header.origin || 'http://47.106.174.88');
  ctx.set("Access-Control-Allow-Origin", '*');
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.set("yoju-env", process.env.NODE_ENV || 'production');
  await next();
  ctx.set("yoju-loading-time", +new Date() - startTime);
}
