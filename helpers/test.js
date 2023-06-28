const WebSocket = require("ws");
const path = require("path");
const fs = require("fs");
const { getApps, openApp, getBookMarks } = require("../json/qlikEngine_json");

// Set certPath to the path to the directory that contains the exported client certificates in PEM format.
var certPath = path.join(
  "C:",
  "ProgramData",
  "Qlik",
  "Sense",
  "Repository",
  "Exported Certificates",
  ".Local Certificates"
);

var certificates = {
  cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
  key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
  root: fs.readFileSync(path.resolve(certPath, "root.pem")),
};

// Open a WebSocket using the engine port (rather than going through the proxy)
// We use the certificates and a built-in Qlik service account
// We connect at the global level, which gives access to APIs in the Global class

const ws = new WebSocket("wss://8zxr3w2.gain-insights.in:4747/test/app/", {
  ca: [certificates.root],
  cert: certificates.cert,
  key: certificates.key,
  headers: {
    "X-Qlik-User": "UserDirectory=internal; UserId=sa_engine",
  },
});

module.exports = engineConnect = function () {
  var d = new Date();
  console.log("0. Contacting the QIX Engine service...");
  return new Promise((resolve, reject) => {
    ws.onopen = function (e) {
      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data["method"] === "OnConnected") {
          ws.send(
            JSON.stringify(openApp("562abc57-fdaa-42a7-be82-a262215f01af"))
          );
        } else if (data["error"]) {
          ws.terminate();
          reject({
            data: data["error"].message,
            message: "error",
          });
        } else if (data["result"]) {
          const { result } = data;
          if (result["qReturn"]) {
            console.log("app is opend");
            ws.send(JSON.stringify(getBookMarks()));
          } else if (result["qList"]) {
            const { qList } = result;
            qList.map((data, index) => {
              console.log(data.qInfo);
            });
          } else {
            ws.terminate();
            reject({
              status: 500,
              message: "Invalid AppID",
            });
          }
        } else {
          ws.terminate();
          resolve(data);
        }
      };
    };
    ws.onerror = function (e) {
      console.log("Error: " + e.message);
    };
    ws.onclose = function (e) {
      console.log("WebSocket closed!");
      resolve();
    };

    console.log("1. Websocket created...");
    setInterval(function () {
      if (ws.readyState == 1) {
        resolve();
      }
    }, 500);
  });
};
