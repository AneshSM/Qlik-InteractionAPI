var http = require("http");
var fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");
var certPath = path.join(
  "C:",
  "ProgramData",
  "Qlik",
  "Sense",
  "Repository",
  "Exported Certificates",
  ".Local Certificates"
);

const qrsGetExtentionSchema = () => {
  const options = {
    hostname: "8zxr3w2.gain-insights.in",
    path: `/test/qrs/extension?Xrfkey=abcdefghijklmnop`,
    method: "GET",
    headers: {
      "X-Qlik-Xrfkey": "abcdefghijklmnop",
      // "X-Qlik-User": `UserDirectory=INTERNAL; UserId=sa_repository`,
      "Content-Type": "application/json",
      "X-Qlik-Header-test": "INTERNAL\\sa_repository",
      // Accept: "application/json",
    },
    // key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
    // cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
    // ca: fs.readFileSync(path.resolve(certPath, "root.pem")),
  };
  return new Promise((resolve, reject) => {
    http.get(options, function (res) {
      res.on("data", function (chunk) {
        resolve(chunk);
      });
      res.on("error", function (e) {
        console.log("Got error: " + e.message);
      });
    });
  });
};

module.exports = { qrsGetExtentionSchema };
qrsGetExtentionSchema()
  .then((data) => {
    const responseString = String.fromCharCode.apply(
      null,
      new Uint8Array(data)
    );
    console.log(data);
    console.log(JSON.parse(data));
  })
  .catch((err) => {
    console.log({ err, msg: err.message });
  });

// ****  Using axiox

// const options = {
//   url: `https://8zxr3w2.gain-insights.in/test/qrs/about?Xrfkey=abcdefghijklmnop`,
//   method: "GET",
// };
// const headers = {
//   "X-Qlik-Xrfkey": "abcdefghijklmnop",
//   // "X-Qlik-User": `UserDirectory=INTERNAL; UserId=sa_repository`,
//   "Content-Type": "application/json",
//   "X-Qlik-Header-test": "INTERNAL\\sa_repository",
// };
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false, // (NOTE: this will disable client verification)
//   cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
//   key: fs.readFileSync(path.resolve(certPath, "root.pem")),
//   passphrase: "QlikEngine204",
// });

// axios(options, { headers, httpsAgent })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
