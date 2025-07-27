// models/Ride.js
const mongoose = require('mongoose');
const { 
  VEHICLE_TYPES, 
  FUEL_TYPES, 
  RIDE_MODES, 
  RIDE_STATUSES 
} = require('./constants');

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: RIDE_STATUSES,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  reason: String
}, { _id: false });

const rideSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Rider ID is required']
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  pickupLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: [true, 'Pickup coordinates are required']
    },
    address: {
      type: String,
      required: [true, 'Pickup address is required']
    }
  },
  destination: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: [true, 'Destination coordinates are required']
    },
    address: {
      type: String,
      required: [true, 'Destination address is required']
    }
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required'],
    min: [0, 'Distance cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0, 'Duration cannot be negative']
  },
  vehicleType: {
    type: String,
    enum: VEHICLE_TYPES,
    required: [true, 'Vehicle type is required']
  },
  fuelType: {
    type: String,
    enum: FUEL_TYPES,
    required: [true, 'Fuel type is required']
  },
  rideMode: {
    type: String,
    enum: RIDE_MODES,
    required: [true, 'Ride mode is required']
  },
  paxCount: {
    type: Number,
    required: [true, 'Passenger count is required'],
    min: [1, 'At least one passenger is required']
  },
  baseFare: {
    type: Number,
    required: [true, 'Base fare is required'],
    min: [0, 'Fare cannot be negative']
  },
  totalFare: {
    type: Number,
    required: [true, 'Total fare is required'],
    min: [0, 'Fare cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
    trim: true
  },
  breakdown: {
    distanceFare: Number,
    timeFare: Number,
    surgeMultiplier: {
      type: Number,
      default: 1.0
    },
    commission: Number,
    platformFee: Number,
    tip: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: RIDE_STATUSES,
    default: 'requested'
  },
  statusHistory: [statusHistorySchema],
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'mobile_wallet'],
    required: [true, 'Payment method is required']
  },
  isTipped: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
rideSchema.index({ riderId: 1 });
rideSchema.index({ driverId: 1 });
rideSchema.index({ status: 1 });
rideSchema.index({ createdAt: 1 });
rideSchema.index({ updatedAt: 1 });
rideSchema.index({ pickupLocation: '2dsphere' });
rideSchema.index({ destination: '2dsphere' });

// Add status to history when it changes
rideSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('Ride', rideSchema);