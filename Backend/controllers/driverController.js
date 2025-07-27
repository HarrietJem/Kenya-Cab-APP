// controllers/driverController.js
const { Driver, Ride } = require('../models');
const { io } = require('../app');

exports.updateAvailability = async (req, res, next) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.user.id,
      { isAvailable: req.body.isAvailable },
      { new: true }
    );

    // Broadcast availability to riders
    if (driver.isAvailable) {
      io.emit('driverAvailable', {
        driverId: driver._id,
        vehicleType: driver.vehicle.type,
        location: driver.lastLocation
      });
    }

    res.status(200).json({
      isAvailable: driver.isAvailable,
      message: `You are now ${driver.isAvailable ? 'available' : 'unavailable'}`
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { coordinates } = req.body;
    
    await Driver.findByIdAndUpdate(req.user.id, {
      lastLocation: {
        type: 'Point',
        coordinates
      }
    });

    // Update active ride if exists
    const activeRide = await Ride.findOne({
      driverId: req.user.id,
      status: { $in: ['accepted', 'ongoing'] }
    });

    if (activeRide) {
      io.to(`ride_${activeRide._id}`).emit('locationUpdate', {
        driverLocation: coordinates,
        updatedAt: new Date()
      });
    }

    res.status(200).json({ message: 'Location updated' });
  } catch (err) {
    next(err);
  }
};