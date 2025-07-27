// /services/surgePricingService.js
function calculateFare({ 
  distanceKm, 
  durationMin, 
  rideMode,       // 'solo', 'shared', 'delivery'
  vehicleType,    // 'car', 'motorbike', 'ev'
  fuelType,       // 'fuel', 'ev'
  paxCount = 1, 
  timeOfDay, 
  isRaining,
  demandLevel     // 'low', 'normal', 'high'
}) {
  const BASE_FARE = 50; // base charge in KES
  const PER_KM = vehicleType === 'motorbike' ? 25 : 35;
  const PER_MIN = 2;

  let distanceFare = distanceKm * PER_KM;
  let durationFare = durationMin * PER_MIN;

  let totalFare = BASE_FARE + distanceFare + durationFare;

  // Apply surge based on demand and time
  let surgeMultiplier = 1;
  if (demandLevel === 'high' || timeOfDay === 'peak') surgeMultiplier += 0.5;
  if (isRaining) surgeMultiplier += 0.25;

  // Adjust based on ride mode
  if (rideMode === 'shared') totalFare *= 0.85;
  if (rideMode === 'delivery') totalFare *= 0.9;

  // EV discount (e.g. 10%)
  if (fuelType === 'ev') totalFare *= 0.9;

  totalFare *= surgeMultiplier;

  return {
    baseFare: BASE_FARE,
    distanceFare,
    durationFare,
    surgeMultiplier,
    totalFare: Math.round(totalFare),
  };
}

module.exports = { calculateFare };
