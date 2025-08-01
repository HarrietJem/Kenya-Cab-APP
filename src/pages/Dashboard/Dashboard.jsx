import React from 'react';
import BookingForm from '../components/forms/BookingForm/BookingForm';
import RideMapContainer from '../components/maps/RideMapContainer/RideMapContainer';
import RideHistory from '../components/ride/RideHistory/RideHistory';

const mockRides = [
  {
    lat: 51.505,
    lng: -0.09,
    pickup: 'Downtown Mall',
    destination: 'Airport',
    driver: 'John Smith',
    time: '2:00 PM',
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-100 dashboard-grid">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Booking Form */}
        <div className="lg:col-span-1 animate-float">
          <BookingForm onSubmit={(data) => console.log('Booking:', data)} />
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <div className="h-full hero-bg-pattern rounded-xl shadow-lg">
            <RideMapContainer rides={mockRides} />
          </div>
        </div>

      </div>

      {/* Ride History */}
      <div className="mt-10">
        <RideHistory />
      </div>
    </div>
  );
};

export default Dashboard;
