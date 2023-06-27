const express = require("express");
const { getDocList } = require("../controllers/qlikEngine_controller");
const qlikRouter = express.Router();

qlikRouter.get("/getApps", getDocList);

module.exports = qlikRouter;
