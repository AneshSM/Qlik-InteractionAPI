const fs = require("fs");
const path = require("path");
const { qrsDownloadApp } = require("../qlikQRSapp");
const storeApp = async (value) => {
  try {
    await qrsDownloadApp(value["downloadPath"]).then((data) => {
      const filepath = path.resolve(`./demo/export/test.qvf`);
      //   fs.openSync(filepath, "w");
      fs.writeFileSync(path.resolve(filepath), data, function (err) {
        if (err) {
          return console.error(err);
        }
      });
      return;
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { storeApp };
