// /controllers/pricingController.js
const { calculateFare } = require('../services/surgePricingService');

exports.getQuote = async (req, res) => {
  try {
    const {
      distanceKm,
      durationMin,
      rideMode,
      vehicleType,
      fuelType,
      paxCount,
      timeOfDay,
      isRaining,
      demandLevel,
    } = req.body;

    const fareDetails = calculateFare({
      distanceKm,
      durationMin,
      rideMode,
      vehicleType,
      fuelType,
      paxCount,
      timeOfDay,
      isRaining,
      demandLevel,
    });

    return res.status(200).json({ success: true, ...fareDetails });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Fare estimation failed', error: err.message });
  }
};
