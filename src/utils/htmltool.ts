export const jsStatistics = function(id) {
    let host = '120.78.174.98';
    if ('development' === process.env.NODE_ENV) {
      host = '127.0.0.1:3002';
    }
    return `
  (function(w, d) {
    var id = '${!!id ? id : 'none'}';
    var userInfo = {};
    (function(id) {
      userInfo = setInfo()
    })(id);
  
    /**
     * 请求发送
     * @param params
     */
    function request (params) {
      var url = params.url || '';
      var method = params.method || 'GET';
      var data = params.data || {};
      var async = params.async || false;
  
      var timeout = params.timeout || 20000;
      var contentType = params.contentType || 'application/x-www-form-urlencoded';
      var responseType = (params.responseType || 'text').toLowerCase();
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, async);
      if (async) {
        xhr.timeout = timeout;
      }
      if (responseType === 'json') {
        xhr.responseType = 'text';
      }
      xhr.setRequestHeader('content-type', contentType);
      xhr.onload = function(result) {
        var responseText = this.responseText;
        if (responseType === 'json') {
          responseText = responseText ? JSON.parse(responseText) : responseText;
        }
        if (Object.prototype.toString.call(params.success) === '[object Function]') {
          params.success(responseText);
        } else {
          console.log(responseText);
        }
      }
  
      xhr.onerror = function(result) {
        var responseText = this.responseText;
        if (responseType === 'json') {
          responseText = responseText ? JSON.parse(responseText) : responseText;
        }
        if (Object.prototype.toString.call(params.onerror) === '[object Function]') {
          params.onerror(responseText);
        } else {
          console.log(this.responseText);
        }
      }
  
      xhr.ontimeout = function(result) {
        var responseText = this.responseText;
        if (Object.prototype.toString.call(params.ontimeout) === '[object Function]') {
          params.ontimeout(responseText);
        } else {
          console.log(this.responseText);
        }
      }
      if (contentType == 'application/x-www-form-urlencoded') {
        var strData = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            strData.push(key + '=' + encodeURIComponent(data[key]));
          }
        }
        xhr.send(strData.join('&'));
      } else {
        xhr.send(JSON.stringify(data));
      }
    }
  
    function setCookie(name, value, exdays) {
      if (value) {
        var Days = !!exdays ? exdays : 300000;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 60 * 60 * 1000);
        d.cookie = name + "=" + escape(value) + ";expires=" + exp + ";path=/";
      }
    }
  
    function setCurrentDayCookie(name, value) {
      if (value) {
        var exp = new Date();
        exp.setHours(0);
        exp.setMinutes(0);
        exp.setSeconds(0);
        exp.setMilliseconds(0);
        exp.setDate(exp.getDate() + 1);
        d.cookie = name + "=" + escape(value) + ";expires=" + exp + ";path=/";
      }
    }
  
    function getCookie(name) {
      var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      var arr = d.cookie.match(reg);
      if (!!arr) {
        return decodeURIComponent(arr[2]);
      } else {
        return null;
      }
    }
  
    function objToUrlString(o) {
      if (o === null) {
        return '';
      };
      var paramsList = []
      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          var element = o[key];
          var type = typeof element;
          if(type === 'string' || type === 'number' || type === 'boolean') {
            paramsList.push(key + '=' +  encodeURIComponent(element));
          } else {
            paramsList.push(key + '=' +  encodeURIComponent(JSON.stringify(element)));
          }
        }
      }
      return paramsList.join('&');
    }
  
    /**
     * 访问页面
     */
    function visitPage() {
      var vh = getCookie(id + '-visitor-' + location.origin + location.pathname) || 0;
      setCurrentDayCookie(id + '-visitor-' + location.origin + location.pathname, +vh + 1)
      var vc = getCookie(id + '-visitorCount') || 0;
      setCurrentDayCookie(id + '-visitorCount', +vc + 1)
      var vt = getCookie(id + '-visitorCountTotal') || 0;
      setCookie(id + '-visitorCountTotal', +vt + 1);
      var o = false;
      var d = new Date(+userInfo.visitor.split('_')[0]);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      if(new Date() - d > 86400000) {
        o = true;
      }
      var params = {
        screen: w.screen.width + '×' + w.screen.height,
        width: w.screen.width,
        height: w.screen.height,
        referrer: d.referrer || '',
        url: w.location.href,
        vh: +vh + 1,
        vc: +vc + 1,
        vt: +vt + 1,
        id: id,
        o: o,
        userId: userInfo.visitor
      }
      var img = new Image();
      img.src = 'http://${host}/statistics${!!id ? '/' + id : ''}/count.png?' + objToUrlString(params);
      img.onload = function() {}
    }
  
    /**
     * 报名信息
     */
    function sendForm(formData) {
      var params = {
        url: w.location.href,
        id: id,
        userId: userInfo.visitor,
        name: formData.name || '--',
        age: formData.age || 0,
        mobile: formData.mobile || '--',
        birthDate: formData.birthDate || +new Date(),
        version: formData.version || 'v1',
        extraInfo: JSON.stringify(formData)
      };
      request({
        url: 'http://${host}/custom${!!id ? '/' + id : ''}/add',
        method: 'POST',
        data: params,
        contentType: 'application/json',
        success: function(data) {
          console.log('');
        },
        onerror: function() {
          console.log('onerror');
        },
        ontimeout: function() {
          console.log('ontimeout');
        },
      })
    }
  
    /**
     * 设置访问信息
     */
    function setInfo(name) {
      var visitor = getCookie(id + '-visitor');
      if(!visitor) {
        visitor = +new Date() + '_' + Math.floor(Math.random() * 1000000);
        setCookie(id + '-visitor', visitor);
      }
      return {
        visitor: visitor
      };
    }
  
    // // 页面加载监听
    // if(!!d.addEventListener && !!w.addEventListener) {
    //   // document.addEventListener("DOMContentLoaded", function() {
    //   //   visitPage();
    //   // })
    //   w.addEventListener("load", function() {
    //     visitPage();
    //   });
    // }
    w.sTool = {
      request: request,
      setCookie: setCookie,
      setCurrentDayCookie: setCurrentDayCookie,
      getCookie: getCookie,
      visitPage: visitPage,
      setInfo: setInfo,
      sendForm: sendForm,
    }
  })(window, document)
    `;
  }