import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Car, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const RideMapContainer = ({ rides = [], center = [51.505, -0.09] }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Fix for default markers in react-leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return (
      <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Car className="mx-auto mb-2 text-gray-400" size={48} />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-xl overflow-hidden shadow-lg">
      <MapContainer 
        center={center} 
        zoom={13} 
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {rides.map((ride, index) => (
          <Marker 
            key={index} 
            position={[ride.lat, ride.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{ride.pickup} → {ride.destination}</h3>
                <p className="text-sm text-gray-600">Driver: {ride.driver}</p>
                <p className="text-sm text-gray-600">Time: {ride.time}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RideMapContainer;