const mongoose = require('mongoose');
const { User } = require('./index'); // Import other models if needed

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // other fields
});

module.exports = mongoose.model('Notification', notificationSchema);