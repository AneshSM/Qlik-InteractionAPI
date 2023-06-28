const WebSocket = require("ws");
const { certificates } = require("../cert/certificate");

const qESocketConnection = (requestHeader) => {
  const { UserName, UserDirectory, Host, Port, Proxy } = requestHeader;
  return new Promise((resolve, reject) => {
    try {
      const AppId = requestHeader.AppId ? requestHeader.AppId : "";
      const qEngineURL = `wss://${Host}:${Port}/${Proxy}/app/${AppId}`;
      const qEngineOptions = {
        ca: [certificates.root],
        cert: certificates.cert,
        key: certificates.key,
        headers: {
          "X-Qlik-User": `UserDirectory=${UserDirectory}; UserId=${UserName}`,
        },
      };
      const ws = new WebSocket(qEngineURL, qEngineOptions);
      resolve(ws);
    } catch (error) {
      console.log(error);
      reject({
        status: 400,
        message: "ERROR:" + error.message,
        error,
      });
    }
  });
};

module.exports = { qESocketConnection };
