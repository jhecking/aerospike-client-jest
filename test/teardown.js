const as = require("aerospike");

module.exports = function () {
  console.log('Releasing Aerospike event loop resources');
  as.releaseEventLoop();
};
