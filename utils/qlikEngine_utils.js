const WebSocket = require("ws");
const { certificates } = require("../cert/certificate");

const qESocketConnection = (requestHeader) => {
  const { UserName, UserDirectory, Host, AppId, Port } = requestHeader;
  return new Promise((resolve, reject) => {
    try {
      console.log(requestHeader);
      const qEngineURL = `wss://${Host}:${Port}/app/${AppId}`;
      const qEngineOptions = {
        ca: [certificates.root],
        cert: certificates.cert,
        key: certificates.key,
        headers: {
          "X-Qlik-User": `UserDirectory=${UserDirectory}; UserId=${UserName}`,
        },
      };
      const ws = new WebSocket(qEngineURL, qEngineOptions);
      ws.onopen = () => {
        console.log("connected");
      };
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
