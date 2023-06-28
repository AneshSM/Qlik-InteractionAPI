const { openApp, getBookMarks, getSheets } = require("../json/qlikEngine_json");
const {
  qEgetAppData,
  qEgetBookmarks,
  qEgetSheets,
} = require("../helpers/qlikEngine");

const openDoc = async (req) => {
  try {
    const requestHeader = {
      UserName: req.headers.username,
      UserDirectory: req.headers.userdirectory,
      Host: req.headers.host,
      AppId: req.params.appid,
      Port: req.headers.port,
      Proxy: req.headers.proxy,
    };
    return await qEgetAppData(requestHeader, openApp);
  } catch (error) {
    throw new Error(error.message);
  }
};
const fetchBookMarks = async (req, res) => {
  try {
    const ws = await openDoc(req);
    const bookmarks = await qEgetBookmarks(ws, getBookMarks);
    res.status(200).send({ status: "OK", data: bookmarks });
  } catch (error) {
    res.status(error?.status || 400).send({ status: "ERROR2", error: error });
  }
};
const fetchSheets = async (req, res) => {
  try {
    const ws = await openDoc(req);
    const sheets = await qEgetSheets(ws, getSheets);
    res.status(200).send({ status: "OK", data: sheets });
  } catch (error) {
    res.status(error?.status || 400).send({ status: "ERROR2", error: error });
  }
};
module.exports = { openDoc, fetchBookMarks, fetchSheets };
