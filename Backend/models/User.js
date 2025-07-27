const mongoose = require('mongoose');
const { /* any needed constants */ } = require('./constants');

const userSchema = new mongoose.Schema({
  // your schema definition
});

module.exports = mongoose.model('User', userSchema);