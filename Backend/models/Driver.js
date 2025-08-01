// models/Driver.js
const mongoose = require('mongoose');
const { 
  VEHICLE_TYPES, 
  FUEL_TYPES, 
  DEFAULT_COMMISSION_RATE, 
  DEFAULT_RATING, 
  MIN_RATING, 
  MAX_RATING 
} = require('./constants');

const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: VEHICLE_TYPES,
    required: [true, 'Vehicle type is required']
  },
  fuelType: {
    type: String,
    enum: FUEL_TYPES,
    required: [true, 'Fuel type is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  licensePlate: {
    type: String,
    required: [true, 'License plate is required'],
    uppercase: true,
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true
  }
}, { _id: false });

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  rating: {
    type: Number,
    default: DEFAULT_RATING,
    min: [MIN_RATING, `Rating must be at least ${MIN_RATING}`],
    max: [MAX_RATING, `Rating must be at most ${MAX_RATING}`]
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  vehicle: {
    type: vehicleSchema,
    required: [true, 'Vehicle information is required']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  commissionRate: {
    type: Number,
    default: DEFAULT_COMMISSION_RATE,
    min: [0, 'Commission rate cannot be negative'],
    max: [1, 'Commission rate cannot exceed 100%']
  },
  lastLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for geospatial queries
driverSchema.index({ lastLocation: '2dsphere' });

module.exports = mongoose.model('Driver', driverSchema);