const express = require("express");
const {
  fetchBookMarks,
  fetchSheets,
} = require("../controllers/qlikEngine_controller");
const { getBookMarks } = require("../json/qlikEngine_json");
const qlikRouter = express.Router();

qlikRouter.get("/getApps/:appid/bookmarks", fetchBookMarks);
qlikRouter.get("/getApps/:appid/sheets", fetchSheets);
module.exports = qlikRouter;
