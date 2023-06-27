const executeEngineAPI = require("../helpers/qlikEngine");
const { getApps } = require("../json/qlikEngine_json");

const getDocList = async (req, res) => {
  try {
    const requestHeader = {
      UserName: req.body.username,
      UserDirectory: req.body.userdirectory,
      Host: req.body.host,
      AppId: req.body.appid,
      Port: req.body.port,
    };
    const apps = await executeEngineAPI(requestHeader);
    console.log("Recieved data " + apps);
    res.status(200).send({ status: "OK", data: apps });
  } catch (error) {
    res.status(error?.status || 400).send({ status: "ERROR", error: error });
  }
};

module.exports = { getDocList };
