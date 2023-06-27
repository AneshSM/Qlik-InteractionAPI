const getApps = () => {
  return {
    handle: -1,
    method: "GetDocList",
    params: [],
    outKey: -1,
    id: 1,
  };
};
const openApp = (appID) => {
  return {
    method: "OpenDoc",
    handle: -1,
    params: ["562abc57-fdaa-42a7-be82-a262215f01af"],
    outKey: -1,
    id: 2,
  };
};

module.exports = { getApps, openApp };
