const { qESocketConnection } = require("../utils/qlikEngine_utils");

const qEgetAppData = (requestHeader, requestBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ws = await qESocketConnection(requestHeader);
      ws.onopen = () => {
        ws.onmessage = (msg) => {
          const data = JSON.parse(msg.data);
          if (data["method"] === "OnConnected") {
            ws.send(JSON.stringify(requestBody(requestHeader.AppId)));
          } else if (data["error"]) {
            ws.terminate();
            reject({
              data: data["error"].message,
              message: "error",
            });
          } else if (data["result"]) {
            const { result } = data;
            if (result["qReturn"]) {
              resolve(ws);
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
      ws.onerror = function (err) {
        ws.terminate();
        reject({
          status: 500,
          message: err.message,
          error: err,
        });
      };
    } catch (error) {
      ws.terminate();
      console.log(error);
      reject({ status: 400, message: "ERROR:" + error.message, error });
    }
  });
};
const qEgetBookmarks = (ws, getBookMarks) => {
  return new Promise(async (resolve, reject) => {
    try {
      ws.send(JSON.stringify(getBookMarks()));
      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data["error"]) {
          ws.terminate();
          reject({
            data: data["error"].message,
            message: "error",
          });
        } else if (data["result"]) {
          const { result } = data;
          if (result["qList"]) {
            ws.terminate();
            const { qList } = result;
            let bookmarks = [];
            qList.map((data, index) => {
              bookmarks.push({
                id: data["qInfo"]["qId"],
                name: data["qMeta"]["title"],
                metadata: data["qMeta"],
              });
            });
            resolve(bookmarks);
          } else {
            ws.terminate();
            reject({
              status: 500,
              message: "There are no bookmarks available",
            });
          }
        } else {
          ws.terminate();
          resolve(data);
        }
      };
      ws.onerror = function (err) {
        ws.terminate();
        reject({
          status: 500,
          message: err.message,
          error: err,
        });
      };
    } catch (error) {
      ws.terminate();
      console.log(error);
      reject({ status: 400, message: "ERROR:1" + error.message, error });
    }
  });
};

const qEgetObjects = (ws, getObjects, types) => {
  return new Promise(async (resolve, reject) => {
    try {
      ws.send(JSON.stringify(getObjects(types)));
      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data["error"]) {
          ws.terminate();
          reject({
            data: data["error"].message,
            message: "error",
          });
        } else if (data["result"]) {
          const { result } = data;
          if (result["qList"]) {
            ws.terminate();
            const { qList } = result;
            let sheets = [];
            qList.map((data, index) => {
              sheets.push({
                id: data["qInfo"]["qId"],
                name: data["qMeta"]["title"],
                metadata: data["qMeta"],
              });
            });
            resolve(sheets);
          } else {
            ws.terminate();
            reject({
              status: 500,
              message: "There are no sheets available",
            });
          }
        } else {
          ws.terminate();
          resolve(data);
        }
      };
      ws.onerror = function (err) {
        ws.terminate();
        reject({
          status: 500,
          message: err.message,
          error: err,
        });
      };
    } catch (error) {
      ws.terminate();
      console.log(error);
      reject({ status: 400, message: "ERROR:1" + error.message, error });
    }
  });
};
module.exports = { qEgetAppData, qEgetBookmarks, qEgetObjects };
