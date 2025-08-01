// constants.js
module.exports = {
  VEHICLE_TYPES: ['sedan', 'motorbike', 'bicycle', 'tuk_tuk'],
  RIDE_STATUSES: ['requested', 'accepted', 'driver_assigned', 'ongoing', 'completed', 'cancelled'],
  // ... other constants
};

// Updated Driver model
driverSchema = new mongoose.Schema({
  // ... other fields
  rating: {
    type: Number,
    default: 5.0,
    min: 1,
    max: 5
  }});