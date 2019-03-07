const { ERRORCODE } = require('../utils/const');

export const returnData = async( ctx, next, result, message, code, stutasCode) => {
  ctx.status = code;
  ctx.body = {
    code,
    stutasCode: stutasCode || code,
    result,
    message
  }
}
export const return204 = async( ctx, next, code = ERRORCODE.noChangeEmpty) => {
  ctx.status = code;
  ctx.body = code;
}

export const success = ( ctx, next, data, message = 'success', code = ERRORCODE.success, stutasCode = ERRORCODE.success) => {
  returnData(ctx, next, data, message, code, stutasCode);
}

export const failed = ( ctx, next, data, message = 'failed', code = ERRORCODE.success, stutasCode = ERRORCODE.failed) => {
  returnData(ctx, next, data, message, code, stutasCode);
}

export const needUserLogin = ( ctx, next, data = {}, message = '用户没有登录', code = ERRORCODE.success, stutasCode = ERRORCODE.nologin) => {
  returnData(ctx, next, data, message, code, stutasCode);
}

export const noAllow = ( ctx, next, data = {}, message = '用户权限不够', code = ERRORCODE.success, stutasCode = ERRORCODE.noAllow) => {
  returnData(ctx, next, data, message, code, stutasCode);
}

export default {
    returnData,
    return204,
    success,
    failed,
    needUserLogin,
    noAllow
}
