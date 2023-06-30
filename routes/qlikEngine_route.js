const express = require("express");
const {
  fetchBookMarks,
  fetchSheets,
  fetchStories,
} = require("../controllers/qlikEngine_controller");
const qERouter = express.Router();

qERouter.get("/app/:appid/bookmarks", fetchBookMarks);
qERouter.get("/app/:appid/sheets", fetchSheets);
qERouter.get("/app/:appid/stories", fetchStories);

module.exports = qERouter;
