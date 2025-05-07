const {blacklist} = require('node-express-ip-blacklist');

const getClientIp = function(req) {
    const ipAddress = req.connection.remoteAddress;
  if (!ipAddress) {
      return '';
    }
  // convert from "::ffff:192.0.0.1"  to "192.0.0.1"
    if (ipAddress.substr(0, 7) == "::ffff:") {
      ipAddress = ipAddress.substr(7)
    }
  return ipAddress;
  }
  module.exports = getClientIp;

// Source aide blacklist : 
// 'https://medium.com/hackernoon/cracking-nut-nodejs-express-block-get-remote-request-client-ip-address-e4cdfa461add'
// 'https://www.npmjs.com/package/@dealerslink/node-express-ip-blacklist'