const express = require("express");
const { exportApp, importApp } = require("../controllers/qlikRS_controller");
const qRSRouter = express.Router();

qRSRouter.get("/app/:appid/export", exportApp);
qRSRouter.get("/app/import", importApp);

module.exports = qRSRouter;
