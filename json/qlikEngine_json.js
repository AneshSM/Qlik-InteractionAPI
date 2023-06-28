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

const getSheets = (types) => {
  return {
    handle: 1,
    method: "GetObjects",
    params: {
      qOptions: {
        qTypes: ["sheet"],
        qIncludeSessionObjects: false,
        qData: {},
      },
    },
  };
};

module.exports = { openApp, getBookMarks, getSheets };
