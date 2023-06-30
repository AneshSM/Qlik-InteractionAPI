const openApp = (appID) => {
  return {
    method: "OpenDoc",
    handle: -1,
    params: [appID],
  };
};

const getBookMarks = () => {
  return {
    handle: 1,
    method: "GetBookmarks",
    params: {
      qOptions: {
        qTypes: ["bookmark"],
        qData: {},
      },
    },
  };
};
// parameter array of strings
const getObjects = (types) => {
  return {
    handle: 1,
    method: "GetObjects",
    params: {
      qOptions: {
        qTypes: [...types],
        qIncludeSessionObjects: false,
        qData: {},
      },
    },
  };
};

module.exports = { openApp, getBookMarks, getObjects };
