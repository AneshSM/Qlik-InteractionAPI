const { default: axios } = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
var AdmZip = require("adm-zip");
var zip = new AdmZip("../engine_api_app/extensions/import/test.zip");

var certPath = path.join("../engine_api_app/cert");

const httpsAgent = new https.Agent({
  //   rejectUnauthorized: false, // (NOTE: this will disable client verification)
  key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
  cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
  ca: fs.readFileSync(path.resolve(certPath, "root.pem")),
  passphrase: "QlikEngine204",
});
const headers = {
  "X-Qlik-xrfkey": "abcdefghijklmnop",
  "X-Qlik-Header-test": "GAIN-INSIGHTS\\aneshs",
};
const url =
  "https://8zxr3w2.gain-insights.in/test/qrs/extension/upload?xrfkey=abcdefghijklmnop";
var options = {
  method: "post",
  url,
  headers,
  httpsAgent,
  data: zip.toBuffer(),
};
const callAxios = () => {
  //   axios
  //     .post(url, { httpsAgent, headers })
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  axios(options)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
module.exports = { callAxios };
