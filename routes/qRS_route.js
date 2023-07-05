const express = require("express");
const {
  exportApp,
  importApp,
  getExtensions,
  getExtension,
  importExtension,
} = require("../controllers/qlikRS_controller");
const qRSRouter = express.Router();

qRSRouter.get("/app/:appid/export", exportApp);
qRSRouter.get("/app/import", importApp);
qRSRouter.get("/app/extensions", getExtensions);
qRSRouter.get("/app/extensions/:extnId", getExtension);
qRSRouter.post("/app/extension", importExtension);

module.exports = qRSRouter;
