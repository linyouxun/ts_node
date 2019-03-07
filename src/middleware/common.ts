import { ERRORCODE } from '../utils/const';

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
