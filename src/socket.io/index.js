const { initConnectionUserInternal } = require("./namespaces.socket");

module.exports = (io) => {
  if (typeof initConnectionUserInternal === "function") {
    initConnectionUserInternal(io);
  } else {
    console.warn("[socket.io] initConnectionUserInternal is missing; skipping namespace init");
  }
};
