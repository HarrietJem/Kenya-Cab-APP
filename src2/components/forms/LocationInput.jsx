import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  ArrowUpDown, 
  Search, 
  X,
  Home,
  Briefcase,
  Heart,
  Target
} from 'lucide-react';

const LocationInput = ({ 
  onLocationSelect, 
  initialPickup = '', 
  initialDestination = '',
  showSwapButton = true 
}) => {
  const [pickup, setPickup] = useState(initialPickup);
  const [destination, setDestination] = useState(initialDestination);
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'destination'
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [recentLocations, setRecentLocations] = useState([
    { id: 1, name: 'Nairobi CBD', address: 'Central Business District, Nairobi', type: 'recent' },
    { id: 2, name: 'JKIA Terminal 1A', address: 'Jomo Kenyatta International Airport', type: 'recent' },
    { id: 3, name: 'Westlands', address: 'Westlands, Nairobi', type: 'recent' },
  ]);
  const [favoriteLocations] = useState([
    { id: 1, name: 'Home', address: 'Karen, Nairobi', type: 'home', icon: Home },
    { id: 2, name: 'Work', address: 'Upper Hill, Nairobi', type: 'work', icon: Briefcase },
    { id: 3, name: 'Gym', address: 'Kilimani, Nairobi', type: 'favorite', icon: Heart },
  ]);

  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const searchRef = useRef(null);

  // Simulate getting current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: 'Current Location',
            address: 'Your current location'
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  // Simulate address search (replace with actual Google Places API)
  const searchLocations = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock search results - replace with actual Google Places API
    const mockResults = [
      {
        id: 1,
        name: query + ' - CBD',
        address: 'Central Business District, Nairobi',
        type: 'search'
      },
      {
        id: 2,
        name: query + ' - Westlands',
        address: 'Westlands, Nairobi',
        type: 'search'
      },
      {
        id: 3,
        name: query + ' - Karen',
        address: 'Karen, Nairobi',
        type: 'search'
      },
      {
        id: 4,
        name: query + ' - Kilimani',
        address: 'Kilimani, Nairobi',
        type: 'search'
      }
    ].filter(result => 
      result.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const handleInputChange = (type, value) => {
    if (type === 'pickup') {
      setPickup(value);
    } else {
      setDestination(value);
    }
    
    setActiveInput(type);
    searchLocations(value);
  };

  const handleLocationSelect = (location) => {
    const locationData = {
      name: location.name,
      address: location.address,
      coordinates: location.coordinates || null
    };

    if (activeInput === 'pickup') {
      setPickup(location.name);
    } else if (activeInput === 'destination') {
      setDestination(location.name);
    }

    // Add to recent locations
    const newRecentLocation = {
      id: Date.now(),
      name: location.name,
      address: location.address,
      type: 'recent'
    };
    
    setRecentLocations(prev => {
      const filtered = prev.filter(loc => loc.name !== location.name);
      return [newRecentLocation, ...filtered].slice(0, 5);
    });

    setSearchResults([]);
    setActiveInput(null);

    // Callback to parent component
    if (onLocationSelect) {
      onLocationSelect({
        type: activeInput,
        location: locationData,
        pickup: activeInput === 'pickup' ? locationData : { name: pickup },
        destination: activeInput === 'destination' ? locationData : { name: destination }
      });
    }
  };

  const handleSwapLocations = () => {
    const tempPickup = pickup;
    setPickup(destination);
    setDestination(tempPickup);
    
    if (onLocationSelect) {
      onLocationSelect({
        type: 'swap',
        pickup: { name: destination },
        destination: { name: tempPickup }
      });
    }
  };

  const handleCurrentLocation = () => {
    if (currentLocation) {
      handleLocationSelect(currentLocation);
    } else {
      getCurrentLocation();
    }
  };

  const clearInput = (type) => {
    if (type === 'pickup') {
      setPickup('');
    } else {
      setDestination('');
    }
    setSearchResults([]);
  };

  const handleInputFocus = (type) => {
    setActiveInput(type);
    if (type === 'pickup' && pickup) {
      searchLocations(pickup);
    } else if (type === 'destination' && destination) {
      searchLocations(destination);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow selection
    setTimeout(() => {
      setActiveInput(null);
      setSearchResults([]);
    }, 200);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'home': return Home;
      case 'work': return Briefcase;
      case 'favorite': return Heart;
      case 'recent': return Clock;
      case 'current': return Navigation;
      default: return MapPin;
    }
  };

  const showSuggestions = activeInput && (searchResults.length > 0 || !pickup || !destination);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <h3 className="text-white font-semibold text-lg">Where to go?</h3>
      </div>

      {/* Location Inputs */}
      <div className="p-4">
        <div className="relative">
          {/* Pickup Input */}
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <input
              ref={pickupRef}
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => handleInputChange('pickup', e.target.value)}
              onFocus={() => handleInputFocus('pickup')}
              onBlur={handleInputBlur}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {pickup && (
              <button
                onClick={() => clearInput('pickup')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Swap Button */}
          {showSwapButton && (
            <div className="flex justify-center mb-3">
              <button
                onClick={handleSwapLocations}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowUpDown size={16} className="text-gray-600" />
              </button>
            </div>
          )}

          {/* Destination Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <input
              ref={destinationRef}
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              onFocus={() => handleInputFocus('destination')}
              onBlur={handleInputBlur}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {destination && (
              <button
                onClick={() => clearInput('destination')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Current Location Button */}
        <button
          onClick={handleCurrentLocation}
          className="w-full mt-4 p-3 flex items-center gap-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Navigation size={20} />
          <span>Use current location</span>
          {currentLocation && <Target size={16} className="ml-auto text-green-500" />}
        </button>
      </div>

      {/* Search Results & Suggestions */}
      {showSuggestions && (
        <div className="border-t border-gray-200 max-h-80 overflow-y-auto">
          {/* Loading */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                Searching...
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                Search Results
              </div>
              {searchResults.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Search size={18} className="text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-500">{location.address}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Favorite Locations */}
          {!isLoading && searchResults.length === 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                Favorites
              </div>
              {favoriteLocations.map((location) => {
                const IconComponent = location.icon;
                return (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <IconComponent size={18} className="text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-500">{location.address}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Recent Locations */}
          {!isLoading && searchResults.length === 0 && recentLocations.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                Recent
              </div>
              {recentLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Clock size={18} className="text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-500">{location.address}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      {pickup && destination && !activeInput && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => onLocationSelect && onLocationSelect({
              type: 'confirm',
              pickup: { name: pickup },
              destination: { name: destination }
            })}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Confirm Locations
          </button>
        </div>
      )}
    </div>
  );
};

// Demo wrapper component
const App = () => {
  const [selectedLocations, setSelectedLocations] = useState(null);

  const handleLocationSelect = (data) => {
    console.log('Location selected:', data);
    setSelectedLocations(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <LocationInput 
          onLocationSelect={handleLocationSelect}
          initialPickup=""
          initialDestination=""
          showSwapButton={true}
        />
        
        {/* Debug Info */}
        {selectedLocations && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Selected Locations:</h4>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(selectedLocations, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;