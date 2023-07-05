const { default: axios } = require("axios");

const qrsApiCall = (
  path,
  method = "GET",
  data = {},
  qlikConfig = {
    host: "8zxr3w2.gain-insights.in",
    isSecured: true,
    port: 4242,
    HeaderVirtualProxySessionKey: "X-Qlik-User",
    defaultUserDirectory: "INTERNAL",
    defaultUser: "sa_repository",
    proxy: "test",
    xrfkey: "abcdefghijklmnop",
  }
) => {
  return new Promise((resolve, reject) => {
    const paramSymbol = path.includes("?") ? "&" : "?";
    const hostPrefix = qlikConfig.isSecured ? "https://" : "http://";
    const port = qlikConfig.port ? ":" + qlikConfig.port : "";
    const HeaderVirtualProxy = qlikConfig.HeaderVirtualProxy;
    const HeaderVirtualProxySessionKey =
      qlikConfig.HeaderVirtualProxySessionKey;
    try {
      var options = {
        method: method,
        url:
          hostPrefix +
          qlikConfig.host +
          port +
          "/" +
          qlikConfig.proxy +
          "/" +
          path +
          paramSymbol +
          "xrfkey=" +
          qlikConfig.xrfkey,
        headers: {
          "X-Qlik-xrfkey": qlikConfig.xrfkey,
          [HeaderVirtualProxySessionKey]:
            qlikConfig.defaultUserDirectory + "\\" + qlikConfig.defaultUser,
          accept: "*/*",
          "accept-Language": "en-US,en",
          "Content-Type": "application/json",
        },
        // data: data,
      };

      axios(options)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(false);
        });
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

module.exports = qrsApiCall;
