// UI Glow Intensity
document.getElementById('intensitySlider')?.addEventListener('input', function () {
  const level = parseInt(this.value);
  const levels = ['intensity-low', 'intensity-medium', 'intensity-high', 'intensity-extreme'];
  document.body.classList.remove(...levels);
  document.body.classList.add(levels[level]);

  // Update mark highlight
  for (let i = 0; i < 4; i++) {
    document.getElementById('mark' + i)?.classList.toggle('active', i === level);
  }
});

// Booking page logic
function selectVehicle(card) {
  document.querySelectorAll('.vehicle-card').forEach(el => el.classList.remove('selected'));
  card.classList.add('selected');
}

function confirmRide() {
  const selected = document.querySelector('.vehicle-card.selected');
  if (!selected) return alert("Please select a vehicle.");
  alert(`✅ Ride confirmed with ${selected.dataset.type}`);
}

function getEstimate() {
  const selected = document.querySelector('.vehicle-card.selected');
  if (!selected) return alert("Please select a vehicle.");
  alert(`💰 Estimated fare for ${selected.dataset.type} will be calculated.`);
}
// Ride history logic
function loadRideHistory() {
  const history = [
    { date: '2023-10-01', type: 'Sedan', fare: '$20', status: 'Completed' },
    { date: '2023-09-25', type: 'SUV', fare: '$30', status: 'Completed' },
    { date: '2023-09-20', type: 'Luxury', fare: '$50', status: 'Cancelled' },
  ];

  const historyContainer = document.getElementById('rideHistory');
  history.forEach(ride => {
    const rideElement = document.createElement('div');
    rideElement.className = 'ride-history-item';
    rideElement.innerHTML = `
      <div class="ride-date">${ride.date}</div>
      <div class="ride-type">${ride.type}</div>
      <div class="ride-fare">${ride.fare}</div>
      <div class="ride-status ${ride.status.toLowerCase()}">${ride.status}</div>
    `;
    historyContainer.appendChild(rideElement);
  });
}
// Initialize ride history on page load
document.addEventListener('DOMContentLoaded', loadRideHistory);
// Ride booking form validation
function validateBookingForm() {
    const pickup = document.getElementById('pickup').value.trim();
    const dropoff = document.getElementById('dropoff').value.trim();
    const selectedVehicle = document.querySelector('.vehicle-card.selected');

    if (!pickup || !dropoff || !selectedVehicle) {
        alert("Please fill in all fields and select a vehicle.");
        return false;
    }
    return true;
}