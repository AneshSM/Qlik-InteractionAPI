const fs = require("fs");
const { qrsImportApp, qrsExportApp } = require("../helpers/qlikQRSapp");
const { storeApp } = require("../helpers/common/helper");

// *** export specific app
const exportApp = async (req, res) => {
  try {
    await qrsExportApp().then(async (value) => {
      await storeApp(JSON.parse(value)).then((data) => {
        res.status(200).send({
          status: "OK",
          data: "Successfully stored",
          res: JSON.parse(value),
        });
      });
    });
  } catch (error) {
    res
      .status(error?.status || 400)
      .send({ status: "ERROR23", message: error.message, error: error });
  }
};

// *** import specific app
const importApp = async (req, res) => {
  try {
    await qrsImportApp().then((value) => {
      res.status(200).send({ status: "OK", data: value });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { exportApp, importApp };
