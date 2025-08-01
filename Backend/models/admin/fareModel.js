// /models/fareModel.js
const mongoose = require('mongoose');

const FareSchema = new mongoose.Schema({
  vehicleType: String,         // car, motorbike, ev
  rideMode: String,            // solo, shared, delivery
  fuelType: String,            // fuel, ev
  baseFare: Number,
  perKm: Number,
  perMin: Number,
  evDiscountPercent: Number,
  sharedDiscountPercent: Number,
  peakSurge: Number,
  rainSurge: Number,
});

module.exports = mongoose.model('FareRule', FareSchema);
