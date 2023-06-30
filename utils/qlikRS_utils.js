const { certificates } = require("../cert/certificate");

const qRShttpsConnection = (requestHeader) => {
  const { UserName, UserDirectory, Host, Port, Proxy, Path, Method } =
    requestHeader;
  return new Promise((resolve, reject) => {
    try {
      const AppId = requestHeader.AppId ? requestHeader.AppId : "";
      const qrsOptions = {
        hostname: Host,
        port: Port,
        path: "/qrs/" + Path,
        method: Method,
        ca: [certificates.root],
        cert: certificates.cert,
        key: certificates.key,
        headers: {
          "X-Qlik-User": `UserDirectory=${UserDirectory}; UserId=${UserName}`,
          "Accept-Charset": "utf-8; q=0.9, us-ascii;q=0.1, iso-8859-1",
          Accept: "text/xml; q=0.1, application/json; q=0.2",
          "X-Qlik-App": AppId,
          "X-Qlik-Virtual-Proxy-Prefix": Proxy,
          "x-qlik-xrfkey": "abcdefghijklmnop",
          Connection: "Keep-Alive",
        },
      };
    } catch (error) {
      console.log(error);
      reject({
        status: 400,
        message: "ERROR:" + error.message,
        error,
      });
    }
  });
};

module.exports = { qRShttpsConnection };
