// middleware/index.js
module.exports = {
  auth: require('./auth'),
  roleCheck: require('./roleCheck'),
  errorHandler: require('./errorHandler')
};
