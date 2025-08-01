// controllers/rideController.js
const { Ride, Driver } = require('../models');
const { getDistance } = require('../services/mapService');
const { io } = require('../app');

exports.requestRide = async (req, res, next) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    
    // Validate location data
    if (!pickup.coordinates || !destination.coordinates) {
      return res.status(400).json({ error: 'Invalid location data' });
    }

    // Find nearby available drivers
    const drivers = await Driver.find({
      isAvailable: true,
      vehicleType,
      lastLocation: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: pickup.coordinates
          },
          $maxDistance: 5000 // 5km radius
        }
      }
    });

    if (drivers.length === 0) {
      return res.status(404).json({ error: 'No available drivers nearby' });
    }

    // Create ride request
    const ride = await Ride.create({
      riderId: req.user.id,
      pickupLocation: pickup,
      destination: destination,
      vehicleType,
      status: 'requested'
    });

    // Notify nearby drivers via Socket.IO
    drivers.forEach(driver => {
      io.to(`driver_${driver._id}`).emit('rideRequest', {
        rideId: ride._id,
        pickup,
        destination,
        estimatedFare: calculateFare(pickup, destination)
      });
    });

    res.status(201).json({
      message: 'Ride requested',
      rideId: ride._id,
      estimatedWaitTime: '3-5 minutes'
    });
  } catch (err) {
    next(err);
  }
};

// ... (acceptRide, cancelRide, completeRide implementations)