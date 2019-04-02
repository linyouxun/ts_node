const myFetch = require('node-fetch')
function objToUrlString(data) {
  let paramsArr = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      paramsArr.push(`${key}=${element}`);
    }
  }
  return paramsArr.join('&');
}
export const fetchData = function(data, url, opts = { method: 'POST'} as any) {
  // 清除空参数
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      if (!element) {
        delete data[key];
      }
    }
  }
  const params = Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, opts) as any;
  if (opts.method === 'GET') {
    url += ('?' + objToUrlString(data));
  } else {
    if (opts.headers['Content-Type'] === 'application/json') {
      params.body = JSON.stringify(data);
    } else {
      params.body = objToUrlString(data);
    }
  }
  return myFetch(url , params).then(resp => {
    return resp.json()
  }).catch(error => {
    return {
      code: 500,
      message: `JSON解析错误：${error.message}`,
      msg: `JSON解析错误：${error.message}`,
    };
  }).then(json => {
    return json;
  });
}
export default fetchData;
