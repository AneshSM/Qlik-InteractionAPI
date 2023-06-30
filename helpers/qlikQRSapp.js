var https = require("https");
rs;
var fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { error } = require("console");

var certPath = path.join(
  "C:",
  "ProgramData",
  "Qlik",
  "Sense",
  "Repository",
  "Exported Certificates",
  ".Local Certificates"
);

const qrsExportApp = () => {
  var options = {
    hostname: "8zxr3w2.gain-insights.in",
    port: 4242,
    path: `/qrs/app/{562abc57-fdaa-42a7-be82-a262215f01af}/export/{${uuidv4()}}?xrfkey=abcdefghijklmnop`,
    method: "POST",
    headers: {
      "X-Qlik-xrfkey": "abcdefghijklmnop",
      "X-Qlik-User": `UserDirectory= GAIN-INSIGHTS; UserId=aneshs`,
      Connection: "Keep-Alive",
      "Content-Type": "multipart/form-data",
    },
    key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
    cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
    ca: fs.readFileSync(path.resolve(certPath, "root.pem")),
  };
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      res.on("data", function (chunk) {
        resolve(chunk);
      });
      res.on("error", function (e) {
        console.log("Got error: " + e.message);
      });
    });
  });
};
const qrsDownloadApp = (location) => {
  var options = {
    hostname: "8zxr3w2.gain-insights.in",
    port: 4242,
    path: location,
    method: "GET",
    headers: {
      "X-Qlik-xrfkey": "abcdefghijklmnop",
      "X-Qlik-User": `UserDirectory= GAIN-INSIGHTS; UserId=aneshs`,
      "Content-Type": "multipart/form-data",
    },
    key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
    cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
    ca: fs.readFileSync(path.resolve(certPath, "root.pem")),
  };
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      res.on("data", function (chunk) {
        resolve(chunk);
      });
      res.on("error", function (e) {
        reject(error);
      });
    });
  });
};
const qrsImportApp = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "8zxr3w2.gain-insights.in",
      port: 4242,
      path: `/qrs/app/import?xrfkey=abcdefghijklmnop&name=PatientCosting`,
      method: "POST",
      headers: {
        "X-Qlik-xrfkey": "abcdefghijklmnop",
        "X-Qlik-User": `UserDirectory=GAIN-INSIGHTS; UserId=aneshs`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
      cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
      ca: fs.readFileSync(path.resolve(certPath, "root.pem")),
      body: "'PatientCosting.qvf'",
    };
    https.get(options, function (res) {
      res.on("data", function (chunk) {
        console.log("Got response: " + res.statusCode);
        resolve(chunk);
      });
      res.on("error", function (e) {
        console.log("Got error: " + e.message);
      });
    });
  });
};

module.exports = { qrsExportApp, qrsImportApp, qrsDownloadApp };
