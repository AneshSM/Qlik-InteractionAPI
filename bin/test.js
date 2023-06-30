const path = require("path");
var fs = require("fs");
const QRS = require("qrs"),
  qlikConfig = require(process.cwd() + "/config/qlik.config.js").qrs;
const respositoryService = (data) => {
  return new Promise((resolve, reject) => {
    try {
      var certPath = path.join(
        "C:",
        "ProgramData",
        "Qlik",
        "Sense",
        "Repository",
        "Exported Certificates",
        ".Local Certificates"
      );

      var config = {
        authentication: "certificates",
        host: "8zxr3w2.gain-insights.in",
        useSSL: true,
        body: "'PatientCosting.qvf'",
        key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
        cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
        ca: fs.readFileSync(path.resolve(certPath, "root.pem")),
        port: 4242,
        headerKey: "X-Qlik-User",
        headerValue: `UserDirectory:GAIN-INSIGHTS;UserId:aneshs`,
      };
      // console.log(config);
      var qrs = new QRS(config);
      qrs
        .request(
          "POST",
          "/qrs/app/import?xrfkey=abcdefghijklmnop&name=PatientCosting",
          null,
          null
        )
        .then((resp) => {
          // console.log(resp);
          let streams = [...resp];
          resolve(streams);
          // console.log('stream');
        })
        .catch((err) => {
          // console.log('Task not foud ', err);
          reject(err);
        });
    } catch (err) {
      console.log("try error ", err);
      reject(err);
    }
  });
};
respositoryService()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.error);
  });
module.exports = respositoryService;
