var https = require("https");
var fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var AdmZip = require("adm-zip");

const headers = {
  "X-Qlik-Xrfkey": "abcdefghijklmnop",
  "X-Qlik-User": `UserDirectory=INTERNAL; UserId=sa_repository`,
  "Content-Type": "application/json",
  // Accept: "application/json",
};
// *** Extensions
const qrsGetExtentionScheema = () => {
  let { options } = require("../config/qlik.config");
  options = {
    ...options,
    path: `/qrs/extension/schema?Xrfkey=abcdefghijklmnop`,
    method: "GET",
    headers,
  };
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      res.on("data", function (chunk) {
        resolve(JSON.parse(chunk));
      });
      res.on("error", function (e) {
        console.log("Got error: " + e.message);
      });
    });
  });
};

const qrsGetExtentions = () => {
  let { options } = require("../config/qlik.config");
  options = {
    ...options,
    path: `/qrs/extension?Xrfkey=abcdefghijklmnop`,
    method: "GET",
    headers,
  };
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      res.on("data", function (chunk) {
        resolve(JSON.parse(chunk));
      });
      res.on("error", function (e) {
        console.log("Got error: " + e.message);
      });
    });
  });
};

const qrsGetExtention = (id) => {
  let { options } = require("../config/qlik.config");
  options = {
    ...options,
    path: `/qrs/extension/${id}?Xrfkey=abcdefghijklmnop`,
    method: "GET",
    headers,
  };

  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      res.on("data", function (chunk) {
        resolve(JSON.parse(chunk));
      });
      res.on("error", function (e) {
        console.log("Got error: " + e.message);
      });
    });
  });
};
const qrsImportExtention = (id) => {
  let { options } = require("../config/qlik.config");
  headers["Content-Type"] = "application/zip";
  // headers["Content-Type"] = " multipart/form-data";
  // headers["Content-Transfer-Encoding"] = "binary";
  headers["Content-Disposition"] = "attachment;filename='test.zip'";
  // ("form-data; name='content'; filename='test.zip'");

  var zip = new AdmZip("../engine_api_app/extensions/import/test.zip");
  // var zip = new AdmZip();
  // zip.addLocalFolder("../engine_api_app/extensions/import/test");
  options = {
    ...options,
    path: `/qrs/extension/upload?Xrfkey=abcdefghijklmnop`,
    method: "POST",
    headers,
    body: zip.toBuffer(),
    // body: fs.createReadStream("../engine_api_app/extensions/import/test.zip"),
  };

  return new Promise((resolve, reject) => {
    let responseString = "";
    let statusCode = "";
    https.get(options, function (res) {
      res.on("error", function (err) {
        reject(new Error("QRS response error:" + err));
      });
      res.on("data", function (data) {
        responseString += data;
      });
      res.on("end", function () {
        if (statusCode == 200 || statusCode == 201 || statusCode == 204) {
          var jsonResponse = "";
          if (responseString.length != 0) {
            try {
              jsonResponse = JSON.parse(responseString);
            } catch (e) {
              resolve({
                statusCode: statusCode,
                body: responseString,
              });
            }
          }
          resolve({
            statusCode: statusCode,
            body: jsonResponse,
          });
        } else {
          reject(
            new Error(
              "Received error code: " + statusCode + "::" + responseString
            )
          );
        }
      });
    });
  });
};

module.exports = { qrsGetExtention, qrsGetExtentions, qrsImportExtention };
