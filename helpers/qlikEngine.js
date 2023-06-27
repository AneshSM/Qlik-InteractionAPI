const { getApps } = require("../json/qlikEngine_json");
const { qESocketConnection } = require("../utils/qlikEngine_utils");
let value;
const executeEngineAPI = async (requestHeader) => {
  try {
    const ws = await qESocketConnection(requestHeader);
    ws.onopen = () => {
      console.log("h");
      ws.send(getApps());
      ws.message = (value) => {
        console.log(value);
      };
    };
    ws.onerror = function (err) {
      ws.terminate();
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = executeEngineAPI;
