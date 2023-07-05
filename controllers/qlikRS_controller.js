const fs = require("fs");
const path = require("path");

const {
  qrsImportApp,
  qrsExportApp,
  qrsGetImportFolder,
  qrsDownloadApp,
  qrsGetExtentions,
  qrsGetExtention,
  qrsImportExtention,
} = require("../helpers/qlikQRSapp");

// *** export specific app
const exportApp = async (req, res) => {
  try {
    await qrsExportApp().then(async (value) => {
      const { downloadPath } = JSON.parse(value);
      await qrsDownloadApp(downloadPath).then((data) => {
        const filepath = `./demo/export/test.qvf`;
        fs.openSync(filepath, "w");
        fs.writeFileSync(path.resolve(filepath), data, function (err) {
          if (err) {
            return console.error(err);
          }
        });
      });
      res.status(200).send({
        status: "OK",
        data: "Successfully stored",
        res: JSON.parse(value),
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
    await qrsGetImportFolder().then(async (value) => {
      console.log("Import folder path: " + JSON.parse(value));
      await qrsImportApp().then((value) => {
        res.status(200).send({ value });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 400).send({ status: "ERROR", error });
  }
};

// *** get availabel extensions
const getExtensions = async (req, res) => {
  try {
    await qrsGetExtentions().then((value) => {
      res.status(200).send({ value });
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 400).send({ status: "ERROR", error });
  }
};
const getExtension = async (req, res) => {
  try {
    await qrsGetExtention(req.params.extnId).then((value) => {
      const { name, owner, customProperties } = value;
      res
        .status(200)
        .send({ extension: { name, owner, customProperties }, meta: value });
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 400).send({ status: "ERROR", error });
  }
};
const importExtension = async (req, res) => {
  try {
    await qrsImportExtention().then((value) => {
      res.status(200).send(value);
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 400).send({ status: "ERROR", error });
  }
};
module.exports = {
  exportApp,
  importApp,
  getExtensions,
  getExtension,
  importExtension,
};
